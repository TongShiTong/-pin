<template>
	<view class="content-box">
		<view class="box" v-for="(item,index) in itemsLists" :key="index" @tap="openinfo" :data-itemid="item.id">
			<view><image src="/static/other/tzlogo.png" mode="aspectFill"></image></view>
			<view class="info">
				<view class="title" :class="{yidu:item.status==2}">{{item.title}}</view>
				<view class="rich" :class="{yidu:item.status==2}">{{item.intro}}</view>
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
			this.itemsList()
		},
		onShow() {
			let that=this
			that.itemsLists = [];
			that.page= 1;
			that.nextPage= 1;
			that.status= 'more';
			this.itemsList()
		},
		methods: {
			// 获取消息列表
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				
				http.apiRequest({
					api: "/notice/index",
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
							// console.log('152',res)
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
			//跳到通知详情
			openinfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/notice_detail/notice_detail?itemid=' + itemId
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
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	padding-top: 60upx;
}
.box {
	display: flex;
	align-items: center;
	line-height: 1em;
	padding: 15upx 40upx;
	box-sizing: border-box;
}
.box image {
	width: 98upx;
	height: 98upx;
	/* background: #007AFF; */
	border-radius: 50%;
	margin-right: 30upx;
	margin-bottom: 40upx;
}
.title {
	font-size: 32upx;
	color: #1A1A1A;
	font-weight: bold;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 10upx;
}
.rich {
	overflow: hidden;
	white-space: nowrap;
	/* text-overflow: ellipsis; */
}
.info {
	width: 543upx;
	border-bottom: 1upx solid #E5E5E5;
	font-size: 26upx;
	color: #999;
	padding-bottom: 40upx;
}
.more {
	font-size: 28upx;
	color: #666;
	text-align: center;
	padding-bottom: 60upx;
}
.yidu {
	color: #bbb !important;
}
</style>
