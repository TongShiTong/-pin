<template>
	<view class="content-box">
		<view style="font-size: 36upx;color: #010101;font-weight: bold; text-align: center;margin-top: 180upx;" v-if="yonggong == '3'">您当前身份：企业</view>
		<view style="font-size: 36upx;color: #010101;font-weight: bold; text-align: center;margin-top: 180upx;" v-else>您当前身份：猎手</view>
		<view v-if="yonggong == '3'">
			<image src="/static/other/yourencai.png"></image>
			<view class="button1" @click="hunter()">切换至猎手</view>
		</view>
		
		<!-- <view style="display: flex;align-items: center;justify-content: center;margin-top: 90upx;">
			<view style="width: 140upx;height: 1px;background: #E6E6E6;"></view>
			<view style="font-size: 40upx;color: #D6D6D6;margin: 0 32upx;font-weight: 400;">or</view>
			<view style="width: 140upx;height: 1px;background: #E6E6E6;"></view>
		</view> -->
		<view v-else>
			<image src="/static/other/zhaorencai.png"></image>
			<view class="button1" @click="enterprise()" style="margin-bottom: 80upx;">切换至企业</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				yonggong:''
			};
		},
		onLoad(e) {
			console.log(e)
			this.yonggong = e.yonggong
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
							this.$store.state.footer_store.now_page_index=0
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
							this.$store.state.footer_store.now_page_index=0
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
		padding-top: 60upx;
		/* padding: 146upx 30upx 0;
		position: relative;
		background: url(../../static/other/denglu-bg-2.png) no-repeat bottom;
		background-size: 750upx 486upx; */
	}
	image {
		width: 380upx;
		height: 380upx;
		margin: 160upx 185upx 120upx;
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
		width: 440upx;
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
