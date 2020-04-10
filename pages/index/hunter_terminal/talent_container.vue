<template>
	<view class="content-box">
		<view style="text-align: center;font-size: 36upx;font-weight: bold;color: #1A1A1A;position: fixed;width: 100%;height: 88upx;line-height: 88upx;background: #fff;padding-top: 40upx;box-shadow: 0 10upx 10upx #f5f5f5;">人才资料</view>
		<view class="add" @tap="addTalent" v-if="itemsLists.length>0">
			添加人才
		</view>
		<view style="height: 248upx;"></view>
		<view class="uni-list">
			<view class="talent-list" v-for="(item,index) in itemsLists" :key="index">
				<view class="talent">
					<view @tap="openinfo" :data-itemid="item.id" style="display: flex;">
						<view style="width: 210upx;text-align:left;">{{item.name}}<span style="font-size: 24upx;color: #999;">{{item.idcard.substr(-4)}}</span></view>
						<view class="six">{{item.gender=='1'? "男":"女"}}</view>
						<view style="width: 190upx;text-align: left;">{{item.age}}岁</view>
					</view>
					<view style="width: 148upx;height: 60upx;background: #FFE3D9;color: #FF5A1F;border-radius: 30upx;line-height: 60upx; text-align: center;font-size: 28upx;" @tap="callPhone" :data-ph="item.mobile"><image style="width: 24upx;height: 26upx;margin-right: 6upx;" src="/static/other/dianhua-logo2x.png"></image>联系ta</view>
				</view>
				<!-- <view>></view> -->
				<!-- <checkbox-group @change="checkboxChange" :data-itemid="item.id">
					<view>
						<checkbox :checked="item.checked" />
					</view>
				</checkbox-group> -->
				<!-- <view @tap="checkboxRemove" :data-itemid="item.id" :data-index="index">删除</view> -->
			</view>
			<!-- <view @click="checkedAll">全选</view> -->
		</view>
		<!-- <view @tap="itemsListMore">查看更多</view> -->
		<!-- <view class="certain" @tap="reportTalent()">
			确定
		</view> -->
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0" style="margin-top: 30upx;">查看更多</view>
			<view class="more" v-else style="margin-top: 30upx;">没有更多了！</view>
		</view>
		<view class="more" v-else>
			<view v-if="isShowChahua">
				<view style="margin: 0upx auto 70upx;"><image style="width: 528upx;height: 528upx;" src="/static/qusheng.png"></image></view>
				<view style="text-align: center;font-size: 32upx;color: #1A1A1A;">您当前的人才库空空如也，请添加人才</view>
				<view class="save" @tap="addTalent">
					添加人才
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				lodingLock: false,
				isShowChahua: true,
				page: 1,
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				},
				itemsLists:[],
				itemid:'',
				isCheckedAll:false,
				curChooselist:[],
				jobs_id:'',
				worker_ids:'',
				data:{
					name:'',
					mobile: '',
					idcard: '',
					gender: '',
					remark: ''
				}
			}
		},
		mounted() {
			let that = this
			uni.showLoading({
				title: '加载中...',
			});
			this.isShowChahua = false
			that.itemsList()
			uni.$on('updates',()=>{
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.itemsList(() => {
					
				});
			})
			// #ifdef APP-PLUS 
				plus.navigator.setStatusBarStyle('dark');
			// #endif 
		},
		// onLoad(e) {
		// 	console.log(e)
		// 	this.jobs_id=e.itemid
		// },
		methods: {
			addTalent() {
				uni.navigateTo({
					url: '/pages/index/hunter_terminal/add_talent/add_talent'
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
			// 删除人才
			checkboxRemove(e){
				// console.log(e)
				var that=this;
				var itemid = e.currentTarget.dataset.itemid;
				var item_index = e.currentTarget.dataset.index;
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '你确定要删除吗？删除后将不能找回！',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							http.apiRequest({
								api: "/worker/workerRemove",
								method: "GET",
								data: {
									itemid: itemid,
								},
								secuss: (res, httpStatus) => {
									if (res.code == 1) {
										that.itemsLists.splice(item_index, 1);
										uni.showToast({
											title: "删除成功"
										});
										console.log(res)		
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
			
			openinfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/h_t_detail/h_t_detail?itemid=' + itemId
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
					// uni.showToast({
					// 	title: "没有更多了哦！",
					// });	
				}
			},
			// 获取人才列表
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				http.apiRequest({
					api: "/worker/getWorkerList",
					method: "GET",
					data: {
						page: that.nextPage,
					},
					secuss: (res, httpStatus) => {
						uni.hideLoading();
						that.lodingLock = false;
						if (res.code == 1) {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							that.itemsLists = that.itemsLists.concat(res.data.rows);
							// console.log(res)
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
					},
				});
			},
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		position: relative;
		/* padding-bottom: 60upx; */
		/* background: #f5f5f5; */
	}
	.add {
		width: 670upx;
		height: 90upx;
		/* margin: 0 auto; */
		background: #FFE3D9;
		color: #FF5A1F;
		font-size: 34upx;
		/* font-weight: bold; */
		text-align: center;
		line-height: 90upx;
		position: fixed;
		top: 154upx;
		margin-left: 40upx;
	}
	.talent-list {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		margin: 0 40upx;
		height: 120upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.talent {
		width: 100%;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		font-size: 32upx;
		/* font-weight: bold; */
		color: #1A1A1A;
	}
	.talent .six {
		width: 110upx;
		text-align: left;
	}
	.certain {
		width: 440upx;
		height: 94upx;
		margin: 0 auto;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		/* position: fixed;
		bottom: 86upx; */
	}
	.more {
		font-size: 28upx;
		color: #666;
		/* margin-top: 20upx; */
		text-align: center;
		/* margin-bottom: 60upx; */
		padding-bottom: 60upx;
		/* padding-top: 40upx; */
	}
	.save {
		height: 94upx;
		width: 440upx;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		margin: 120upx auto 0;
	}
</style>
