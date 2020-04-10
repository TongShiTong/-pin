<template>
	<view class="content-box">
		<view class="search">
			<view class="frame">
				<view @tap="searchList"><image src="/static/other/seach.png"></image></view>
				<input type="text" confirm-type="search" placeholder="服务员" v-model="keywordinput"/>
			</view>
			<view @tap="back">取消</view>
		</view>
		<view style="height: 160upx;"></view>
		<view v-if="shoeList">
			<view class="remen">热门搜索</view>
			<view class="box">
				<view class="biaoqian" v-for="(item,i) in search" :key="i" @tap="biaoQian(i)">{{item}}</view>
			</view>
		</view>

		<view class="chooes" v-else>
			<view class="chooes-box" :class="{'fixTitle':whether}">
				<uni-segmented-control :current="current" :values="items" :bold="bold" @clickItem="onClickItem" style-type="button" active-color="#666"></uni-segmented-control>
				<view class="shaixuan">
					<view v-if="isShowgw" @click="openPopup" style="color: #FF5A1F;">{{typeName}}<image style="width: 20upx;height: 20upx;margin-left: 10upx;" src="/static/xiangxia1.png"></image></view>
					<view v-else @click="openPopup">{{typeName}}<image style="width: 20upx;height: 20upx;margin-left: 10upx;" src="/static/xiangxia.png"></image></view>
					<view v-if="isShowzx" @click="openZuixin" style="color: #FF5A1F;">{{zuiXinName}}<image style="width: 20upx;height: 20upx;margin-left: 10upx;" src="/static/xiangxia1.png"></image></view>
					<view v-else @click="openZuixin">{{zuiXinName}}<image style="width: 20upx;height: 20upx;margin-left: 10upx;" src="/static/xiangxia.png"></image></view>
					<view v-if="isShowfw" @click="openShaixuan" style="color: #FF5A1F;"><image style="width: 24upx;height: 24upx;margin-right: 10upx;" src="/static/shaixuan1.png"></image>筛选</view>
					<view v-else @click="openShaixuan"><image style="width: 24upx;height: 24upx;margin-right: 10upx;" src="/static/shaixuan.png"></image>筛选</view>
				</view>
				<uni-popup ref="popup" type="top" style="position: absolute;top:184upx;height: 1280upx;overflow: hidden;">
					<view style="display: flex;justify-content: space-between;height: 500upx;font-size: 26upx;color: #666;font-weight: 400;">
						<view style="background: #F5F5F5;width: 300upx;height: 500upx;position: relative;top:-30upx;left: -30upx;text-align: center;overflow-y: scroll;">
							<view style="height: 94upx;position: relative;" :class="{active:-1==indexes}" @click="bindClick(-1)">
								<view :class="{active2:-1==indexes}" style="height: 48upx;line-height: 48upx; width: 97%;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">全部岗位</view>
							</view>
						<view style="height: 94upx;position: relative;" v-for="(item,index) in categoryPan" :class="{active:index==indexes}" :key="index" @click="bindClick(index)">
							<view :class="{active2:index==indexes}" style="height: 48upx;line-height: 48upx; width: 97%;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">{{item.name}}</view>
						</view>
						</view>
						<view style="position: relative;top:-30upx;width: 390upx;overflow-y: scroll;">
						<view style="height: 94upx;line-height: 94upx;" v-for="(item,i) in categoryChs" :key="'info1-'+i" :class="{active1:i==tindexes}" @click="towSort(i)">{{item.name}}</view></view>
					</view>
				</uni-popup>
				<uni-popup ref="popupZuixin" type="top" style="position: absolute;top:184upx;height: 1280upx;overflow: hidden;">
					<view style="font-size: 26upx;color: #666;font-weight: 400;">
						<view style="text-align: left; position: relative;width: 100%;overflow-y: scroll;">
						<view class="zuixin" style="height: 94upx;line-height: 94upx;" v-for="(item,i) in zuiXin" :key="'info9-'+i" :class="{active1:i==zxindexes}" @click="zuixinChoes(i)">{{item.name}}</view></view>
					</view>
				</uni-popup>
				<uni-popup ref="popupShaixuan" type="top" style="position: absolute;top:184upx;height: 1280upx;overflow: hidden;">
					<view style="font-size: 24upx;color: #999999;text-align: left;">可接单人数</view>
					<view class="fanwei-box">
						<view class="fanwei" v-for="(item,i) in renshufw" :key="'in'+i" @tap="fanWei(i)" :class="{act:i==fwindexes}">{{item}}</view>
					</view>
					<view style="font-size: 24upx;color: #999999;text-align: left;margin-top: 30upx;">开始工作时间</view>
					<view class="startday" @click="open" :class="{act:isChoosetime}">{{timeday}}</view>
					<view class="anniu-box">
						<view class="chongzhi" @tap="reset">重置</view>
						<view class="queding" @tap="determine">确定</view>
					</view>
				</uni-popup>
				<uni-calendar style="position: fixed;z-index: 99999;top: 0px;left: 0;"
				   ref="calendar"
				   :insert="false"
				   @confirm="confirm"
				   :disableBefore="true"
				   :range="false"
				   :date="date"
					/>
				<!-- <view>123</view> -->
			</view>
			
			<!-- <VuePullRefresh :on-refresh="onRefresh">	 -->
			<view class="content" :class="{'fixContente':whether}">
				<view v-if="current === 0">
					<view class="main" v-for="(item,index) in itemsLists" :key="index" @tap="openinfo" :data-itemid="item.id">
						<view>
						<view class="campany">
							<view class="name-box">
								<view class="name">{{item.title}}</view>
								<view class="jz-logo">零工</view>
							</view>
							
							<view class="many">
								<view class="butie" v-if="item.bounty_subsidy!=0">+{{item.wage*item.bounty_subsidy/100}}元补贴</view>
								<view class="logo-box"><image src="/static/shang.png"></image></view>
								<view>{{item.wage*(item.bounty_ratio)/100}}</view>
								<view class="day">元/天</view>
							</view>
							
						</view>
						<view class="need-box">
							<view class="need">杭州 | 需要{{item.total}}人</view>
						</view>
						<view class="time-box">
							<view class="time">工作时间：<span>{{item.jobData.job_start_date}}&nbsp; {{item.interviewtime}}</span></view>
							<view class="lave">剩余：{{item.remaining}}</view>
						</view>
						<view class="wage">{{item.wage}}<span style="font-size: 22upx;margin-left: 10upx;">元/天</span></view>
						</view>
						<view class="info">
							<view class="info-box">
								<view class="img-box"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
								<view class="info-name">{{item.userInfo.nickname}}</view>
							</view>
							<view class="fabuye">{{item.createtime*1000 | formatDate}}</view>
						</view>
					</view>
					<view v-if="itemsLists.length>0">
						<view class="more" @tap="itemsListMore"  v-if="nextPage>0">查看更多</view>
						<view class="more" v-else>没有更多了！</view>
					</view>
					<view class="more" v-else>暂无数据</view>
					
				</view>
				<view v-if="current === 1">
					<view class="main" v-for="(item,index) in itemsLists" :key="index" @tap="qzOpeninfo" :data-itemid="item.id">
						<view>
						<view class="campany">
							<view class="name-box">
								<view class="name">{{item.title}}</view>
								<view class="jz-logo1">长工</view>
							</view>
							
							<view class="many1">
						<!-- 		<view class="butie" v-if="item.bounty_subsidy!=0">+{{item.wage*item.bounty_subsidy/100}}元补贴</view> -->
								<view class="logo-box"><image src="/static/shang.png"></image></view>
								<view>{{item.bounty}}*3</view>
								<!-- <view class="day">元/天</view> -->
							</view>
							
						</view>
						<view class="need-box">
							<view class="need">杭州 | 需要{{item.total}}人</view>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view class="time-box1">
								<view class="jobtags" v-for="(val,i) in item.job_tags.split(',')" :key="i">
									{{val}}
								</view>
							</view>
							<view class="lave">剩余：{{item.remaining}}</view>
						</view>
					
						<view class="wage">{{item.salary}}</view>
						</view>
						<view class="info">
							<view class="info-box">
								<view class="img-box"><image :src="item.userInfo.avatar" mode="aspectFill"></image></view>
								<view class="info-name">{{item.userInfo.nickname}}</view>
							</view>
							<view class="fabuye">{{item.createtime*1000 | formatDate}}</view>
						</view>
					</view>
					<view v-if="itemsLists.length>0">
						<view class="more" @tap="qzitemsListMore"  v-if="nextPage>0">查看更多</view>
						<view class="more" v-else>没有更多了！</view>
					</view>
					<view class="more" v-else>暂无数据</view>
				</view>
			</view>
			<!-- </VuePullRefresh> -->
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import http from '@/tools/utils/http.js';
	import VuePullRefresh from 'vue-pull-refresh';
	import uniPopup from "@/components/uni-popup1/uni-popup.vue"
	import uniCalendar from "@/components/uni-calendar/uni-calendar"
	import {formatDate} from '@/components/date.js'
	export default {
		components: {uniSegmentedControl,uniLoadMore,VuePullRefresh,uniPopup,uniCalendar},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy/MM/dd h:m')
			}
		},
		data() {
			return {
				qzlodingLock:false,
				bold:true,
				shoeList:true,
				keywordinput:'',
				search:[],
				isopen: false,
				isclose: false,
				isshaix:false,
				isShowgw:false,
				isShowzx: false,
				isShowfw: false,
				indexes: -1,
				tindexes: -1,
				zxindexes: 0,
				fwindexes: -1,
				sortgz:'',
				remaining_min:'',
				remaining_max:'',
				isChoosetime: false,
				date:'',
				startTime:'',
				timeday:'开始日期',
				typeName:'全部岗位',
				cid:'',
				items: ['零工','长工'],
				userInfo:{},
				categoryList: [],
				categoryPan:[],
				categoryChs:[],
				zuiXin:[{
					value:1,
					name:'最新发布'
				},{
					value:2,
					name:'薪酬由高到低'
				},{
					value:3,
					name:'最近开始工作'
				}],
				renshufw:['1-20','21-50','51-100','100以上'],
				zuiXinName:'最新发布',
				current: 0,
				whether:false,
				lodingLock: false,
				page: 1,
				keyword: '',
				nextPage: 1,
				status: 'more',
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '我们也是有底线的'
				},
				itemsLists: []
			}
		},
		onLoad() {
			http.apiRequest({
				api: "/common/config",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						console.log(res.data.config)
						this.search = res.data.config.hot_search
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
			let that = this
			var day1 = new Date();
			day1.setTime(day1.getTime()+24*60*60*1000);
			var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
			this.date = s1
			
			http.apiRequest({
				api: "/user/userinfo",
				method: "GET",
				data: {
					
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						this.userInfo=res.data
						console.log(this.userInfo)
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
			this.categoryType()
		},
		methods: {
			back() {
				history.back()
			},
			biaoQian(i) {
				this.shoeList = false
				let that = this;
				that.keyword = that.search[i];
				that.keywordinput = that.search[i];
				that.nextPage = 1;
				that.itemsLists = [];
				that.itemsList(() => {
							
				});
			},
			// 打开日历
			open(){
				this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e)
				this.timeday = e.fulldate
				this.startTime = e.fulldate
				this.isChoosetime = true
				// this.time = e.fulldate;
				// this.date = e.fulldate
			},
			reset() {
				this.isShowfw=false
				this.fwindexes=-1
				this.isChoosetime=false
				this.timeday='开始日期'
				this.remaining_min=''
				this.remaining_max=''
				this.startTime=''
			},
			determine() {
				this.isShowfw = true
				this.isshaix = false
				this.$refs.popupShaixuan.close()
				let that = this
			    that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				if(this.current==0) {
					that.itemsList(() => {
						
					});
				}else if(this.current==1) {
					that.qzitemsList(() => {
						
					});
				}
			},
			// 是否打开类型选择弹框
			openPopup(){
				this.isopen = !this.isopen
				if(this.isopen) {
					this.$refs.popupZuixin.close()
					this.$refs.popupShaixuan.close()
					this.$refs.popup.open()
					this.isclose=false
					this.isshaix=false
				}else {
					this.$refs.popup.close()
				}	
			},
			openZuixin(){
				this.isclose = !this.isclose
				if(this.isclose) {
					this.$refs.popup.close()
					this.$refs.popupShaixuan.close()
					this.$refs.popupZuixin.open()
					this.isopen=false
					this.isshaix=false
				}else {
					this.$refs.popupZuixin.close()
				}
				
			},
			openShaixuan() {
				this.isshaix = !this.isshaix
				if(this.isshaix) {
					this.$refs.popup.close()
					this.$refs.popupZuixin.close()
					this.$refs.popupShaixuan.open()
					this.isopen=false
					this.isclose=false
				}else {
					this.$refs.popupShaixuan.close()
				}
			},
			// 选择招聘分类类型
			bindClick(index) {
				this.tindexes = -1
				if(index==-1) {
					this.cid=''
					this.categoryChs=[]
					this.typeName='全部岗位'
					this.isopen=false
					this.isShowfw=false
					this.fwindexes=-1
					this.isChoosetime=false
					this.timeday='开始日期'
					this.remaining_min=''
					this.remaining_max=''
					this.startTime=''
					this.$refs.popup.close()
					let that = this
			        that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					if(this.current==0) {
						that.itemsList(() => {
							
						});
					}else if(this.current==1) {
						that.qzitemsList(() => {
							
						});
					}
				}else {
					this.cid=this.categoryPan[index].id
					for(let j=0 ; j < this.categoryList[this.categoryPan[index].id].length ; j++) {
						if(this.categoryPan[index].id==this.categoryList[this.categoryPan[index].id][j].pid){
								this.categoryChs = this.categoryList[this.categoryPan[index].id]
								// console.log(this.categoryChs)
						}else{
							
						}
					}
				}
				this.indexes = index
			},
			// 二级选择分类
			towSort(i) {
				this.cid=this.categoryChs[i].id
				this.tindexes = i
				this.isShowgw = true
				this.typeName = this.categoryChs[i].name
				console.log(this.cid)
				this.isopen = false
				this.$refs.popup.close()
				let that = this
			    that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				if(this.current==0) {
					that.itemsList(() => {
						
					});
				}else if(this.current==1) {
					that.qzitemsList(() => {
						
					});
				}
			},
			zuixinChoes(i) {
				this.zxindexes = i
				this.sortgz = i+1
				this.isShowzx = true
				this.zuiXinName = this.zuiXin[i].name
				this.isclose = false
				this.$refs.popupZuixin.close()
				let that = this
			    that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				if(this.current==0) {
					that.itemsList(() => {
						
					});
				}else if(this.current==1) {
					that.qzitemsList(() => {
						
					});
				}
			},
			fanWei(i) {
				this.fwindexes = i
				if(i==3) {
					this.remaining_min='101'
					this.remaining_max=''
				}else {
					let range = this.renshufw[i].split("-")
					this.remaining_min=range[0]
					this.remaining_max=range[1]
				}
			},
			// 调取分类接口
			categoryType() {
				http.apiRequest({
					api: "/category/categoryChilds",
					method: "GET",
					data: {
						type: 'jobs',
					},
					secuss: (res, httpStatus) => {
						// uni.hideLoading();
						if (res.code == 1) {
							this.categoryList = res.data;
							this.categoryPan = this.categoryList[0]
							// console.log(this.categoryList)		
						}
					},
					error: (res, httpStatus) => {
						// uni.hideLoading();
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if(index==0) {
					let that = this
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.itemsList(() => {
						
					});
				}else if (index==1) {
					let that = this
					that.itemsLists = [];
					that.page= 1;
					that.nextPage= 1;
					that.status= 'more';
					that.qzitemsList(() => {
						
					});
				}else{}
			},
			// 下拉的时候触发函数
			onRefresh: function() {
				let that = this
			    that.itemsLists = [];
				that.page= 1;
				that.nextPage= 1;
				that.status= 'more';
				that.itemsList(() => {
					
				});
			},
			jumpInvite() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/user/invite/invite'
				});
			},
			parentHandleclick(e) {
			        // console.log(e)
			      },
			// emitEvent(){
			// 	this.$emit('my-event', this.nextPage)
			// },
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
			// 下拉刷新获取更多
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
			// 搜索
			searchList() {
				this.shoeList = false
				let that = this;
				that.keyword = that.keywordinput;
				that.nextPage = 1;
				that.itemsLists = [];
				if(this.current==0) {
					that.itemsList(() => {
						
					});
				}else if(this.current==1) {
					that.qzitemsList(() => {
						
					});
				}
			},
	
			// 获取岗位信息
			itemsList(collback) {
				let that = this;
				if (this.lodingLock) {
					return;
				}
				this.lodingLock = true;
				this.status = "loading"
				
				http.apiRequest({
					api: "/jobs/getJobsList",
					method: "GET",
					data: {
						page: that.nextPage,
						keyword: that.keyword,
						cid:that.cid,
						sort:that.sortgz,
						remaining_min:that.remaining_min,
						remaining_max:that.remaining_max,
						startTime:that.startTime
					},
					secuss: (res, httpStatus) => {
						that.lodingLock = false;
						// uni.hideLoading();
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							// that.itemsLists = res.data.rows
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
						// uni.hideLoading();
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
			// 获取长工岗位信息
			qzitemsList(collback) {
				let that = this;
				if (this.qzlodingLock) {
					return;
				}
				this.qzlodingLock = true;
				this.status = "loading"
				
				http.apiRequest({
					api: "/jobs/getJobsListByFull",
					method: "GET",
					data: {
						page: that.nextPage,
						keyword: that.keyword,
						cid:that.cid,
						sort:that.sortgz,
						remaining_min:that.remaining_min,
						remaining_max:that.remaining_max,
						startTime:that.startTime
					},
					secuss: (res, httpStatus) => {
						that.qzlodingLock = false;
						uni.hideLoading();
						if (res.code == "1") {
							that.nextPage = res.data.nextPage;
							that.page = res.data.page;
							// that.itemsLists = res.data.rows
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
					},
				});
			},
			//跳到岗位详情
			openinfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/p_detail/p_detail?jiedan=1&itemid=' + itemId
				});
			},
			//跳到岗位详情
			qzOpeninfo(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/qz_p_detail/qz_p_detail?jiedan=1&itemid=' + itemId
				});
			},
			openinfoTalent(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/talent_Report/talent_Report?itemid=' + itemId
				});
			},
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	position: relative;
}
.search {
	font-size: 32upx;
	font-weight: bold;
	color: #010101;
	position: fixed;
	width: 670upx;
	padding-top: 40upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 40upx;
	padding: 40upx 40upx 8upx;
	border-bottom: 1upx solid #F7F7F7;
}
.frame {
		display: flex;
		align-items: center;
		width: 560upx;
		position: relative;
	}
	.frame input {
		background: #F5F5F5;
		display: inline-block;
		height: 72upx;
		border-radius: 32upx;
		font-size: 28upx;
		width: 100%;
		padding-left: 88upx;
		box-sizing: border-box;
	}
	.frame view {
		width: 34upx;
		height: 34upx;
		background: #f5f5f5;
		font-size: 32upx;
		line-height: 64upx;
		border-radius: 50%;
		position: absolute;
		left: 27upx;
		top: 0;
		padding-top: 10upx;
	}
	.frame view image {
		width: 100%;
		height: 100%;
	}
	.remen {
		margin: 90upx 40upx 47upx;
		font-size: 34upx;
		font-weight: bold;
	}
	.box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		margin: 0 40upx;
	}
	.biaoqian {
		margin-bottom: 40upx;
		font-size: 28upx;
		color: #666666;
		background: #F7F7F7;
		padding: 20upx 30upx 20upx;
		border-radius:40upx;
	}
	
	.chooes {
		position: relative;
		top: 2upx;
	}
	.chooes-box {
		display: flex;
		/* justify-content: space-between;
		align-items: center; */
		flex-direction: column;
		padding: 0 40upx;
		box-sizing: border-box;
		background: #fff;
	}
	
	.shaixuan {
		height: 80upx;
		padding: 0 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		font-weight: 500;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1upx solid #F4F4F4;
		/* border-bottom: 1upx solid #F4F4F4; */
	}
	.main {
		padding: 0 40upx 40upx;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 16upx solid #f5f5f5;
	}
	.campany {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
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
	.name1 {
		color: #666;
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
		background: url(../../../../static/butie.png) no-repeat;
		background-size: 100% 100%;
		font-size: 20upx;
		color: #E50000;
		line-height: 1em;
		padding: 5upx 10upx 10upx;
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
		color: #333;
		font-weight: bold;
		background: #FFF4F0;
		padding: 2upx 10upx 2upx 6upx;
	}
	.lave {
		font-size: 26upx;
		font-weight: bold;
		color: #4D4D4D;
	}
	.wancheng {
		color: #999;
	}
	.wancheng span {
		background: #f5f5f5 !important;
	}
	
	.people-num {
		margin-top: 14upx;
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
	.people1 {
		color: #999;
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
		border-radius: 10upx;
		overflow: hidden;
		background: #C9C9C9;
		/* background: #83A5FA;
		border-radius: 50%;
		overflow: hidden; */
		margin-right: 25upx;
	}
	.img-box image {
		width: 100%;
		height: 100%;
	}
	.info-name {
		font-size: 30upx;
		color: #000;
		font-weight: 500;
	}
	.fabuye {
		font-size: 24upx;
		color: #999;
		font-weight: 500;
	}
	.tibao {
		font-size: 30upx;
		color: #fff;
		background: #FF5A1F;
		width: 180upx;
		height: 70upx;
		border-radius: 35upx;
		overflow: hidden;
		text-align: center;
		line-height: 70upx;
	}
	.tibao1 {
		background: #FFE3D9;
	}
	.more {
		font-size: 28upx;
		color: #666;
		margin-top: 20upx;
		text-align: center;
		/* margin-bottom: 60upx; */
		padding-bottom: 60upx;
	}
	.cloose {
		position: absolute;
		top: -106upx;
		right: 0;
	}
	.tankuang {font-size: 32upx;color: #fff;margin-top: 220upx;letter-spacing: 2upx;}
	.link_cons>image{width: 100%; overflow: hidden;}
	.active {
		background: #FFF !important;
		font-weight: bold;
		/* border-left: 6upx solid #FF5A1F; */
	}
	.active2 {
		border-left: 6upx solid #FF5A1F;
	}
	.active1 {
		background: #FFF !important;
		/* font-weight: bold; */
		color: #FF5A1F;
	}
	.act {
		background: #F0F3FF !important;
		color: #FF5A1F !important;
	}
	.fanwei-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	.fanwei {
		width: 210upx;
		height: 72upx;
		font-size: 28upx;
		color: #666666;
		line-height: 72upx;
		text-align: center;
		background: #FAFAFA;
		margin: 30upx 0 0;
	}
	.startday {
		width: 210upx;
		height: 72upx;
		font-size: 28upx;
		color: #CCCCCC;
		line-height: 72upx;
		text-align: center;
		background: #FAFAFA;
		margin: 30upx 0;
	}
	.anniu-box {
		display: flex;
		justify-content: center;
		width: 750upx;
		transform: translate(-30upx,30upx);
	}
	.chongzhi {
		width: 374upx;
		height: 94upx;
		line-height: 94upx;
		text-align: center;
		background: #FAFAFA;
		font-size: 32upx;
		color: #999999;
	}
	.queding {
		width: 374upx;
		height: 94upx;
		line-height: 94upx;
		text-align: center;
		background: #FF5A1F;
		font-size: 32upx;
		color: #ffffff;
	}
</style>
