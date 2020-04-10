<template>
	<view class="content-box">
		<!-- <navigator url="/pages/withdraw_status/withdraw_status" class="source" hover-class="none">是否提现成功列表</navigator> -->
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
			<view>提现</view>
			<navigator url="/pages/withdraw_status/withdraw_status" class="source" hover-class="none">提现明细</navigator>
		</view>
		<view class="box">
			<view v-if="userInfo.isBankCard==0" @tap="addCard" class="card">
				<view>添加银行卡</view>
				<view class="back"></view>
			</view>
			<view class="each" v-else>
				<view class="each-box">
					<view style="width: 200upx;color: #1A1A1A;">银行卡</view>
					<view>{{backInfo.bank}}</view>
				</view>
			</view>
			<view class="each">
				<view class="each-box" style="padding-top: 63upx;">
					<view style="width: 200upx;color: #1A1A1A;font-weight: bold;">提现金额</view>
				</view>
				<view class="input">
					<span>￥</span><input id="input" autofocus="autofocus" type="text" v-model="amount"/>
				</view>
			</view>
		</view>
		<view class="each1">
			<view>可提现金额{{userInfo.money}}元</view>
			<view class="workday">1-2个工作日内到账</view>
		</view>
		<view class="btn" @tap="submit">提现</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				amount:'',
				userInfo:{},
				backInfo: {},
			}
		},
		onLoad() {
			this.userInfoData()
			this.backInfoData()
			uni.$on('bangCard',()=>{
				this.userInfoData()
				this.backInfoData()
			})
		},
		methods: {
			addCard() {
				uni.navigateTo({
					url: '/pages/back_info/back_info',
				});
			},
			back() {
				history.back()
			},
			submit() {
				if(this.userInfo.isBankCard==0) {
					uni.showModal({
					    title: '提示',
						confirmColor:'#FF5A1F',
					    content: '请先绑定银行卡！',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url:'/pages/back_info/back_info'
					            });
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else {
					http.apiRequest({
						api: "/funds/withdraw",
						method: "GET",
						data: {
							amount: this.amount,
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								uni.navigateTo({
									url: '/pages/withdraw_status/withdraw_status',
								});
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
				}
			},
			// 获取银行卡信息
			backInfoData() {
				http.apiRequest({
					api: "/funds/getBankCard",
					method: "GET",
					data: {
					
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.backInfo=res.data.bankCard
							// console.log("aaa",res)
						}else {
							// console.log("bbb",res)
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
			userInfoData() {
				http.apiRequest({
					api: "/user/userinfo",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.userInfo=res.data
							// console.log(res)
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
			},	
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #F5F5F5;
}
.hader {
	margin: 67upx 40upx 47upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 36upx;
	color: #1A1A1A;
	font-weight: bold;
}
.source {
	font-size: 28upx;
	color: #333;
	font-weight: 400;
}
.box {
	width: 670upx;
	height: 300upx;
	margin: 0 auto;
	background: #fff;
	border-radius: 16upx;
}
.each {
	/* background: #fff; */
	
}
.back:after {
    content: " ";
    display: inline-block;
    height: 12upx;
    width: 12upx;
    border-width: 1upx 1upx 0 0;
    border-color: #ccc;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	margin-left: 24upx;
	margin-bottom: 6upx;
}

.input {
	margin: 0 40upx;
	margin-top: 10upx;
	display: flex;
	align-items: center;
	font-size: 60upx;
	color: #333;
	font-weight: bold;
}
#input {
	font-size: 60upx;
}
.each1 {
	display: flex;
	justify-content: space-between;
	margin: 16upx 40upx 0;
	font-size: 24upx;
	color: #999;
}
.workday {
	color: #FF5A1F;
}
.each-box {
	display: flex;
	align-items: center;
	margin: 0upx 40upx;
	padding-top: 50upx;
	font-size: 32upx;
	color: #666;
	/* font-weight: bold; */
	/* height: 120upx; */
}
.card {
	text-align: center;
	font-size: 32upx;
	color: #666;
	padding-top: 50upx;
	display: flex;
	justify-content: center;
	align-items: center;
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
