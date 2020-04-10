<template>
	<view class="content-box">
		<view class="info-content">
			<rich-text class="rich" :nodes="protocolInfo"></rich-text>
		</view>
		<view class="banquan">
			<p>Copyright©2019-2020</p>
			<p>杭州九之信息技术有限公司版权所有</p>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				protocolInfo:'',
				type:'',
			}
		},
		onLoad(e) {
			console.log(e)
			this.type = e.prot
			this.protocolDetail();
			if(e.prot==1) {
				uni.setNavigationBarTitle({
					title: '猎手聘用户协议'
				})
			}else if(e.prot==2) {
				uni.setNavigationBarTitle({
					title: '猎手聘隐私协议'
				})
			}else {
				
			}
		},
		methods: {
			protocolDetail() {
				http.apiRequest({
					api: "/common/agreement",
					method: "GET",
					data: {
						type:this.type
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.protocolInfo=res.data.config.reg_agreement
							// console.log(res)
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
		},
	}
</script>

<style>
.content-box {
	width: 100%;
	padding-top: 60upx;
	margin: 0 40upx;
}
.banquan {
	font-size: 24upx;
	color: #999;
	text-align: center;
	margin-top: 50upx;
	margin-bottom: 120upx;
}
</style>
