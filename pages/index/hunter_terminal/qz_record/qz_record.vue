<template>
	<view class="content-box">
		<view style="width: 100%; height: 8upx;background: #f7f7f7;"></view>
		<view class="main">
			<view class="re_box" v-for="(item,index) in itemsLists" :key="index">
				<view class="xuhao">{{itemsLists.length-index}}</view>
				<view class="re_info_box">
					<view class="re_info">
						<view class="name">{{item.worker.name}}<span>{{item.worker.idcard.substr(-4)}}</span><span style="display: inline-block;width: 70upx;height: 34upx;line-height: 34upx;text-align: center;border-radius: 8upx;background: #FFEEED;font-size: 22upx;color: #FF3019;" v-if="item.type==2">补员</span></view>
						<view class="info"><span>{{item.worker.gender=='1'? "男":"女"}}</span><span style="margin-left: 27upx;margin-right: 46upx;">{{item.worker.age}}</span><span style="color: #999999;font-size: 22upx;">{{item.createtime*1000 | formatDate}}</span></view>
					</view>
					<view class="chaozuo">
						<view style="width: 148upx;height: 60upx;background: #FFE3D9;color: #FF5A1F;border-radius: 30upx;line-height: 60upx; text-align: center;font-size: 28upx;" @tap="callPhone" :data-ph="item.worker.mobile"><image style="width: 24upx;height: 26upx;margin-right: 6upx;" src="/static/other/dianhua-logo2x.png"></image>联系ta</view>
						<view @tap="liZhi" :data-index="index"><image style="width: 10upx;height: 36upx;margin-left: 60upx;margin-right: 20upx;" src="/static/sandian.png"></image></view>
						<view class="lz_dj" v-if="index==lzindex">
							<view @tap="cheHui" :data-itemid="item.worker_id" :data-index="index">撤回</view>
							<!-- <view @tap="sqRuzhi" :data-itemid="item.worker_id" :data-index="index">申请入职</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="anniu-box">
			<view @tap="openPopup">面试通知</view>
			<view @tap="rzRegister">入职登记</view>
		</view> -->
		<!-- <uni-popup :radius="radius" ref="popup" type="bottom">
			<view class="ms_logo"><image src="/static/mianshi.png"></image></view>
			<view class="close" @tap="gbMiashi"><image src="/static/close.png"></image></view>
			<view style="font-size: 32upx;color: #000000;font-weight: bold;line-height: 1em;text-align: center;margin: 100upx 0 60upx;">面试信息</view>
			<view class="ms_info">
				<view class="title">
					<view class="ts_title">面试时间</view>
					<view class="ms_time">
						<view class="juti" @tap="toggleTab">
							<view>{{msTime}}</view>
							<image src="/static/shijian.png"></image>
						</view>
						<view class="juti" @tap="timeDuan">
							<view>{{timeduan}}</view>
							<image src="/static/shijian.png"></image>
						</view>
						<uni-popup ref="popupTimed" type="bottom">
							<view class="queding">
								<view @tap="quXiao">取消</view>
								<view style="color: #FF5A1F;" @tap="queDing">确定</view>
							</view>
							<view class="timeduan">
								<mt-picker :slots="slots" @change="onValuesChange" :defaultIndex="defaultIndex"></mt-picker>
							</view>
						</uni-popup>
					</view>
				</view>
				<view class="title">
					<view class="ts_title">面试地点</view>
					<input type="text" placeholder="请输入" placeholder-style="color:#ffffff;opacity:0.8;font-weight: 500;" v-model="address"/>
				</view>
				<view class="title">
					<view class="ts_title">联系人</view>
					<input type="text" placeholder="请输入" placeholder-style="color:#ffffff;opacity:0.8;font-weight: 500;" v-model="contact"/>
				</view>
				<view class="title">
					<view class="call">
						<view class="ts_title">电话号码</view>
						<view style="font-size: 26upx;color: #FF5A1F;font-weight: 500;margin-bottom: 30upx;" @tap="tianJia">添加</view>
					</view>
					<view>
						<view v-for="(item,index) in callGeshu" :key="index" class="diahua">
							<input type="text" placeholder="请输入" placeholder-style='color:#ffffff;opacity:0.8;font-weight: 500;' v-model="mobile[index]"/>
						</view>
					</view>
				</view>
			</view>
			<view class="send" @tap="fabuMianshi">发送通知</view>
			<w-picker
				mode="date" 
				startYear="2019" 
				endYear="2030" 
				:defaultVal="defaultVal"
				:current="false"
				@confirm="onConfirm"
				ref="limitHour" 
				themeColor="#FF5A1F"
			></w-picker>
		</uni-popup> -->
		<view v-if="itemsLists.length>0">
			<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
			<view class="more" v-else>没有更多了！</view>
		</view>
		<view class="more" v-else>暂无数据</view>
		<!-- <view style="height: 180upx;"></view> -->
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {getWeek,formatDate} from '@/components/date.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
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
		components: {uniLoadMore,uniPopup,wPicker},
		data() {
			return {
				lzindex:-1,
				isShow: false,
				isFormSubmit: false,
				defaultIndex:0,
				timeduan:'09:00-10:00',
				defaultVal:[],
				msTime:'',
				address:'',
				contact:'',
				mobile:['','',''],
				callGeshu:1,
				radius:true,
				itemsLists:[],
				lodingLock: false,
				itemid:'',
				page: 1,
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				},
				slots: [
				{
				  flex: 1,
				  values: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'],
				  className: 'slot1',
				  textAlign: 'right'
				}, {
				  divider: true,
				  content: '-',
				  className: 'slot2'
				}, {
				  flex: 1,
				  values: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'],
				  className: 'slot3',
				  textAlign: 'left'
				}
			  ]
			}
		},
		onLoad(e) {
			this.itemid=e.itemid
			var day1 = new Date();
			day1.setTime(day1.getTime());
			var s1 = day1.getFullYear()+"/" + (day1.getMonth()+1) + "/" + day1.getDate();
			this.defaultVal=[day1.getFullYear(),(day1.getMonth()+1),day1.getDate()]
			this.defaultVal.forEach((item,index) =>{
				this.defaultVal[index] = String(this.defaultVal[index])
			})
			this.msTime=s1
			this.itemsList(()=>{
				
			})
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
		methods: {
			//打电话
			callPhone(e) {
				// console.log(e)
				var phone = e.currentTarget.dataset.ph
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			// 操作按钮
			liZhi(e) {
				if(this.isShow) {
					this.lzindex=-1
					this.isShow = false
				}else {
					this.lzindex= e.currentTarget.dataset.index
					this.isShow = true
				}
			},
			// 撤回操作
			cheHui(e) {
				var workid = e.currentTarget.dataset.itemid
				var item_index = e.currentTarget.dataset.index
				console.log(workid,item_index)
				var that = this;
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '确定撤回此提报的人才吗？',
					success: function(res) {
						if (res.confirm) {
							http.apiRequest({
								api: "/worker_report/fullTimeCancel",
								data: {
									jobs_id:that.itemid,
									worker_id: workid,
								},
								secuss: (res, httpStatus) => {
					
									if (res.code == "1") {
										that.itemsLists.splice(item_index, 1);
										that.lzindex=-1
										this.isShow = false
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
			// sqRuzhi() {
				
			// },
			gbMiashi() {
				this.$refs.popup.close()
			},
			// 确定时间段
			queDing() {
				this.$refs.popupTimed.close()
			},
			// 取消时间段默认
			quXiao() {
				this.$refs.popupTimed.close()
			},
			// 打开类型选择弹框
			openPopup(){
				this.$refs.popup.open()
			},
			rzRegister() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/rz_register/rz_register?itemid=' + this.itemid
				});
			},
			timeDuan() {
				this.$refs.popupTimed.open()
				
			},
			onValuesChange(picker, values) {
			  if (values[0] > values[1]) {
				setTimeout(() => {
					  picker.setSlotValue(1, values[0]);
				},10)
			  }
			 this.timeduan=values[0]+'-'+values[1]
			 this.defaultIndex = 2
			 console.log(this.defaultIndex)
			 console.log(picker, values)
			},
			onConfirm(val){
				console.log(val);
				this.msTime = val.checkArr[0] +'/' +val.checkArr[1]+'/'+val.checkArr[2]
			},
			// 添加电话
			tianJia() {
				if(this.callGeshu>=3) {
					uni.showToast({
						title: '最多预留3个电话哦！',
					});
				}else {
					this.callGeshu = this.callGeshu+1
				}
			},
			toggleTab(){
				this.$refs.limitHour.show();
			},
			// 发布面试通知
			fabuMianshi() {
				var that = this;
				var msTime = that.msTime;
				var address = that.address
				var contact = that.contact;
				var mobile = that.mobile
				var timeduan = that.timeduan
				if (this.isFormSubmit) {
					return;
				}
				this.isFormSubmit = true;
				http.apiRequest({
					api: "/interview/setInterview",
					data: {
						jobs_id: that.itemid,
						interview_date: msTime,
						hr_mobile: mobile,
						hr_name: contact,
						address: address,
						time_period: timeduan,
					},
					secuss: (res, httpStatus) => {
						this.isFormSubmit = false;
						if (res.code == "1") {
							this.$refs.popup.close()
							uni.showToast({title:res.msg,duration:1500,icon:"none"});
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
	.re_info_box {
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
	.re_info {
		
	}
	.chaozuo {
		display: flex;
		align-items: center;
	}
	.lz_dj {
		width: 240upx;
		position: absolute;
		z-index: 1;
		right: 20upx;
		top: 90upx;
		font-size: 32upx;
		color: #000000;
		font-weight: 500;
		text-align: center;
		background: #FFFFFF;
		box-shadow: 0 0 12upx 0 rgba(204,204,204,0.35);
	}
	.lz_dj view {
		height: 87upx;
		line-height: 87upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.lz_dj view:last-child {
		border-bottom: none;
	}
	.name {
		font-size: 32upx;
		color: #000000;
		font-weight: bold;
		margin-bottom: 15upx;
	}
	.name span {
		font-size: 24upx;
		color: #999999;
		font-weight: 500;
		margin-left: 15upx;
	}
	.anniu-box {
		height: 180upx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		position: fixed;
		bottom: 0;
		padding-top: 20upx;
		box-sizing: border-box;
	}
	.anniu-box view {
		width: 240upx;
		height: 94upx;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		background: #FF5A1F;
		font-size: 36upx;
		color: #FFFEFE;
		margin-right: 40upx;
	}
	.ms_logo {
		width: 148upx;
		height: 155upx;
		position: fixed;
		top: -80upx;
		left: 40%;
		z-index: 1;
	}
	.ms_logo image {
		width: 100%;
		height: 100%;
	}
	.close {
		position: fixed;
		z-index: 1;
		right: 24upx;
		top: 24upx;
		width: 44upx;
		height: 44upx;
		background: #E6E6E6;
		border-radius: 50%;
	}
	.close image {
		width: 100%;
		height: 100%;
	}
	.ms_info {
		margin: 0 18upx 130upx;
	}
	.title {
		font-size: 28upx;
		color: #000000;
		font-weight: bold;
		margin-top: 75upx;
		line-height: 1em;
	}
	.title:first-child {
		margin-top: 0;
	}
	.call {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ts_title {
		margin-bottom: 30upx;
	}
	.ms_time {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.ms_time .juti {
		background: #FF5A1F;
		border-radius: 40upx;
		font-size: 32upx;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 1em;
		padding: 20upx 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.ms_time .juti image {
		width: 30upx;
		height: 18upx;
		margin-left: 27upx;
	}
	.timeduan {
		font-weight: 500;
		width: 100%;
	}
	.queding {
		position: absolute;
		background: #FFFFFF;
		z-index: 1;
		top: 0upx;
		width: 750upx;
		transform: translateX(-30upx);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		font-weight: 500;
		padding: 0 30upx;
		box-sizing: border-box;
		height: 80upx;
		border-bottom: 1px solid #e5e5e5;;
	}
	.title input {
		width: 654upx;
		height: 88upx;
		line-height: 88upx;
		font-size: 32upx;
		color: #fff;
		font-weight: 500;
		background: #FF5A1F;
		border-radius: 44upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}
	.send {
		width: 654upx;
		height: 94upx;
		background: #FF5A1F;
		border-radius: 6upx;
		font-size: 36upx;
		color: #FFFEFE;
		line-height: 94upx;
		margin: 0 auto 60upx;
		text-align: center;
	}
	.diahua {
		margin-top: 30upx;
	}
	.diahua:first-child {
		margin-top: 0upx;
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
