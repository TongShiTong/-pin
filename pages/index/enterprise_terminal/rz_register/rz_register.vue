<template>
	<view class="content-box">
		<view style="width: 100%; height: 8upx;background: #f7f7f7;"></view>
		<view class="main">
			<view class="re_box" v-for="(item,index) in itemsLists" :key="index">
				<view class="xuhao">{{itemsLists.length-index}}</view>
				<view class="re_info">
					<view>
						<view class="name">{{item.worker.name}}<span>{{item.worker.idcard.substr(-4)}}</span></view>
						<view class="info"><span>{{item.worker.gender=='1'? "男":"女"}}</span><span style="margin-left: 27upx;margin-right: 60upx;">36</span><span style="display: inline-block;width: 192upx;">猎手：{{item.lieshou.username}}</span><span>{{item.createtime*1000 | formatDate}}</span></view>
					</view>
					<checkbox-group @change="checkboxChange" :data-itemid="item.id">
						<view>
							<checkbox :checked="item.checked" :disabled="item.isprohibit" style="transform:scale(0.8);"/>
						</view>
					</checkbox-group>
				</view>	
			</view>
		</view>
		<view class="anniu-box">
			<view v-if="total==0" class="an1">确认入职</view>
			<view @tap="quedingRzhi" class="an2" v-else>确认入职（{{total}}）</view>
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
				pNum:'',
				lodingLock: false,
				isFormSubmit: false,
				worker_ids:'',
				total:0,
				page: 1,
				nextPage: 1,
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
			this.pNum = e.pNum
			this.itemid=e.itemid
			this.itemsList(()=>{
				
			})
		},
		methods: {
			// 多选
			checkboxChange: function (e) {
				console.log(e)
				let workerIds = e.currentTarget.dataset.itemid
				var items = this.itemsLists,
					values = e.detail.value;
					// if(this.pNum>0) {
						if(values.length==1) {
							this.worker_ids = this.worker_ids + ',' + workerIds
							this.worker_ids = this.worker_ids.trim()
							this.total=this.total+1
							this.pNum=this.pNum-1
						}
					// }
						if(values.length==0) {
							this.worker_ids = this.worker_ids.replace(","+workerIds,'')
							this.worker_ids = this.worker_ids.trim()
							this.total=this.total-1
							this.pNum=this.pNum+1
						}
			},
			// 确定入职
			quedingRzhi() {
				var that = this;
				if (this.isFormSubmit) {
					return;
				}
				this.isFormSubmit = true;
				let workerids = that.worker_ids.substr(1)
				console.log(workerids)
				http.apiRequest({
					api: "/worker_report/setOnboarding",
					data: {
						worker_report_id: workerids,
					},
					secuss: (res, httpStatus) => {
						this.isFormSubmit = false;
						if (res.code == "1") {
							uni.$emit('lizhi',{})
							uni.$emit('tbupdates',{})
							uni.navigateTo({
								// 传递 userid 在详情页接收
								url: '/pages/index/enterprise_terminal/rz_list/rz_list?hasback=2&itemid=' + this.itemid
							});
						} else {
							uni.showToast({title:res.msg,duration:1500,icon:"none"});
						}
					},
					error: (res, httpStatus) => {
						//接口调用失败，可能是网络故障，可能是接口报错
						this.isFormSubmit = false;
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
					api: "/worker_report/getFullJobWorker",
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
							for(let j = 0; j < that.itemsLists.length; j++){
								let items = that.itemsLists[j];
								// if(that.pNum>0) {
									items.isprohibit=false;
									items.checked=false;
								// }else {
								// 	items.isprohibit=true;
								// 	items.checked=false;
								// }
							}
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
		padding-top: 60upx;
		position: relative;
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
	.anniu-box {
		height: 180upx;
		width: 100%;
		position: fixed;
		z-index: 1;
		bottom: 0;
		padding-top: 20upx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.anniu-box .an1{
		width: 670upx;
		height: 94upx;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		background: #FFC7B2;
		font-size: 36upx;
		color: #FFFEFE;
		margin: 0 auto;
	}
	.anniu-box .an2{
		width: 670upx;
		height: 94upx;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		background: #FF5A1F;
		font-size: 36upx;
		color: #FFFEFE;
		margin: 0 auto;
	}
	.bukexuan {
		color: #ccc !important;
	}
</style>
