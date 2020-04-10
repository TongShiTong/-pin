<template>
	<view class="content-box">
		<view style="width: 100%; height: 8upx;background: #f7f7f7;"></view>
		<view class="renyuan_qk">
			<view>人才面试</view>
			<!-- <view class="yubao">
				<view @tap="msList">所有面试</view>
				<view style="width: 14upx;height: 22upx;margin-left: 10upx;">
					<image style="width: 100%;height: 100%;" src="/static/xianyou.png"></image>
				</view>
			</view> -->
		</view>
		
		<view class="ms_detial" v-for="(item,index) in msList" :key="index">
			<view class="mshi_box">
				<view class="mianshi" :class="{mianshi1:Date.parse(item.interview_date)<Date.parse(day)}">
					<view>{{item.interview_date}} | {{item.time_period}}</view>
				</view>
			</view>
			<view class="ms_detial_info" :class="{timeBijiao:Date.parse(item.interview_date)<Date.parse(day)}">
				<view class="fzren">负责人：{{item.hr_name}}</view>
				<view class="ms_tine">
					<view>联系方式：</view>
					<view style="margin-right: 10upx;font-weight: bold;" @tap="callPhone" :data-ph="val" v-for="(val,i) in item.hr_mobile.split(',')" :key="i">{{val}}</view>
				</view>
				<view>地址：{{item.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getWeek,formatDate} from '@/components/date.js'
	import http from '@/tools/utils/http.js'
	export default {
		filters: {
			getWeek(time) {
				var date = new Date(time);
				return getWeek(date)
			}
		},
		data() {
			return {
				itemid:'',
				msList:[],
				day:''
			}
		},
		onLoad(e) {
			console.log(e)
			let that = this
			that.itemid=e.itemid
			that.viewList()
			var day1 = new Date();
			day1.setTime(day1.getTime());
			var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1)+ "-" + day1.getDate();
			console.log(day1,s1)
			this.day = s1
		},
		methods: {
			//打电话
			callPhone(e) {
				// console.log(e)
				var phone = e.currentTarget.dataset.ph
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			// 获取第一条面试
			viewList() {
				let that = this
				http.apiRequest({
					api: "/interview/getInterviewList",
					method: "GET",
					data: {
						jobs_id: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							that.msList = res.data.rows
							console.log(that.msList)
						}else {
							
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
		padding-top: 60upx;
	}
	.renyuan_qk{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 56upx;
		color: #000000;
		font-weight: bold;
		line-height: 1em;
		margin: 58upx 40upx 48upx;
	}
	/* .yubao {
		font-size: 26upx;
		color: #000000;
		font-weight: 500;
		display: flex;
	} */
	.ms_detial {
		
	}
	.ms_detial_info {
		width: 670upx;
		height: 172upx;
		padding: 20upx 40upx 0upx;
		box-sizing: border-box;
		background: #3388FF;
		border-radius: 12upx;
		margin: 0 40upx 48upx;
		font-size: 28upx;
		color: #FFFFFF;
		font-weight: 500;
		line-height: 1em;
	}
	.ms_tine {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		/* font-size: 46upx; */
		color: #FFFFFF;
		font-weight: 500;
		line-height: 1em;
		margin-bottom: 20upx;
	}
	.mshi_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 40upx 24upx;
	}
	.mianshi {
		display: flex;
		align-items: center;
		font-size: 32upx;
		font-weight: bold;
		color: #0B0B0B;
	}
	.mianshi1 {
		color: #999999;
	}
	.fzren {
		font-size: 28upx;
		color: #FFFFFF;
		font-weight: 500;
		margin-bottom: 20upx;
	}
	.timeBijiao {
		background: #F7F7F7;
		color: #999999;
	}
	.timeBijiao .fzren {
		color: #000000;
	}
	.timeBijiao .ms_tine{
		color: #000000;
	}
</style>
