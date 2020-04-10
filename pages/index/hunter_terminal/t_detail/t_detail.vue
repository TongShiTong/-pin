<template>
	<view class="content-box">
		<view class="main">
			<view class="campany">
				<view class="butie" v-if="detail.bounty_subsidy!=0">+{{detail.wage*detail.bounty_subsidy/100}}元补贴</view>
				<view class="name">{{detail.title}}</view>
				<view class="many">赏金：<span>{{detail.wage*detail.bounty_ratio/100}}</span><span style="font-weight: bold;font-size: 24upx;margin-left: 6upx;">元/天</span></view>
				<!-- <view class="day">{{detail.wage}}元/天</view> -->
			</view>
			<view class="need-box">
				<view class="need">杭州 | 需要{{detail.total}}人 | 零工 | {{detail.gender==1? "男":detail.gender==2? "女":"不限"}}</view>
			</view>
			<view class="day">薪资<span style="font-size: 40upx;font-weight: bold;margin-left: 38upx;margin-right: 6upx;">{{detail.wage}}</span><span>元/天</span></view>
			<!-- <view class="info">
				<view class="info-box">
					<view class="img-box"><image :src="userInfo.avatar" mode="aspectFill"></image></view>
					<view class="info-name">{{userInfo.nickname}}</view>
				</view>
			</view> -->
		</view>
		<view class="wode"><view>我的提报</view>
			<view style="font-size: 26upx;color: #666666;font-weight: 400;">总计{{itemsLists.length}}人</view>
		<!-- <view class="realTo">{{month}}</view> -->
		</view>
		<!-- <view class="scroll-box" :class="{duoWuGe:detail.dateList.length>5}">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" show-scrollbar="false">
				<view id="demo1" class="scroll-view-item_H uni-bg-red" v-for="(item,index) in detail.dateList" :key="index" :class="{wuGe:detail.dateList.length==5,isUsed:!item.isUsed,kexuan:itemIndex==index}" @tap="timeTab(index)">
					<view class="week">周{{item.week}}</view>
					<view class="hao">{{item.day}}</view>
				</view>
			</scroll-view>
		</view> -->
		<!-- <view class="choose-time">
			<view @tap="chooseTime(1)" :class="{'active':today}">{{jobData.job_start_date}}</view>
			<view @tap="chooseTime(2)" :class="{'active':tomorrow}">{{date2}}</view>
			<view @tap="chooseTime(3)" :class="{'active':acquired}">{{date3}}</view>
		</view> -->
		<view class="table-box">
			<view class="th-name">
				<view>姓名</view>
				<view>性别</view>
				<view>电话号</view>
				<view>状态</view>
				<view>权限</view>
			</view>
			<view class="th-neirong" v-for="(item, index) in itemsLists" :key="index">
				<view style="width: 180upx;">{{item.worker.name}}<span>{{item.worker.idcard.substr(-4)}}</span></view>
				<view style="width: 60upx;text-align: left;">{{item.worker.gender=='1'? "男":"女"}}</view>
				<view style="width: 148upx;height: 60upx;background: #FFE3D9;color: #FF5A1F;border-radius: 30upx;line-height: 60upx; text-align: center;margin: 0 20upx;font-size: 28upx;" @tap="callPhone" :data-ph="item.worker.mobile"><image style="width: 24upx;height: 26upx;margin-right: 6upx;" src="/static/other/dianhua-logo2x.png"></image>联系ta</view>
				<view style="width:120upx;text-align: center;">未开始</view>
				<view class="huanren" v-if="date11<date12" @tap="cancel" :data-jobs_id="item.jobs_id" :data-worker_id="item.worker_id" :data-index="index">撤回</view>
				<view class="huanren1" v-else>撤回</view>
			</view>
		
		</view>
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
			<view class="more" v-else>没有更多了！</view>
		</view>
		<view class="more" v-else>暂无数据</view>
		<view class="jixutb-box" v-if="itemsLists.length<task.total">
			<view class="jixutb" @tap="openinfoTalent">继续提报</view>
		</view>
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
				month:'',
				lodingLock: false,
				itemid:'',
				detail:{
					wage:0,
					bounty_subsidy:0,
					bounty_ratio:0,
					dateList:[]
				},
				itemIndex:0,
				jobData: {},
				userInfo: {},
				task:{},
				date:'',
				date1:'',
				date11:'',
				date12:'',
				date2:'',
				date3:'',
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
		onReady() {
			
		},
		onLoad(e) {
			let that = this
			this.itemid=e.itemid
			// console.log(e)
			http.apiRequest({
				api: "/jobs/getJobDetail",
				method: "GET",
				data: {
					itemid: e.itemid
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						this.detail = res.data
						this.task = res.data.task
						console.log(this.detail)
						this.jobData = res.data.jobData
						this.userInfo = res.data.userInfo
						this.month = res.data.dateList[0].month
						var day1 = new Date();
						day1.setTime(day1.getTime()+24*60*60*1000);
						var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
						this.date1 = s1
						this.date11 = day1.getTime()
						this.date = this.jobData.job_start_date
						var day0 = new Date(this.jobData.job_start_date);
						this.date12 = day0.getTime()
						this.itemsList()
						
						if(this.jobData.days>=2){
							// 获取某天后天的时间
							var day2 = new Date(this.jobData.job_start_date);
							day2.setTime(day2.getTime()+24*60*60*1000);
							var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
							this.date2 = s2
						}
						if(this.jobData.days==3){
							var day3 = new Date(this.jobData.job_start_date);
							day3.setTime(day3.getTime()+24*60*60*1000*2);
							var s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
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
			uni.$on('report',()=>{
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.itemsList(() => {
					
				});
			})
			// this.itemsList()
		},
		methods: {
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
			// 提报人才
			openinfoTalent() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/talent_Report/talent_Report?itemid=' + this.itemid + '&pNum=' + this.task.total + '&gender=' + this.detail.gender
				});
			},
			//打电话
			callPhone(e) {
				// console.log(e)
				var phone = e.currentTarget.dataset.ph
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				// console.log(that.itemid)
				http.apiRequest({
					api: "/worker_report/getJobWorker",
					method: "GET",
					data: {
						jobs_id: that.itemid,
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
			// 撤销已提报的人才
			cancel(e) {
				// console.log(e)
				var that=this;
				var jobs_id = e.currentTarget.dataset.jobs_id;
				var item_index = e.currentTarget.dataset.index;
				var worker_id = e.currentTarget.dataset.worker_id
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '你确定要撤回吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							http.apiRequest({
								api: "/worker_report/partTimeCancel",
								method: "GET",
								data: {
									jobs_id: jobs_id,
									worker_id: worker_id
								},
								secuss: (res, httpStatus) => {
									if (res.code == 1) {
										uni.$emit('cancel',{})
										that.itemsLists.splice(item_index, 1);
										uni.showToast({
											title: "撤回成功"
										});
										// console.log(res)		
									}
								},
								error: (res, httpStatus) => {
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
			}
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		padding-top: 60upx;
		position: relative;
	}
	.main {
		padding: 10upx 40upx 50upx 40upx;
		box-sizing: border-box;
		background: #fff;
		margin: 0 auto;
		margin-bottom: 16upx;
		box-shadow: 0 20upx 20upx #E6E6E6;
		position: relative;
	}
	.campany {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 50upx;
		color: #000000;
		font-weight: bold;
		position: relative;
	}
	.butie {
		/* width: 102upx; */
		/* height: 34upx; */
		position: absolute;
		top: -4upx;
		right: 0upx;
		background: url(../../../../static/butie.png) no-repeat;
		background-size: 100% 100%;
		font-size: 20upx;
		color: #E50000;
		line-height: 1em;
		padding: 5upx 10upx 10upx;
	}
	.name {
		text-align: left;
		max-width: 430upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient: vertical;
	}
	.active {
		color: #FFF;
		opacity: 1 !important;
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
	}
	
	.info {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 20upx;
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
		color: #000;
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
	/* 	position: absolute;
		top: -60upx;
		right: 0; */
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
	.choose-time view {
		color: #FFFFFF;
		opacity: 0.6;
	}
	#marker {
		height: 6upx;
		background: #fff;
		border-radius:3upx;
		position: absolute;
		bottom: 13upx;
		left: 70upx;
		width: 40upx;
		transition: all 0.5s;
	}
	/* #ifdef APP-PLUS */
	.choose-time view:nth-child(1):hover~#marker {
		transform: translate(0upx, 0);
	}
	.choose-time view:nth-child(2):hover~#marker {
		transform: translate(280upx, 0);
	}			
	.choose-time view:nth-child(3):hover~#marker {
		transform: translate(560upx, 0);
	}
	/* #endif */
	/* #ifdef H5 */
	.choose-time view:nth-child(1):hover~#marker {
		transform: translate(0upx, 0);
	}
	.choose-time view:nth-child(2):hover~#marker {
		transform: translate(280upx, 0);
	}			
	.choose-time view:nth-child(3):hover~#marker {
		transform: translate(560upx, 0);
	}
	/* #endif */
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
		/* justify-content: space-between; */
		align-items: center;
		color: #1A1A1A;
		font-size: 30upx;
		/* font-weight: bold; */
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.th-neirong span {
		font-size: 24upx;
		color: #999;
		font-weight: 500;
	}
	
	.th-neirong .huanren {
		width: 108upx;
		height: 60upx;
		background: #FFE3D9;
		border-radius: 30upx;
		line-height: 60upx;
		text-align: center;
		font-size: 28upx;
		color: #FF5A1F;
	}
	.th-neirong .huanren1 {
		width: 108upx;
		height: 60upx;
		background: #f2f2f2;
		border-radius: 30upx;
		line-height: 60upx;
		text-align: center;
		font-size: 28upx;
		color: #ccc;
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
		padding-bottom: 180upx;
	}
	.jixutb-box {
		width: 670upx;
		height: 120upx;
		position: fixed;
		bottom: 0;
		margin: 0 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 60upx;
		font-size: 26upx;
		color: #1A1A1A;
	}
	.jixutb {
		width: 560upx;
		height: 94upx;
		border-radius: 6upx;
		background: #FF5A1F;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #FFFFFF;
		margin-left: 30upx;
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
