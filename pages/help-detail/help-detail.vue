<template>
	<view class="content-box">
		<view class="title">{{helpInfo.title}}</view>
		<view class="info-content">
			<rich-text class="rich" :nodes="helpInfo.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				itemid:'',
				helpInfo:{}
			}
		},
		onLoad(e) {
			this.itemid = e.itemid
			this.helpDetail()
		},
		methods: {
			helpDetail() {
				http.apiRequest({
					api: "/help/detail",
					method: "GET",
					data: {
						itemid: this.itemid
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.helpInfo=res.data
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
	padding: 60upx 40upx 0;
}
.title {
	line-height: 2em;
	font-weight: 700;
	font-size: 38upx;
	text-align: center;
	margin-top: 20upx;
}
.info-content {
	overflow: hidden;
	font-size: 30upx;
	margin-top: 30upx;
	margin-bottom: 30upx;
}
</style>
