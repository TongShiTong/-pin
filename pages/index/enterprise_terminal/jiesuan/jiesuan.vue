<template>
	<view class="payOrder">
	  <!-- <h1 class="title">订单详情</h1> -->
		<!-- <view class="title1"><span style="font-size: 46upx;font-weight: 400;">￥</span>{{orderData.order.amount}}</view>
		<view class="orderNo">订单编号：{{orderData.order.orderNo}}</view> -->

        <view class="gs_info">
			<view class="gs_name">{{detail.title}}</view>
			<view class="xiangqing">
				<view class="xq_mz">
					<view class="sj">赏金</view>
					<view>(人/月)</view>
				</view>
				<view class="shuju">￥{{detail.jobData.bounty}}</view>
			</view>
			<view class="xiangqing">
				<view class="xq_mz">
					<view class="sj">需求人数</view>
					<view>(人)</view>
				</view>
				<view class="shuju1">{{detail.total}}</view>
			</view>
			<view class="xiangqing">
				<view class="xq_mz">
					<view class="sj">在职人数</view>
					<view>(人)</view>
				</view>
				<view class="shuju1">{{qingdan.settlement_count_1}}</view>
			</view>
			<view class="xiangqing">
				<view class="xq_mz">
					<view class="sj">离职人数</view>
					<view>(人)</view>
				</view>
				<view class="shuju1">{{qingdan.settlement_count_3}}</view>
			</view>
			<view class="xiangqing1">
				<view class="xq_mz">
					<view class="sj">已补员人数</view>
					<view>(人)</view>
				</view>
				<view class="shuju1">{{qingdan.settlement_count_4}}</view>
			</view>
			<!-- <view class="xiangqing1">
				<view class="xq_mz">
					<view class="sj">订单编号</view>
				</view>
				<view class="shuju1" style="font-weight: 500;">{{orderData.order.orderNo}}</view>
			</view> -->
			<!-- <view class="ck_gd" @tap="ckGduo">
				<view>查看更多</view>
				<image :class="{img:isckgd}" src="/static/xxia.png"></image>
			</view> -->
			<view class="gdxq" :class="{gdxq1:isckgd}">
				<view class="jsg">
					<view>已结算赏金</view>
					<view>￥{{qingdan.bounty_yifu}}</view>
				</view>
				<view class="jsg">
					<view>待结算赏金</view>
					<view>￥{{qingdan.bounty_daifu}}</view>
				</view>
				<view class="jsg">
					<view>预存赏金</view>
					<view>￥{{qingdan.bounty_prepaid}}</view>
				</view>
				<view class="jsg">
					<view>赏金余额</view>
					<view>￥{{qingdan.bounty_surplus}}</view>
				</view>
				<view class="shouqi" @tap="ckGduo" :class="{shouqi1:isckgd}"><image src="/static/shouqi.png"></image></view>
			</view>
		</view>
		<view class="gs_info1">
			<view class="xiangqing">
				<view class="xq_mz">
					<view class="sj">总赏金</view>
				</view>
				<view class="shuju">￥{{qingdan.bounty_total}}</view>
			</view>
			<view class="xiangqing">
				<view class="xq_mz">
					<view class="sj">预存赏金</view>
				</view>
				<view class="shuju1">￥{{qingdan.bounty_prepaid}}</view>
			</view>
			<view class="djs">
				待结算：<span>￥{{qingdan.jiesuanAmount}}</span>
			</view>
		</view>
	
		<view class="zifufs" v-if="yjiesuan!=1">
			<h1 class="title">支付方式</h1>
			<ul class="payWay">
				<li @tap="cepay" v-if="parseInt(detail.userInfo.money)<parseInt(qingdan.jiesuanAmount)">
					<view class="way">
						<img src="/static/yuezhifu.png" >
						<view class="payTxt" style="color: #aaa;">
						  余额支付<span style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{detail.userInfo.money}}）</span>
						</view>
					</view>
					<view><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li>
				<li @tap="choosePayWay(3)" v-else>
					<view class="way">
						<img src="/static/yuezhifu.png" >
						<view class="payTxt">
						  余额支付<span style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{detail.userInfo.money}}）</span>
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
		</view>
		
		<view style="height: 200upx;"></view>
		<view class="save-box" v-if="yjiesuan==1">
			<view class="save1">已结算</view>
		</view>
		<view class="save-box" v-else>
			<view class="save" @tap="submit"><span style="font-size: 24upx;">￥</span><span style="font-size: 40upx;margin-right: 30upx;">{{qingdan.bounty_daifu}}</span>立即支付</view>
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
				yjiesuan:'',
				isckgd:false,
				detail:{
					jobData:{},
					userInfo:{},
				},
				// content: '',
				orderData:{
					jobData:{},
					order:{},
					userInfo:{}
				},
				qingdan:{},
				isFormSubmit: false,
				paytype:'alipay',
				choose1: true,
				choose2: false,
				choose3: false
	        }
	    },
		onLoad(e) {
			this.itemid = e.itemid
			this.yjiesuan = e.yjiesuan
			console.log(e)
			this.qzQingdan()
		},
	    methods: {
			// 查看更多
			ckGduo() {
				this.isckgd=!this.isckgd
			},
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
				if (this.isFormSubmit) {
					return;
				}
				this.isFormSubmit = true;
				let that = this
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '结算成功后，已经提报的人才列表将被清空，是否继续结算？',
					success: function(res) {
						if (res.confirm) {
							http.apiRequest({
								api: "/order/fullTimeLiquidationOrder",
								method: "GET",
								data: {
									jobs_id: that.itemid,
								},
								secuss: (res, httpStatus) => {
									that.isFormSubmit = false;
									if (res.code == 1) {
										// uni.showToast({
										// 	title: res.msg
										// });
										uni.$emit('jiesuanh',{})
										that.orderData = res.data.orderData
										if(res.data.status==2) {
											let _that = that
											uni.showModal({
												title: '提示',
												confirmColor:'#FF5A1F',
												content: '多余的钱已经退还到你的余额中！',
												success: function(res) {
													if (res.confirm) {
														uni.navigateBack({
															delta:1
														})
													} else if (res.cancel) {
														console.log('用户点击取消');
													}
												}
											});
											// uni.redirectTo({
											// 	url: '/pages/pay_result/pay_result?orderid=' + this.orderData.order.id
											// });
										}else {
											if(that.paytype =='balancepay') {
												http.apiRequest({
													api: "/pay/balanceSubmit",
													method: "GET",
													data: {
														order_id: that.orderData.order.id,
													},
													secuss: (res, httpStatus) => {
														if (res.code == 1) {
															uni.showToast({
																title: res.msg
															});
															setTimeout(()=>{
																uni.redirectTo({
																	url: '/pages/pay_result/pay_result?orderid=' + that.orderData.order.id
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
												location.href = http.baseUrl+'/pay/submit?type=' + that.paytype + '&order_id=' + that.orderData.order.id;
											}
										}
										console.log(res)
									}else {
										uni.showToast({
											title: res.msg
										});
									}
								},
								error: (res, httpStatus) => {
									that.isFormSubmit = false;
									uni.showToast({
										title: "请检查网络..."
									});
								},
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			order() {
				
			},
			// 获取清单
			qzQingdan() {
				let that = this
				http.apiRequest({
					api: "/jobs/getJobDetail",
					method: "GET",
					data: {
						itemid: that.itemid
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							that.detail = res.data
							console.log(res)
							http.apiRequest({
								api: "/jobs/getFullJobsettData",
								method: "GET",
								data: {
									jobs_id: that.itemid,
								},
								secuss: (res, httpStatus) => {
									if (res.code == 1) {
										// uni.showToast({
										// 	title: res.msg
										// });
										// this.orderData = res.data.orderData
										that.qingdan = res.data
										console.log('123',res)
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
		padding-top: 52upx;
		background: #F7F7F7;
	}
  .title{text-align: left;font-size: 28upx;color: #666;font-weight: 400;margin-bottom: 46upx;}
  .title1 {
	  font-size: 72upx;
	  color: #000000;
	  font-weight: bold;
	  text-align: center;
	  margin-top: 206upx;
	  margin-bottom: 30upx;
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
	  margin-bottom: 120upx;
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
	  margin-top: -20upx;
	  color: #666;
	  font-size: 22upx;
	  text-align: right;
	  margin-right: 40upx;
  }
  .payWay {
	  padding: 0;
  }
  .payWay li{display: flex;align-items: center;justify-content: space-between;margin-bottom: 46upx;height: 40upx}
  .payWay li img{width: 48upx;}
  .payTxt{font-size: 34upx;color: #000;margin-left: 30upx;font-weight: 500;}
 /* .buyBtn{width: calc(100% - 52upx);margin: 60upx auto 0 auto;background: #FF5A1F;text-align: center;color: #fff;height: 94upx;line-height:94upx;
  font-size: 34upx;} */
  .save-box {
  	width: 100%;
  	background: #ffffff;
  	position: fixed;
  	bottom: 0;
  	height: 170upx;
  	padding-top: 2upx;
  	display: flex;
  	justify-content: center;
  }
  .save {
	width: 622upx;
  	height: 94upx;
  	background: #FF5A1F;
  	font-size: 36upx;
  	color: #FFFEFE;
  	text-align: center;
  	line-height: 94upx;
  	border-radius: 6upx;
  }
  .save1 {
  	width: 622upx;
  	height: 94upx;
  	background: #FFC7B2;
  	font-size: 36upx;
  	color: #FFFEFE;
  	text-align: center;
  	line-height: 94upx;
  	border-radius: 6upx;
  }
  .gs_info {
	  background: #FFFFFF;
	  border-radius: 16upx;
	  margin: 20upx 24upx 24upx;
	  padding: 60upx 40upx 50upx;
	  line-height: 1em;
	  position: relative;
  }
  .gs_name {
	  font-size: 40upx;
	  color: #000000;
	  font-weight: bold;
	  margin-bottom: 54upx;
	  text-align: center;
  }
  .xiangqing {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  font-size: 28upx;
	  color: #CCCCCC;
	  font-weight: 500;
	  margin-bottom: 46upx;
  }
  .xiangqing1 {
  	  display: flex;
  	  justify-content: space-between;
  	  align-items: center;
  	  font-size: 28upx;
  	  color: #CCCCCC;
  	  font-weight: 500;
  }
  .gdxq {
	  position: absolute;
	  z-index: 1;
	  top: 660upx;
	  width: 702upx;
	  background: #FFFFFF;
	  transform: translateX(-40upx);
	  height: 0;
	  padding: 0upx 40upx 0upx 85upx;
	  box-sizing: border-box;
	  overflow: hidden;
	  transition:padding 1s,height 0.3s;
  }
  .gdxq1 {
	 position: absolute;
	 width: 702upx;
	 height: 770upx;
	 transform: translateX(-40upx);
	 padding: 77upx 40upx 0upx 85upx;
	 box-sizing: border-box;
	 transition: height 0.5s;
  }
  .shouqi {
	  width: 82upx;
	  height: 82upx;
	  position: absolute;
	  bottom: 0;
	  margin-left: 225upx;
	  opacity: 0;
	  /* transition: opacity 0.3s; */
  }
  .shouqi image {
	  width: 100%;
	  height: 100%;
  }
  .shouqi1 {
	  opacity: 1;
	  /* transition: opacity 0.3s; */
  }
  .jsg {
	  font-size: 26upx;
	  font-weight: 500;
	  color: #999999;
	  line-height: 1em;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 33upx;
	 
  }
  .ck_gd {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 24upx;
	  color: #999999;
	  font-weight: 500;
	  margin: 30upx 0;
  }
  .ck_gd image {
	  width: 20upx;
	  height: 20upx;
	  margin-left: 10upx;
	  transition: transform 0.5s;
  }
  .img {
	  transform: rotate(-180deg);
	  transition: transform 0.5s;
  }
  .xq_mz {
	  display: flex;
	  align-items: center;
  }
  .sj {
	  width: 148upx;
	  font-size: 28upx;
	  color: #000000;
	  font-weight: 500;
  }
  .shuju {
	  font-size: 28upx;
	  color: #FF5A1F;
	  font-weight: bold;
  }
  .shuju1 {
  	  font-size: 28upx;
  	  color: #000000;
  	  font-weight: bold;
  }
  .gs_info1 {
  	  background: #FFFFFF;
  	  border-radius: 16upx;
  	  margin: 0upx 24upx 24upx;
  	  padding: 50upx 40upx;
  	  line-height: 1em;
  }
  .djs {
	  font-size: 28upx;
	  color: #000000;
	  font-weight: bold;
	  text-align: right;
  }
  .djs span {
	  font-size: 34upx;
	  color: #000000;
	  font-weight: bold;
	  margin-left: 100upx;
  }
  .zifufs {
	  background: #FFFFFF;
	  border-radius: 16upx;
	  margin: 0upx 24upx 24upx;
	  padding: 52upx 40upx 4upx;
	  line-height: 1em;
  }
</style>
