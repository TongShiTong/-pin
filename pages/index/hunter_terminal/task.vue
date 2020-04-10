<template>
	<view class="content-box">
		<view class="xingzhi-box">
			<view class="xingzhixz">
				<view class="gwxz1" v-for="(item,i) in xingzhi" :key="'01'+i" :class="{gwxz_active1:i==xzIndex}" @tap="xzXingzhi(i)">{{item}}</view>
			</view>
		</view>
		
		<view class="chooes" v-if="xzIndex==0">
			<view class="chooes-box">
<!-- 				<view style="background: #FF2727;width: 10upx;height: 10upx;border-radius: 50%;position: absolute;top:0;right: 0;"></view> -->
				<uni-segmented-control :current="current" :color="true" :values="items" @clickItem="onClickItem" style-type="button" active-color="#666"></uni-segmented-control>
				<view v-if="statistics.daiyonggong_JobsTotal>0" style="background: #F54336;border-radius: 50%;position: absolute;top: 24upx;left: 248upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.daiyonggong_JobsTotal}}</view>
				<view v-if="statistics.yonggongzhong_JobsTotal>0" style="background: #F54336;border-radius: 50%;position: absolute;top: 24upx;left: 396upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.yonggongzhong_JobsTotal}}</view>
				<view v-if="statistics.daijiesuan_JobsTotal>0" style="background: #F54336;border-radius: 50%;position: absolute;top: 24upx;left: 544upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.daijiesuan_JobsTotal}}</view>
				<view v-if="statistics.wancheng_JobsTotal>0" style="background: #F54336;border-radius: 50%;position: absolute;top: 24upx;right: 20upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.wancheng_JobsTotal}}</view>
			</view>
			<view style="height: 296upx;"></view>
			<VuePullRefresh :on-refresh="onRefresh">
			<view class="content">
				<view class="main" v-for="(item,index) in itemsLists" :key="index">
					<view class="zhuangtai">
						<view class="m-baos">我的报送 <span>{{item.report_num}}<span class="report-num">/{{item.task_total}}</span></span></view>
						<view class="status-box">
							<view v-if="item.job_status==4" class="zongqian">￥{{item.amountTotal}}</view>
							<view v-else-if="item.job_status==5" class="zongqian">￥{{item.amountTotal}}</view>
							<view v-else></view>
							<view class="status" v-if="item.job_status==2">{{item.job_status_text}}</view>
							<view class="status" v-else-if="item.job_status==3">{{item.job_status_text}}</view>
							<view class="status" v-else-if="item.job_status==4">{{item.job_status_text}}</view>
							<view class="status" v-else-if="item.job_status==5">{{item.job_status_text}}</view>
							<view class="status" v-else>已失效</view>
						</view>
					</view>
					<view @tap="openinfo" :data-itemid="item.jobs_id" :data-index="index">
					<view class="campany">
						<view class="name-box">
							<view class="name">{{item.job.title}}</view>
							<view class="jz-logo">零工</view>
						</view>
						<view class="many">
							<view class="butie" v-if="item.bounty_subsidy!=0">+{{Math.round((item.wage*item.bounty_subsidy/100) * 100) / 100}}元补贴</view>
							<view class="logo-box"><image src="/static/shang.png"></image></view>
							<view>{{Math.round((item.wage*item.bounty_ratio/100) * 100) / 100}}</view>
							<view class="day">元/天</view>
						</view>
	
					</view>
					<view class="need-box">
						<view class="need">杭州 | 需要{{item.total}}人</view>
						<!-- <view class="many">赏金：<span>{{item.wage*item.bounty_ratio/100}}元/天</span></view> -->
					</view>
					<view class="time-box">
						<view class="time">工作时间：<span>{{item.job_start_date}}&nbsp; {{item.interviewtime}}</span></view>
						<!-- <view class="lave">剩余：{{item.remaining}}</view> -->
					</view>
					<view class="wage">{{item.job.wage}}<span style="font-size: 22upx;margin-left: 10upx;">元/天</span></view>
					
					<!-- <view class="time"><span style="background: #FFE3D9;border-radius:2upx;padding: 0 10upx;margin-right: 18upx;">{{item.jobData.job_start_date}} {{item.interviewtime}}</span> <span style="background: #FFE3D9;border-radius: 2upx;padding: 0 12upx;margin-right: 18upx;">{{item.jobData.days}}天</span> <span style="background: #FFE3D9;border-radius: 2upx;padding: 0 12upx;">{{item.worktime}}小时/天</span></view> -->
					</view>

					<view class="info">
						<view class="info-box">
							<view class="img-box"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
							<view class="info-name">{{item.userInfo.nickname}}</view>
						</view>
						<view style="display: flex;" v-if="item.job_status==2">
							<view class="tibao" style="margin-right: 10upx;" @tap="reportNum" :data-itemid="item.jobs_id">人才提报</view>
							<!-- <view class="tibao" @tap="openinfoTalent" :data-itemid="item.id" :data-pNum="item.task_total" >提报人才</view> -->
						</view>
						<view class="tibao" v-else-if="item.job_status==3" @tap="attend" :data-itemid="item.id">查看考勤</view>
						<view class="tibao" v-else-if="item.job_status==4" @tap="billingDetail" :data-itemid="item.id" :data-end="'2'" :data-appeal="'1'">查看明细</view>
						<view class="tibao" v-else-if="item.job_status==5" @tap="billingDetail" :data-itemid="item.id" :data-end="'2'">查看明细</view>
						<view v-else></view>
					</view>
				</view>
				<view v-if="itemsLists.length>0">
					<view class="more" @tap="itemsListMore"  v-if="nextPage>0" style="margin-top: 30upx;">查看更多</view>
					<view class="more" v-else style="margin-top: 30upx;">没有更多了！</view>
				</view>
				<view class="more1" v-else>
					<view v-if="isShowChahua">
						<view style="margin: 120upx 0 30upx;"><image style="width: 600upx;height: 600upx;" src="/static/taskQueS.png"></image></view>
						<view style="text-align: center;font-size: 32upx;color: #1A1A1A;">您暂时还没有相关的任务</view>
					</view>
				</view>
			</view>
			</VuePullRefresh>
		</view>
		<view v-else>
			<view style="height: 200upx;"></view>
			<VuePullRefresh :on-refresh="onRefresh">
				<view class="content">
					<view class="main" v-for="(item,index) in itemsLists" :key="index">
						<view class="zhuangtai">
							<view class="m-baos">入职人数 <span>{{item.onboardingTotal}}<span class="report-num">/{{item.total}}</span></span></view>
							<view class="status-box">
								<view class="status" v-if="item.margin_status==1">未发布</view>
								<view class="status" v-else-if="item.margin_status==2&&item.isShow==1">招聘中</view>
								<view class="status" v-else-if="item.margin_status==2&&item.isShow==2">已下架</view>
								<view class="status" v-else>已结算</view>
							</view>
						</view>
						<view @tap="qzZhaopin" :data-itemid="item.jobs_id" :data-isjiesuan="item.margin_status">
						<view class="campany">
							<view class="name-box">
								<view class="name">{{item.title}}</view>
								<view class="jz-logo1">长工</view>
							</view>
				
							<view class="many1">
								<view class="logo-box"><image src="/static/shang.png"></image></view>
								<view>{{item.bounty}}*{{item.frequency}}</view>
							</view>
						<!-- 	<view class="name">{{item.title}}</view>
							<view class="day">{{item.wage}}元/天</view> -->
						</view>
						<view class="need-box">
							<view class="need">杭州 | 需要{{item.total}}人</view>
						</view>
						<view style="display: flex;" v-if="item.job_tags!=''">
							<view class="time-box1">
								<view class="jobtags" v-for="(val,i) in item.job_tags.split(',').slice(0,4)" :key="i">
									{{val}}
								</view>
							</view>
						</view>
						
						<view class="wage">{{item.salary}}</view>
						</view>
						<view class="info">
							<view class="info-box">
								<view class="img-box"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
								<view class="info-name">{{item.userInfo.nickname}}</view>
							</view>
							
							<view v-if="item.remaining>0">
								<view v-if="item.isShow=='1'" class="tibao" @tap="qzTibaorc" :data-itemid="item.jobs_id">提报人才</view>
							</view>
						</view>
					</view>
					
					<view v-if="itemsLists.length>0">
						<view class="more" @tap="qzitemsListMore"  v-if="nextPage>0">查看更多</view>
						<view class="more" v-else>没有更多了！</view>
					</view>
					<view class="more1" v-else>
						<view v-if="isShowChahua">
							<view style="margin: 120upx 0 30upx;"><image style="width: 600upx;height: 600upx;" src="/static/taskQueS.png"></image></view>
							<view style="text-align: center;font-size: 32upx;color: #1A1A1A;">您暂时还没有相关的任务</view>
						</view>
					</view>
				
				</view>
			</VuePullRefresh>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-controls/uni-segmented-control.vue'
	import http from '@/tools/utils/http.js';
	import VuePullRefresh from 'vue-pull-refresh';
	export default {
	    components: {uniSegmentedControl,VuePullRefresh},
		data() {
			return {
				qzlodingLock:false,
				gztype:1,
				xzIndex:0,
				xingzhi: ['零工','长工'],
				items: ['全部','提报中','工作中','待结算','已结算'],
				current: 0,
				current1:0,
				itemsLists:[],
				lodingLock: false,
				isShowChahua: true,
				statistics:{},
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
		mounted() {
			let that = this
			uni.showLoading({
				title: '加载中...',
			});
			this.isShowChahua = false
			that.itemsList(() => {
				
			});
			this.userStatistics()
			uni.$on('report',()=>{
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.itemsList(() => {
					
				});
			})
			uni.$on('cancel',()=>{
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.itemsList(() => {
					
				});
			})
			// uni.$on('cancel',{
			// 	that.itemsLists = [];
			// 	that.page= 1;
			// 	that.nextPage= 1;
			// 	that.status= 'more';
			// 	that.itemsList(() => {
					
			// 	});
			// })
		},
	
		methods: {
			// 查看长工任务详情
			qzZhaopin(e) {
				var itemid = e.currentTarget.dataset.itemid
				var isjiesuan = e.currentTarget.dataset.isjiesuan
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/qz_t_detail/qz_t_detail?itemid=' + itemid + '&isjiesuan=' + isjiesuan
				});
			},
			// 提报人才
			qzTibaorc(e) {
				var itemid = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/qz_t_report/qz_t_report?itemid=' + itemid
				});
			},
			// 选择类型
			xzXingzhi(i) {
				this.xzIndex = i
				this.gztype = i+1
				if(i==0) {
					let that = this
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.isShowChahua = false
					that.itemsList(() => {
						
					});
				} else if(i==1) {
					let that = this
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.isShowChahua = false
					that.qzitemsList(() => {
						
					});
				}
			},
			onClickItem(index) {
				// console.log(index)
				this.isShowChahua = false
				// if (this.current !== index) {
					if(index==0) {
						this.current1 = index
					}else {
						this.current1 = index+1;
					}
					// console.log(this.current1)
					let that = this;
					this.current = index;
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.itemsList(() => {
								
					});
				// }
			},
			// 下拉的时候触发函数
		    onRefresh: function() {
				let that = this
				 if(this.xzIndex==0) {
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.isShowChahua = false
					that.itemsList(() => {
						
					});
				 } else if(this.xzIndex==1) {
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.isShowChahua = false
					that.qzitemsList(() => {
						
					});
				 }
		    },
			// 返回
			back() {
				history.back()
			},
			userStatistics() {
				http.apiRequest({
					api: "/common/getUserStatistics",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.statistics=res.data.result
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
			// 跳到结算明细详情页
			billingDetail(e) {
				var itemId = e.currentTarget.dataset.itemid
				var end = e.currentTarget.dataset.end
				var appeal = e.currentTarget.dataset.appeal
				if(appeal==1){
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/billing_details/billing_details?appeal=1&itemid=' + itemId + '&end=' + end
					});
				}else {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/billing_details/billing_details?itemid=' + itemId + '&end=' + end
					});
				}
			},
			// 跳到考勤信息
			attend(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/attend/attend?itemid=' + itemId
				});
			},
			itemsList(collback) {
				this.userStatistics()
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/jobs/getJobTask",
					method: "GET",
					data: {
						// uid: uni.getStorageSync('user_id'),
						page: that.nextPage,
						status: parseInt(that.current1)
					},
					secuss: (res, httpStatus) => {
						uni.hideLoading();
						that.lodingLock = false;
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							// that.itemsLists = res.data.rows
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							console.log(that.itemsLists)
							if(that.itemsLists.length==0) {
								this.isShowChahua=true
							}
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
						uni.hideLoading();
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
			// 获取长工提报列表
			qzitemsList(collback) {
				this.userStatistics()
				let that = this;
				if (this.qzlodingLock) {
					return;
				}
				this.qzlodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/jobs/getJobTaskFull",
					method: "GET",
					data: {
						// uid: uni.getStorageSync('user_id'),
						page: that.nextPage,
						// status: parseInt(that.current1)
					},
					secuss: (res, httpStatus) => {
						uni.hideLoading();
						that.qzlodingLock = false;
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							// that.itemsLists = res.data.rows
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							console.log(that.itemsLists)
							if(that.itemsLists.length==0) {
								this.isShowChahua=true
							}
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
						uni.hideLoading();
						if (that.nextPage > 0) {
							that.status = "more"
						} else {
							that.status = "nomore"
						}
						that.qzlodingLock = false;
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
					// uni.showToast({
					// 	title: "没有更多了哦！",
					// });	
				}
			},
			// 报送的人数
			reportNum(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/t_detail/t_detail?itemid=' + itemId
				});
			},
			//跳到岗位详情
			openinfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				var index = e.currentTarget.dataset.index
				if(this.itemsLists[index].job_status==2){
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/index/hunter_terminal/p_detail/p_detail?status=2&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==3) {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/index/hunter_terminal/p_detail/p_detail?status=3&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==4) {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/index/hunter_terminal/p_detail/p_detail?status=4&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==5) {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/index/hunter_terminal/p_detail/p_detail?status=5&itemid=' + itemId
					});
				}else {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/index/hunter_terminal/p_detail/p_detail?itemid=' + itemId
					});
				}
			},
			openinfoTalent(e) {
				console.log(e)
				var pNum = e.currentTarget.dataset.pnum
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/talent_Report/talent_Report?itemid=' + itemId + '&pNum=' + pNum
				});
			}
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		background:#F7F7F7;
		position: relative;
		min-height: 91vh;
		/* padding-bottom: 60upx; */
	}
	.hader {
		padding: 67upx 40upx 27upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36upx;
		color: #1A1A1A;
		font-weight: bold;
		background: #fff;
		width: 335px;
		position: fixed;
		z-index: 1;
	}
	.source {
		font-size: 28upx;
		color: #333;
		font-weight: 400;
	}
	.chooes-box {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0upx 50upx 0;
		box-sizing: border-box;
		/* border-bottom: 1upx solid #F4F4F4;
		background: #fff; */
		background: #f7f7f7;
		/* padding-top: 88upx; */
		position: fixed;
		z-index: 1;
		width: 100%;
		top: 172upx;
	}
	.main {
		padding: 0upx 30upx 40upx;
		margin: 0 20upx 10upx;
		background: url(../../../static/other/zu63.png) no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		/* border-bottom: 16upx solid #f5f5f5; */
	}
	.zhuangtai {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* background: url(../../../static/other/zu62.png) no-repeat;
		background-size: 100% 100%; */
		/* width: 710upx; */
		height: 126upx;
		/* transform: translateX(-30upx); */
	}
	.status-box {
		display: flex;
		align-items: center;
	}
	.status {
		font-size: 26upx;
		color: #F54336;
	}
	.status1 {
		font-size: 26upx;
		color: #fff;
		background: #FF5A1F;
		width: 192upx;
		height: 54upx;
		border-radius: 27upx;
		overflow: hidden;
		text-align: center;
		line-height: 54upx;
	}
	.campany {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
		margin-top: 30upx;
	}
	.name-box {
		display: flex;
		align-items: center;
	}
	.name {
		text-align: left;
		max-width: 330upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient: vertical;
	}
	.jz-logo {
		width: 70upx;
		height: 34upx;
		background: #22e379;
		border-bottom-left-radius: 20upx;
		margin-left: 10upx;
		margin-top: 4upx;
		font-size: 24upx;
		color: #fff;
		text-align: center;
		line-height: 34upx;
	}
	.jz-logo1 {
		width: 70upx;
		height: 34upx;
		background: #3838EB;
		border-bottom-left-radius: 20upx;
		margin-left: 10upx;
		margin-top: 4upx;
		font-size: 24upx;
		color: #fff;
		text-align: center;
		line-height: 34upx;
	}
	.logo-box {
		width: 42upx;
		height: 42upx;
		margin-right: 15upx;
	}
	.logo-box image {
		width: 100%;
		height: 100%;
	}
	.day {
		font-size: 22upx;
		color: #fff;
		margin-left: 6upx;
		margin-top: 4upx;
	}
	.wage {
		font-size: 40upx;
		font-weight: bold;
		color: #FF5A1F;
		text-align: left;
		margin: 16upx 0;
	}
	.many {
		position: relative;
		width: 228upx;
		height: 84upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF6A35;
		border-bottom-left-radius: 40upx;
		border-bottom-right-radius: 40upx;
		font-size: 36upx;
		font-weight: bold;
		color: #fff;
		/* box-shadow: 0 16upx 24upx #fccdc9; */
		box-shadow: 0 20upx 56upx #ffdcce;
		padding-top: 16upx;
		box-sizing: border-box;
	}
	.many1 {
		position: relative;
		width: 228upx;
		height: 84upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF6A35;
		border-bottom-left-radius: 40upx;
		border-bottom-right-radius: 40upx;
		font-size: 36upx;
		font-weight: bold;
		color: #fff;
		/* box-shadow: 0 16upx 24upx #fccdc9; */
		box-shadow: 0 20upx 56upx #ffdcce;
		box-sizing: border-box;
	}
	.butie {
		/* width: 102upx; */
		/* height: 34upx; */
		position: absolute;
		top: -4upx;
		right: 12upx;
		background: url(../../../static/butie.png) no-repeat;
		background-size: 100% 100%;
		font-size: 20upx;
		color: #E50000;
		line-height: 1em;
		padding: 5upx 10upx 10upx;
	}
	
	.need-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.need {
		font-size: 26upx;
		color: #666666;
		padding: 12upx 0 20upx;
		text-align: left;
	}
	.time-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.time-box1 {
		display: flex;
		align-items: center;
		font-size: 24upx;
		color: #FF5A1F;
		font-weight: 500;
		padding: 7upx 14upx 7upx 7upx;
		line-height: 1em;
		border: 1upx solid #FFE3D9;
		border-radius: 3upx;
	}
	.jobtags {
		margin-right: 20upx;
	}
	.time-box1 .jobtags:last-child {
		margin-right: 0;
	}
	.time {
		text-align: left;
		font-size: 26upx;
		color: #666;
		font-weight: 400;
		background: #FFF4F0;
		padding: 2upx 10upx 2upx 6upx;
	}
	
	.people-num {
		margin-top: 14upx;
		margin-bottom: 14upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.people-box {
		/* margin-right: 120upx; */
	}
	.people {
		font-size: 24upx;
		color: #6c70e9;
		font-weight: bold;
		/* padding-bottom: 16upx; */
	}
	.num {
		font-size: 36upx;
		font-weight: bold;
		color: #FF5A1F;
	}
	.zongqian {
		font-size: 46upx;
		color: #000;
		font-weight: bold;
		margin-right: 22upx;
	}
	.m-baos {
		font-size: 34upx;
		color: #000;
		font-weight: 500;
		/* text-align: left; */
		/* margin-bottom: 28upx; */
		/* margin-bottom: 60upx;
		margin-top: 40upx; */
	}
	
	.m-baos span {
		font-size: 40upx;
		color: #000;
		font-weight: bold;
		margin-left: 24upx;
	}
	.m-baos span .report-num {
		font-size: 28upx;
		margin-left: 0upx;
	}
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
		width: 60upx;
		height: 60upx;
		background: #C9C9C9;
		border-radius: 10upx;
		overflow: hidden;
		/* border-radius: 50%;
		overflow: hidden; */
		margin-right: 25upx;
	}
	.img-box image {
		width: 100%;
		height: 100%;
	}
	.info-name {
		font-size: 30upx;
		color: #000000;
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
	.tibao {
		font-size: 26upx;
		color: #000;
		/* background: #FF5A1F; */
		width: 160upx;
		height: 60upx;
		border-radius: 35upx;
		overflow: hidden;
		text-align: center;
		line-height: 60upx;
		border: 2upx solid #FF5A1F;
	}
	.more {
		font-size: 28upx;
		color: #666;
		margin-top: 60upx;
		text-align: center;
		margin-bottom: 60upx;
	}
	.more1 {
		font-size: 28upx;
		color: #666;
		text-align: center;
		/* background: #fff; */
		padding-bottom: 90upx;
	}
	.xingzhi-box {
		background: #F7F7F7;
		padding: 100upx 40upx 0;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		z-index: 1;
	}
	.xingzhixz {
		display: flex;
		align-items: center;
		width: 280upx;
		background: #FFFFFF;
		color: #000000;
		border-radius: 36upx;
	}
	.gwxz {
		width: 108upx;
		height: 54upx;
		border-radius: 28upx;
		text-align: center;
		line-height: 56upx;
		margin-right: 30upx;
		font-size: 34upx;
		border: 1px solid #FFE3D9;
	}
	.gwxz1 {
		width: 140upx;
		height: 72upx;
		border-radius: 36upx;
		text-align: center;
		line-height: 72upx;
		font-size: 34upx;
		transition:width 1s ease,color 1s ease;
		/* border: 1px solid #FFE3D9; */
	}
	.gwxz-box1 .gwxz:nth-child(3) {
		margin-right: 0upx;
	}
	
	.gwxz_active1 {
		width: 200upx;
		height: 72upx;
		background: #FF5A1F;
		color: #FFFFFF;
		border: none;
	}
</style>
