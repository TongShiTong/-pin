<template>
	<view class="payOrder">
		<view class="zhufuS">
			<view><image src="/static/other/zhifus.png"></image></view>
			<view style="font-size: 40upx; font-weight: bold;">
				支付成功
			</view>
		</view>
		<ul class="orderInfo">
			<!-- <li>
			   <h1>商品名称</h1>
			   <p>{{orderData.jobData.title}}</p>
			</li> -->
	
			<li>
			  <h1>订单编号</h1>
			  <p>{{order.orderNo}}</p>
			</li>
			
			<li>
			  <h1>支付金额</h1>
			  <p>￥{{order.amount}}</p>
			</li>
		</ul>
		<view style="height: 200upx;"></view>
		<view class="save-box">
			<view class="save" @tap="end">完成</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				orderid:'',	
				order:{},	
			}
		},
		onLoad(e) {
			this.orderid = e.orderid
			this.orders()
			// console.log(e)
		},
		methods: {
			orders() {
				http.apiRequest({
					api: "/order/getOrder",
					method: "GET",
					data: {
						order_id: this.orderid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.order = res.data.order
							// console.log(res)
						}else {
							uni.showToast({
								title: res.msg
							});
							this.orderData = res.data.orderData
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			end() {
				uni.reLaunch({
					url: '/pages/index/index?typeid=3'
				});
			}
		}
	}
</script>

<style>
.payOrder{
		width: 100%;
		background: #f2f2f2;
	}
	.zhufuS {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		margin-top: 22upx;
		margin-bottom: 20upx;
		padding: 40upx 0 40upx;
	}
	.zhufuS image {
		width: 68upx;
		height: 68upx;
	}
  .title{padding: 40upx;font-size: 30upx;color: #666;}
  .orderInfo{background: #fff;padding: 40upx;}
  .orderInfo li{display: flex;align-items: center;justify-content: space-between;padding: 30upx 0;border-bottom: 1upx solid #eee;}
  .orderInfo li:last-child{border-bottom: none;}
  .orderInfo li h1{font-size: 20upx;color: #666;}
  .orderInfo li p{font-size: 28upx;color: #999;}
  .payWay{background: #fff;padding:0 40upx;}
  .payWay li{display: flex;align-items: center;padding: 20upx 0;border-bottom: 1upx solid #eee;}
  .payWay li img{width: 68upx;}
  .payTxt{font-size: 30upx;color: #333;margin-left: 20upx;}
  .save-box {
  	width: 100%;
  	background: #ffffff;
  	position: fixed;
  	bottom: 0;
  	height: 160upx;
  	padding-top: 20upx;
  	display: flex;
  	justify-content: center;
  }
  .save {
	width: 500upx;
  	height: 94upx;
  	background: #FF5A1F;
  	font-size: 36upx;
  	color: #fff;
  	text-align: center;
  	line-height: 94upx;
  	border-radius: 6upx;
  }
</style>
