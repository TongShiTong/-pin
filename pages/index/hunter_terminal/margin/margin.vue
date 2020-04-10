<template>
	<view class="content-box" v-if="userInfo.caution_status==1">
		<view class="box">
			<view class="each">
				<view>缴纳方式</view>
			</view>
			<ul class="payWay">
				<!-- <li @tap="choosePayWay(1)" style="margin-bottom: 40upx;">
					<view class="way">
						<img src="/static/zfb.png" >
						<view class="payTxt">
						  支付宝缴纳
						</view>
					</view>
					<view v-if="choose1"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
					<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li> -->
				
				<li @tap="choosePayway(index,key)" style="margin-bottom: 40upx;" v-for="(item,key,index) of payType" :key="key">
					<view class="way">
						<!-- <img src="/static/zfb.png" > -->
						<image :src="`/static/${key}.png`" ></image>
						<view class="payTxt">
						  {{item}}
						</view>
					</view>
					<view v-if="choose==index"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
					<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li>
				<!-- <li @tap="choosePayWay(2)" style="padding-bottom: 50upx; border-bottom: 1px solid #e6e6e6;">
					<view class="way">
						<img src="/static/wx.png">
						<view class="payTxt">
						  微信缴纳
						</view>
					</view>
					<view v-if="choose2"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
					<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li> -->
			</ul>
			<view class="each1">
				<view>缴纳金额</view>
				<view class="jineshu">
					<span>￥</span> <input type="text" v-model="marginAmount" disabled="true"/>
				</view>
			</view>
		</view>
		<view class="btn" @tap="submit">确认缴纳</view>
	</view>
	<view class="contents" v-else-if="userInfo.caution_status==2">
		<view class="caution-info">
			<view class="zongje">总金额(元)</view>
			<view class="jine">{{userInfo.caution_money}}</view>
			<view class="tix" @tap="tixian">提现</view>
		</view>
	</view>
	
	<view class="contents" v-else-if="userInfo.caution_status==3">
		<view class="caution-info">
			<view class="zongje">总金额(元)</view>
			<view class="jine">{{userInfo.caution_money}}</view>
			<view class="shenhe">提现审核中</view>
			<view class="tix1" @tap="qixiaotx">取消提现</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				money:'',
				paytype:'alipay',
				choose1: true,
				choose2: false,
				choose:1,
				order:{},
				userInfo:{},
				payType:{},
				marginAmount:''
			}
		},
		onLoad() {
			this.userInfoData()
			http.apiRequest({
				api: "/common/config",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						this.marginAmount = res.data.config.marginAmount
						this.payType = res.data.config.payType
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
		},
		methods: {
			// 选择支付方式
			// choosePayWay(index) {
			// 	switch (index) {
			// 		case 1:
			// 		this.choose1=true
			// 		this.choose2=false
			// 		this.paytype = 'alipay'
			// 		break;
			// 		case 2:
			// 		this.choose1=false
			// 		this.choose2=true
			// 		this.paytype = 'wxpay'
			// 		break;
			// 	}
			// },
			choosePayway(index,key) {
				console.log(this.userInfo)
				console.log(this.marginAmount)
				if(index==0) {
					if(parseInt(this.userInfo.money)<this.marginAmount) {
						uni.showToast({
							title: '余额不足，请选择其它支付方式！'
						});
					}else {
						this.choose = index
						this.paytype = key
					}
				}else {
					this.choose = index
					this.paytype = key
				}
			},
			userInfoData() {
				http.apiRequest({
					api: "/user/userinfo",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.userInfo=res.data
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
			// 提现转出
			tixian() {
				http.apiRequest({
					api: "/funds/depositWithdraw",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.userInfo.caution_status = 3
						}else {
							uni.showModal({
								title: '提示',
								confirmColor:'#FF5A1F',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
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
			// 取消转出
			qixiaotx() {
				this.userInfo.caution_status = 2
				http.apiRequest({
					api: "/funds/cancelDepositWithdraw",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
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
			submit() {
				http.apiRequest({
					api: "/order/marginOrder",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							// console.log(res)
							this.order=res.data.orderData.order
							if(this.paytype =='balancepay') {
								http.apiRequest({
									api: "/pay/balanceSubmit",
									method: "GET",
									data: {
										order_id: this.order.id,
									},
									secuss: (res, httpStatus) => {
										if (res.code == 1) {
											this.userInfo.caution_status = 2
											this.userInfo.caution_money = this.marginAmount
											// uni.showToast({
											// 	title: res.msg
											// });
											
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
							}else {
								location.href = http.baseUrl+'/pay/submit?type=' + this.paytype + '&order_id=' + this.order.id;
							}
						}else {
							uni.showToast({
								title: res.msg
							});
						}
					},
					// html: (html,htmlpstatus) => {
					// 	this.content = html
					// 	console.log(this.content)
					// },
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
	background: #F4F4F4;
	padding-top:60upx;
}
.contents {
	width: 100%;
	background: #fff;
	padding-top: 40upx;
}
.box {
	width: 670upx;
	height: 520upx;
	margin: 0 auto;
	background: #fff;
	border-radius:16upx;
}
.each {
	padding-top: 50upx;
	padding-left: 40upx;
	padding-bottom: 10upx;
	font-size: 32upx;
	color: #666;
	margin-top: 20upx;
}
.each1 {
	padding-top: 30upx;
	padding-left: 40upx;
	font-size: 32upx;
	color: #1A1A1A;
	font-weight: bold;
}
.jineshu {
	margin-top: 10upx;
	font-size: 60upx;
	color: #333;
	font-weight: bold;
	display: flex;
	align-items: center;
}
.jineshu input {
	font-size: 60upx;
	color: #333;
	font-weight: bold;
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
.payWay{background: #fff;padding:20upx 40upx;}
.payWay li{display: flex;align-items: center;justify-content: space-between; height: 40upx;}
.payWay li img{width: 48upx;}
.payWay li image{width: 48upx;height: 48upx;}
.payTxt{font-size: 34upx;color: #000;margin-left: 30upx;font-weight: bold;}
.way {
  	display: flex;
  	align-items: center;
  }
  .caution-info {
	  width: 670upx;
	  height: 600upx;
	  margin: 0 auto;
	  background: url(../../../../static/other/baozhengjin-diban.png) no-repeat;
	  background-size: 100% 100%;
	  margin-top: 20upx;
  }
  .zongje {
	  padding-top: 60upx;
	  padding-left: 60upx;
	  font-size: 24upx;
	  color: #999;
  }
  .jine {
	  padding-top: 90upx;
	  padding-left: 60upx;
	  font-size: 80upx;
	  color: #010101;
	  font-weight: bold;
  }
  .tix {
	  width: 440upx;
	  height: 94upx;
	  text-align: center;
	  line-height: 94upx;
	  margin: 0 auto;
	  margin-top: 150upx;
	  background: #FFE3D9;
	  color: #FF5A1F;
	  border-radius: 6upx;
  }
  .shenhe {
	padding-top: 30upx;
	padding-left: 60upx;
	color: #fc565b;
	font-size: 24upx;
  }
  .tix1 {
  	  width: 440upx;
  	  height: 94upx;
  	  text-align: center;
  	  line-height: 94upx;
  	  margin: 0 auto;
  	  margin-top: 90upx;
  	  background: #FF5A1F;
  	  color: #fff;
  	  border-radius: 6upx;
  }
</style>
