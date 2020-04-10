<template>
	<view class="payOrder">
	  <!-- <h1 class="title">订单详情</h1> -->
		<view class="title1">{{orderData.jobData.title}}</view>
		<view class="wage">{{orderData.jobData.wage}}元/天</view>
		<view class="wage">{{orderData.jobData.total}}人</view>
		<view class="wage">{{orderData.jobData.days}}天</view>
		<view class="orderNo">订单编号：{{orderData.order.orderNo}}</view>
		<ul class="orderInfo">
			<li>
			   <h1>预计工资</h1>
			   <p>{{orderData.jobData.wage}}*{{orderData.jobData.total}}*{{orderData.jobData.days}}={{(orderData.jobData.wage*orderData.jobData.total*orderData.jobData.days).toFixed()}}</p>
			</li>
						
			<li>
			  <h1>预计赏金</h1>
			  <p>{{(orderData.jobData.wage*orderData.jobData.total*orderData.jobData.days).toFixed()}}*{{orderData.jobData.bounty_ratio}}%={{(orderData.jobData.wage*orderData.jobData.total*orderData.jobData.days*(orderData.jobData.bounty_ratio/100)).toFixed()}}</p>
			</li>
			<li>
			  <view style="font-size: 32upx;color: #1A1A1A;font-weight: bold;">总用工预算</view>
			  <p style="font-size: 36upx;color: #FF5A1F;font-weight: bold;">￥{{(orderData.jobData.wage*orderData.jobData.total*orderData.jobData.days*(1+orderData.jobData.bounty_ratio/100)).toFixed()}}</p>
			</li>
		</ul>

		<h1 class="title">选择支付方式</h1>
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
					api: "/order/partTimeDepositOrder",
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
	    }
	}
	
</script>

<style scoped>
	.payOrder{
		width: 100%;
		/* background: #f2f2f2; */
		background: #fff;
	}
  .title{text-align: left;padding: 40upx;font-size: 28upx;line-height: 1em; color: #666;font-weight: 400;}
  .title1 {
	  font-size: 50upx;
	  color: #000000;
	  font-weight: bold;
	  text-align: center;
	  margin-top: 113upx;
	  margin-bottom: 55upx;
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
	  color: #666;
	  text-align: center;
	  margin-top: -8upx;
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
	width: 440upx;
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
