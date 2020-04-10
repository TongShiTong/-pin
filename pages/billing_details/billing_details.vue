<template>
	<view class="content-box">
		<view class="main">
			<view class="campany">
				<view class="butie" v-if="end==2&&detail.bounty_subsidy!=0">+{{detail.wage*detail.bounty_subsidy/100}}元补贴</view>
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
		<uni-segmented-control class="wode" :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#666"></uni-segmented-control>
		<view v-show="current === 0">
			<view class="table-box">
				<view class="th-name">
					<view>姓名</view>
					<view>薪酬(元/天)</view>
					<view>时长(天)</view>
					<view>总计</view>
				</view>
				
				<view class="th-neirong" v-for="(item, index) in totalLists" :key="index">
					<view style="width: 200upx;">{{item.worker.name}}<span>{{item.worker.idcard.substr(-4)}}</span></view>
					<view style="font-size: 32upx;color: #666;">￥{{detail.wage}}</view>
					<view style="width: 206upx;text-align: center;font-size: 32upx;color: #666;">{{item.attendanceDays}}</view>
					<view style="padding-right: 32upx;">￥{{item.salary}}</view>
				</view>
				<view class="gongzi-box">
					<view class="gongzi">
						<view>工人工资：</view>
						<view class="zongji">￥{{totalSalary.salaryTotal}}</view>
					</view>
					<view class="gongzi">
						<view>猎手赏金：</view>
						<view class="zongji">￥{{totalSalary.bounty}}</view>
					</view>
					<view class="gongzi" v-if="end==2&&detail.bounty_subsidy!=0">
						<view>平台补贴：</view>
						<view class="zongji">￥{{totalSalary.subsidy}}</view>
					</view>
					<view class="gongzi" v-if="end!=2">
						<view>定金：</view>
						<view class="zongji">-￥{{detail.margin}}</view>
					</view>
					<view v-if="((totalSalary.salaryTotal+totalSalary.bounty)-detail.margin)<0&&end!=2" style="font-size: 24upx;">您支付的定金大于用工费用，结算后{{Math.floor((Math.abs((totalSalary.salaryTotal+totalSalary.bounty)-detail.margin))*100)/100}}元将退还到您的余额中</view>
					<view class="gongzi1" v-if="end==2">
						<view>合计：</view>
						<view class="heji">￥{{Math.floor((Math.abs(totalSalary.salaryTotal+totalSalary.bounty+totalSalary.subsidy)) * 100) / 100}}</view>
					</view>
					<view class="gongzi1" v-else>
						<view>合计：</view>
						<view class="heji"><span v-if="((totalSalary.salaryTotal+totalSalary.bounty)-detail.margin)<0" style="font-size: 28upx;">退还至余额</span>￥{{Math.floor((Math.abs((totalSalary.salaryTotal+totalSalary.bounty)-detail.margin))*100)/100}}</view>
					</view>
				</view>

			</view>
		</view>
		<view v-show="current === 1" style="position: relative;">
			<view class="realTo">
				<!-- <view>应到：{{itemsTotal.total}}</view>
				<view>实到：{{itemsTotal.realTo}}</view> -->
				<view>{{month}}</view>
			</view>
			<view class="scroll-box" :class="{duoWuGe:detail.dateList.length>5}">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" show-scrollbar="false">
					<view id="demo1" class="scroll-view-item_H uni-bg-red" v-for="(item,index) in detail.dateList" :key="index" :class="{wuGe:detail.dateList.length==5,isUsed:!item.isUsed,kexuan:itemIndex==index}" @tap="timeTab(index)">
						<view class="week">周{{item.week}}</view>
						<view class="hao">{{item.day}}</view>
						<view class="yichang" v-if="itemsTotal.realTo<itemsTotal.total&&item.isUsed&&itemIndex==index">
							{{itemsTotal.total-itemsTotal.realTo}}个异常
						</view>
						<view v-else class="yichang1">
							
						</view>
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
					<view>姓名</view>
					<view>性别</view>
					<view>猎手</view>
					<view>状态</view>
					<view v-if="end==2">权限</view>
					<view v-else style="width: 70upx;"></view>
				</view>
				<view class="th-neirong2" v-for="(item, index) in itemsLists" :key="index">
					<view style="width: 180upx;">{{item.worker.name}}<span>{{item.worker.idcard.substr(-4)}}</span></view>
					<view style="width: 60upx;">{{item.worker.gender=='1'? "男":"女"}}</view>
					<view style="width: 180upx;text-align: center;">{{item.lieshou.username}}</view>
					<view class="huanren" v-if="item.isCheckIn==1">
						<view>已点名</view>
						<view class="huanren2" v-if="appeal==1&&end==2">申诉</view>
					</view>
					<view class="huanren" v-else>
						<view>未点名</view>
						<view v-if="item.appeal!=null&&end==2">
							<view v-if="item.appeal.check==1">
								<view v-if="item.cancelAppeal1" class="huanren1" @tap="usreCancelAppeal"  :data-itemid="item.id" :data-index="index">撤销申诉</view>
								<view class="huanren1" v-else @tap="usreAppeal"  :data-itemid="item.id" :data-index="index">申诉</view>
							</view>
							<view v-else-if="item.appeal.check==3">
								<view class="huanren1" v-if="!item.cancelAppeal" @tap="usreAppeal" :data-itemid="item.id" :data-index="index">重新申诉</view>
								<view class="huanren1" v-else @tap="usreCancelAppeal" :data-itemid="item.id" :data-index="index">撤销申诉</view>
							</view>
							<view v-else>
								<view class="huanren1" v-if="!item.cancelAppeal" @tap="usreAppeal" :data-itemid="item.id" :data-index="index">申诉</view>
								<view class="huanren1" v-else @tap="usreCancelAppeal" :data-itemid="item.id" :data-index="index">撤销申诉</view>
							</view>
						</view>
						<view v-else-if="item.appeal==null&&end==2">
							<view class="huanren1" v-if="end==2&&!item.cancelAppeal" @tap="usreAppeal" :data-itemid="item.id" :data-index="index">申诉</view>
							<view class="huanren1" v-else @tap="usreCancelAppeal" :data-itemid="item.id" :data-index="index">撤销申诉</view>
						</view>
					</view>
					<!-- <view class="huanren" @tap="checkIn" :data-workid="item.worker_id" :data-index="index" v-else>{{date === date1 ? "点名" : "未点名" }}</view> -->
				</view>
			</view>
			<view v-if="itemsLists.length>0">
				<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
				<view class="more" v-else>没有更多了！</view>
			</view>
			<view class="more" v-else>暂无数据</view>
		</view>
		<view style="height: 200upx"></view>
		<view class="save-box1" v-if="end==1">
			<view></view>
		</view>
		<view class="save-box1" v-else-if="end==2">
			<view ></view>
		</view>
		<view class="save-box" v-else>
			<view class="save" @tap="billing">立即结算</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import http from '@/tools/utils/http.js'
	export default {
		components: {uniSegmentedControl},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				items: ['结算明细','考勤信息'],
				current: 0,
				cancelAppeal:false,//撤销申诉
				cancelAppeal1: true,
				today: false,
				tomorrow: false,
				acquired: false,
				itemIndex:0,
				itemsLists:[],
				totalLists:[],
				// dateList:[],
				month:'',
				lodingLock: false,
				itemid:'',
				status1:-1,
				itemsTotal:{},
				totalSalary:{
					salaryTotal:0,
					bounty:0,
					subsidy:0,
				},
				detail:{
					wage:0,
					margin:0,
					bounty_subsidy:0,
					bounty_ratio:0,
					dateList:[]
				},
				jobData: {},
				userInfo: {},
				page: 1,
				end:'',
				appeal:'',
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
		// mounted() {
		// 	this.totalList()
		// },
		onLoad(e) {
			this.itemid=e.itemid
			this.end=e.end
			this.appeal = e.appeal
			if(e.end==2&&e.appeal==1) {
				uni.setNavigationBarTitle({
					title: "待结算"
				})
			}else if(e.end==2&&e.appeal!=1) {
				uni.setNavigationBarTitle({
					title: "已结算"
				})
			}else if(e.end=='1') {
				uni.setNavigationBarTitle({
					title: "已结算"
				})
			}
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
						this.date = this.jobData.job_start_date
						this.month = res.data.dateList[0].month
						this.itemsList(() => {
							this.totalList()		
						});
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
						console.log(res)
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
			onClickItem(index) {
				if (this.current !== index) {
					let that = this;
					this.current = index;
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
			// 获取考勤列表
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
							that.itemsTotal = res.data
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							for(let i=0;i<that.itemsLists.length;i++) {
								let items = that.itemsLists[i];
								items.cancelAppeal=false//撤销申诉
								items.cancelAppeal1=true
							}
							console.log('bbb',that.itemsLists)
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
			// 获取结算明细列表
			totalList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/worker_report/partTimeJobSummary",
					method: "GET",
					data: {
						jobs_id: that.itemid,
						page: that.nextPage,
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							that.totalSalary = res.data
							that.totalLists = that.totalLists.concat(res.data.rows);
							console.log('aaa',that.totalSalary)
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
			// 猎手申诉
			usreAppeal(e) {
				console.log(e)
				var itemId = e.currentTarget.dataset.itemid
				var index = e.currentTarget.dataset.index
				let that = this
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '确定进行申诉吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							http.apiRequest({
								api: "/appeal/postAppeal",
								method: "GET",
								data: {
									worker_report_id: itemId,
									work_date: that.date
								},
								secuss: function(res, httpStatus){
									let _this=that
									if (res.code == 1) {
										for(let i=0;i<that.itemsLists.length;i++) {
											let items = that.itemsLists[i];
											that.itemsLists[index].cancelAppeal = true
											that.itemsLists[index].cancelAppeal1 = true
											_this.$set(that.itemsLists,i,items);
										}
										console.log(res)
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			usreCancelAppeal(e) {
				let that = this
				var itemId = e.currentTarget.dataset.itemid
				var index = e.currentTarget.dataset.index
				uni.showModal({
					title: '提示',
					content: '确定撤销申诉吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							http.apiRequest({
								api: "/appeal/clearAppeal",
								method: "GET",
								data: {
									worker_report_id: itemId,
									work_date: that.date
								},
								secuss: (res, httpStatus) => {
									let _this=that
									if (res.code == 1) {
										for(let i=0;i<that.itemsLists.length;i++) {
											let items = that.itemsLists[i];
											that.itemsLists[index].cancelAppeal = false
											that.itemsLists[index].cancelAppeal1 = false
											_this.$set(that.itemsLists,i,items);
										}
										// that.cancelAppeal = false
										// that.cancelAppeal1 = false
										console.log(res)
									}else {
										console.log('123',res)
										//点名失败
										// uni.showToast({
										// 	title: res.mag
										// });
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
			},
			// 支付页
			billing() {
				http.apiRequest({
					api: "/order/partTimeLiquidationOrder",
					method: "GET",
					data: {
						jobs_id: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							// uni.showToast({
							// 	title: res.msg
							// });
							let orderId = res.data.orderData.order.id
							if(res.data.orderData.order.status==2) {
								uni.redirectTo({
									url: '/pages/pay_result/pay_result?orderid=' + orderId
								});
							}else {
								uni.navigateTo({
									// 传递在详情页接收
									url: '/pages/billing/billing?itemid=' + this.itemid
								});
							}
							console.log(res)
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
			// 对接点名接口
			checkIn(e) {
				let workid = e.currentTarget.dataset.workid
				let index = e.currentTarget.dataset.index
				console.log(e)
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
							console.log(res)
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
	}
	.main {
		padding: 60upx 40upx 50upx 40upx;
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
		position: relative;
	}
	.butie {
		/* width: 102upx; */
		/* height: 34upx; */
		position: absolute;
		top: -4upx;
		right: 0upx;
		background: url(../../static/butie.png) no-repeat;
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
	.time {
		text-align: left;
		font-size: 24upx;
		color: #999999;
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
		font-size: 24upx;
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
		margin-top: 116upx;
		margin-left: 40upx;
		/* margin-bottom: 38upx; */
		font-size: 30upx;
		font-weight: bold;
		color: #666;
	}
	.realTo {
		font-size: 32upx;
		color: #000000;
		font-weight: bold;
		display: flex;
		justify-content: flex-end;
		padding-bottom: 20upx;
		position: absolute;
		top: -60upx;
		right: 0;
	}
	.realTo view {
		padding-right: 40upx;
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
		color: #1A1A1A;
		font-size: 32upx;
		/* font-weight: bold; */
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.th-neirong2 {
		display: flex;
		/* justify-content: space-between; */
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
	.th-neirong2 span {
		font-size: 24upx;
		color: #999;
		font-weight: 500;
	}
	
	.th-neirong2 .huanren {
		width: 240upx;
		height: 48upx;
		/* background: #FFE3D9; */
		border-radius: 24upx;
		line-height: 48upx;
		text-align: center;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* color: #FF5A1F; */
	}
	
	.th-neirong2 .huanren1 {
		width: 120upx;
		height: 48upx;
		background: #FFE3D9;
		border-radius: 24upx;
		line-height: 48upx;
		text-align: center;
		font-size: 28upx;
		color: #FF5A1F;
	}
	.th-neirong2 .huanren2 {
		width: 120upx;
		height: 48upx;
		background: #f2f2f2;
		border-radius: 24upx;
		line-height: 48upx;
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
	.gongzi-box {
		width: 670upx;
		margin: 0 auto;
		padding: 40upx 40upx 40upx 43upx;
		box-sizing: border-box;
		background: #FFE3D9;
		font-size:28upx;
		color: #666;
		/* font-weight: bold; */
	}
	.gongzi {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30upx;
	}
	.gongzi1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 82upx;
	}
	.gongzi1 view {
		font-size: 32upx;
		color: #1A1A1A;
		font-weight: bold;
	}
	.zongji {
		font-size: 32upx;
		color: #1A1A1A;
		font-weight: bold;
	}
	.gongzi1 .heji {
		font-size: 36upx;
		color: #FF5A1F;
	}
	/* .heji span {
		font-size: 30upx;
		color: #666;
	} */
	.save-box {
		width: 100%;
		background: #ffffff;
		position: fixed;
		bottom: 0;
		height: 160upx;
		padding-top: 20upx;
		/* margin-left: -40upx; */
		display: flex;
		justify-content: center;
	}
	.save-box1 {
		height: 0px;
	}
	.save {
		width: 440upx;
		height: 94upx;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		/* position: fixed; */
		/* bottom: 80upx; */
		/* right: 40upx; */
		/* position: fixed;
		bottom: 86upx; */
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
