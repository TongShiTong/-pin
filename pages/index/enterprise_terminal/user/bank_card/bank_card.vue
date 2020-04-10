<template>
	<view class="content-box">
		<view class="card-box" v-if="backInfo.status!=1">
			<view @tap="addCard" class="card">添加银行卡</view>
		</view>
		<view  v-else>
			<!-- <view class="card-box1">
				<view style="margin-bottom: 114upx;">{{backInfo.bank}}</view>
				<view>**** **** **** {{card_no}}</view>
			</view> -->
			<view class="box">
				<view class="each">
					<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
						<view>卡号</view>
						<input type="text" placeholder="请输入本人银行卡号" v-model="card" disabled="true"/>
					</label>
				</view>
				<view class="each">
					<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
						<view>所属银行</view>
						<input type="text" placeholder="请输入银行卡所属银行" v-model="bank" disabled="true"/>
					</label>
				</view>
				<view class="each">
					<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
						<view>开户行</view>
						<input type="text" placeholder="请输入银行卡开户行" v-model="card_bank" disabled="true"/>
					</label>
				</view>
			</view>
			<view @tap="addCard" class="btn">
				更换银行卡
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				backInfo: {},
				card_no:'',
				card:'',
				card_bank:'',
				bank:''
			}
		},
		onLoad() {
			this.backInfoData()
			uni.$on('bangCard',()=>{
				this.backInfoData()
			})
		},
		methods: {
			addCard() {
				uni.navigateTo({
					url: '/pages/back_info/back_info',
				});
			},
			// 获取银行卡信息
			backInfoData() {
				http.apiRequest({
					api: "/funds/getBankCard",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.backInfo=res.data.bankCard
							this.card_no=this.backInfo.card_no.substr(-4)
							this.card= '**** **** ****' + this.card_no
							this.card_bank=this.backInfo.card_bank
							this.bank=this.backInfo.bank
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
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #F5F5F5;
	padding-top: 60upx;
}
.card-box {
	width: 670upx;
	height: 300upx;
	margin: 0 auto;
	background: #fff;
	margin-top: 36upx;
	border-radius:18upx;
	box-shadow: 0 0 37upx #EEEEEE;
	padding-top: 103upx;
	box-sizing: border-box;
}
.card-box1 {
	width: 670upx;
	height: 300upx;
	margin: 0 auto;
	background: #62D16A;
	margin-top: 36upx;
	color: #fff;
	font-size: 40upx;
	font-weight: bold;
	border-radius:18upx;
	text-align: center;
	box-shadow: 0 0 20upx #E0E1FF;
	padding-top: 54upx;
	box-sizing: border-box;
}
.card {
	width: 440upx;
	height: 94upx;
	background: #FF5A1F;
	border-radius: 6upx;
	text-align: center;
	line-height: 94upx;
	color: #fff;
	margin: 0 auto;
}
.btn {
	margin: 0 auto;
	margin-top: 54upx;
	width: 400upx;
	height: 94upx;
	background: #FF5A1F;
	text-align: center;
	line-height: 94upx;
	font-size: 36upx;
	color: #fff;
	border-radius: 6upx;
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
.each-box view {
	width: 260upx;
}
.each-box input {
	text-align: right;
}
</style>
