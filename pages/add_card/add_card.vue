<template>
	<view class="content-box">
		<view class="add">添加银行卡</view>
		<view class="benren">请绑定持卡人本人的银行卡</view>
		<view class="box">
			<view class="each">
				<label class="each-box" style="border-bottom: 1upx solid #E6E6E6;">
					<view>持卡人</view>
					<input type="text" placeholder="请输入姓名" v-model="name"/>
				</label>
			</view>
			<view class="each">
				<label class="each-box">
					<view>卡号</view>
					<input type="text" placeholder="请输入本人银行卡号" v-model="card"/>
				</label>
			</view>
		</view>
		<view class="btn1" v-if="card.length<12">下一步</view>
		<view v-else class="btn" @tap="nextStep">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				card:''
			}
		},
		methods: {
			nextStep() {
				uni.navigateTo({
					url: '/pages/back_info/back_info?name=' + this.name + "&card=" +this.card,
				});
			}
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #fff;
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
	width: 200upx;
}
.each-box input {
	text-align: center;
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
.btn1 {
	margin: 0 auto;
	margin-top: 308upx;
	width: 400upx;
	height: 94upx;
	background: #FF5A1F;
	opacity: 0.6;
	text-align: center;
	line-height: 94upx;
	font-size: 32upx;
	color: #fff;
	border-radius: 6upx;
}
</style>
