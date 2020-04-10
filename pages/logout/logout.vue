<script>
	import chatInput from '@/components/chatinput.vue';
	import messageShow from '@/components/messageshow.vue';
	import http from '@/tools/utils/http.js'

	export default {
		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				scrollTop: 0,
				messages: [{
					user: 'home',
					type: 'head', //input,content 
					content: '你好!'
				}]
			}
		},
		components: {
			chatInput,
			messageShow
		},
		created: function () { 
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
		},
		methods: {
			getInputMessage: function (message) { //获取子组件的输入数据
				// console.log(message);
				this.addMessage('customer', message.content, false);
				this.toRobot(message.content);
			},
			logOut() {
				http.apiRequest({
					api: "/user/accountLogout",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							uni.showModal({
								title: '提示',
								confirmColor:'#FF5A1F',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.navigateBack({
											delta:1
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
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
			imTishi() {
				uni.navigateTo({
					url: '/pages/important_hint/important_hint'
				})
			},
			//打电话
			callPhone(e) {
				// console.log(e)
				var phone = e.currentTarget.dataset.ph
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			addMessage: function (user, content, hasSub, subcontent) {
				var that = this;
				that.messages.push({
					user: user,
					content: content,
					hasSub: hasSub,
					subcontent: subcontent
				});
			},
			scrollToBottom: function () {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();

				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function (rect) {
						// console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});

					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			},
			toRobot: function (info) {

				// this.addMessage('home', info, false);
				var apiUrl = 'http://www.tuling123.com/openapi/api';
				uni.request({
					url: apiUrl,
					data: {
						"key": 'acfbca724ea1b5db96d2eef88ce677dc',
						"info": info,
						"userid": 'uni-test'
					},
					success: (res) => {
						this.addMessage('home', res.data.text, false);
						this.scrollToBottom();
						console.log('request success:' + res.data.text);
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				});
			}
		}
	}
</script>
<template>
	<view class="uni-column">
		<view style="font-size: 66upx;font-weight: bold;">申请注销账号</view>
		<view style="font-size: 28upx;color: #666666;margin-bottom: 80upx;">您的账号如果注销，猎手聘将清理您账号的数据，包括且不限于下面的数据：</view>
		<view style="line-height: 2em;">
			<p>1.账号内相关的人才资料信息</p>
			<p>2.账号的资金流水信息</p>
			<p>3.发布的用人需求信息</p>
			<p>4.承接的用工任务信息</p>
			<p>5.工人的考勤信息</p>
			<p>6.账号正常登陆功能</p>
		</view>
		
		
		
		<!-- <view style="text-align: center;margin-top: 74upx;margin-bottom: 80upx;"><image style="width: 395upx; height: 530upx;" src="/static/kefu17.png"></image></view>
		<view style="display: flex;align-items: center;margin-left: 40upx;">
			<image style="width: 28upx; height: 28upx;margin-right: 20upx;" src="/static/tuoyuan.png"></image>
			<view>客服电话</view>
		</view>
		<view @tap="callPhone" data-ph="0571-86923275" style="font-size: 32upx;color: #FF5A1F;margin-top: 70upx;margin-bottom: 90upx;display: flex;justify-content: center;align-items: center;">
			<view><image style="width: 24upx;height: 29upx;margin-right: 13upx;" src="/static/call.png"></image></view>
			<view>0571-86923275</view>
		</view> -->
		<view style="width: 670upx;height: 92upx;border-radius: 6upx;text-align: center;margin: 0 auto;background: #FF5A1F;font-weight: 300;font-size: 32upx;color: #FFFFFF;line-height: 92upx;margin-top: 80upx;" @tap="logOut">
			申请注销
		</view>
		<view style="font-size: 30upx;color: #666666;text-align: center;margin-top: 20upx;">申请注销即代表已阅读并同意<span style="color: #FF5A1F;" @tap="imTishi">《重要提示》</span></view>
		<!-- <iframe src="https://chat-new.mqimg.com/widget/standalone.html?eid=186139" frameborder="0" id="myiframe" scrolling="no" style="width:100%;height:100%;"></iframe> -->
	</view>
</template>

<style>
	.uni-column {
		width: 100%;
		/* display: flex;
		flex-direction: column; */
		height: auto;
		/* background-color: #fff;
		height: 100%;
		font-size: 32upx;
		line-height: 1.6;
		 */
		margin: 60upx 40upx;
	}
	.content {

		display: flex;
		flex: 1;
		margin-bottom: 100upx;
		 
	}
	.foot {
		position: fixed;
		width: 100%;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>
