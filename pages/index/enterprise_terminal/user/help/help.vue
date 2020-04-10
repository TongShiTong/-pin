<template>
	<view class="content-box">
		<!-- <view class="box">
			<view class="each">
				<view class="each-box">
					<view>意见反馈</view>
					<view>></view>
				</view>
			</view>
			<view class="ill">常见问题</view>
			<view class="each">
				<view class="each-box">
					<view>账号问题</view>
					<view>></view>
				</view>
			</view>
			<view class="each">
				<view class="each-box">
					<view>招聘信息问题</view>
					<view>></view>
				</view>
			</view>
			<view class="each">
				<view class="each-box">
					<view>赏金问题</view>
					<view>></view>
				</view>
			</view>
			<view class="each">
				<view class="each-box">
					<view>认证问题</view>
					<view>></view>
				</view>
			</view>
		</view> -->
		<view class="info-box" v-for="(item,index) in helpInfo" :key="index" @tap="openinfo" :data-itemid="item.id">
			<view class="info-title">Q：{{item.title}}</view>
			<view class="info-content">
				<rich-text class="rich" :nodes="item.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				helpInfo:[]
			}
		},
		onLoad() {
			this.helpInfoData()
		},
		methods: {
			helpInfoData() {
				http.apiRequest({
					api: "/help/index",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.helpInfo=res.data.rows
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
			//跳到帮助详情
			openinfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/help-detail/help-detail?itemid=' + itemId
				});
			},
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #F5F5F5;
	padding: 60upx 40upx 120upx;
}
.info-box {
	margin-top: 70upx;
}
.info-title {
	font-size: 34upx;
	color: #FF5A1F;
	font-weight: bold;
	margin-bottom: 20upx;
}
.info-content {
	font-size: 30upx;
	color: #333;
}
.rich {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.each {
	background: #fff;
}
.ill {
	font-size: 26upx;
	color: #666;
	margin: 53upx 0 20upx 40upx;
}
.each-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 40upx;
		font-size: 32upx;
		color: #1A1A1A;
		/* font-weight: bold; */
		height: 120upx;
	}
	.box {
		margin-top: 16upx;
	}
</style>
