<template>
	<view class="content-box">
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
			<view style="margin-right: 40upx;">离职人员</view>
			<view class="source"></view>
		</view>
		<view style="height: 160upx;"></view>
		<view class="main">
			<view v-for="(item,index) in itemsLists" :key="index">
				<view class="rz_shijian">
					<span>{{item.entry_date}}</span>
				</view>
				<view class="re_box">
					<view class="xuhao">{{itemsLists.length-index}}</view>
					<view class="re_info">
						<view>
							<view class="name">
								<view>{{item.name}}<span>{{item.id_card.substr(-4)}}</span></view>
								<view class="lz_box">
									<view class="lizhi">已离职</view>
									<view class="lz_time">{{Date.parse(item.separation_date) | formatDate1}}</view>
								</view>
							</view>
							<view class="info">
								<view>
									<span>{{item.gender=='1'? "男":"女"}}</span><span style="margin-left: 27upx;">{{item.age}}</span>
								</view>
								<!-- <view style="color: #999999;">
									<span>{{item.createtime*1000 | formatDate}} | {{item.createtime*1000 | getWeek}}</span>
								</view> -->
							</view>
						</view>
						<view class="chaozuo">
							<view v-if="isjiesuan!=3" style="display: flex;align-items: center;">
								<view v-if="item.patch_status==2" style="width: 108upx;height: 60upx;background: #F7F7F7;color: #CCCCCC;border-radius: 30upx;line-height: 60upx; text-align: center;font-size: 28upx;">已补员</view>
								<view v-else style="width: 108upx;height: 60upx;background: #FFE3D9;color: #FF5A1F;border-radius: 30upx;line-height: 60upx; text-align: center;font-size: 28upx;" @tap="buYuan" :data-onid="item.id">补员</view>
							</view>
							<view @tap="liZhi" :data-index="index"><image style="width: 10upx;height: 36upx;margin-left: 60upx;margin-right: 20upx;" src="/static/sandian.png"></image></view>
							<view class="lz_dj" v-if="index==lzindex">
								<view v-if="item.check==5" @tap="quxiaoShensu" :data-itemid="item.id" :data-index="index">取消申诉</view>
								<view v-else @tap="shenSu" :data-itemid="item.id" :data-index="index">申诉</view>
							</view>
						</view>
					</view>	
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
	import {getWeek,formatDate} from '@/components/date.js'
	import http from '@/tools/utils/http.js'
	export default {
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd')
			},
			formatDate1(time) {
				var date = new Date(time);
				return formatDate(date, 'MM.dd')
			},
			getWeek(time) {
				var date = new Date(time);
				return getWeek(date)
			}
		},
		data() {
			return {
				itemsLists:[],
				itemid:'',
				isjiesuan:'',
				lodingLock: false,
				page: 1,
				nextPage: 1,
				lzindex:-1,
				isShow: false,
			}
		},
		onReachBottom() {
			let that = this;
			if (that.nextPage > 0) {
				that.itemsList(() => {
					
				});
			} else {
				uni.showToast({
					title: "没有更多了哦！",
				});	
			}
		},
		onLoad(e) {
			let that = this
			this.isjiesuan = e.isjiesuan
			this.itemid=e.itemid
			this.itemsList(()=>{
				
			})
			uni.$on('buyuan',()=>{
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.itemsList(() => {
					
				});
			})
		},
		methods: {
			// 返回
			back() {
				history.back()
			},
			// 到离职列表
			lzRenyuan() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/rz_register/rz_register?itemid=' + this.itemid
				});
			},
			// 补员
			buYuan(e) {
				var on_id = e.currentTarget.dataset.onid
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/buyuan/buyuan?itemid=' + this.itemid +'&onid=' + on_id
				});
			},
			// 离职
			liZhi(e) {
				if(this.isShow) {
					this.lzindex=-1
					this.isShow = false
				}else {
					this.lzindex= e.currentTarget.dataset.index
					this.isShow = true
				}
			},
			lizhiDengji(e) {
				var workid = e.currentTarget.dataset.itemid
				var item_index = e.currentTarget.dataset.index
				console.log(workid,item_index)
				var that = this;
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '确定此员工离职吗？',
					success: function(res) {
						if (res.confirm) {
							http.apiRequest({
								api: "/worker_report/leaveOnboarding",
								data: {
									on_id: workid,
								},
								secuss: (res, httpStatus) => {
					
									if (res.code == "1") {
										that.itemsLists.splice(item_index, 1);
									} else {
										uni.showToast({title:res.msg,duration:1500,icon:"none"});
									}
								},
								error: (res, httpStatus) => {
									//接口调用失败，可能是网络故障，可能是接口报错
			
									console.log("接口调用失败，请检查网络");
								},
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 猎手申诉
			shenSu(e) {
				var workid = e.currentTarget.dataset.itemid
				var item_index = e.currentTarget.dataset.index
				console.log(workid,item_index)
				var that = this;
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '确定此人才未离职，进行申诉吗？',
					success: function(res) {
						if (res.confirm) {
							http.apiRequest({
								api: "/worker_report/leaveAppeal",
								data: {
									on_id: workid,
								},
								secuss: (res, httpStatus) => {
					
									if (res.code == "1") {
										that.lzindex=-1
										that.isShow = false
										that.itemsLists[item_index].check="5"
										uni.showModal({
											title: '提示',
											confirmColor:'#FF5A1F',
											showCancel: false,
											content: '提交离职申诉成功！',
											success: function(res) {
												if (res.confirm) {
													
												}
											}
										})
									} else {
										that.lzindex=-1
										that.isShow = false
										uni.showToast({title:res.msg,duration:1500,icon:"none"});
									}
								},
								error: (res, httpStatus) => {
									//接口调用失败，可能是网络故障，可能是接口报错
							
									console.log("接口调用失败，请检查网络");
								},
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 取消申述
			quxiaoShensu(e) {
				var workid = e.currentTarget.dataset.itemid
				var item_index = e.currentTarget.dataset.index
				console.log(workid,item_index)
				var that = this;
				http.apiRequest({
					api: "/worker_report/leaveAppealRevoke",
					data: {
						on_id: workid,
					},
					secuss: (res, httpStatus) => {
		
						if (res.code == "1") {
							that.lzindex=-1
							that.isShow = false
							that.itemsLists[item_index].check="6"
							uni.showModal({
								title: '提示',
								confirmColor:'#FF5A1F',
								showCancel: false,
								content: '取消申述成功！',
								success: function(res) {
									if (res.confirm) {
										
									}
								}
							})
						} else {
							that.lzindex=-1
							that.isShow = false
							uni.showToast({title:res.msg,duration:1500,icon:"none"});
						}
					},
					error: (res, httpStatus) => {
						//接口调用失败，可能是网络故障，可能是接口报错
				
						console.log("接口调用失败，请检查网络");
					},
				});
			},
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/worker_report/onboardingLieshou",
					method: "GET",
					data: {
						page: that.nextPage,
						status: 2,
						jobs_id: that.itemid
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						if (res.code == 1) {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
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
					},
				});
			},
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		/* padding-top: 60upx; */
		position: relative;
	}
	.hader {
		padding: 67upx 40upx 44upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
		background: #fff;
		position: fixed;
		z-index: 1;
		width: 335px;
		box-shadow: 0 2upx 14upx 0 rgba(204,204,204,0.36);
	}
	.source {
		font-size: 32upx;
		color: #000000;
		font-weight: 500;
	}
	.main {
		margin: 20upx 40upx 0;
	}
	.rz_shijian {
		width: 260upx;
		height: 44upx;
		background: #F7F7F7;
		border-radius: 22upx;
		margin: 50upx auto 10upx;
		font-size: 26upx;
		color: #999999;
		font-weight: 500;
		line-height: 44upx;
		text-align: center;
	}
	.re_box {
		display: flex;
		align-items: center;
		height: 122upx;
	}
	.xuhao {
		font-size: 36upx;
		color: #999999;
		margin-right: 40upx;
	}
	.re_info {
		width: 610upx;
		height: 122upx;
		border-bottom: 1upx solid #E6E6E6;
		font-size: 26upx;
		line-height: 1em;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	.lz_dj {
		width: 240upx;
		height: 102upx;
		position: absolute;
		right: 20upx;
		top: 90upx;
		font-size: 32upx;
		color: #000000;
		font-weight: 500;
		line-height: 102upx;
		text-align: center;
		background: #FFFFFF;
		box-shadow: 0 0 12upx 0 rgba(204,204,204,0.35);
	}
	.name {
		font-size: 32upx;
		color: #000000;
		font-weight: bold;
		margin-bottom: 15upx;
		display: flex;
		align-items: center;
	}
	.name span {
		font-size: 24upx;
		color: #999999;
		font-weight: 500;
		margin-left: 15upx;
	}
	.chaozuo {
		display: flex;
		align-items: center;
	}
	.lz_box {
		display: flex;
		align-items: center;
		margin-left: 20upx;
	}
	.lizhi {
		width: 100upx;
		height: 38upx;
		text-align: center;
		line-height: 38upx;
		background: #FF3019;
		border-bottom-left-radius: 20upx;
		font-size: 24upx;
		color: #FFFFFF;
		font-weight: 500;
	}
	.lz_time {
		width: 100upx;
		height: 36upx;
		text-align: center;
		line-height: 36upx;
		border-top-right-radius: 20upx;
		font-size: 24upx;
		color: #000000;
		border: 1upx solid #FF3019;
		font-weight: 500;
	}
	.info {
		/* width: 610upx; */
		display: flex;
		justify-content: space-between;
	}
	.more {
		font-size: 28upx;
		color: #666;
		margin-top: 20upx;
		text-align: center;
		/* margin-bottom: 60upx; */
		padding-bottom: 60upx;
	}
</style>
