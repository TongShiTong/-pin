<template>
	<view class="content-box">
		<view class="add">填写银行卡信息</view>
		<view class="benren">请绑定持卡人本人的银行卡</view>
		<view class="box">
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>持卡人</view>
					<input type="text" placeholder="请输入真实姓名" v-model="name"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>身份证号</view>
					<input type="text" placeholder="请输入身份证号" @blur="yzCard" v-model="idcard"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>卡号</view>
					<input type="text" placeholder="请输入本人银行卡号" v-model="card"/>
				</label>
			</view>
			<!-- <view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>卡类型</view>
					<select class="select">
					  <option :value ="time.id" v-for="(time,index) in arr" :key="index">{{time.value}}</option>
					</select>
				</label>
			</view> -->
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>开户所属省</view>
					<input type="text" placeholder="请输入银行卡开户省" v-model="province"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>开户所属城市</view>
					<input type="text" placeholder="请输入银行卡开户城市" v-model="city"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>开户行</view>
					<input type="text" placeholder="请输入银行卡开户行" v-model="card_bank"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>所属银行</view>
					<input type="text" placeholder="请输入银行卡所属银行" v-model="bank"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>手机号</view>
					<input type="text" v-model="mobile" disabled="true"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box">
					<view>验证码</view>
					<input style="width: 200upx;" type="text" placeholder="请输入验证码" v-model="code"/>
					<span style="display: inline-block;background: #FF5A1F;color: #fff;padding: 15upx;font-size: 26upx;border-radius: 60upx;letter-spacing: 0;white-space: nowrap;" :class="sendMsgBtnClass" @tap="sendMsg">{{sendMsgBtnText}}</span>
				</label>
			</view>
			<view class="xieyi">
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" style="transform:scale(0.8)"/>同意猎手聘服务协议
					</label>
				</checkbox-group>
			</view>
		</view>
		<!-- <view style="height: 200upx;"></view> -->
		<view class="save-box">
			<view class="btn" @tap="bingding">绑定银行卡</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				arr:[
					{
						id:0,
						value:'储蓄卡',
					},
					{
						id:1,
						value:'信用卡',
					}
				],
				name:'',
				idcard:'',
				mobile:'',
				province:'',
				city:'',
				bank:'',
				card_bank:'',
				code:'',
				card:'',
				userInfo:{},
				sendMsgBtnText: "获取验证码",
				sendMsgBtnClass: "button",
				isCountdown: false
			}
		},
		onLoad(e) {
			console.log(e)
			this.userInfoData()
		},
		methods: {
			bingding() {
				http.apiRequest({
					api: "/funds/bankCard",
					method: "GET",
					data: {
						realname:this.name,
						id_card:this.idcard,
						card_pro: this.province,
						card_city: this.city,
						bank: this.bank,
						card_bank: this.card_bank,
						captcha: this.code,
						card_no: this.card
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							// console.log(res)
							// uni.navigateTo({
							// 	url: '/pages/index/hunter_terminal/user/bank_card/bank_card',
							// });
							uni.$emit('bangCard',{})
							uni.navigateBack({
								delta: 1
							})
							
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
			// 验证身份证
			yzCard(e) {
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(idcardReg.test(e.detail.value)) {
					// this.zqCard = false
				}else {
					// this.zqCard = true
					uni.showToast({title:"请输入正确的身份证号！",duration:1500});
				}
			},
			// 获取用户信息
			userInfoData() {
				http.apiRequest({
					api: "/user/userinfo",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.userInfo=res.data
							// this.name = this.realname.username
							this.mobile = this.userInfo.mobile
							console.log(res)
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
			// 获取验证码
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
							event: "bankcard",
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
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #fff;
}
.select {
	border: none;
	background: none;
	outline: none;
	font-size: 30upx;
	/* font-weight: bold; */
	color: #1A1A1A;
}
.select option {
	border: none;
	background: none;
	outline: none;
}
.add {
	font-size: 50upx;
	font-weight: bold;
	color: #1A1A1A;
	margin-left: 40upx;
	margin-top: 50upx;
	margin-bottom: 20upx;
}
.benren {
	font-size: 26upx;
	color: #999;
	margin-left: 40upx;
	margin-bottom: 94upx;
}
.each {
	background: #fff;
	margin-top: 16upx;
}
.workday {
	color: #FF5A1F;
}
.each-box {
	display: flex;
	/* justify-content: space-between; */
	align-items: center;
	margin: 0 40upx;
	font-size: 32upx;
	color: #1A1A1A;
	/* font-weight: bold; */
	height: 120upx;
}
.each-box view {
	width: 260upx;
}
.each-box input {
	text-align: left;
	width: 400upx;
}
.xieyi {
	font-size: 20upx;
	color: #666;
	margin-top: 20upx;
	margin-left: 40upx;
}
.save-box {
	width: 100%;
	background: #ffffff;
	position: relative;
	bottom: 0;
	height: 160upx;
	padding-top: 40upx;
	/* margin-left: -40upx; */
	display: flex;
	justify-content: center;
}
.btn {
	width: 400upx;
	height: 94upx;
	margin: 0 auto;
	background: #FF5A1F;
	font-size: 36upx;
	color: #fff;
	text-align: center;
	line-height: 94upx;
	border-radius: 6upx;
}
</style>
