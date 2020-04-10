<template>
	<view class="content-box">
		<view class="main">
			<view class="campany">
				<view class="name">{{detail.title}}</view>
				<view class="many">赏金：<span>{{detail.wage*detail.bounty_ratio/100}}</span><span style="font-weight: bold;font-size: 24upx;margin-left: 6upx;">元/天</span></view>
			</view>
			<view class="need-box">
				<view class="need">杭州 | 需要{{detail.total}}人 | 零工 | {{detail.gender==1? "男":detail.gender==2? "女":"不限"}}</view>
			</view>
			<view class="day">薪资<span style="font-size: 40upx;font-weight: bold;margin-left: 38upx;margin-right: 6upx;">{{detail.wage}}</span><span>元/天</span></view>
			<!-- <view class="time"><span style="background: #f5f5f5;border-radius:2upx;padding: 0 10upx;margin-right: 18upx;">{{jobData.job_start_date}} {{detail.interviewtime}}</span> <span style="background: #F5F5F5;border-radius: 2upx;padding: 0 12upx;margin-right: 18upx;">{{jobData.days}}天</span> <span style="background: #f5f5f5;border-radius: 2upx;padding: 0 12upx;">{{detail.worktime}}小时/天</span></view> -->
			<!-- <view class="info">
				<view class="info-box">
					<view class="img-box"><image :src="userInfo.avatar" mode="aspectFill"></image></view>
					<view class="info-name">{{userInfo.nickname}}</view>
				</view>
			</view> -->
		</view>

		<view class="wode"><view>我的提报</view><view class="realTo">{{month}}</view></view>
		<view class="scroll-box" :class="{duoWuGe:detail.dateList.length>5}">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" show-scrollbar="false">
				<view id="demo1" class="scroll-view-item_H uni-bg-red" v-for="(item,index) in detail.dateList" :key="index" :class="{wuGe:detail.dateList.length==5,isUsed:!item.isUsed,kexuan:itemIndex==index}" @tap="timeTab(index)">
					<view class="week">周{{item.week}}</view>
					<view class="hao">{{item.day}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- <view class="choose-time">
			<view @tap="chooseTime(1)" :class="{'active':today}">{{jobData.job_start_date}}</view>
			<view @tap="chooseTime(2)" :class="{'active':tomorrow}">{{date2}}</view>
			<view @tap="chooseTime(3)" :class="{'active':acquired}">{{date3}}</view>
		</view> -->
		<view class="table-box">
			<view class="th-name">
				<view>工人姓名</view>
				<view>性别</view>
				<view>猎手</view>
				<view>状态</view>
				<view v-if="date === date1">签到</view>
			</view>
			<view class="th-neirong" v-for="(item, index) in itemsLists" :key="index">
				<view style="width: 200upx;">{{item.worker.name}}<span>{{item.worker.idcard.substr(-4)}}</span></view>
				<view style="width: 60upx;text-align: center;">{{item.worker.gender=='1'? "男":"女"}}</view>
				<view style="width: 160upx;text-align: center;">{{item.lieshou.username}}</view>
				<view class="huanren" v-if="item.isCheckIn==1">已点名</view>
				<view class="huanren" v-else>{{date === date1 ? "点名" : "未点名" }}</view>
				<switch v-if="date === date1" :checked="item.isCheckIn==1 ? true : false" @change="switch1Change" :data-workid="item.worker_id" :data-index="index" color="#FF5A1F" style="transform:scale(0.8)"/>
			</view>
		
		</view>
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
			<view class="more" v-else>没有更多了！</view>
		</view>
		<view class="more" v-else>暂无数据</view>
		<!-- <view v-if="tomorrow">2</view>
		<view v-if="acquired">3</view> -->
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				today: false,
				tomorrow: false,
				acquired: false,
				itemsLists:[],
				lodingLock: false,
				itemid:'',
				status1:-1,
				checked: false,
				detail:{
					wage:0,
					bounty_subsidy:0,
					bounty_ratio:0,
					dateList:[]
				},
				month:'',
				itemIndex:0,
				jobData: {},
				userInfo: {},
				page: 1,
				date:'',
				date1:'',
				date2:'',
				date3:'',
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				}
			}
		},
		onLoad(e) {
			this.itemid=e.itemid
			console.log(e)
			http.apiRequest({
				api: "/jobs/getJobDetail",
				method: "GET",
				data: {
					itemid: e.itemid
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						this.detail = res.data
						this.jobData = res.data.jobData
						this.userInfo = res.data.userInfo
						for(let i=0;i<res.data.dateList.length;i++) {
							if(res.data.dateList[i].istoday) {
								this.month = res.data.dateList[i].month
								this.itemIndex = i
							}else{
								
							}
						}
						var day1 = new Date();
						day1.setTime(day1.getTime());
						var s1 = day1.getFullYear()+"-" + ((day1.getMonth()+1)<10?('0'+(day1.getMonth()+1)) : (day1.getMonth()+1)) + "-" + (day1.getDate()<10?('0' + day1.getDate()) : day1.getDate());
						this.date1 = s1
						this.date = s1
						this.itemsList()
						
						if(this.jobData.days>=2){
							// 获取某天后天的时间
							var day2 = new Date(this.jobData.job_start_date);
							day2.setTime(day2.getTime()+24*60*60*1000);
							var s2 = day2.getFullYear()+"-" + ((day2.getMonth()+1)<10?('0'+(day2.getMonth()+1)) : (day2.getMonth()+1)) + "-" + (day2.getDate()<10?('0' + day2.getDate()) : day2.getDate());
							this.date2 = s2
						}
						if(this.jobData.days==3){
							var day3 = new Date(this.jobData.job_start_date);
							day3.setTime(day3.getTime()+24*60*60*1000*2);
							var s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
							var s3 = day3.getFullYear()+"-" + ((day3.getMonth()+1)<10?('0'+(day3.getMonth()+1)) : (day3.getMonth()+1)) + "-" + (day3.getDate()<10?('0' + day3.getDate()) : day3.getDate());
							this.date3 = s3
						}
						if(this.date==this.jobData.job_start_date) {
							this.today=true
						}
						if(this.date==this.date2) {
							this.tomorrow=true
						}
						if(this.date==this.date3) {
							this.acquired=true
						}
						// console.log(res)
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
			switch1Change: function (e) {
				// console.log('switch1 发生 change 事件，携带值为', e.target.value)
				let workid = e.currentTarget.dataset.workid
				let index = e.currentTarget.dataset.index
				console.log(e)
				if(!e.target.value){
					http.apiRequest({
						api: "/worker_report/setJobWorkerCheckOut",
						method: "GET",
						data: {
							jobs_id: this.itemid,
							worker_id: workid
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								//调用成功，取消点名成功
								this.itemsLists[index].isCheckIn = 0
								// index = res.data.status
								// console.log(res)
							}else {
								//点名失败
								uni.showToast({
									title: res.mag
								});
							}
						},
						error: (res, httpStatus) => {
							uni.showToast({
								title: "请检查网络..."
							});
						},
					});
				}else {
					http.apiRequest({
						api: "/worker_report/setJobWorkerCheckIn",
						method: "GET",
						data: {
							jobs_id: this.itemid,
							worker_id: workid
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								//调用成功，点名成功
									this.itemsLists[index].isCheckIn = 1
								// index = res.data.status
								// console.log(res)
							}else {
								//点名失败
								uni.showToast({
									title: res.mag
								});
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
			scroll: function(e) {
				// console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			chooseTime (index) {
				switch (index) {
					case 1:
					this.today=true,
					this.tomorrow=false,
					this.acquired=false,
					this.date = this.jobData.job_start_date
					this.nextPage = 1;
					this.itemsLists = [];
					this.itemsList(() => {
								
					});
					break;
					case 2:
					this.today=false,
					this.tomorrow=true,
					this.acquired=false,
					this.date = this.date2
					this.nextPage = 1;
					this.itemsLists = [];
					this.itemsList(() => {
								
					});
					break;
					case 3:
					this.today=false,
					this.tomorrow=false,
					this.acquired=true,
					this.date = this.date3
					this.nextPage = 1;
					this.itemsLists = [];
					this.itemsList(() => {
								
					});
					break;
				}
			},
			// 时间选择tab
			timeTab(index) {
				let timeList
				timeList = this.detail.dateList[index] 
				if(timeList.isUsed) {
					this.itemIndex = index
					this.date = timeList.date
					this.month = timeList.month
					// console.log(this.date)
					this.nextPage = 1;
					this.itemsLists = [];
					this.itemsList(() => {
								
					});
				}
			},
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				// console.log(that.itemid)
				// console.log(that.date)
				http.apiRequest({
					api: "/worker_report/getJobWorkerAttendance",
					method: "GET",
					data: {
						jobs_id: that.itemid,
						page: that.nextPage,
						date: that.date
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							// that.itemsLists = res.data.rows
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							console.log(that.itemsLists)
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
			// 对接点名接口
			checkIn(e) {
				let workid = e.currentTarget.dataset.workid
				let index = e.currentTarget.dataset.index
				// console.log(e)
				http.apiRequest({
					api: "/worker_report/setJobWorkerCheckIn",
					method: "GET",
					data: {
						jobs_id: this.itemid,
						worker_id: workid
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							//调用成功，点名成功
							if(this.date==this.date1){
								this.itemsLists[index].isCheckIn = 1
							}
							// index = res.data.status
							// console.log(res)
						}else {
							//点名失败
							uni.showToast({
								title: res.mag
							});
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
		padding-top: 60upx;
	}
	.main {
		/* width: 690upx; */
		padding: 20upx 40upx 50upx 40upx;
		box-sizing: border-box;
		background: #fff;
		margin: 0 auto;
		margin-bottom: 16upx;
		box-shadow: 0 20upx 20upx #E6E6E6;
	}
	.campany {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 50upx;
		color: #000000;
		font-weight: bold;
	}
	.name {
		text-align: left;
		max-width: 480upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient: vertical;
	}
	.day {
		text-align: left;
		font-size: 30upx;
		font-weight: 500;
		color: #0B0B0B;
	}
	.day span {
		font-size: 24upx;
		font-weight: bold;
	}
	.many {
		font-size: 24upx;
		color: #666;
		font-weight: 400;
		padding-top: 20upx;
	}
	.many span {
		font-size: 56upx;
		color: #0B0B0B;
		font-weight: bold;
	}
	.need-box {
		display: flex;
		justify-content: space-between;
		/* align-items: center; */
	}
	.need {
		font-size: 26upx;
		color: #000;
		padding: 26upx 0 42upx;
		text-align: left;
	}
	.time {
		text-align: left;
		font-size: 24upx;
		color: #666;
		margin-bottom: 20upx;
	}
	/* .time span {
		color: #000;
		font-weight: bold;
	} */
	
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.info-box {
		display: flex;
		align-items: center;
	}
	.img-box {
		width: 70upx;
		height: 70upx;
		/* background: #83A5FA;
		border-radius: 50%;
		overflow: hidden; */
		margin-right: 13upx;
	}
	.img-box image {
		width: 100%;
		height: 100%;
	}
	.info-name {
		font-size: 30upx;
		color: #1A1A1A;
	}
	.jine {
		font-size: 40upx;
		color: #FF5A1F;
		font-weight: bold;
	}
	.already {
		font-size: 22upx;
		color: #666;
		margin-bottom: 10upx;
	}
	.wode {
		margin: 116upx 40upx 38upx;
		font-size: 38upx;
		font-weight: bold;
		color: #1A1A1A;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.realTo {
		font-size: 32upx;
		color: #000000;
		font-weight: bold;
	}
	.choose-time {
		padding: 36upx 40upx;
		box-sizing: border-box;
		background: #FF5A1F;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		color: #fff;
		font-weight: bold;
		position: relative;
	}
	.time {
		text-align: left;
		font-size: 24upx;
		color: #999999;
	}
	.choose-time view {
		color: #FFFFFF;
		opacity: 0.6;
	}
/* 	#marker {
		height: 6upx;
		background: #fff;
		border-radius:3upx;
		position: absolute;
		bottom: 13upx;
		left: 70upx;
		width: 40upx;
		transition: all 0.5s;
	} */
	.active {
		color: #FFF;
		opacity: 1 !important;
	}
	.th-name {
		display: flex;
		justify-content: space-between;
		color: #999;
		font-size: 28upx;
		font-weight: bold;
		padding: 0 35upx;
		box-sizing: border-box;
		height: 90upx;
		line-height: 80upx;
		border-bottom: 1upx solid #E6E6E6;
		margin-top: 30upx;
	}
	.th-neirong {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 30upx;
		font-weight: bold;
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.th-neirong span {
		font-size: 24upx;
		color: #999;
		font-weight: 500;
	}
	
	.th-neirong .huanren {
		width: 100upx;
		height: 48upx;
		/* background: #FFE3D9; */
		border-radius: 24upx;
		line-height: 48upx;
		text-align: center;
		font-size: 28upx;
		/* color: #FF5A1F; */
	}
	.table-box {
		margin: 0 40upx;
		text-align: left;
	}
	/* tr:first-child {
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	} */
	table{
		border-collapse: collapse;
	}
	table tr th {
		color: #999;
		font-size: 28upx;
		font-weight: bold;
	}

	table tr td {
		color: #333;
		font-size: 30upx;
		font-weight: bold;
	}
	table tr {
		border-bottom: 1upx solid #E6E6E6;
		height: 120upx;
	}
	table tr:nth-child(1) {
		border-bottom: 1upx solid #E6E6E6;
		height: 80upx;
	}
	table tr th:nth-child(1) {
		padding-left: 35upx;
	}
	table tr th:nth-child(3) {
		padding-left: 16upx;
	}
	table tr th:nth-child(4) {
		text-align: right;
		padding-right: 35upx;
	}
	table tr td:nth-child(1) {
		text-align: left;
		width: 220upx;
	}
	table tr td:nth-child(1) span {
		font-size: 24upx;
		color: #999;
		font-weight: 500;
	}
	table tr td:nth-child(2) {
		width: 140upx;
		padding-left: 14upx;
	}
	
	table tr td:nth-child(4) {
		width: 108upx;
		text-align: center;
		font-size: 28upx;
		color: #FF5A1F;
	}
	table tr td:nth-child(4) view {
		width: 100%;
		height: 48upx;
		background: #FFE3D9;
		border-radius: 24upx;
		line-height: 48upx;
	}
	.more {
		font-size: 28upx;
		color: #666;
		margin-top: 20upx;
		text-align: center;
		/* margin-bottom: 60upx; */
		padding-bottom: 60upx;
	}
	.scroll-box {
		margin: 0 40upx;
	}
	.duoWuGe {
		margin-right: 0;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item_H {
		position: relative;
		display: inline-block;
		width: 118upx;
		height: 154upx;
		background: #333333;
		border-radius: 10upx;
		/* line-height: 300upx; */
		text-align: center;
		font-size: 26upx;
		color: #FFFFFF;
		margin-right: 20upx;
	}
	.week {
		margin: 24upx 0 16upx;
	}
	.hao {
		font-weight: bold;
		font-size: 36upx;
		line-height: 1em;
		margin-bottom: 8upx;
	}
	.yichang {
		background: #999;
		font-size: 20upx;
		display: inline-block;
		padding: 0 4upx;
		border-radius: 6upx;
	}
	.yichang1 {
		font-size: 20upx;
		display: inline-block;
		padding: 0 4upx;
		border-radius: 6upx;
	}
	.wuGe:nth-child(5) {
		margin-right: 0;
	}
	.isUsed {
		background: #F7F7F7;
		color: #CCCCCC;
	}
	.kexuan {
		background: #FF5A1F;
		/* box-shadow: 0 20upx 20upx #D63D06; */
	}
	.kexuan .yichang {
		background: #ccc;
	}
</style>
