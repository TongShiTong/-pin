<template>
    <view class="content-box">
		<view class="welcome">
			<view>输入验证码</view>
			<view class="p-login">4位验证码已发送至 &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #1A1A1A;font-weight: bold;">{{mobile}}</span></view>
		</view>
        <view class="form">
        	<view>
        		<view class="uni-padding-wrap uni-common-mt">
        			<form @submit="formSubmit" @reset="formReset">
        				<view class="uni-form-item uni-column">
        					<input class="uni-input" type="number" name="captcha" v-model="captcha"/>
							<view id="chongx" :class="sendMsgBtnClass" @tap="sendMsg">{{sendMsgBtnText}}</view>
        				</view>
        				<view class="uni-btn-v">
        					<button class="yanzhengma" formType="submit">下一步</button>
        				</view>
        			</form>
        		</view>
        	</view>
        </view>
    </view>
</template>

<script>
	import http from '@/tools/utils/http.js'
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
				mobile: "",
				captcha: "",
				hasMobile:false,
				sendMsgBtnText: "重发短信验证码",
				sendMsgBtnClass: "button",
				isCountdown: false,
				isFormSubmit: false,
            }
        },
        computed: mapState(['forcedLogin']),
		onLoad(e) {
			let that = this
			this.mobile = e.mobile
			var countdownTimer = 60;
			var countdown = () => {
				countdownTimer--;
				if (countdownTimer > 0) {
					that.sendMsgBtnText = "(" + countdownTimer + ")秒后重新获取";
					that.sendMsgBtnClass = "button2";
					setTimeout(function() {
						countdown();
					}, 1000);
				} else {
					this.isCountdown = false;
					that.sendMsgBtnText = "重发短信验证码";
					that.sendMsgBtnClass = "button1";
				}
			}
			countdown();
		},
        methods: {
			formSubmit: function(e) {
				var that = this;
				var mobile = that.mobile;
				var captcha = that.captcha;
				if (this.isFormSubmit) {
					return;
				}
				if ((/^1[23456789]\d{9}$/.test(mobile)) && (/^\d{4}$/.test(captcha))) {
					console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value.mobile));
					this.isFormSubmit = true;
					http.apiRequest({
						api: "/user/mobilelogin",
						data: {
							mobile: mobile,
							captcha: captcha,
							invitcode: uni.getStorageSync("pid")
						},
						secuss: (res, httpStatus) => {
							this.isFormSubmit = false;
							if (res.code == "1") {
								console.log("绑定手机号成功");
								const token = res.data.userinfo.token
								const user_id = res.data.userinfo.user_id
								const group_id = res.data.userinfo.group_id
								const isVerified = res.data.userinfo.isVerified
								const isCompanyVerified = res.data.userinfo.isCompanyVerified
								const caution_status = res.data.userinfo.caution_status
								// console.log('999',res);
								uni.setStorageSync("user_id",user_id)
								uni.setStorageSync("token",token)
								uni.setStorageSync("group_id",group_id)
								uni.setStorageSync("isVerified",isVerified)
								uni.setStorageSync("isCompanyVerified",isCompanyVerified)
								uni.setStorageSync("caution_status",caution_status)
								uni.showToast({title:"手机号绑定成功",duration:1500});
								this.$store.state.footer_store.now_page_index=0
								if(uni.getStorageSync("group_id")==2) {
									uni.reLaunch({
										url: '/pages/index/index?typeid=5'
									});
								}else if(uni.getStorageSync("group_id")==3){
									uni.reLaunch({
										url: '/pages/index/index?typeid=3'
									});
								}else {
									uni.redirectTo({
										url: '/pages/choose_identity/choose_identity'
									});
								}
							} else {
								//短信发送失败
								uni.showToast({title:res.msg,duration:1500,icon:"none"});
								console.log("绑定手机号失败");
							}
						},
						error: (res, httpStatus) => {
							//接口调用失败，可能是网络故障，可能是接口报错
							this.isFormSubmit = false;
							console.log("接口调用失败，请检查网络");
						},
					});
				}
			
			},
			sendMsg(e) {
				var that = this;
				var mobile = that.mobile;
			
				if (this.isCountdown) {
					return;
				}
				if ((/^1[23456789]\d{9}$/.test(mobile))) {
					this.isCountdown = true;
					http.apiRequest({
						api: "/sms/send",
						data: {
							mobile: mobile,
							event: "mobilelogin",
						},
						secuss: (res, httpStatus) => {
							if (res.code == "1") {
								//短信发送成功，进入倒计时
								var countdownTimer = 60;
								var countdown = () => {
									countdownTimer--;
									if (countdownTimer > 0) {
										that.sendMsgBtnText = "(" + countdownTimer + ")秒后重新获取";
										that.sendMsgBtnClass = "button2";
										setTimeout(function() {
											countdown();
										}, 1000);
									} else {
										this.isCountdown = false;
										that.sendMsgBtnText = "发送验证码";
										that.sendMsgBtnClass = "button1";
									}
								}
								countdown();
								uni.navigateTo({
									url: '/pages/login/login_next/login_next?mobile=' + mobile,
								});
							} else {
								//短信发送失败
								this.isCountdown = false;
								uni.showToast({title:res.msg,duration:1500,icon:"none"});
								// console.log(res)
								console.log("短信验证码发送失败");
							}
						},
						error: (res, httpStatus) => {
							//接口调用失败，可能是网络故障，可能是接口报错
							this.isCountdown = false;
							console.log("接口调用失败，请检查网络");
						},
					});
				} else {
					console.log("请输入正确的是手机号");
				}
			}
        }
    }
</script>

<style>
	.content-box {
		width: 100%;
		position: relative;
		background: url(../../../static/other/denglu-bg-2.png) no-repeat bottom;
		background-size: 750upx 600upx;
	}
	.welcome {
		margin-top: 170upx;
		margin-left: 90upx;
		font-size: 60upx;
		color: #000;
		font-weight: bold;
		line-height: 1em;
	}
	.p-login {
		font-size: 26upx;
		color: #666;
		font-weight: 400;
		margin-top: 23upx;
		margin-bottom: 125upx;
		line-height: 1em;
	}
	.uni-form-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #E6E6E6;
		padding-bottom: 32upx;
		/* margin-bottom: 50upx; */
		width: 100%;
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
	.form {
		padding: 0 95upx;
		box-sizing: border-box;
		width: 100%;
	}
	.bl {
		padding-left: 30upx;
		padding-right: 106upx;
		font-size: 30upx;
		color: #666;
		font-weight: bold;
	}
	.uni-input {
		font-size: 32upx;
		text-align: center;
		width: 100%;
	}
	#chongx {
		font-size: 28upx;
		color: #FF5A1F;
		width: 370upx;
		text-align: right;
	}

	.yanzhengma {
		width: 400upx !important;
		height: 94upx !important;
		border-radius: 6upx !important;
		overflow: hidden !important;
		background: #FF5A1F !important;
		font-size: 36upx !important;
		color: #fff !important;
		line-height: 94upx !important;
		margin: 0 auto !important;
		text-align: center !important;
	}
	
	.uni-btn-v {
		margin-top: 286upx;
	}
</style>
