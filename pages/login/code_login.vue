<template>
    <view class="content-box">
		<view class="huodong">
			<image src="/static/index/hongbao-tishi.png"></image>
		</view>
		<view class="welcome">
			<view>Hi~</view>
			<view class="come">欢迎来到猎手聘</view>
			<view class="p-login">为了您更好的体验，请登录</view>
		</view>
        <view class="form">
        	<view>
        		<view class="uni-padding-wrap uni-common-mt">
        			<form @submit="formSubmit" @reset="formReset">
        				<view class="uni-form-item uni-column">
							<view class="bl">+86</view>
        					<input class="uni-input" type="number" name="mobile" v-model="mobile" placeholder="请输入您的手机号" />
        					<!--<button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'>自动填入</button>-->
        				</view>
						<view style="font-size: 22upx; color: #999;text-align: left;">
                            进入猎手聘即代表你同意<span style="color: #666;" @tap="userProtocol">《猎手聘用户协议》</span>
							及<span style="color: #666;" @tap="privacyProtocol">《猎手聘隐私协议》</span>
                        </view>
						<!-- 用户协议 -->
						<uni-popup ref="popupUser" type="center">
							<view class="info-content">
								<rich-text class="rich" :nodes="protocolInfo"></rich-text>
							</view>
						</uni-popup>
						<!-- 隐私协议 -->
						<uni-popup ref="popupPrivacy" type="center">
							<view class="info-content">
								<rich-text class="rich" :nodes="protocolInfo1"></rich-text>
							</view>
						</uni-popup>
        				<!-- <view class="uni-form-item uni-column yanzhengma"> -->
        					<!-- <input class="uni-input" name="captcha" v-model="captcha" placeholder="验证码" /> -->
        				<view id="yanzhengma" :class="sendMsgBtnClass" @tap="sendMsg">{{sendMsgBtnText}}</view>
        				<!-- </view> -->
        				<!-- <view class="uni-btn-v">
        					<button class="btn" formType="submit">绑定手机号</button>
        				</view> -->
        			</form>
        		</view>
        	</view>
        </view>
	<!-- <navigator url="../choose_identity/choose_identity">跳过验证</navigator>
		<navigator url="./login_next/login_next">去验证码</navigator> -->
       <!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
            <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                <image :src="provider.image" @tap="oauth(provider.value)"></image>
            </view>
        </view> -->
		<!-- <view class="footer"></view> -->
    </view>
</template>

