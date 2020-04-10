<template>
	<view class="content-box">
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
			<view>在职人员</view>
			<view class="source" @tap="lzRenyuan">离职人员</view>
		</view>
		<view style="height: 164upx;"></view>
		<view class="main">
			<view class="re_box" v-for="(item,index) in itemsLists" :key="index">
				<view class="xuhao">{{itemsLists.length-index}}</view>
				<view class="re_info">
					<view>
						<view class="name">{{item.name}}<span>{{item.id_card.substr(-4)}}</span><span style="display: inline-block;width: 70upx;height: 34upx;line-height: 34upx;text-align: center;border-radius: 8upx;background: #FFEEED;font-size: 22upx;color: #FF3019;" v-if="item.type==2">补员</span></view>
						<view class="info"><span>{{item.gender=='1'? "男":"女"}}</span><span style="margin-left: 27upx;margin-right: 60upx;">{{item.age}}</span><span style="display: inline-block;width: 192upx;">猎手：{{item.lieshou.username}}</span><span style="font-size: 22upx;color: #999999;">{{item.createtime*1000 | formatDate}} | {{item.createtime*1000 | getWeek}}</span></view>
					</view>
					<view @tap="liZhi" :data-index="index"><image style="width: 10upx;height: 36upx;margin-right: 20upx;" src="/static/sandian.png"></image></view>
					<view class="lz_dj" v-if="index==lzindex" @tap="lizhiDengji" :data-itemid="item.id" :data-index="index">离职登记</view>
				</view>	
			</view>
		</view>
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
			<view class="more" v-else>没有更多了！</view>
		</view>
		<view class="more" v-else>暂无数据</view>
		<view style="height: 180upx;"></view>
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
			getWeek(time) {
				var date = new Date(time);
				return getWeek(date)
			}
		},
		data() {
			return {
				itemsLists:[],
				itemid:'',
				lodingLock: false,
				page: 1,
				nextPage: 1,
				lzindex:-1,
				hasback:'',
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
			this.hasback=e.hasback
			this.itemid=e.itemid
			this.itemsList(()=>{
				
			})
		},
		methods: {
			// 返回
			back() {
				if(this.hasback==1) {
					uni.navigateBack({
						delta:1
					})
				}else {
					uni.navigateBack({
						delta:2
					})
				}
				
			},
			// 到离职列表
			lzRenyuan() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/lz_list/lz_list?itemid=' + this.itemid
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
										uni.$emit('lizhi',{})
										that.lzindex=-1
										this.isShow = false
										that.itemsLists.splice(item_index, 1);
									} else {
										that.lzindex=-1
										this.isShow = false
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
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/worker_report/onboarding",
					method: "GET",
					data: {
						page: that.nextPage,
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
		font-weight: 300;
	}
	.main {
		margin: 20upx 40upx 0;
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
		margin-top: 8upx;
		margin-bottom: 15upx;
	}
	.name span {
		font-size: 24upx;
		color: #999999;
		font-weight: 500;
		margin-left: 15upx;
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
