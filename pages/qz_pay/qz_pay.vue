<template>
	<view class="payOrder">
	  <!-- <h1 class="title">订单详情</h1> -->
		<view class="title1">{{orderData.jobData.title}}<span>{{orderData.jobData.salary}}</span></view>
		<view class="xuqiu-box">
		  <view class="qzshangjin">
			<view class="cszhi">{{orderData.jobData.bounty}}</view>
			<view class="csjs">赏金(元/人/月)</view>
		  </view>
		  <view class="qzrenshu">
			<view class="cszhi">{{orderData.jobData.total}}</view>
			<view class="csjs">需求人数(人)</view>
		  </view>
		</view>
		<view class="orderNo">订单编号：{{orderData.order.orderNo}}</view>
		<view class="orderInfo1">
			<view class="">
				预计总赏金
			</view>
			<view class="yjshangjin">
				{{orderData.jobData.bounty}}*{{orderData.jobData.total}}*3={{orderData.jobData.bounty*3*orderData.jobData.total}}
			</view>
		</view>
		<view class="wxts">
			<view class="jingg">
				<image style="width: 32upx;height: 32upx;margin-right: 15upx;" src="/static/jinggao.png"></image>
				<view>温馨提示</view>
			</view>
			<view>
				员工入职后，如果试用期内（15天）不合格，员工离职，企业有一次要求猎手无偿补员的机会。
			</view>
		</view>
		<h1 class="title">支付方式</h1>
	    <ul class="payWay">
			<li @tap="cepay" v-if="parseInt(orderData.userInfo.money)<parseInt(orderData.order.amount)">
				<view class="way">
					<img src="/static/yuezhifu.png" >
					<view class="payTxt" style="color: #aaa;">
					  余额支付<span style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{orderData.userInfo.money}}）</span>
					</view>
				</view>
				<view><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
			</li>
			<li @tap="choosePayWay(3)" v-else>
				<view class="way">
					<img src="/static/yuezhifu.png" >
					<view class="payTxt">
					  余额支付<span style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{orderData.userInfo.money}}）</span>
					</view>
				</view>
				<view v-if="choose3"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
				<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
			</li>
			<li @tap="choosePayWay(1)">
				<view class="way">
					<img src="/static/zhifubaozhifu.png" >
					<view class="payTxt">
					  支付宝支付
					</view>
				</view>
				<view v-if="choose1"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
				<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
			</li>
			<!-- <li @tap="choosePayWay(2)">
				<view class="way">
					<img src="/static/weixinzhifu.png">
					<view class="payTxt">
					  微信支付
					</view>
				</view>
				<view v-if="choose2"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
				<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
			</li> -->
		</ul>
		<view style="height: 200upx;"></view>
		<view class="save-box">
			<view class="info">需支付预算总金额的{{orderData.jobData.prepaymentRatio}}%的订金</view>
			<view class="save" @tap="submit">￥{{orderData.order.amount}} 支付定金</view>
		</view>
		
		<!-- <view class="article-content">
			<rich-text :nodes="content"></rich-text>
		</view> -->
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
	    data() {
	        return {
				itemid:'',
				// content: '',
				orderData:{
					jobData:{},
					order:{},
					userInfo:{}
				},
				paytype:'alipay',
				choose1: true,
				choose2: false,
				choose3: false
	        }
	    },
		onLoad(e) {
			this.itemid = e.itemid
			// console.log(e)
			this.order()
		},
	    methods: {
			// 选择支付方式
			choosePayWay(index) {
				switch (index) {
					case 1:
					this.choose1=true
					this.choose2=false
					this.choose3=false
					this.paytype = 'alipay'
					break;
					case 2:
					this.choose1=false
					this.choose2=true
					this.choose3=false
					this.paytype = 'wxpay'
					break;
					case 3:
					this.choose1=false
					this.choose2=false
					this.choose3=true
					this.paytype = 'balancepay'
					break;
				}
			},
			cepay() {
				uni.showToast({
					title: '余额不足，请选择其他支付方式！'
				});
			},
			submit() {
				// console.log(123)
				if(this.paytype =='balancepay') {
					http.apiRequest({
						api: "/pay/balanceSubmit",
						method: "GET",
						data: {
							order_id: this.orderData.order.id,
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								uni.showToast({
									title: res.msg
								});
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/pay_result/pay_result?orderid=' + this.orderData.order.id
									});
								},500)
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
				}else {
					location.href = http.baseUrl+'/pay/submit?type=' + this.paytype + '&order_id=' + this.orderData.order.id;
				}
			},
			order() {
				http.apiRequest({
					api: "/order/fullTimeDepositOrder",
					method: "GET",
					data: {
						jobs_id: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							// uni.showToast({
							// 	title: res.msg
							// });
							this.orderData = res.data.orderData
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
	    }
	}
	
</script>

<style scoped>
	.payOrder{
		width: 100%;
		/* background: #f2f2f2; */
		background: #fff;
	}
  .title{text-align: left;padding: 40upx;line-height: 1em; font-size: 28upx;color: #666;font-weight: 400;}
  .title1 {
	  font-size: 44upx;
	  color: #000000;
	  font-weight: bold;
	  text-align: center;
	  margin-top: 113upx;
	  margin-bottom: 55upx;
  }
  .title1 span {
	  font-size: 40upx;
	  margin-left: 25upx;
  }
  .xuqiu-box {
  		 display: flex;
  		 justify-content: center;
  		 align-items: center;
  		 margin-bottom: 60upx;
  }
  .cszhi {
  		 font-size: 36upx;
  		 font-weight: bold;
  		 color: #000000;
  		 line-height: 1em;
  		 margin-bottom: 32upx;
  }
  .csjs {
  		 font-weight: 500;
  		 font-size: 28upx;
  		 color: #666666;
  }
  .qzshangjin {
  		 text-align: center;
  		 margin-right: 86upx;
  }
  .qzrenshu {
  		 text-align: center;
  }
  .wage {
	  font-size: 34upx;
	  color: #1A1A1A;
	  font-weight: bold;
	  margin-bottom: 26upx;
	  text-align: center;
  }
  .orderNo{
	  font-size: 22upx;
	  color: #999;
	  text-align: center;
	  margin-bottom: 80upx;
  }
  .payway {
	  display: flex;
	  align-items: center;
	  justify-content: space-between
  }
  .way {
	  display: flex;
	  align-items: center;
  }
 .orderInfo{background: #fff;padding: 0 40upx;}
 .orderInfo1 {
 	display: flex;
 	justify-content: space-between;
 	align-items: center;
 	font-size: 28upx;
 	font-weight: 500;
 	color: #000000;
 	line-height: 1em;
 	padding: 60upx 0upx;
 	margin: 0 40upx;
 	border-top: 1upx solid #E6E6E6;
 }
 .yjshangjin {
 	font-size: 32upx;
 	font-weight: bold;
 }
 .wxts {
 	width: 670upx;
 	height: 166upx;
 	background: #F7F7F7;
 	margin: 0 auto 20upx;
 	padding: 30upx;
 	font-size: 22upx;
 	color: #999999;
 	font-weight: 500;
 	box-sizing: border-box;
 	border-radius:4upx;
 }
 .jingg {
 	display: flex;
 	align-items: center;
 	font-size: 24upx;
 	color: #F54336;
 	margin-bottom: 22upx;
 }
  .orderInfo li{display: flex;align-items: center;justify-content: space-between;margin-bottom: 40upx;}
  .orderInfo li h1{font-size: 32upx;color: #666;font-weight: 400;}
  .orderInfo li p{font-size: 34upx;color: #000;font-weight: bold;}
  .info {
	  color: #666;
	  font-size: 20upx;
	  text-align: center;
	  margin-bottom: 15upx;
  }
  .payWay{background: #fff;padding:0 40upx;}
  .payWay li{display: flex;align-items: center;justify-content: space-between;margin-bottom: 40upx;height: 40upx}
  .payWay li img{width: 48upx;}
  .payTxt{font-size: 34upx;color: #000;margin-left: 30upx;}
 /* .buyBtn{width: calc(100% - 52upx);margin: 60upx auto 0 auto;background: #FF5A1F;text-align: center;color: #fff;height: 94upx;line-height:94upx;
  font-size: 34upx;} */
  .save-box {
  	width: 100%;
  	background: #ffffff;
  	position: fixed;
  	bottom: 0;
  	height: 200upx;
  	padding-top: 20upx;
  /* 	display: flex;
  	justify-content: center; */
  }
  .save {
	width: 670upx;
  	height: 94upx;
	margin: 0 auto;
  	background: #FF5A1F;
	/* padding: 0 96upx; */
  	font-size: 36upx;
  	color: #fff;
  	text-align: center;
  	line-height: 94upx;
  	border-radius: 6upx;
  }
</style>
