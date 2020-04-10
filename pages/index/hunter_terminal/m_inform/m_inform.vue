<template>
	<view class="content-box">
		<view class="head">
			<view class="yingfu">产生赏金（元）</view>
			<view class="shangjin">{{sjinfo.bountyTotal}}</view>
			<view class="chudan">每月1号生成上个月赏金数据</view>
		</view>
		<view class="jszq">
			<view>每月15号前（含15号）当月计算赏金，</view>
			<p>15号后次月计算赏金。</p>
		</view>
		<view class="daijie">
			<view>{{yue}}月待结共{{sjList.length}}人</view>
			<!-- <view class="zhouqi">入账周期：11.16-12.15</view> -->
		</view>
		<view class="bb_detial" v-for="(item,index) in sjList" :key="index">
			<view class="rz_renyuan">{{item.entry_date}} | {{item.entry_date | getWeek}}</view>
			<view>
				<view class="reny_xq">
					<view>
						<view class="name">{{item.name}}<span style="margin-left: 6upx;">{{item.id_card.substr(-4)}}</span><span style="font-size: 26upx;color: #999999;font-weight: 500;margin-left: 36upx;">第{{item.frequency}}次</span> </view>
						<!-- <view class="call">猎手：{{item.lieshou.username}}</view> -->
					</view>
					<view>{{item.amount}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getWeek,formatDate} from '@/components/date.js'
	import http from '@/tools/utils/http.js'
	export default {
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy.MM.dd')
			},
			getWeek(time) {
				var date = new Date(time);
				return getWeek(date)
			}
		},
		data() {
			return {
				itemid:'',
				sjList:[],
				sjinfo:{
					bountyTotal:0,
				},
				month:'',
				year:'',
				yue:'',
			}
		},
		onLoad(e) {
			console.log(e)
			let that = this
			that.itemid=e.itemid
			that.month=e.month
			that.year=that.month.toString().substr(0,4)
			that.yue=that.month.toString().substr(4)
			uni.setNavigationBarTitle({
				title: that.year+'年'+that.yue+'月赏金报表'
			})
			that.sjBaobiao()
		},
		methods: {
			sjBaobiao() {
				let that = this
				http.apiRequest({
					api: "/sett_details/getSettDetailsByLieshou",
					method: "GET",
					data: {
						job_id: this.itemid,
						month: this.month,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							that.sjinfo = res.data
							that.sjList = res.data.rows
						}else {
							
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			}
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		padding-top: 52upx;
		position: relative;
		background: #F7F7F7;
	}
	.head {
		width: 100%;
		height: 240upx;
		background: #FF5A1F;
		text-align: center;
	}
	.yingfu {
		font-size: 28upx;
		color: #FFF9F9;
		line-height: 1em;
		padding-top: 34upx;
	}
	.shangjin {
		font-size: 66upx;
		color: #FFF9F9;
		font-weight: bold;
		line-height: 1em;
		margin: 34upx 0;
	}
	.chudan {
		font-size: 24upx;
		color: #FFF9F9;
		opacity:0.6;
		line-height: 1em;
	}
	.jszq {
		width: 100%;
		text-align: center;
		font-size: 22upx;
		color: #999999;
		background: #FFFFFF;
		padding: 27upx 0;
	}
	.daijie {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 56upx 40upx 40upx;
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
	}
	.zhouqi {
		font-size: 24upx;
		color: #999999;
		font-weight: 500;
	}
	.bb_detial {
		margin: 0 40upx 40upx;
		background: #FFFFFF;
		box-shadow:0px 0px 10px 0px rgba(230, 230, 230, 0.35);
		border-radius:6upx;
	}
	.rz_renyuan {
		height: 96upx;
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
		padding: 0 40upx;
		box-sizing: border-box;
		line-height: 96upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.reny_xq {
		height: 144upx;
		padding: 0 40upx;
		font-size: 36upx;
		font-weight: bold;
		box-sizing: border-box;
		border-bottom: 1upx solid #E6E6E6;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.reny_xq:last-child {
		border-bottom: none;
	}
	.name {
		font-size: 34upx;
		color: #000000;
		font-weight: bold;
		line-height: 1em;
		/* margin-bottom: 22upx; */
	}
	.name span {
		font-size: 26upx;
	}
	.call {
		line-height: 1em;
		font-size: 26upx;
		font-weight: 500;
		color: #999999;
	}
</style>
