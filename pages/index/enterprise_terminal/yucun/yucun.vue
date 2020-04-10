<template>
	<view class="content-box">
		<view class="box">
			<view class="each1">
				<view>预存赏金</view>
				<view class="jineshu">
					<span>￥</span> <input type="text" v-model="marginAmount" @input="inputSr"/>
				</view>
			</view>
		</view>
		<view>
			<view class="each">
				<view>支付方式</view>
			</view>
			<ul class="payWay">
				<li @tap="choosePayway(index,key)" style="margin-bottom: 40upx;" v-for="(item,key,index) of payType" :key="key">
					<view class="way">
						<!-- <img src="/static/zfb.png" > -->
						<image :src="`/static/${key}.png`" ></image>
						<view class="payTxt">
						  {{item}} <span v-if="key=='balancepay'" style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{userInfo.money}}）</span>
						</view>
					</view>
					<view v-if="choose==index"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
					<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
				</li>
			</ul>
		</view>
		<view class="btn_box">
			<view v-if="isqueren" class="btn" @tap="submit">确认预存</view>
			<view v-else class="btn1">确认预存</view>
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
				orderData: {
					order:{},
				},
				choose:1,
				userInfo:{},
				payType:{},
				isqueren:false,
				marginAmount:'',
				itemid:'',
				isFormSubmit: false,
			}
		},
		onLoad(e) {
			this.itemid = e.itemid
			this.userInfoData()
			http.apiRequest({
				api: "/common/config",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
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
			// input输入值
			inputSr(e) {
				console.log(e)
				if(e.detail.value=='') {
					this.isqueren = false
				}else {
					this.isqueren = true
				}
			}, 
			choosePayway(index,key) {
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
			
			submit() {
				let that = this
				if (that.isFormSubmit) {
					return;
				}
				that.isFormSubmit = true;
				http.apiRequest({
					api: "/order/fullTimeAppendBountyOrder",
					method: "GET",
					data: {
						jobs_id: that.itemid,
						amount: that.marginAmount
					},
					secuss: (res, httpStatus) => {
						that.isFormSubmit = false;
						if (res.code == 1) {
							console.log(res)
							that.orderData=res.data.orderData
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
							// if(this.paytype =='balancepay') {
							// 	uni.redirectTo({
							// 		url: '/pages/pay_result/pay_result?orderid=' + this.order.id
							// 	});
							// }else {
							// 	location.href = http.baseUrl+'/pay/submit?type=' + this.paytype + '&order_id=' + this.order.id;
							// }
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
				
			},
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #F7F7F7;
	padding-top:60upx;
	position: relative;
}
.contents {
	width: 100%;
	background: #fff;
	padding-top: 40upx;
}
.box {
	width: 670upx;
	height: 300upx;
	margin: 0 auto;
	background: #fff;
	border-radius:34upx;
	margin-top: 40upx;
	padding: 50upx 40upx 0;
	box-sizing: border-box;
}
.each {
	padding-left: 40upx;
	padding-bottom: 26upx;
	font-size: 32upx;
	color: #666;
	margin-top: 100upx;
}
.each1 {
	font-size: 28upx;
	color: #000000;
	font-weight: 500;
}
.jineshu {
	margin-top: 34upx;
	font-size: 50upx;
	color: #000;
	font-weight: bold;
	display: flex;
	align-items: center;
	border-bottom: 1upx solid #E6E6E6;
}
.jineshu input {
	font-size: 66upx;
	color: #000000;
	font-weight: bold;
	margin-left: 20upx;
	caret-color: #FF5A1F;
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
.btn_box {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 180upx;
	background: #FFFFFF;
}
.btn {
	width: 670upx;
	height: 94upx;
	margin: 2upx auto 0;
	background: #FF5A1F;
	text-align: center;
	line-height: 94upx;
	font-size: 36upx;
	color: #fff;
	border-radius: 6upx;
}
.btn1 {
	width: 670upx;
	height: 94upx;
	margin: 2upx auto 0;
	background: #FFC7B2;
	text-align: center;
	line-height: 94upx;
	font-size: 36upx;
	color: #fff;
	border-radius: 6upx;
}
.payWay{background: #F7F7F7;padding:20upx 40upx;}
.payWay li{display: flex;align-items: center;justify-content: space-between; height: 40upx;}
.payWay li img{width: 48upx;}
.payWay li image{width: 48upx;height: 48upx;}
.payTxt{font-size: 34upx;color: #000;margin-left: 30upx;font-weight: 500;}
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