<script>
    import service from '../../service.js';
	import http from '@/tools/utils/http.js'
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mInput from '../../components/m-input.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
    export default {
        components: {
            mInput,
			uniPopup
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                positionTop: 0,
				mobile: "",
				captcha: "",
				hasMobile:false,
				sendMsgBtnText: "获取验证码",
				sendMsgBtnClass: "button",
				isCountdown: false,
				isFormSubmit: false,
				protocolInfo:'',
				protocolInfo1:''
            }
        },
        computed: mapState(['forcedLogin']),
		onLoad(e) {
			// console.log(uni.getStorageSync("token"))
			if(uni.getStorageSync("token")!='') {
				if(uni.getStorageSync("group_id")==2) {
					uni.reLaunch({
						url: '/pages/index/index?typeid=5'
					});
				}
				if(uni.getStorageSync("group_id")==3) {
					uni.reLaunch({
						url: '/pages/index/index?typeid=3'
					});
				}
			}else{
			
			}
			// console.log(e)
		},
		// onShow: function() {
		// 	//页面打开执行分享监听
		// 	if(openid !=null){
		// 		this.$api.share('url','image','title','content');
		// 	}
		// },
        methods: {
            ...mapMutations(['login']),
            initProvider() {
                const filters = ['weixin', 'qq', 'sinaweibo'];
                uni.getProvider({
                    service: 'oauth',
                    success: (res) => {
                        if (res.provider && res.provider.length) {
                            for (let i = 0; i < res.provider.length; i++) {
                                if (~filters.indexOf(res.provider[i])) {
                                    this.providerList.push({
                                        value: res.provider[i],
                                        image: '../../static/img/' + res.provider[i] + '.png'
                                    });
                                }
                            }
                            this.hasProvider = true;
                        }
                    },
                    fail: (err) => {
                        console.error('获取服务供应商失败：' + JSON.stringify(err));
                    }
                });
            },
			
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
						},
						secuss: (res, httpStatus) => {
							this.isFormSubmit = false;
							if (res.code == "1") {
								console.log("绑定手机号成功");
								const token = res.data.userinfo.token
								// console.log(res);
								uni.setStorageSync("token",token)
								uni.showToast({title:"手机号绑定成功",duration:1500});
								uni.navigateTo({
									url: '/pages/choose_identity/choose_identity',
								});
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
			// 用户协议
			userProtocol() {
				uni.navigateTo({
					url: '/pages/protocol/protocol?prot=1',
				});
				// this.$refs.popupUser.open()
			},
			// 隐私协议
			privacyProtocol() {
				uni.navigateTo({
					url: '/pages/protocol/protocol?prot=2',
				});
				// this.$refs.popupPrivacy.open()
			},
			protocolDetail() {
				http.apiRequest({
					api: "/common/agreement",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.protocolInfo=res.data.config.reg_agreement
							this.protocolInfo1=res.data.config.privacy_agreement
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
										that.sendMsgBtnText = "(" + countdownTimer + ")秒后重新发送";
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
			},
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    account: this.account,
                    password: this.password
                };
                const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                });
                if (validUser) {
                    this.toMain(this.account);
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '用户账号或密码不正确',
                    });
                }
            },
            oauth(value) {
                uni.login({
                    provider: value,
                    success: (res) => {
                        uni.getUserInfo({
                            provider: value,
                            success: (infoRes) => {
                                /**
                                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                                 */
                                this.toMain(infoRes.userInfo.nickName);
                            }
                        });
                    },
                    fail: (err) => {
                        console.error('授权登录失败：' + JSON.stringify(err));
                    }
                });
            },
            toMain(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../main/main',
                    });
                } else {
                    uni.navigateBack();
                }

            }
        },
        onReady() {
            this.initPosition();
            this.initProvider();
			this.protocolDetail();
        }
    }
</script>

<style>
	.content-box {
		width: 100%;
		position: relative;
		background: url(../../static/other/denglu-bg-2.png) no-repeat bottom;
		background-size: 750upx 420upx;
	}

	.welcome {
		margin-top: 290upx;
		margin-left: 50upx;
		padding-top: 50upx;
		font-size: 60upx;
		color: #000;
		font-weight: bold;
		line-height: 1em;
		background: url(../../static/other/denglu-bg.png) no-repeat right;
		background-size: 324upx 476upx;
	}
	.come {
		padding-top: 38upx;
		padding-bottom: 25upx;
	}
	.p-login {
		font-size: 24upx;
		color: #666;
		font-weight: 400;
		padding-bottom: 170upx;
		line-height: 1em;
	}
	.uni-form-item {
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #E6E6E6;
		padding-bottom: 30upx;
		margin-bottom: 40upx;
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
		padding: 0 50upx;
		box-sizing: border-box;
		width: 100%;
	}
	.bl {
		/* padding-left: 30upx; */
		padding-right: 96upx;
		font-size: 34upx;
		color: #1A1A1A;
		font-weight: bold;
	}
	.uni-input {
		font-size: 32upx;
	}
	.btn {
		width: 520upx;
		height: 88upx;
		font-size: 38upx;
		color: #fff;
		background: #DB2311;
		line-height: 88upx;
		border-radius: 6upx;
		text-align: center;
		margin-top: 80upx;
	}
	#yanzhengma {
		width: 400upx;
		height: 94upx;
		border-radius: 6upx;
		overflow: hidden;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		line-height: 94upx;
		margin: 0 auto;
		text-align: center;
		margin-top: 175upx;
	}
	.huodong {
		width: 750upx;
		height: 280upx;
		position: absolute;
		top: 0;
	}
	.huodong image {
		width: 100%;
		height: 100%;
	}
</style>
