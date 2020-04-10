<template>
	<view class="content-box">
		<view style="height: 60upx;"></view>
		<view class="form">
			<navigator url="/pages/protocol/protocol?prot=1" hover-class="none" class="call-box">
				<view class="call">用户注册协议</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/protocol/protocol?prot=2" hover-class="none" class="call-box" style="border: none;">
				<view class="call">用户隐私政策</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		background: #F7F7F7;
	}
	.form {
		width: 100%;
		padding: 0upx 40upx 0;
		box-sizing: border-box;
		background: #fff;
	}
	.call-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.call-box image {
		width: 24upx;
		height: 24upx;
	}
	.call {
		font-size: 32upx;
		color: #1A1A1A;
		/* width: 210upx; */
	}
	.uni-input {
		font-size: 30upx;
		color: #333;
		font-weight: bold;
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
	.call1 {
		margin-top: 16upx;
		width: 750upx;
		height: 94upx;
		font-size: 32upx;
		line-height: 94upx;
		text-align: center;
		background: #FFF;
		color: #FF5A1F;
	}
</style>
