<template>
	<view class="content-box">
		<view class="box">
			<view class="each">
				<view>充值方式</view>
			</view>
			<ul class="payWay">
				<li @tap="choosePayWay(1)" style="padding-bottom: 50upx; border-bottom: 1px solid #e6e6e6;">
					<view class="way">
						<img src="/static/zfb.png" >
						<view class="payTxt">
						  支付宝充值
						</view>
					</view>
					<view v-if="choose1"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
					<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li>
				<!-- <li @tap="choosePayWay(2)" style="padding-bottom: 50upx; border-bottom: 1px solid #e6e6e6;">
					<view class="way">
						<img src="/static/wx.png">
						<view class="payTxt">
						  微信充值
						</view>
					</view>
					<view v-if="choose2"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
					<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li> -->
			</ul>
			<view class="each1">
				<view>充值金额</view>
				<view class="jineshu">
					<span>￥</span> <input type="text" autofocus="autofocus" v-model="money"/>
				</view>
			</view>
		</view>
		<view class="btn" @tap="submit">确认充值</view>
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
				order:{},
			}
		},
		methods: {
			// 选择支付方式
			choosePayWay(index) {
				switch (index) {
					case 1:
					this.choose1=true
					this.choose2=false
					this.paytype = 'alipay'
					break;
					case 2:
					this.choose1=false
					this.choose2=true
					this.paytype = 'wxpay'
					break;
				}
			},
			submit() {
				http.apiRequest({
					api: "/order/rechargeOrder",
					method: "GET",
					data: {
						amount: this.money,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							// console.log(res)
							this.order=res.data.orderData.order
							location.href = http.baseUrl+'/pay/submit?type=' + this.paytype + '&order_id=' + this.order.id;
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
	background: #F5F5F5;
	padding-top: 60upx;
}
.each {
	padding-top: 50upx;
	padding-left: 40upx;
	padding-bottom: 10upx;
	font-size: 32upx;
	color: #666;
	margin-top: 20upx;
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
.box {
	width: 670upx;
	margin: 0 auto;
	padding-bottom: 50upx;
	background: #fff;
	border-radius:16upx;
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
.payWay li{display: flex;align-items: center;justify-content: space-between;height: 40upx;}
.payWay li img{width: 48upx;}
.payTxt{font-size: 34upx;color: #000;margin-left: 30upx;font-weight: bold;}
.way {
  	display: flex;
  	align-items: center;
  }
</style>
