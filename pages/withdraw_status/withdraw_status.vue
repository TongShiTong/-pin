<template>
	<view class="content-box">
		<!-- <view class="box">
			<view class="each">
				<view>2019年10月</view>
				<view>账单明细共 {{itemData.total}} 笔</view>
			</view>
			<view class="detail">
				<view style="margin-right: 30upx;">支出 ￥{{Math.abs(itemData.expenditure)}}</view>
				<view>收入 ￥{{itemData.income}}</view>
			</view>
		</view> -->
		<view class="crad-box">
			<view class="crad" v-for="(item,index) in itemsLists" :key="index">
				<view class="name">
					<view>提现</view>
					<view>{{item.amount}}</view>
				</view>
				<view class="time">
					<view style="margin-right: 20upx;">{{item.createtime*1000 | formatDate}}</view>
					<view style="font-size: 24upx;color: #FC565B;">{{item.check==1?"银行处理中":item.check==2?"提现成功":"提现失败"}}</view>
				</view>	
			</view>
		</view>
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
			<view class="more" v-else>没有更多了！</view>
		</view>
		<view class="more" v-else>暂无数据</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	import {formatDate} from '@/components/date.js'
	export default {
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd')
			}
		},
		data() {
			return {
				itemData:{},
				itemsLists:[],
				lodingLock: false,
				page: 1,
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				},
			}
		},
		onLoad() {
			this.itemsList()
		},
		methods: {
			// 获取消息列表
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				
				http.apiRequest({
					api: "/funds/withdrawList",
					method: "GET",
					data: {
						page: that.nextPage,
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							that.itemData = res.data
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							// console.log('152',res)
							if (that.nextPage > 0) {
								that.status = "more";
							} else {
								that.status = 'nomore';
							}
							
							if (typeof(collback) == "function") {
								collback();
							}
						}else {
							if (that.nextPage > 0) {
								that.status = "more"
							} else {
								that.status = "nomore"
							}
							uni.showToast({
								title: res.msg,
								duration: 1500,
								icon: "none"
							});
							if (typeof(collback) == "function") {
								collback();
							}
						}
					},
					error: (res, httpStatus) => {
						if (that.nextPage > 0) {
							that.status = "more"
						} else {
							that.status = "nomore"
						}
						that.lodingLock = false;
						uni.showToast({
							title: "接口调用失败，请检查网络",
							duration: 1500,
							icon: "none"
						});
						if (typeof(collback) == "function") {
							collback();
						}
					},
				});
			},
			// 下拉刷新获取更多
			itemsListMore(e) {
				let that = this;
				if (that.nextPage > 0) {
					// console.log(123,'2')
					that.itemsList(() => {
						
					});
				} else {
					uni.showToast({
						title: "没有更多了哦！",
					});	
				}
			},
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #F7F8FF;
	padding-top: 60upx;
}
.box {
	margin: 0 40upx;
	font-size: 28upx;
	font-weight: bold;
	color: #1A1A1A;
}
.each {
	display: flex;
	justify-content: space-between;
	margin: 55upx 0 18upx;
}
.detail {
	display: flex;
	font-size: 24upx;
	color: #666666;
	margin-bottom: 46upx;
}
.crad-box {
	margin: 0 40upx;
	background: #fff;
	padding: 0 30upx;
	margin-top: 30upx;
}
.crad {
	padding: 40upx 0;
	border-bottom: 1upx solid #E6E6E6;
}
.crad:last-child {
	border: none;
}
.name {
	font-size: 32upx;
	color: #1A1A1A;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	margin-bottom: 18upx;
}
.time {
	font-size: 26upx;
	color: #999;
	display: flex;
	justify-content: space-between;
}
.more {
	font-size: 28upx;
	color: #666;
	margin-top: 20upx;
	margin-bottom: 60upx;
	text-align: center;
}
</style>
