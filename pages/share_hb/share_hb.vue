<template>
	<view class="content-box">
		<view class="tuceng"></view>
		<view @tap="goRegister" class="zhuce">
			<view class="zc">立即注册</view>
		</view>
		<view class="tuceng3">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:''
			}
		},
		onLoad(e) {
			console.log(e)
			this.userid = e.userid
		},
		methods: {
			goRegister() {
				uni.reLaunch({
					url: '/pages/login/invite_login?userid=' + this.userid
				});
			}
		}
	}
</script>

<style>
.content-box {
	width: 100%;
}
.tuceng {
	width: 750upx;
	height: 716upx;
	background: url(../../static/tuceng1.png) no-repeat;
	background-size: 100% 100%;
}
.zc {
	width: 560upx;
	height: 94upx;
	font-size: 36upx;
	color: #FF5A1F;
	background: #fff;
	font-weight: bold;
	text-align: center;
	line-height: 94upx;
	margin: 0 auto;
}
.zhuce {
	width: 750upx;
	height: 1066upx;
	background: url(../../static/tuceng2.png) no-repeat;
	background-size: 100% 100%;
}
.tuceng3 {
	width: 750upx;
	height: 1248upx;
	background: url(../../static/tuceng3.png) no-repeat;
	background-size: 100% 100%;
}
</style>
