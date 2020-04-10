<template>
	<view class="content-box">
		<view class="xingzhi-box">
			<view class="xingzhixz">
				<view class="gwxz1" v-for="(item,i) in xingzhi" :key="'01'+i" :class="{gwxz_active1:i==xzIndex}" @tap="xzXingzhi(i)">{{item}}</view>
			</view>
		</view>
		
		<view class="chooes" v-if="xzIndex==0">
			<view class="chooes-box">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#fff"></uni-segmented-control>
				<view v-if="statistics.daifabu_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;left: 244upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.daifabu_JobsTotal}}</view>
				<view v-if="statistics.zhaopinzhong_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;left: 394upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.zhaopinzhong_JobsTotal}}</view>
				<view v-if="statistics.yonggongzhong_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;left: 542upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.yonggongzhong_JobsTotal}}</view>
				<view v-if="statistics.daijiesuan_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;right: 20upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.daijiesuan_JobsTotal}}</view>
			</view>
			<view style="height: 296upx;"></view>
			<view class="content">
				<!-- <view class="quanzhi">
					<view class="xqlx">
						<image src="/static/tishi-quanzhi.png"></image>
						<view style="font-size: 26upx;color: #000000;">长工功能即将上线，如有需求联系客服</view>
					</view>
					<view class="callme" @tap="callMe">联系我</view>
				</view> -->
				<VuePullRefresh :on-refresh="onRefresh">
					<view class="main" v-for="(item,index) in itemsLists" :key="index">
						<view class="zhuangtai">
							<view class="m-baos">已经提报 <span>{{item.worker_total}}<span class="report-num">/{{item.total-item.remaining}}</span></span></view>
							<view class="status-box">
								<view class="status" v-if="item.job_status==1">{{item.job_status_text}}</view>
								<view class="status" v-else-if="item.job_status==2">{{item.job_status_text}}</view>
								<view class="status" v-else-if="item.job_status==3">{{item.job_status_text}}</view>
								<view class="status" v-else-if="item.job_status==4">{{item.job_status_text}}</view>
								<view class="status" v-else-if="item.job_status==5">{{item.job_status_text}}</view>
								<view class="status" v-else>已失效</view>
							</view>
						</view>
						<view @tap="openinfo" :data-itemid="item.id" :data-index="index">
						<view class="campany">
							<view class="name-box">
								<view class="name">{{item.title}}</view>
								<view class="jz-logo">零工</view>
							</view>
							<view class="many">
								<view class="logo-box">赏</view>
								<view>{{Math.round((item.wage*item.bounty_ratio/100) * 100) / 100}}</view>
								<view class="day">元/天</view>
							</view>
						<!-- 	<view class="name">{{item.title}}</view>
							<view class="day">{{item.wage}}元/天</view> -->
						</view>
						<view class="need-box">
							<view class="need">杭州 | 需要{{item.total}}人</view>
						</view>
						<view class="time-box">
							<view class="time">工作时间：<span>{{item.jobData.job_start_date}}&nbsp; {{item.interviewtime}}</span></view>
							<!-- <view class="lave">剩余：{{item.remaining}}</view> -->
						</view>
						<view class="wage">{{item.wage}}<span style="font-size: 22upx;margin-left: 10upx;">元/天</span></view>
						<!-- <view class="people-num">
							<view class="people-box">
								<view class="people">提报人数</view>
								<view class="num">{{item.worker_total}}</view>
							</view>
							<view>
								<view class="people">接单人数</view>
								<view class="num">{{item.total-item.remaining}}</view>
							</view>
						</view> -->
						</view>
						<view class="info">
							<view class="info-box">
								<view class="img-box"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
								<view class="info-name">{{item.userInfo.nickname}}</view>
							</view>
							<view class="tibao" v-if="item.job_status==1" @tap="frontMoney" :data-itemid="item.id">支付定金</view>
							<view class="tibao" v-else-if="item.job_status==2" @tap="record" :data-itemid="item.id">查看提报</view>
							<view class="tibao" v-else-if="item.job_status==3" @tap="reportNum" :data-itemid="item.id">点名</view>
							<view class="tibao" v-else-if="item.job_status==4" @tap="billing" :data-itemid="item.id">
								<!-- <view @tap="billingDetail" :data-itemid="item.id">结算明细</view> -->
								结算
							</view>
							<view class="tibao" v-else-if="item.job_status==5" @tap="billingDetail" :data-itemid="item.id" :data-end="'1'">查看明细</view>
							<view v-else></view>
						</view>
					</view>
					
					<view v-if="itemsLists.length>0">
						<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
						<view class="more" v-else>没有更多了！</view>
					</view>
					<view class="more1" v-else>
						<view v-if="isShowChahua">
							<view style="margin: 60upx 0 30upx;" :class="{isqb:showAnniu}"><image style="width: 600upx;height: 600upx;" src="/static/taskQueS.png"></image></view>
							<view v-if="showAnniu" style="text-align: center;font-size: 32upx;color: #1A1A1A;">您暂未发布岗位需求</view>
							<view v-else style="text-align: center;font-size: 32upx;color: #1A1A1A;">您暂时还没有相关的任务</view>
							<view class="save" v-if="showAnniu" @tap="fabuGwei">
								发布岗位
							</view>
						</view>
					</view>
				</VuePullRefresh>
			</view>
		</view>
		<view class="chooes" v-else>
			<view class="chooes-box">
				<uni-segmented-control :current="current" :values="qzitems" @clickItem="qzonClickItem" style-type="button" active-color="#fff"></uni-segmented-control>	
				<view v-if="statistics.quanzhi_zhaopinzhong_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;left: 132upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.quanzhi_zhaopinzhong_JobsTotal}}</view>
				<view v-if="statistics.quanzhi_weifabu_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;left: 316upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.quanzhi_weifabu_JobsTotal}}</view>
				<view v-if="statistics.quanzhi_yixiajia_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;right: 204upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.quanzhi_yixiajia_JobsTotal}}</view>
				<view v-if="statistics.quanzhi_yiwanjie_JobsTotal>0" style="background: #330000;border-radius: 50%;position: absolute;top: 24upx;right: 20upx;z-index: 1;font-size: 20upx;font-weight: bold;color: #fff;line-height: 24upx;text-align: center;padding: 5upx 12upx;">{{statistics.quanzhi_yiwanjie_JobsTotal}}</view>
			</view>
			<view style="height: 296upx;"></view>
			<view class="content1">
				<view v-if="statistics.quanzhi_lizhishensu_Total>0&&closeTz==true">
					<view class="shensu">
						<view class="sstz">
							<image class="lz_logo" src="/static/lztz.png"></image>
							<view class="tzwenan">您有{{statistics.quanzhi_lizhishensu_Total}}条离职申诉，请及时处理！</view>
						</view>
						<view class="sstz">
							<image class="lz_logo" src="/static/lzxq.png" @tap="golzXq"></image>
							<view style="width: 2upx;height: 40upx;background: #999999;margin: 0 16upx;"></view>
							<image class="lz_logo" src="/static/lzsc.png" @tap="golzGb"></image>
						</view>
					</view>
					<view style="height: 82upx;"></view>
				</view>
				<VuePullRefresh :on-refresh="qzonRefresh">
					<view class="main" v-for="(item,index) in itemsLists" :key="index">
						<view class="zhuangtai">
							<view class="m-baos">已经提报 <span>{{item.workerReportTotal}}<span class="report-num">/{{item.total}}</span></span></view>
							<view class="status-box">
								<view class="status" v-if="item.margin_status==1">未发布</view>
								<view class="status" v-else-if="item.margin_status==2&&item.isShow==1">招聘中</view>
								<view class="status" v-else-if="item.margin_status==2&&item.isShow==2">已下架</view>
								<view class="status" v-else>已结算</view>
							</view>
						</view>
						<view @tap="qzOpeninfo" :data-itemid="item.id" :data-index="index">
						<view class="campany">
							<view class="name-box">
								<view class="name">{{item.title}}</view>
								<view class="jz-logo1">长工</view>
							</view>
							<view class="many">
								<view class="logo-box">赏</view>
								<view>{{item.bounty}}*{{full_bounty_sett}}</view>
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
							<view class="tibao" v-if="item.margin_status==1" @tap="qzWeifabu" :data-itemid="item.id">立即发布</view>
							<view class="tibao" v-else-if="item.margin_status==2&&item.isShow==1" @tap="qzZhaopin" :data-itemid="item.id">查看提报</view>
							<view class="tibao" v-else-if="item.margin_status==2&&item.isShow==2" @tap="qzXiajia" :data-itemid="item.id">任务详情</view>
							<view class="tibao" @tap="qzyJieSuan" :data-itemid="item.id" v-else>任务详情</view>
						</view>
					</view>
					
					<view v-if="itemsLists.length>0">
						<view class="more" @tap="qzitemsListMore"  v-if="nextPage>0">查看更多</view>
						<view class="more" v-else>没有更多了！</view>
					</view>
					<view class="more1" v-else>
						<view v-if="isShowChahua">
							<view style="margin: 60upx 0 30upx;" :class="{isqb:showAnniu}"><image style="width: 600upx;height: 600upx;" src="/static/taskQueS.png"></image></view>
							<view v-if="showAnniu" style="text-align: center;font-size: 32upx;color: #1A1A1A;">您暂未发布岗位需求</view>
							<view v-else style="text-align: center;font-size: 32upx;color: #1A1A1A;">您暂时还没有相关的任务</view>
							<!-- <view class="save" v-if="showAnniu" @tap="fabuGwei">
								发布岗位
							</view> -->
						</view>
					</view>
				</VuePullRefresh>
			</view>
		</view>
		<view v-show="linkIsShow">
		  <view class="hb_zzc">
			<view class="link_cons">
				<view class="cloose" @tap="showLinsk"><image style="width: 56upx;height: 56upx;" src="/static/close.png"></image></view>
				<view class="tankuang">你当前有<span style="color: #FC565B;font-size: 36upx;font-weight: bold;padding: 0 10upx;">{{statistics.yonggongzhong_JobsTotal}}</span>个任务未点名!</view>
				<view @tap="jinYong"><image style="width: 500upx;height: 192upx;margin-top: 172upx;" src="/static/other/anniu.png"></image></view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-controls/uni-segmented-control.vue';
	import http from '@/tools/utils/http.js';
	import VuePullRefresh from 'vue-pull-refresh';
	export default {
		components: {uniSegmentedControl,VuePullRefresh},
		props: {
			id: String,
			value: 0,
		},
		data() {
			return {
				closeTz:true,
				job_tags:[],
				full_bounty_sett:0,
				qzlodingLock:false,
				gztype:1,
				xzIndex:0,
				xingzhi: ['零工','长工'],
				items: ['全部','未发布','招聘中','用工中','待结算'],
				qzitems: ['招聘中','未发布','已下架','已结算'],
				current: 0,	
				qzcurrent:2,
				linkIsShow:false,
				isShowChahua: true,
				// offset:0,
				showAnniu:true,
				itemsLists:[],
				lodingLock: false,
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
			// this.userStatistics()
			if(this.id==3) {
				this.onClickItem(3)
				uni.setNavigationBarTitle({
					title: this.items[3]
				})
			}else if(this.id==4) {
				this.onClickItem(4)
				uni.setNavigationBarTitle({
					title: this.items[4]
				})
			}else {
				this.isShowChahua = false
				this.itemsList()
			}
			http.apiRequest({
				api: "/common/config",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						console.log(res)
						this.full_bounty_sett = res.data.config.full_bounty_sett
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
			uni.$on('onmove',()=>{
				let that = this
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.isShowChahua = false
				that.qzitemsList(() => {
					
				});
			})
			// uni.$on('xiajia',()=>{
			// 	let that = this
			// 	that.qzonClickItem(2)
			// })
		},
		
		methods: {
			// 到离职申诉列表
			golzXq() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/lz_shensu/lz_shensu'
				});
			},
			golzGb() {
				// setTimeout(()=>{
					this.closeTz = false
				// },1000)
			},
			// 到任务详情页面
			qzZhaopin(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/qz_renwu/qz_renwu?itemid=' + itemId
				});
			},
			// 已下架任务详情
			qzXiajia(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/qz_renwu/qz_renwu?xiajia=1&itemid=' + itemId
				});
			},
			// 已结算的
			qzyJieSuan(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/qz_renwu/qz_renwu?xiajia=2&itemid=' + itemId
				});
			},
			// 跳到支付页面
			qzWeifabu(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/qz_pay/qz_pay?itemid=' + itemId
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
				this.isShowChahua = false
				if(index==0) {
					this.showAnniu=true
				}else {
					this.showAnniu=false
				}
				let that = this;
				this.current = index;
				uni.setNavigationBarTitle({
					title: this.items[index]
				})
				that.nextPage = 1;
				that.itemsLists = [];
				that.itemsList(() => {
							
				});
			},
			qzonClickItem(index) {
				this.isShowChahua = false
				if(index==0) {
					this.showAnniu=true
				}else {
					this.showAnniu=false
				}
				let that = this;
				if(index==0) {
					this.qzcurrent = 2;
				}else if(index==1) {
					this.qzcurrent = 1;
				}else {
					this.qzcurrent = index+1;
				}
				uni.setNavigationBarTitle({
					title: this.qzitems[index]
				})
				that.nextPage = 1;
				that.itemsLists = [];
				that.qzitemsList(() => {
							
				});
			},
			// 跳到客服
			callMe() {
				uni.navigateTo({
					url: '/pages/index/enterprise_terminal/user/c_service/c_service',
				});
			},
			// 发布岗位
			fabuGwei() {
				uni.navigateTo({
					url: '/pages/index/enterprise_terminal/send_out',
				});
			},
			// 跳到今日用工页
			jinYong() {
				this.linkIsShow = false;
				this.$store.state.footer_store.now_page_index=0
				uni.redirectTo({
					url: '/pages/index/index?typeid=3&id=3',
				});
			},
			showLinsk: function () {
				this.linkIsShow = false;
			},
			 // 下拉的时候触发函数
		    onRefresh: function() {
				let that = this
		        that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.isShowChahua = false
				that.itemsList(() => {
					
				});
		    },
			// 下拉的时候触发函数
			qzonRefresh: function() {
				let that = this
			    that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.isShowChahua = false
				that.qzitemsList(() => {
					
				});
			},
		
			userStatistics() {
				http.apiRequest({
					api: "/common/getUserStatistics",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							this.statistics=res.data.result
							if (this.statistics.yonggongzhong_JobsTotal>0) {
								var day1 = new Date();
								day1.setTime(day1.getTime());
								var s1 = (day1.getMonth()+1) + day1.getDate();
								if(s1==uni.getStorageSync("s1")) {
									this.linkIsShow = false
								}else {
									this.linkIsShow = true
									uni.setStorageSync("s1",s1)
								}
							}
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
			// 跳到点名页
			reportNum(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/check_in/check_in?itemid=' + itemId
				});
			},
			// 跳到支付页面
			frontMoney(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/pay/pay?itemid=' + itemId
				});
			},
			// 跳到提报记录页
			record(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/record/record?itemid=' + itemId
				});
			},
			// 跳到结算明细详情页
			billingDetail(e) {
				var itemId = e.currentTarget.dataset.itemid
				var end = e.currentTarget.dataset.end
				// if(end==1) {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/billing_details/billing_details?itemid=' + itemId + '&end=' + end
					});
				// }else {
					// uni.navigateTo({
						// 传递在详情页接收
						// url: '/pages/billing_details/billing_details?itemid=' + itemId
					// });
				// }
			},
			// 结算
			billing(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/billing_details/billing_details?itemid=' + itemId
				});
			},
			itemsList(collback) {
				this.userStatistics()
				console.log(this.current)
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				// console.log('a',this.current)
				http.apiRequest({
					api: "/jobs/getEmployerJobsList",
					method: "GET",
					data: {
						uid: uni.getStorageSync('user_id'),
						page: that.nextPage,
						status: this.current
					},
					secuss: (res, httpStatus) => {
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
			// 获取长工列表
			qzitemsList(collback) {
				this.userStatistics()
				let that = this;
				if (this.qzlodingLock) {
					return;
				}
				this.qzlodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/jobs/getEmployerJobsListByFull",
					method: "GET",
					data: {
						uid: uni.getStorageSync('user_id'),
						page: that.nextPage,
						status: that.qzcurrent
					},
					secuss: (res, httpStatus) => {
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
					},
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
			// 获取长工更多
			qzitemsListMore(e) {
				let that = this;
				if (that.nextPage > 0) {
					// console.log(123,'2')
					that.qzitemsList(() => {
						
					});
				} else {
					// uni.showToast({
					// 	title: "没有更多了哦！",
					// });	
				}
			},
			//跳到岗位详情
			openinfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				var index = e.currentTarget.dataset.index
				if(this.itemsLists[index].job_status==1){
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/e_p_detail/e_p_detail?status=1&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==2) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/e_p_detail/e_p_detail?status=2&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==3) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/e_p_detail/e_p_detail?status=3&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==4) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/e_p_detail/e_p_detail?status=4&itemid=' + itemId
					});
				}else if(this.itemsLists[index].job_status==5) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/e_p_detail/e_p_detail?status=5&itemid=' + itemId
					});
				}else {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/e_p_detail/e_p_detail?itemid=' + itemId
					});
				}
			},
			//跳到长工岗位详情
			qzOpeninfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				var index = e.currentTarget.dataset.index
				if(this.itemsLists[index].margin_status==1){
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=1&itemid=' + itemId
					});
				}else if(this.itemsLists[index].margin_status==2&&this.itemsLists[index].isShow==1) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=2&itemid=' + itemId
					});
				}else if(this.itemsLists[index].margin_status==2&&this.itemsLists[index].isShow==2) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=3&itemid=' + itemId
					});
				}else {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=4&itemid=' + itemId
					});
				}
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
	}

	.chooes-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4upx 50upx 0;
		box-sizing: border-box;
		border-bottom: 1upx solid #F4F4F4;
		background: #FF5A1F;
		/* padding-top: 88upx; */
		position: fixed;
		z-index: 1;
		width: 100%;
		top: 168upx;
	}
	/* .main {
		padding: 20upx 40upx 0upx;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 16upx solid #F5F5F5;
	} */
	.quanzhi {
		height: 94upx;
		margin: 16upx 20upx;
		padding: 0 20upx;
		background: url(../../../static/1731.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.xqlx {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.xqlx image {
		width: 34upx;
		height: 34upx;
		margin-right: 16upx;
	}
	.callme {
		background: #F2B4CD;
		width: 112upx;
		height: 52upx;
		text-align: center;
		line-height: 52upx;
		font-size: 26upx;
		color: #000000;
		border-radius: 26upx;
	}
	.main {
		padding: 0upx 30upx 40upx;
		margin: 0 10upx;
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
	/* .status2 {
		font-size: 26upx;
		color: #fff;
		display: flex;
	}
	.status2 view {
		background: #FF5A1F;
		width: 192upx;
		height: 54upx;
		border-radius: 27upx;
		overflow: hidden;
		text-align: center;
		line-height: 54upx;
	} */
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
	.many {
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
	}
	.logo-box {
		border: 3upx solid #fff;
		font-size: 26upx;
		border-radius: 50%;
		padding: 4upx 8upx;
		margin-right: 16upx;
	}
	.day {
		font-size: 22upx;
		color: #fff;
		margin-left: 6upx;
		margin-top: 4upx;
	}
	.need-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.need {
		font-size: 26upx;
		color: #666666;
		padding: 16upx 0 16upx;
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
	.time {
		text-align: left;
		font-size: 26upx;
		color: #666;
		font-weight: 400;
		background: #FFF4F0;
		padding: 2upx 10upx 2upx 6upx;
	}
	.jobtags {
		margin-right: 20upx;
	}
	.time-box1 .jobtags:last-child {
		margin-right: 0;
	}
	.wage {
		font-size: 40upx;
		font-weight: bold;
		color: #FF5A1F;
		text-align: left;
		margin: 16upx 0;
	}
	/* .time span {
		color: #000000;
		font-weight: bold;
	} */
	.people-num {
		margin-top: 14upx;
		/* margin-left: 14upx; */
		margin-bottom: 14upx;
		display: flex;
	}
	.people-box {
		margin-right: 100upx;
	}
	.people {
		font-size: 24upx;
		color: #6c70e9;
		/* padding-bottom: 16upx; */
		font-weight: bold;
	}
	.num {
		font-size: 40upx;
		color: #FF5A1F;
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
		margin-top: 30upx;
		text-align: center;
		/* margin-bottom: 60upx; */
		padding-bottom: 60upx;
		/* padding-top: 40upx; */
	}
	.more1 {
		font-size: 28upx;
		color: #666;
		padding-top: 60upx;
		text-align: center;
		background: #F7F7F7;
		/* padding-bottom: 490upx; */
	}
	.isqb {
		margin-top: 0 !important;
	}
	.hb_zzc{position: fixed;width: 100%;height: 100%;left: 0;top:0;background: rgba(0,0,0,0.5);display: flex;align-items: center;justify-content: center;z-index: 1000;}
	.link_cons{width: 80%;height: 720upx; border-radius: 40upx;background: #fff;position: relative; background: url(../../../static/other/tankuang.png) no-repeat;background-size: 600upx 400upx;}
	.cloose {
		position: absolute;
		top: -106upx;
		right: 0;
	}
	.tankuang {font-size: 32upx;color: #fff;margin-top: 220upx;letter-spacing: 2upx;}
	.link_cons>image{width: 100%; overflow: hidden;}
	.save {
		height: 94upx;
		width: 440upx;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		margin: 160upx auto 56upx;
	}
	.xingzhi-box {
		background: #FF5A1F;
		padding: 100upx 40upx 0;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		z-index: 2;
	}
	.xingzhixz {
		display: flex;
		align-items: center;
		width: 280upx;
		background: rgb(255,156,121);
		color: #FFFFFF;
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
		background: #FFFFFF;
		color: #FF5A1F;
		border: none;
	}
	.content1 {
		position: relative;
	}
	.shensu {
		width: 100%;
		height: 84upx;
		background: url(../../../static/lzbg.png) no-repeat;
		background-size: 100% 100%;
		position: fixed;
		z-index: 1;
		top: 274upx;
		padding: 0 20upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.sstz {
		display: flex;
		align-items: center;
	}
	.lz_logo {
		width: 34upx;
		height: 34upx;
	}
	.tzwenan {
		font-size: 26upx;
		font-weight: 500;
		color: #000000;
		margin-left: 26upx;
	}
</style>
