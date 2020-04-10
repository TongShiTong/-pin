<script>
	import chatInput from '@/components/chatinput.vue';
	import messageShow from '@/components/messageshow.vue';

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
			//打电话
			callPhone(e) {
				// console.log(e)
				var phone = e.currentTarget.dataset.ph
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			// changeFrameHeight(){
			//     var ifm= document.getElementById("iframepage"); 
			//     ifm.height=document.documentElement.clientHeight;
			// },
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
		<!-- <view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview"   scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true"
			    :scroll-top="scrollTop">
				<message-show v-for="(message,index) in messages" :key="index" v-bind:message="message" :id="index"></message-show>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<view class="foot">
			<chat-input @send-message="getInputMessage" ></chat-input>
		</view> -->
		
		
		<!-- <view style="text-align: center;margin-top: 74upx;margin-bottom: 80upx;"><image style="width: 395upx; height: 530upx;" src="/static/kefu17.png"></image></view>
		<view style="display: flex;align-items: center;margin-left: 40upx;">
			<image style="width: 28upx; height: 28upx;margin-right: 20upx;" src="/static/tuoyuan.png"></image>
			<view>客服电话</view>
		</view>
		<view @tap="callPhone" data-ph="0571-86923275" style="font-size: 32upx;color: #FF5A1F;margin-top: 70upx;margin-bottom: 90upx;display: flex;justify-content: center;align-items: center;">
			<view><image style="width: 24upx;height: 29upx;margin-right: 13upx;" src="/static/call.png"></image></view>
			<view>0571-86923275</view>
		</view>
		<view style="display: flex;align-items: center;margin-left: 40upx;">
			<image style="width: 28upx; height: 28upx;margin-right: 20upx;" src="/static/tuoyuan.png"></image>
			<view>工作时间</view>
		</view>
		<view style="font-size: 36upx;color: #666666;text-align: center;margin-top: 70upx;">
			<p>周一至周五</p>
			<p>9:00-17:00</p>
		</view> -->
		<iframe src="https://chat-new.mqimg.com/widget/standalone.html?eid=186139" frameborder="0" id="myiframe" scrolling="no" style="width:100%;height:100%;"></iframe>
	</view>
</template>

<style>
	.uni-column {
		width: 100%;
		/* display: flex;
		flex-direction: column; */
		/* min-height: 100%; */
		/* background-color: #fff; */
		height: auto;
		/* font-size: 32upx;
		line-height: 1.6; */
		/* margin-top: 40upx; */
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
