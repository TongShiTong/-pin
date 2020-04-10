<template>
	<view class="content-box">
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/shanchu.png" @tap="jump"></image>
			<view style="margin-left: 216upx;">企业认证</view>
		</view>
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
				<label class="call-box">
					<view class="call">公司简称</view>
					<input class="uni-input" name="realname" v-model="abbrevi_name" placeholder="请输入公司简称" required="required" maxlength="8"/>
				</label>
				<label class="call-box">
					<view class="call">公司名称</view>
					<input class="uni-input" name="realname" v-model="realname" placeholder="请输入公司名称" required="required"/>
				</label>
				<!--<button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'>自动填入</button>-->
				<label class="call-box">
					<view class="call">统一社会信用代码</view>
					<input class="uni-input" name="id_card" v-model="cood" placeholder="请输入信用代码" required="required"/>
				</label>
				
				<label class="call-box">
					<view class="call">法人姓名</view>
					<input class="uni-input" name="mobile" v-model="name" placeholder="请输入法人姓名" required="required"/>
				</label>
				<label class="call-box">
					<view class="call">法人身份证号码</view>
					<input class="uni-input" @blur="yzCard" name="id_card" v-model="id_card" placeholder="请输入法人身份证号码" required="required"/>
				</label>
				
				<button class="btn" formType="submit">确定</button>
			</form>
		</view>
		<!-- <view @tap="jump">跳过</view> -->
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				typeid:'',
				abbrevi_name:'',
				realname:'',
				cood:'',
				name:'',
				zqCard:true,
				id_card:'',
				isFormSubmit: false,
			}
		},
		onLoad(e) {
			// console.log(e)
			let _this = this
			_this.typeid = e.type
			if(uni.getStorageSync("isCompanyVerified")==2) {
				this.jump()
			}else {
				
			}
		},
		methods: {
			formSubmit: function(e) {
				if(this.zqCard) {
					uni.showToast({title:"请输入正确的身份证号！",duration:1500});
				}else {
					var that = this;
					if (this.isFormSubmit) {
						return;
					}
					this.isFormSubmit = true;
					http.apiRequest({
						api: "/company_verified/postVerified",
						method: "POST",
						data: {
							abbrevi_name: this.abbrevi_name,
							company_name: this.realname,
							legal_person_idcard: this.id_card,
							legal_person: this.name,
							company_code: this.cood
						},
						secuss: (res, httpStatus) => {
							this.isFormSubmit = false;
							if (res.code == "1") {
								http.apiRequest({
									api: "/company_verified/checkVerified",
									method: "GET",
									data: {
									},
									secuss: (res, httpStatus) => {
										if (res.code == 1) {
											// 注册身份返回认证身份状态
											let isCompanyVerified1 = res.data.check
											uni.setStorageSync("isCompanyVerified",isCompanyVerified1)
											uni.showToast({title:"公司认证已提交",duration:1500});
											setTimeout(function() {
												history.back()
											}, 500);
										}else {
											uni.showToast({
												title: res.msg
											});
										}
									},
									error: (res, httpStatus) => {
										uni.showToast({
											title: "请检查网络..."
										});
									},
								});
							} else {
								//短信发送失败
								uni.showToast({title:res.msg,duration:1500,icon:"none"});
							}
						},
						error: (res, httpStatus) => {
							//接口调用失败，可能是网络故障，可能是接口报错
							this.isFormSubmit = false;
							console.log("接口调用失败，请检查网络");
						},
					});
				}
			},
			// 验证身份证
			yzCard(e) {
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(idcardReg.test(e.detail.value)) {
					this.zqCard = false
				}else {
					this.zqCard = true
					// uni.showToast({title:"请输入正确的身份证号！",duration:1500});
				}
			},
			// 验证身份
			yanzheng(e) {
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				// console.log(e)
				if(idcardReg.test(e.detail.value)) {
					this.formSubmit()
				}else {
					uni.showToast({
						title: '请输入正确的身份证号！'
					});
				}
			},
			// submit(){
			// 	uni.reLaunch({
			// 		url: '/pages/index/index?typeid=' + this.typeid
			// 	});
			// },
			jump() {
				uni.navigateBack({
					delta:1
				});
			}
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
	}
	.hader {
		padding: 67upx 40upx 27upx;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		font-size: 36upx;
		color: #fff;
		font-weight: bold;
		background: #FF5A1F;
	}
	.form {
		width: 100%;
		padding: 40upx 40upx 0;
		box-sizing: border-box;
	}
	.call-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.call {
		font-size: 32upx;
		color: #1A1A1A;
		/* width: 210upx; */
	}
	.uni-input {
		font-size: 32upx;
		color: #1A1A1A;
		/* font-weight: bold; */
		width: 350upx;
	}
	.btn {
		margin: 0 auto;
		margin-top: 308upx;
		width: 400upx;
		height: 94upx;
		background: #FF5A1F;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #fff;
		border-radius: 6upx;
	}
</style>
