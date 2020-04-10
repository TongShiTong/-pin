<template>
	<view class="content-box">
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/shanchu.png" @tap="jump"></image>
			<view style="margin-left: 216upx;">身份认证</view>
		</view>
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
				<label class="call-box">
					<view class="call">姓名</view>
					<input class="uni-input" name="realname" v-model="realname" placeholder="请输入姓名"/>
				</label>
				<!--<button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'>自动填入</button>-->
				<label class="call-box">
					<view class="call">身份证号码</view>
					<input class="uni-input" @blur="yzCard" name="id_card" v-model="id_card" placeholder="请输入身份证号码"/>
				</label>
				
				<!-- <label class="call-box">
					<view class="call">手机号码</view>
					<input class="uni-input" name="mobile" v-model="mobile" placeholder="请输入手机号码"/>
				</label> -->
				
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
				realname: '',
				id_card:'',
				mobile:'',
				zqCard:true,
				isFormSubmit: false,
			}
		},
		onLoad(e) {
			// console.log(e)
			let _this = this
			_this.typeid = e.type
			if(uni.getStorageSync("isVerified")==2) {
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
					var realname = that.realname;
					var id_card = that.id_card;
					if (this.isFormSubmit) {
						return;
					}
					this.isFormSubmit = true;
					http.apiRequest({
						api: "/verified/postVerified",
						method: "POST",
						data: {
							realname: realname,
							id_card: id_card,
							// mobile: this.mobile
						},
						secuss: (res, httpStatus) => {
							this.isFormSubmit = false;
							if (res.code == "1") {
								// console.log(res)
								http.apiRequest({
									api: "/verified/checkVerified",
									method: "GET",
									data: {
									},
									secuss: (res, httpStatus) => {
										if (res.code == 1) {
											// 注册身份返回认证身份状态
											let isVerified1 = res.data.check
											uni.setStorageSync("isVerified",isVerified1)
											uni.showToast({title:"身份认证已提交",duration:1500});
											setTimeout(function() {
												history.back()
											}, 500);
										}else {
											
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
		align-items: center;
		/* justify-content: space-between; */
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.call {
		font-size: 32upx;
		color: #1A1A1A;
		width: 264upx;
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
