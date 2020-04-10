<template>
	<view class="content-box">
		<!-- <view style="text-align: center;font-size: 36upx;font-weight: bold;color: #1A1A1A;position: fixed;width: 100%;height: 88upx;line-height: 88upx;background: #fff;padding-bottom: 30upx;">提报人才</view> -->
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
			<view>人才提报</view>
			<view class="source">总计{{total}}人</view>
		</view>
		<view class="add" @tap="addTalent"  v-if="itemsLists.length>0">
			添加人才
		</view>
		<view style="height: 248upx;"></view>
		<view class="uni-list">
			<view class="talent-list" v-for="(item,index) in itemsLists" :key="index">
				<view class="talent" :class="{bukexuan:item.isprohibit==true}">
					<view style="width: 200upx;text-align:left;">{{item.name}}<span style="font-size: 24upx;color: #999;">{{item.idcard.substr(-4)}}</span></view>
					<view class="six">{{item.gender=='1'? "男":"女"}}</view>
					<view style="margin-right: 30upx;width: 80upx;">{{item.age}}岁</view>
					<view style="width: 148upx;height: 60upx;background: #FFE3D9;color: #FF5A1F;border-radius: 30upx;line-height: 60upx; text-align: center;font-size: 28upx;" @tap="callPhone" :data-ph="item.mobile"><image style="width: 24upx;height: 26upx;margin-right: 6upx;" src="/static/other/dianhua-logo2x.png"></image>联系ta</view>
				</view>
				<!-- <view>></view> -->
				<checkbox-group @change="checkboxChange" :data-itemid="item.id">
					<view>
						<checkbox :checked="item.checked" :disabled="item.isprohibit" style="transform:scale(0.8);"/>
					</view>
				</checkbox-group>
				<!-- <view @tap="checkboxRemove" :data-itemid="item.id" :data-index="index">删除</view> -->
			</view>
			
			<!-- <view @click="checkedAll">全选</view> -->
		</view>
		<!-- <uni-load-more :status="status" :content-text="contentText"></uni-load-more> -->
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
			<view class="more" v-else>没有更多了！</view>
		</view>
		<view class="more" v-else>
			<view style="margin: 0upx auto 70upx;"><image style="width: 528upx;height: 528upx;" src="/static/qusheng.png"></image></view>
			<view style="text-align: center;font-size: 32upx;color: #1A1A1A;">您当前的人才库空空如也，请添加人才</view>
			<view class="save" @tap="addTalent">
				添加人才
			</view>
		</view>
		<view style="height: 200upx"></view>
		<view class="save-box" v-if="itemsLists.length>0">
			<view class="certain" @tap="reportTalent()">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import http from '@/tools/utils/http.js'
	export default {
		components: {uniLoadMore},
		data() {
			return {
				lodingLock: false,
				total:0,
				xuanZhong:0,
				page: 1,
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				},
				itemsLists:[],
				workData:[],
				itemid:'',
				isCheckedAll:false,
				curChooselist:[],
				jobs_id:'',
				gender:'',
				worker_ids:'',
				pNum:'',
				isFormSubmit: false,
			}
		},
		onLoad(e) {
			this.pNum=e.pNum
			this.jobs_id=e.itemid
			this.gender=e.gender
			this.itemsList(() => {
				this.workinfo()
			})
			let that = this
			uni.$on('updates',(itemid)=>{
				that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.itemsList(() => {
					that.workinfo()
					// that.dianJi(0)
				});
			})
		},
		// onShow() {
		// 	let that = this
		// 	that.itemsLists = [];
		// 	that.page= 1;
		// 	that.nextPage= 1;
		// 	that.status= 'more';
		// 	that.itemsList(() => {
		// 		that.workinfo()
		// 		// that.dianJi(0)
		// 	});
		// },
		// onReachBottom() {
		// 	let that = this;
		// 	if (that.nextPage > 0) {
		// 		console.log(123,'2')
		// 		that.itemsList(() => {
					
		// 		});
		// 	} else {
		// 		uni.showToast({
		// 			title: "没有更多了哦！",
		// 		});	
		// 	}
		// },
		
		methods: {
			addTalent() {
				uni.navigateTo({
					url: '/pages/index/hunter_terminal/add_talent/add_talent'
				});
			},
			dianJi(i) {
				if(i==0) {
					this.itemsLists[0].checked=true
				}
				// console.log(456)
			},
			//打电话
			callPhone(e) {
				// console.log(e)
				var phone = e.currentTarget.dataset.ph
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			// 返回
			back() {
				history.back()
			},
			reportTalent() {
				if(this.total<=this.xuanZhong){
					uni.showToast({
						title: "提报人数已满，不能再提报人才！"
					});
				}else {
					if (this.isFormSubmit) {
						return;
					}
					this.isFormSubmit = true;
					let workerids = this.worker_ids.trim().substr(1)
					// console.log(workerids)
					http.apiRequest({
						api: "/worker_report/fullTimeRreport",
						method: "POST",
						data: {
							jobs_id: this.jobs_id,
							worker_ids: workerids,
						},
						secuss: (res, httpStatus) => {
							this.isFormSubmit = false;
							if (res.code == 1) {
								uni.showToast({
									title: res.msg
								});
								uni.$emit('report',{})
								setTimeout(()=>{
									uni.navigateBack({
									    delta: 1
									});
								},500)
							}else {
								uni.showToast({
									title: res.msg
								});
							}
						},
						error: (res, httpStatus) => {
							this.isFormSubmit = false;
							uni.showToast({
								title: "请检查网络..."
							});
						},
					});
				}
			},
			// 获取已经提交过人的数据id
			workinfo() {
				http.apiRequest({
					api: "/worker_report/getFullJobWorker",
					method: "GET",
					data: {
						jobs_id: this.jobs_id,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.workData = res.data.rows
							this.total = res.data.rows.length
							this.xuanZhong = this.total
							this.comparison(this.workData,this.itemsLists)
							// console.log('aaa',res)
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
			// 比较提交过得不能提交
			// comparison(arr,Newarr){
			// 	for(let i = 0; i < arr.length; i++){
			// 		let item = arr[i];
			// 		for(let j = 0; j < Newarr.length; j++){
			// 			let items = Newarr[j]
			// 			if(item.worker.id==items.id){
			// 				items.isprohibit=true;
			// 				items.checked=true;
			// 				this.itemsLists = Newarr
			// 			}
			// 		}
			// 	}
			// },
			
			// 比较提交过得不能提交
			comparison(arr,Newarr){
				var  isChecked=0;
				for(let j = 0; j < this.itemsLists.length; j++){
						let items = this.itemsLists[j];
						items.isprohibit=false;
						items.checked=false;
						items.srcChecked=false;
						// items.kexuan=false;
						for(let i = 0; i < arr.length; i++){
							let item = arr[i];
						if(item.worker.id==items.id){
							isChecked=isChecked+1;
							items.isprohibit=true;
							items.checked=true;
							items.srcChecked=true;
							// items.kexuan=true;
						}
					}
					this.$set(this.itemsLists,j,items);	
				}
				//默认状态初始化完毕后，计算可选择数量和已选择数量的大小，如果相等，则设置其他的选项都不可点
				if(isChecked>=this.pNum){
					for(let j = 0; j < this.itemsLists.length; j++){
						let items = this.itemsLists[j];
						items.isprohibit=true;
						this.$set(this.itemsLists,j,items);	
					}
				}
				
				
			},
			// 多选
			checkboxChange: function (e) {
				// if(!this.itemsLists.checked) {
					let workerIds = e.currentTarget.dataset.itemid
					var items = this.itemsLists,
						values = e.detail.value;
						//console.log(items) 
						//pNum   总可选人数
						//total  已经选择的总人数
						if(values.length==1) {//未选择
							for(let j = 0; j < this.itemsLists.length; j++){
								let items = this.itemsLists[j];
								if(workerIds==items.id){//在数组中标记已经选中的选项
									items.checked=true;
								}else{
									//items.isprohibit=false;
								}
								this.$set(this.itemsLists,j,items);	
							}
						}
						
						if(values.length==0) {//未选择
							for(let j = 0; j < this.itemsLists.length; j++){
								let items = this.itemsLists[j];
								if(workerIds==items.id){//在数组中取消已选中的选项
									items.checked=false;
								}else{
									//items.isprohibit=false;
								}
								
								if(true==items.srcChecked){//以前上报过的人才，不可点击，其他的都能点击，
									items.isprohibit=true;
								}else{
									items.isprohibit=false;
								}
								this.$set(this.itemsLists,j,items);	
							}
						}
						
					if(this.pNum<=this.total+1) {
						if(values.length==1) {//选中
							this.worker_ids = this.worker_ids + ',' + workerIds
							this.worker_ids = this.worker_ids.trim()
							this.total=this.total+1
							//让其他的变成不可选
							//console.log("测试选择按钮");
							for(let j = 0; j < this.itemsLists.length; j++){
								let items = this.itemsLists[j];
								if(false==items.srcChecked&&items.checked){//以前没上报，现在已选中  即新选择的人才（可点击，即可取消）
									items.isprohibit=false;
								}else{
									items.isprohibit=true;
								}
								this.$set(this.itemsLists,j,items);	
							}
							
							// uni.showModal({
							//     title: '提示',
							// 	showCancel:false,
							// 	confirmColor:'#FF5A1F',
							//     content: '提交的人数已经达到接单人数，再添加的人将不能被提报。',
							//     success: function (res) {
							//         if (res.confirm) {
							//             console.log('用户点击确定');
							//         } else if (res.cancel) {
							//             // console.log('用户点击取消');
							//         }
							//     }
							// });
						}
						if(values.length==0) {//未选择
							this.worker_ids = this.worker_ids.replace(","+workerIds,'')
							this.worker_ids = this.worker_ids.trim()
							this.total=this.total-1
						}
						// for(let i=this.pNum;i<items.length;i++) {
						// 	let item = this.itemsLists[i];
						// 	item.isprohibit=true;
						// 	item.checked=false;
						// 	this.$set(this.itemsLists,i,item);
						// }
					}else {
						if(values.length==1) {
							this.worker_ids = this.worker_ids + ',' + workerIds
							this.worker_ids = this.worker_ids.trim()
							this.total=this.total+1
						}
						if(values.length==0) {
							this.worker_ids = this.worker_ids.replace(","+workerIds,'')
							this.worker_ids = this.worker_ids.trim()
							this.total=this.total-1
						}
					}
					
					this.isCheckedAll = true;
				// }else{
					
				// }
			},
			// 全选
			checkedAll (e) {
				console.log(e)
				if(!this.isCheckedAll) {
					this.curChooselist=[]
					for(let a=0;a<this.itemsLists.length;a++){
						this.curChooselist.push(a)
						this.$set(this.itemsLists[a],'checked',true)
					
					}
					this.isCheckedAll = true;
				}else{
					this.curChooselist = []
					this.isCheckedAll=false
					for(let a=0;a<this.itemsLists.length;a++){
						this.$set(this.itemsLists[a],'checked',false)
					}
					// console.log(this.curChooselist)
				}
			},
			// openinfo(e) {
			// 	var itemId = e.currentTarget.dataset.itemid
			// 	uni.navigateTo({
			// 		// 传递在详情页接收
			// 		url: '/pages/index/hunter_terminal/t_detail/t_detail?itemid=' + itemId
			// 	});
			// },
			// 下拉刷新获取更多
			itemsListMore(e) {
				let that = this;
				if (that.nextPage > 0) {
					// console.log(123,'2')
					that.itemsList(() => {
						that.workinfo()
					});
				} else {
					uni.showToast({
						title: "没有更多了哦！",
					});	
				}
			},
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
						job_id: that.jobs_id,
						gender: that.gender
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						if (res.code == 1) {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							that.itemsLists = that.itemsLists.concat(res.data.rows);
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
			// arrayRendered(array){
			// 	var testArray=[];
			// 	if(array.length>0){
			// 		for(var i=0;i<array.length;i++){
			// 			testArray[i+1]=array[i];
			// 		}
			// 	}
			// 	return testArray;
			// },
		}
	}
	
	
</script>

<style>
	.content-box {
		width: 100%;
		position: relative;
		padding-bottom: 60upx;
	}
	.hader {
		padding: 67upx 40upx 44upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36upx;
		color: #1A1A1A;
		font-weight: bold;
		background: #fff;
		position: fixed;
		z-index: 1;
		width: 335px;
	}
	.source {
		font-size: 26upx;
		color: #333;
		font-weight: bold;
	}
	.bukexuan {
		color: #ccc !important;
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
		z-index: 1;
		top: 156upx;
		margin-left: 40upx;
	}
	.talent-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 40upx;
		height: 120upx;
		border-bottom: 1upx solid #f5f5f5;
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
		margin-right: 60upx;
		margin-left: 10upx;
	}
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
	.certain {
		width: 670upx;
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
		margin-top: 20upx;
		text-align: center;
		/* margin-bottom: 60upx; */
		padding-bottom: 60upx;
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
		margin: 160upx auto 0;
	}
	
</style>
