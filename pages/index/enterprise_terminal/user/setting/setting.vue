<template>
	<view class="content-box">
		<view style="height: 60upx;"></view>
		<view class="form">
			<navigator url="/pages/userinfo/userinfo?qiye=1" hover-class="none" class="call-box">
				<view class="call">个人资料</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/Identity_switch/Identity_switch?yonggong=3" hover-class="none" class="call-box">
				<view class="call">身份切换</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/about/about" hover-class="none" class="call-box">
				<view class="call">关于猎手聘</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/protocol_box/protocol_box" hover-class="none" class="call-box">
				<view class="call">服务协议及隐私政策</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/index/enterprise_terminal/user/c_service/c_service" hover-class="none" class="call-box">
				<view class="call">联系方式</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/logout/logout" hover-class="none" class="call-box" style="border: none;">
				<view class="call">注销账号</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
		</view>
		<view @tap="loginOut">
			<view class="call1">退出登录</view>
			<!-- <view>></view> -->
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				typeid:'',
				realname: '',
				id_card:'',
				mobile:'',
				isFormSubmit: false,
			}
		},
		onLoad() {
			
		},
		methods: {
			formSubmit: function(e) {
			
				var that = this;
				var realname = that.realname;
				var id_card = that.id_card;
				if (this.isFormSubmit) {
					return;
				}
				this.isFormSubmit = true;
				http.apiRequest({
					api: "/verified/postVerified",
					method: "POST",
					data: {
						realname: realname,
						id_card: id_card,
						mobile: this.mobile
					},
					secuss: (res, httpStatus) => {
						this.isFormSubmit = false;
						if (res.code == "1") {
							uni.showToast({title:"身份认证成功",duration:1500});
							uni.reLaunch({
								url: '/pages/index/index?typeid=' + this.typeid
							});
						} else {
							//短信发送失败
							uni.showToast({title:res.msg,duration:1500,icon:"none"});
						}
					},
					error: (res, httpStatus) => {
						//接口调用失败，可能是网络故障，可能是接口报错
						this.isFormSubmit = false;
						console.log("接口调用失败，请检查网络");
					},
				});
			},
			loginOut() {
				http.apiRequest({
					api: "/user/logout",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == "1") {
							let token1 = ''
							uni.setStorageSync("token",token1)
							uni.reLaunch({
								url: '/pages/login/code_login'
							});
						} else {
							//短信发送失败
							uni.showToast({title:res.msg,duration:1500,icon:"none"});
						}
					},
					error: (res, httpStatus) => {
						//接口调用失败，可能是网络故障，可能是接口报错
						console.log("接口调用失败，请检查网络");
					},
				});
			}
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
