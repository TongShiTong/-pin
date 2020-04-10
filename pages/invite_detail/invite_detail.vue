<template>
	<view class="content-box">
		<view class="info">
			<view class="table">
				<view class="huode" @tap="huodeList(1)">
					<!-- <view>5658.31(元)</view> -->
					<view class="zi" :class="{'active' : huode}">邀请人列表</view>
				</view>
				<!-- <view class="huode" @tap="huodeList(2)">
					<view>6(人)</view>
					<view class="zi" :class="{'active' : lushang}">完成任务列表</view>
				</view> -->
				<view class="huode" @tap="huodeList(3)">
					<!-- <view>2(人)</view> -->
					<view class="zi" :class="{'active' : shixiao}">完成任务列表</view>
				</view>
			</view>
			<view class="info-box" v-if="huode">
				<view class="title">
					<view>用户信息</view>
					<view>注册时间</view>
					<view>手机号</view>
				</view>
				<view v-for="(item,index) in itemsLists" :key="index">
					<view class="infoList1">
						<view class="name">{{item.realname}}</view>
						<view>{{item.createtime*1000 | formatDate}}</view>
						<view>{{item.mobile}}</view>
					</view>
				</view>
				<!-- <view class="infoList1">
					<view class="name">发鬼地方dfdsfd fdg字广发华福空间规划</view>
					<view>2019/8/23</view>
					<view>完成1单</view>
				</view> -->
			</view>
			<view class="info-box" v-if="shixiao">
				<view class="title">
					<view>用户信息</view>
					<view>岗位信息</view>
					<view>接单时间</view>
					<view>佣金</view>
				</view>
				<view v-for="(item,index) in itemsLists" :key="index">
					<view class="infoList">
						<view class="name1">{{item.userInfo.realname}}</view>
						<view style="width: 180upx;padding-right: 10upx;">{{item.jobData.title}}</view>
						<view style="width: 180upx;">{{item.createtime*1000 | formatDate}}</view>
						<view style="width: 60upx;text-align: center;">{{item.amount}}</view>
					</view>
					<!-- <view class="infoList">
						<view>发鬼地方</view>
						<view>2019/8/23</view>
						<view>完成1单</view>
					</view> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	import {formatDate} from '@/components/date.js'
	export default {
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy/MM/dd')
			}
		},
		data() {
			return {
				huode: true,
				lushang: false,
				shixiao: false,
				inviteInfo: [],
				itemsLists:[],
				lodingLock: false,
				page: 1,
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				}
			}
		},
		onLoad() {
			this.itemsList(()=>{
				
			})
		},
		methods: {
			huodeList(index) {
				switch(index) {
					case 1:
					this.itemsLists = [];
					this.page= 1;
					this.nextPage= 1;
					this.status= 'more';
					this.huode=true
					this.lushang=false
					this.shixiao=false
					this.itemsList(index)
					break;
					case 2:
					this.itemsLists = [];
					this.page= 1;
					this.nextPage= 1;
					this.status= 'more';
					this.huode=false
					this.lushang=true
					this.shixiao=false
					this.itemsList(index)
					this.
					break;
					case 3:
					this.itemsLists = [];
					this.page= 1;
					this.nextPage= 1;
					this.status= 'more';
					this.huode=false
					this.lushang=false
					this.shixiao=true
					this.itemsList(index)
					break;
				}
			},
			itemsList(collback) {
				// console.log(collback)
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				if(collback==3) {
					http.apiRequest({
						api: "/user/getSpreadOrder",
						method: "GET",
						data: {
							page: that.nextPage
						},
						secuss: (res, httpStatus) => {
							that.lodingLock = false;
							if (res.code == "1") {
								that.nextPage = res.data.nextPage;
								that.page = res.data.page;
								// that.itemsLists = res.data.rows
								that.itemsLists = that.itemsLists.concat(res.data.rows);
								// console.log(that.itemsLists)
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
						}
					});
				}else {
					http.apiRequest({
						api: "/user/getSpreader",
						method: "GET",
						data: {
							page: that.nextPage
						},
						secuss: (res, httpStatus) => {
							that.lodingLock = false;
							if (res.code == "1") {
								that.nextPage = res.data.nextPage;
								that.page = res.data.page;
								// that.itemsLists = res.data.rows
								that.itemsLists = that.itemsLists.concat(res.data.rows);
								// console.log(that.itemsLists)
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
						}
					});
				}
			},
			// 获取更多
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
			// inviteDetail() {
			// 	http.apiRequest({
			// 		api: "/user/getSpreader",
			// 		method: "GET",
			// 		data: {
			// 		},
			// 		secuss: (res, httpStatus) => {
			// 			if (res.code == 1) {
			// 				this.inviteInfo=res.data.rows
			// 				console.log(res)
			// 			}else {
			// 				uni.showToast({
			// 					title: res.msg
			// 				});
			// 			}
			// 		},
			// 		error: (res, httpStatus) => {
			// 			uni.showToast({
			// 				title: "请检查网络..."
			// 			});
			// 		},
			// 	});
			// },
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	background: #FF5A1F;
	padding-top: 60upx;
}
.info {
	margin: 0 20upx;
	margin-bottom: 60upx;
	min-height: 88vh;
	border-radius: 10upx;
	background: #fff;
}
.name {
	max-width: 160upx;
	text-overflow: ellipsis;
	white-space:nowrap;
	overflow: hidden;
}
.name1{
	width: 140upx;
	text-overflow: ellipsis;
	white-space:nowrap;
	overflow: hidden;
}
.table {
	font-size: 36upx;
	color: #1A1A1A;
	font-weight: bold;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 48upx 0 10upx;
	width: 710upx;
	background: #fff;
	border-radius: 10upx;
	position: fixed;
}
.huode {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.zi {
	margin-top: 20upx;
	font-size: 34upx;
	border-bottom: 4upx solid #fff;
	padding-bottom: 30upx;
}
.info-box {
	width: 100%;
	min-height: 88vh;
	padding: 156upx 40upx 0;
	box-sizing: border-box;
	border-top-left-radius: 24upx;
	border-top-right-radius: 24upx;
	border-bottom-left-radius: 10upx;
	border-bottom-right-radius: 10upx;
	background: #F5F5F5;
}
.title {
	padding: 26upx 30upx 22upx 30upx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	font-size: 28upx;
	color: #999999;
	font-weight: bold;
	border-bottom: 1px solid #E6E6E6;
}
.infoList1 {
	padding: 30upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30upx;
	color: #1A1A1A;
}
.infoList {
	padding: 30upx;
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	font-size: 30upx;
	color: #1A1A1A;
}
.active {
	color: #FF5A1F;
	border-bottom: 4upx solid #FF5A1F;
}
</style>
