<template>
	<view class="content-box">
		<view class="ss_list" v-for="(item,index) in itemsLists" :key="index">
			<view class="nane">{{item.name}}<span>{{item.id_card.substr(-4)}}</span></view>
			<view class="ls_info"><span>{{item.gender=='1'? "男":"女"}}</span><span style="margin-left: 43upx;margin-right: 46upx;">{{item.age}}</span><span>猎手：{{item.lieshou.username}}</span></view>
			<view class="gs_gw">
				<image class="logo" src="/static/gsgw.png"></image>
				<view>
					{{item.jobsData.title}}
				</view>
			</view>
			<view class="rzlz_time">
				<view style="margin-right: 160upx;">
					<view class="tz_time">
						<image class="logo" src="/static/rzsj.png"></image>
						<view>入职时间：</view>
					</view>
					<view class="time">{{item.entry_date}}</view>
				</view>
				<view>
					<view class="tz_time">
						<image class="logo" src="/static/lzsj.png"></image>
						<view>离职时间：</view>
					</view>
					<view class="time">{{item.separation_date}}</view>
				</view>
			</view>
			<view class="caozuo">
				<view class="bohui" @tap="boHui(item.id,index)">驳回申诉</view>
				<view class="huifu" @tap="huiFu(item.id,index)">恢复在职</view>
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
	export default {
		data() {
			return {
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
			this.itemsList(()=>{
				
			})
		},
		methods: {
			// 获取申诉列表
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				
				http.apiRequest({
					api: "/worker_report/leaveAppealByCompany",
					method: "GET",
					data: {
						page: that.nextPage,
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							console.log('152',res)
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
			// 驳回申诉
			boHui(i,n) {
				console.log(i,n)
				http.apiRequest({
					api: "/worker_report/leaveAppealDisposeByCompany",
					method: "GET",
					data: {
						on_id: i,
						act: 2,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							uni.$emit('onmove',{})
							this.itemsLists.splice(n, 1);
							// that.detail = res.data
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			// 恢复在职
			huiFu(i,n) {
				console.log(i,n)
				http.apiRequest({
					api: "/worker_report/leaveAppealDisposeByCompany",
					method: "GET",
					data: {
						on_id: i,
						act: 1,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							uni.$emit('onmove',{})
							this.itemsLists.splice(n, 1);
							// that.detail = res.data
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
		position: relative;
		background: #F7F7F7;
	}
	.ss_list {
		margin: 40upx;
		padding: 40upx 40upx 30upx;
		background: #FFFFFF;
		border-radius: 16upx;
		line-height: 1em;
	}
	.nane {
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
	}
	.nane span {
		font-size: 24upx;
		font-weight: 500;
		color: #666666;
		margin-left: 17upx;
	}
	.ls_info {
		font-size: 26upx;
		font-weight: 500;
		color: #666666;
		margin: 17upx 0 35upx;
	}
	.gs_gw {
		display: flex;
		align-items: center;
		font-size: 28upx;
		color: #000000;
		font-weight: 500;
	}
	.logo {
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
	}
	.rzlz_time {
		display: flex;
		align-items: center;
		font-size: 26upx;
		color: #000000;
		font-weight: 500;
		margin: 40upx 0;
	}
	.tz_time {
		display: flex;
		align-items: center;
	}
	.time {
		margin-top: 20upx;
		font-size: 32upx;
		color: #000000;
		font-weight: bold;
	}
	.caozuo {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 26upx;
		font-weight: 500;
	}
	.bohui {
		width: 160upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		background: #FFE3D9;
		color: #FF5A1F;
		border-radius: 30upx;
		margin-right: 40upx;
	}
	.huifu {
		width: 160upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		background: #FF5A1F;
		color: #FFFFFF;
		border-radius: 30upx;
	}
	.more {
		font-size: 28upx;
		color: #666;
		text-align: center;
		padding-bottom: 60upx;
	}
</style>
