<template>
	<view class="content-box">
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
			<view>我的钱包</view>
			<navigator url="/pages/index/hunter_terminal/source/source" class="source" hover-class="none">资金明细</navigator>
		</view>
		<view class="logo"><image src="/static/user/qianbao.png"></image></view>
		<view class="many">{{userInfo.money}}</view>
		<view class="many-in">账号余额(元)</view>
		<navigator url="/pages/index/enterprise_terminal/withdraw/withdraw" class="btn1">提现</navigator>
		<navigator url="/pages/index/enterprise_terminal/recharge/recharge" class="btn">充值</navigator>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onLoad() {
			this.userInfoData()
		},
		
		// mounted(){
		//   if (window.history && window.history.pushState) {
		//     history.pushState(null, null, document.URL);
		//     window.addEventListener('popstate',this.fun, false);//false阻止默认事件
		//   }
		// },
		// destroyed(){
		//   window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
		// },
		methods: {
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
			back() {
				/* uni.navigateBack({
					delta:1
				}) */
				history.back()
			}
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	text-align: center;
}
.hader {
	margin: 67upx 40upx 27upx;
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
.logo {
	width: 198upx;
	height: 198upx;
	margin: 248upx auto 42upx;
}
.logo image {
	width: 100%;
	height: 100%;
}
.many {
	font-size: 80upx;
	color: #010101;
	font-weight: bold;
	margin-bottom: 36upx;
}
.many-in {
	font-size: 24upx;
	/* font-weight: bold; */
	color: #999;
}
.btn1 {
	margin: 0 auto;
	margin-top: 132upx;
	width: 400upx;
	height: 94upx;
	background: #FFE3D9;
	text-align: center;
	line-height: 94upx;
	font-size: 36upx;
	color: #FF5A1F;
	border-radius: 6upx;
}
.btn {
	margin: 0 auto;
	margin-top: 56upx;
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
