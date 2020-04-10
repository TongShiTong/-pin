<template>
	<view class="content-box">
		<view style="font-size: 46upx;color: #010101;text-align: center;margin-top: 60upx;">请选择您进入猎手聘的身份</view>
		<image src="/static/other/yourencai.png"></image>
		<view class="button1" @click="hunter()">我有人才</view>
		<view style="display: flex;align-items: center;justify-content: center;margin-top: 90upx;">
			<view style="width: 140upx;height: 1px;background: #E6E6E6;"></view>
			<view style="font-size: 40upx;color: #D6D6D6;margin: 0 32upx;font-weight: 400;">or</view>
			<view style="width: 140upx;height: 1px;background: #E6E6E6;"></view>
		</view>
		<image src="/static/other/zhaorencai.png"></image>
		<view class="button1" @click="enterprise()" style="margin-bottom: 80upx;">我要招人</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			// if(uni.getStorageSync("group_id")==2) {
			// 	this.hunter()
			// }else if(uni.getStorageSync("group_id")==3) {
			// 	this.enterprise()
			// }else {
				
			// }
		},
		methods: {
			enterprise () {
				http.apiRequest({
					api: "/user/setUserGroup",
					method: "GET",
					data: {
						groupid: 3
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							uni.setStorageSync("group_id",'3')
							uni.reLaunch({
								url: '/pages/index/index?typeid=3'
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
			},
			hunter () {
				http.apiRequest({
					api: "/user/setUserGroup",
					method: "GET",
					data: {
						groupid: 2
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							uni.setStorageSync("group_id",'2')
							uni.reLaunch({
								url: '/pages/index/index?typeid=5'
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
			},	
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		/* padding: 146upx 30upx 0;
		position: relative;
		background: url(../../static/other/denglu-bg-2.png) no-repeat bottom;
		background-size: 750upx 486upx; */
	}
	image {
		width: 380upx;
		height: 380upx;
		margin: 60upx 185upx 26upx;
	}
	.dian {
		width: 86upx;
		height: 8upx;
		background: #fff;
		position: relative;
		top: 52upx;
		left: 540upx;
	}
	.button1 {
		width: 300upx;
		height: 94upx;
		/* background: rgb(253,110,80) !important; */
		/* background: url(../../static/other/zhaoren.png) no-repeat; */
		/* background-size: 100% 100%; */
		background: #FF5A1F;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #fff;
		border-radius: 6upx;
		margin: 0 auto;
		box-shadow: 0 20upx 56upx #ffdcce;
		/* font-weight: bold ; */
	}
	
</style>
