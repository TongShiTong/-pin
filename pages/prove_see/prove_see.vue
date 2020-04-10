<template>
	<view class="content-box">
		<view class="form" v-if="id==3">
			<form>
				<label class="call-box">
					<view class="call">公司简称</view>
					<input class="uni-input" name="realname" v-model="abbrevi_name" disabled="true" required="required"/>
				</label>
				<label class="call-box">
					<view class="call">公司名称</view>
					<input class="uni-input" name="realname" v-model="realname" disabled="true" required="required"/>
				</label>
				<!--<button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'>自动填入</button>-->
				<label class="call-box">
					<view class="call">统一社会信用代码</view>
					<input class="uni-input" name="id_card" v-model="cood" disabled="true" required="required"/>
				</label>
				
				<label class="call-box">
					<view class="call">法人姓名</view>
					<input class="uni-input" name="mobile" v-model="name" disabled="true" required="required"/>
				</label>
				<label class="call-box">
					<view class="call">法人身份证号码</view>
					<input class="uni-input" name="id_card" v-model="id_card" disabled="true" required="required"/>
				</label>
			</form>
		</view>
		<view class="form" v-else>
			<form>
				<label class="call-box">
					<view class="call">姓名</view>
					<input class="uni-input" name="realname" v-model="realShimingname" disabled="true"/>
				</label>
				<!--<button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'>自动填入</button>-->
				<label class="call-box">
					<view class="call">身份证号码</view>
					<input class="uni-input" name="id_card" v-model="card" disabled="true"/>
				</label>
			</form>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				ptoveInfo:{},
				abbrevi_name:'',
				realname:'',
				cood:'',
				name:'',
				id_card:'',
				id:'',
				realShimingname: '',
				card:'',
			}
		},
		onLoad(e) {
			this.id = e.id
			if(e.id==3){
				this.getPtoveInfo()
			}else if (e.id==2){
				this.getShimingInfo()
			}else {
				
			}
		},
		methods: {
			// 获取企业认证信息
			getPtoveInfo() {
				http.apiRequest({
					api: "/company_verified/getVerified",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							uni.setNavigationBarTitle({
								title: "企业认证信息"
							})
							this.abbrevi_name = res.data.detail.abbrevi_name
							this.realname = res.data.detail.company_name
							this.cood = res.data.detail.company_code
							this.name = res.data.detail.legal_person
							this.id_card = res.data.detail.legal_person_idcard
						}else {
							// uni.showToast({
							// 	title: res.msg
							// });
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			// 获取实名信息
			getShimingInfo() {
				http.apiRequest({
					api: "/verified/getVerified",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							uni.setNavigationBarTitle({
								title: "实名认证信息"
							})
							this.realShimingname = res.data.detail.realname
							this.card = res.data.detail.id_card
						}else {
							// uni.showToast({
							// 	title: res.msg
							// });
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		padding-top: 60upx;
	}
	.form {
		width: 100%;
		padding: 0upx 40upx 0;
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
		color: #999;
		/* font-weight: bold; */
		width: 350upx;
	}
</style>
