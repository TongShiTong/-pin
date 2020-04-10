<template>
	<view class="content-box">
		<view class="hader">
			<view class="hader-box">
				<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon1.png" @tap="back"></image>
				<view>岗位详情</view>
				<view class="source" @tap="shareFriend">
					<image style="width: 48upx;height: 48upx;" src="/static/other/share.png" mode=""></image>
					<!-- <button open-type='share' class="btnshare">分享</button> -->
				</view>
			</view>
			<view class="campany">
				<!-- <view class="butie">+{{detail.wage*detail.bounty_subsidy/100}}元补贴</view> -->
				<view class="name">{{detail.title}}</view>
				<view class="many">赏金：<span>{{jobData.bounty}}*3</span></view>
			</view>
			<view class="need-box">
				<view class="need">杭州 | 需要{{detail.total}}人 | {{jobData.salary_calculation==1? "计件":jobData.salary_calculation==2? "计时":jobData.salary_calculation==3? "底薪+提成":"其他"}} | 长工</view>
			</view>
			<view class="day">薪资<span style="font-size: 40upx;font-weight: bold;margin-left: 17upx;margin-right: 6upx;">{{jobData.salary}}</span></view>
		</view>

		<uni-popup ref="popupFabu" type="center">
			<view class="tishi">此功能需要下载app呦!</view>
			<view class="gongn">
				<view class="qixiao" @tap="quxiao">在看看</view>
				<view class="quxiazai" @tap="xiazaiApp">去下载</view>
			</view>
		</uni-popup>

		<view class="detail">
			<transition name="slide-fade">
			<view class="hader-box1" v-if="scroll">
				<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
				<view>岗位详情</view>
				<view class="source" @tap="shareFriend">
					<image style="width: 48upx;height: 48upx;" src="/static/other/share1.png" mode=""></image>
					<!-- <button open-type='share' class="btnshare">分享</button> -->
				</view>
			</view>
			</transition>
			<!-- <view class="main"> -->
				<view style="display: flex; align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
						<span style="font-size: 38upx;font-weight: bold;color: #000000;">进度</span>
					</view>
					<span style="font-size: 26upx;font-weight: bold;color: #FF5A1F;text-align: right;">剩余：{{detail.remaining}}</span>
				</view>
				<view class="progress-box">
					<view class="progress">
						<progress :percent="progress" stroke-width="15" activeColor="#F54336" backgroundColor="#F2C7C3"/>
					</view>
					<view class="worse"><span style="font-size: 36upx;color: #F54336;font-weight: bold;">{{detail.total-detail.remaining}}</span>/{{detail.total}}</view>
				</view>
			<!-- </view> -->
			<view class="box1">
				<view class="title-box">
					<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
					<view class="title">工作时间</view>
				</view>
				<view class="neir2">{{jobData.work_start_date}}</view>
			</view>
			<view class="box1">
				<view class="title-box">
					<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
					<view class="title">年龄要求</view>
				</view>
				<view class="neir2">{{jobData.age_range}}岁</view>
			</view>
			<view class="box" v-if="job_tags.length!=0">
				<view class="title-box">
					<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
					<view class="title">福利待遇</view>
				</view>
				<view style="display: flex;align-items: center;flex-wrap: wrap;">
					<view v-for="(item,index) in job_tags" :key="index" class="fuli">
						{{item}}
					</view>
				</view>
			</view>
			<view class="box">
				<view class="title-box">
					<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
					<view class="title">工作地点</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<text selectable="true" class="neir2">{{detail.address}}</text>
					<!-- <view class="jiantou" style="margin-top: -20upx;"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view> -->
				</view>
			</view>
			<view class="box">
				<view class="title-box">
					<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
					<view class="title">岗位要求</view>
				</view>
				<!-- <view class="info-content">
					<rich-text class="neir" :nodes="detail.description"></rich-text>
				</view> -->
				<textarea class="neir" disabled="true" maxlength="500" auto-height v-model="detail.description" style="width: 100%;"/>
			</view>
			<view class="box">
				<view class="title-box">
					<image style="width: 18upx;height: 30upx;margin-right: 13upx;" src="/static/other/xz1.png"></image>
					<view class="title">公司信息</view>
				</view>
				<view class="info">
					<view class="img-box"><image :src="userInfo.avatar" mode="aspectFill"></image></view>
					<view class="info-box">
						<view class="info-name">{{userInfo.nickname}}</view>
						<view class="yrz"><image src="/static/yirenzheng.png"></image></view>
					</view>
				</view>
			</view>
			
			<view v-if="detail.remaining>0">
				<view style="height: 200upx;" v-if="jobData.isShow=='1'"></view>
			</view>
			
		</view>
		<uni-popup :radius="radius" ref="popup" type="bottom">
			<view class="biaoti-box">
				<image style="width: 160upx; height: 160upx;margin-right: 30upx;background: #C9C9C9;" :src="userInfo.avatar" mode="aspectFill"></image>
				<view class="biaoti">
					<view>{{detail.title}}</view>
					<view class="xinshui">{{detail.wage}}元/天</view>
					<view class="mingzi">{{userInfo.nickname}}</view>
				</view>
			</view>
			<view class="tibao-rs">
				<view class="reduce" @tap="reduce">-</view>
				<input type="number" v-model="number" @input="numInfo"/>
				<view class="add" @tap="add">+</view>
			</view>
			<view style="margin: 25upx 0upx 116upx 372upx;font-size: 26upx;color: #666;">还差{{detail.remaining}}人</view>
			<view class="save1" @tap="jieDan">确定</view>
		</uni-popup>
		<view class='toast-out' v-if="isShow">
			<view class='toast-in'>　　　　　　
				<view class='toast-txt'>
					{{txt}}
				</view>
			</view>
		</view>
		<!-- <uni-popup ref="popupTishi" type="top">
			123
		</uni-popup> -->
		<view v-if="detail.remaining>0">
			<view class="baos-an" v-if="jobData.isShow=='1'">
				<view class="an1" @click="qz_Tibao">提报人才</view>
			</view>
		</view>
		<!-- <view class="baos-an" v-if="jiedan==1">
			<view class="an1" @click="openPopup" v-if="task==null">提报人才</view>
			<view v-else class="an">
				<view class="an2" @click="openPopup">补单</view>
				<view class="an1" @tap="openinfoTalent">报送人才</view>
			</view>
		</view>
		<view class="baos-an" v-else>
			<view v-if="status==2" class="an">
				<view class="an2" @click="openPopup">补单</view>
				<view class="an1" @tap="openinfoTalent">报送人才</view>
			</view>
			<view class="an1" v-else-if="status==3" @tap="attend" :data-itemid="detail.id">查看考勤</view>
			<view class="an1" v-else-if="status==4" @tap="billingDetail" :data-end="'2'">查看明细</view>
			<view class="an1" v-else-if="status==5" @tap="billingDetail" :data-end="'2'">查看明细</view>
			<view v-else></view>
		</view> -->
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import http from '@/tools/utils/http.js'
	import wx from 'weixin-js-sdk'
	export default {
		components: {uniPopup},
		data() {
			return {
				scroll:false,
				radius: true,
				isShow:false,
				txt:'',
				job_tags:[],
				detail: {},
				jobData: {},
				userInfo: {},
				task:{},
				itemid:"",
				jiedan:'',
				progress:0,
				status:'',
				number:1,
				longitude:'',
				dimension:'',
				address_name:'',
				url:"http://lsp.jiuduanfw.com/pages/index/hunter_terminal/qz_p_detail/qz_p_detail"
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {  
				return false;  
			}  
			if (options.from === 'backbutton') {
				return false;  
			}
			this.back(); 
			return true;  
		},
		// onShareAppMessage(res) {
		// 	if (res.from === 'button') {// 来自页面内分享按钮
		// 	  console.log(res.target)
		// 	}
		// 	let shareurl=encodeURIComponent('/pages/index/hunter_terminal/p_detail/p_detail?itemid=' + this.itemid);
		// 	console.log(shareurl)
		// 	return {
		// 	  title: this.detail.title,
		// 	  path: '/pages/index/hunter_terminal/p_detail/p_detail?share=1&shareurl=' + shareurl,
		// 	  imageUrl:"../../../../static/logo.png",
		// 	}
		// },
		onLoad(e) {
			this.plus()
			// console.log(e)
			this.itemid = e.itemid 
			this.status = e.status
			this.jiedan = e.jiedan
			this.url = this.url+"?status="+e.status+"&itemid="+e.itemid
			http.apiRequest({
				api: "/jobs/getJobDetail",
				method: "GET",
				data: {
					itemid: e.itemid
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						console.log(res)
						this.detail = res.data
						this.job_tags = res.data.job_tags.split(",")
						this.address_name = res.data.address_name
						this.dimension = res.data.dimension
						this.longitude = res.data.longitude
						this.detail = res.data
						this.jobData = res.data.jobData
						this.userInfo = res.data.userInfo
						this.task = res.data.task
						uni.setNavigationBarTitle({
							title: res.data.title
						})
						this.progress = parseInt((this.detail.total-this.detail.remaining)/this.detail.total*100)
						var day2 = new Date(this.jobData.job_end_date);
						day2.setTime(day2.getTime()-24*60*60*1000);
						var s2 = day2.getFullYear()+"-" + ((day2.getMonth()+1)<10?('0'+(day2.getMonth()+1)) : (day2.getMonth()+1)) + "-" + (day2.getDate()<10?('0' + day2.getDate()) : day2.getDate());
						this.jobData.job_end_date=s2
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
			// this.pengyouQuan()
		},
		onPageScroll: function(e) {
			if(e.scrollTop>180){
				this.scroll = true
			}else {
				this.scroll = false
			}
		},
		methods: {
			plus() {
				let _thant=this;
				if(window.plus){
					 plus.share.getServices(function(s){
					_thant.shares = s;
					}, function(e){
						alert("获取分享服务列表失败："+e.message);
					});
				  }
			  },
			 // 分享朋友圈
			 pengyouQuan() {
				 let that = this
				 http.apiRequest({
				 	api: "/weixin/weixinJssdk",
				 	method: "GET",
				 	data: {
				 		itemid: this.itemid
				 	},
				 	secuss: (res, httpStatus) => {
				 		if (res.code == 1) {
							let wx_config={
				 			  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				 			  appId: res.data.appId, // 必填，公众号的唯一标识
				 			  timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				 			  nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				 			  signature: res.data.signature, // 必填，签名，见附录1
				 			  jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord'] // 必填，需要使用的JS接口列表
				 			};
				 			wx.config(wx_config);
							wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
								//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
								wx.updateAppMessageShareData({
									title: that.detail.title, // 分享标题
									desc: that.detail.description, // 分享描述
									link: that.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: 'http://jiuzhi.jiuduanfw.com/assets/yishnag1130/image/bann.png', // 分享图标
									success: function (e) {
										console.log(e);
										console.log("设置成功");
										// uni.showToast({
										// 	title: '333'
										// });
										// 设置成功
									},
									// error: function(e) {
									// 	uni.showToast({
									// 		title: '222'
									// 	});
									// },
									// fail: function(e) {
									// 	uni.showToast({
									// 		title: '444'
									// 	});
									// }
								})
								//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
								wx.updateTimelineShareData({
									title: that.detail.title, // 分享标题
									link:  that.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: 'http://jiuzhi.jiuduanfw.com/assets/yishnag1130/image/bann.png', // 分享图标
									success: function (e) {
										console.log(e);
										console.log("设置成功");
										// uni.showToast({
										// 	title: '555'
										// });
										// 设置成功
									},
									// error: function(e) {
									// 	uni.showToast({
									// 		title: '666'
									// 	});
									// },
									// fail: function(e) {
										
									
									// }
								})
							});
				 			// wx.onMenuShareTimeline({
				 			//   title: "标题", // 分享标题
				 			//   link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				 			//   imgUrl: 'http://jiuzhi.jiuduanfw.com/assets/yishnag1130/image/bann.png', // 分享图标
				 			//   success () {
				 			// 	alert('分享朋友圈成功')
				 			// 	// 用户确认分享后执行的回调函数
				 			//   },
				 			//   cancel () {
				 			// 	// 用户取消分享后执行的回调函数
				 			//   }
				 			// })
				 	   
				 			// wx.onMenuShareAppMessage({
				 			//   title: '标题', // 分享标题
				 			//   desc: "一起猎手聘", // 分享描述
				 			//   link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				 			//   imgUrl: 'http://jiuzhi.jiuduanfw.com/assets/yishnag1130/image/bann.png', // 分享图标
				 			//   success: function () {
				 			// 	alert('分享给朋友成功')
				 			// 	// 用户确认分享后执行的回调函数
				 			//   },
				 			//   cancel: function () {
				 			// 	// 用户取消分享后执行的回调函数
				 			//   }
				 			// })
							// if (typeof(collback) == "function") {
							// 	collback();
							// }
				 		}
				 	},
				 	error: (res, httpStatus) => {
						// if (typeof(collback) == "function") {
						// 	collback();
						// }
				 		uni.showToast({
				 			title: "请检查网络..."
				 		});
				 	},
				 });
			 },
			  // 分享岗位
			  shareFriend: function() {
				let _that=this;
				  if(this.shares!=null){//app
					  plus.share.sendWithSystem({content:'一起来猎手聘',href:this.url,thumbs:'/static/logo.png'}, function(){
						  console.log('分享成功');
					  }, function(e){
						  console.log('分享失败：'+JSON.stringify(e));
					  });
				  }else{//h5
					  this.$refs.popupFabu.open()
				  }
              },
			  quxiao() {
				this.$refs.popupFabu.close()
			  },
			  xiazaiApp() {
				 location.href = 'http://lsp.jiuduanfw.com/down';  
			  },
			// 提报人才
			openinfoTalent() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/talent_Report/talent_Report?itemid=' + this.itemid + '&pNum=' + this.task.total + '&gender=' + this.detail.gender
				});
			},
			// 查看地址
			openLocation: function (e) {
				console.log(e)
				// var value = e.target.value
				uni.openLocation({
					longitude: Number(this.longitude),
					latitude: Number(this.dimension),
					name: this.address_name,
					address: this.detail.address
				})
			},
			// 输入的人数 
			numInfo(e) {
				// console.log(e)
				if(0<e.detail.value&&e.detail.value<=this.detail.remaining) {
					// console.log(1)
				}else {
					this.number = '',
					// uni.showToast({
					// 	title: '请输入正确的人数',
					// 	position: 'top'
					// });
					this.txt = '请输入正确的人数',
					this.isShow = true
					setTimeout(()=>{
						this.isShow = false
					},2000)
				}
			},
			// 长工提报
			qz_Tibao() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/qz_t_report/qz_t_report?itemid=' + this.itemid
				});
			},
			// 打开类型选择弹框
			openPopup(){
				http.apiRequest({
					api: "/token/check",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							if(uni.getStorageSync("isVerified")==0) {
								uni.showModal({
								    title: '还没有认证',
									confirmColor:'#FF5A1F',
								    content: '可以先去认证，再来接单哦！',
								    success: function (res) {
								        if (res.confirm) {
								            uni.navigateTo({
								            	url:'/pages/index/hunter_terminal/hunter_prove/hunter_prove'
								            });
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
								});
							} else if(uni.getStorageSync("isVerified")==1) {
								http.apiRequest({
									api: "/verified/checkVerified",
									method: "GET",
									data: {
									},
									secuss: (res, httpStatus) => {
										if (res.code == 1) {
											// 注册身份返回认证身份状态
											let isVerified1 = res.data.check
											uni.setStorageSync("isVerified",isVerified1)
											if(isVerified1==2) {
												http.apiRequest({
													api: "/user/userinfo",
													method: "GET",
													data: {
														
													},
													secuss: (res, httpStatus) => {
														if (res.code == 1) {
															let caution_status = res.data.caution_status
															let laveTask = res.data.laveTask
															uni.setStorageSync("caution_status",caution_status)
															if(caution_status==2) {
																this.$refs.popup.open()
															}else {
																if(laveTask!=0) {
																	this.$refs.popup.open()
																}else {
																	uni.showModal({
																	    title: '已经接够免费人数，需要缴纳服务保障金',
																		confirmColor:'#FF5A1F',
																	    content: '可以先去缴纳服务保障金，再来接单哦！',
																	    success: function (res) {
																	        if (res.confirm) {
																	            uni.navigateTo({
																	            	url:'/pages/index/hunter_terminal/margin/margin'
																	            });
																	        } else if (res.cancel) {
																	            console.log('用户点击取消');
																	        }
																	    }
																	});
																}
															}
															console.log(res)
														}else {
															// uni.showToast({
															// 	title: res.msg
															// });
															this.txt = res.msg,
															this.isShow = true
															setTimeout(()=>{
																this.isShow = false
															},2000)
														}
													},
													error: (res, httpStatus) => {
														uni.showToast({
															title: "请检查网络..."
														});
													},
												});
											}else {
												// uni.showToast({
												// 	title: '认证还没有通过！',
												// 	position:"top"
												// });
												this.txt = '认证还没有通过！',
												this.isShow = true
												setTimeout(()=>{
													this.isShow = false
												},2000)
											}
										}else {
											
										}
									},
									error: (res, httpStatus) => {
										uni.showToast({
											title: "请检查网络..."
										});
									},
								});
							}else if(uni.getStorageSync("isVerified")==2) {
								http.apiRequest({
									api: "/user/userinfo",
									method: "GET",
									data: {
										
									},
									secuss: (res, httpStatus) => {
										if (res.code == 1) {
											let caution_status = res.data.caution_status
											let laveTask = res.data.laveTask
											uni.setStorageSync("caution_status",caution_status)
											if(caution_status==2) {
												this.$refs.popup.open()
											}else {
												if(laveTask!=0) {
													this.$refs.popup.open()
												}else {
													uni.showModal({
													    title: '已经接够免费人数，需要缴纳服务保障金',
														confirmColor:'#FF5A1F',
													    content: '可以先去缴纳服务保障金，再来接单哦！',
													    success: function (res) {
													        if (res.confirm) {
													            uni.navigateTo({
													            	url:'/pages/index/hunter_terminal/margin/margin'
													            });
													        } else if (res.cancel) {
													            console.log('用户点击取消');
													        }
													    }
													});
												}
											}
											console.log(res)
										}else {
											// uni.showToast({
											// 	title: res.msg
											// });
											this.txt = res.msg,
											this.isShow = true
											setTimeout(()=>{
												this.isShow = false
											},2000)
										}
									},
									error: (res, httpStatus) => {
										uni.showToast({
											title: "请检查网络..."
										});
									},
								});
							}else {
								uni.showModal({
								    title: '认证没有通过',
									confirmColor:'#FF5A1F',
								    content: '可以先去认证，再来接单哦！',
								    success: function (res) {
								        if (res.confirm) {
								            uni.navigateTo({
								            	url:'/pages/index/hunter_terminal/hunter_prove/hunter_prove'
								            });
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
								});
							}
						}else {
							uni.showModal({
								title: '还没有登录',
								confirmColor:'#FF5A1F',
								content: '可以先去登录，再来接单哦！',
								success: function (res) {
									if (res.confirm) {
										let token1 = ''
										uni.setStorageSync("token",token1)
										uni.reLaunch({
											url: '/pages/login/code_login'
										});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
				// if(uni.getStorageSync("token")=='') {
				// 	uni.showModal({
				// 	    title: '还没有登录',
				// 	    content: '可以先去登录，再来接单哦！',
				// 	    success: function (res) {
				// 	        if (res.confirm) {
				// 	            uni.reLaunch({
				// 	            	url: '/pages/login/code_login'
				// 	            });
				// 	        } else if (res.cancel) {
				// 	            console.log('用户点击取消');
				// 	        }
				// 	    }
				// 	});
				// }else {
					
				// }
				
			},
			// 返回
			back() {
				history.back()
			},
			// 减人数
			reduce() {
				if(this.number>1) {
					this.number--
				}else {
					// uni.showToast({
					// 	title: '已经是最小人数了，不能减了哦！',
					// 	position: 'top'
					// });
					this.txt = '已经是最小人数了，不能减少了哦！',
					this.isShow = true
					setTimeout(()=>{
						this.isShow = false
					},2000)
				}
			},
			// 加人数
			add() {
				if(this.number<this.detail.remaining) {
					this.number++
				}else {
					// uni.showToast({
					// 	title: '已经达到最大接单数，不能增加了哦！',
					// 	position: 'top'
					// });
					this.txt = '已经达到最大接单数，不能增加了哦！',
					this.isShow = true
					setTimeout(()=>{
						this.isShow = false
					},2000)
				}
			},
			// 接单
			jieDan() {
				http.apiRequest({
					api: "/worker_report/jobTask",
					method: "GET",
					data: {
						jobs_id: this.itemid,
						number:this.number
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.$store.state.footer_store.now_page_index=2
							uni.redirectTo({
								url: '/pages/index/index?typeid=5',
							});
						}else {
							// uni.showToast({
							// 	title: res.msg,
							// 	position: 'top'
							// });
							this.txt = res.msg
							this.isShow = true
							setTimeout(()=>{
								this.isShow = false
							},2000)
							// this.$refs.popupTishi.open()
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
		
			// 跳到考勤信息
			attend(e) {
				var itemId = e.currentTarget.dataset.itemid
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/hunter_terminal/attend/attend?itemid=' + itemId
				});
			},
			// 跳到结算明细详情页
			billingDetail(e) {
				var end = e.currentTarget.dataset.end
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/billing_details/billing_details?itemid=' + this.itemid + '&end=' + end
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
	.main {
		padding: 74upx 40upx 48upx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 16upx;
		height: 490upx;
		position: relative;
		top: 480upx;
		border-top-left-radius: 36upx;
		border-top-right-radius: 36upx;
	}
	.jindu {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: absolute;
		font-size: 38upx;
		color: #000000;
		font-weight: bold;
	}
	.hader {
		background: #fff;
		width: 100%;
		height: 550upx;
		position: fixed;
		z-index: 0;
		background: url(../../../../static/other/detail-bg.png) no-repeat;
		background-size: 750upx 550upx;
		padding: 0upx 40upx 0upx;
		box-sizing: border-box;
	}
	.hader-box {
		width: 100%;
		padding: 67upx 0upx 27upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34upx;
		color: #FFF;
		font-weight: bold;
	}
	.hader-box1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34upx;
		font-weight: bold;
		color: #000000;
		margin-bottom: 60upx;
		position: fixed;
		top: 0;
		background: #F7F7F7;
		width: 750upx;
		height: 150upx;
		padding: 30upx 40upx 0;
		box-sizing: border-box;
		transform: translateX(-40upx);
		z-index: 1;
		transition: opacity 1s;
	}
	
	.source {
		font-size: 28upx;
		color: #333;
		font-weight: 400;
	}
	.campany {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 50upx;
		margin-top: 30upx;
		/* align-items: center; */
		color: #fff;
		font-weight: bold;
		position: relative;
	}
	.butie {
		/* width: 102upx; */
		/* height: 34upx; */
		position: absolute;
		top: -24upx;
		right: 0upx;
		background: url(../../../../static/butie.png) no-repeat;
		background-size: 100% 100%;
		font-size: 20upx;
		color: #E50000;
		line-height: 1em;
		padding: 5upx 10upx 10upx;
	}
	.name {
		max-width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient: vertical;
	}
	.day {
		text-align: left;
		font-size: 30upx;
		font-weight: 500;
		color: #fff;
	}
	.many {
		font-size: 24upx;
		color: #fff;
		font-weight: 400;
	}
	.many span {
		font-size: 56upx;
		color: #fff;
		font-weight: bold;
	}
	.need-box {
		display: flex;
		justify-content: space-between;
		padding: 32upx 0 46upx
	}
	.need {
		font-size: 26upx;
		color: #FFFFFF;
		text-align: left;
	}
	.time {
		text-align: left;
		font-size: 30upx;
		color: #1A1A1A;
		margin-bottom: 20upx;
	}

	.people-num {
		margin-top: 36upx;
		margin-left: 25upx;
		display: flex;
	}
	.progress {
		width: 474upx;
		margin: 0 auto;
		border-radius: 15upx;
		overflow: hidden;
	}
	.progressNum {
		width: 400upx;
		display: flex;
		justify-content: space-between;
		font-size: 26upx;
		color: #666;
		margin-top: 10upx;
	}
	.people-box {
		margin-right: 120upx;
	}
	.people {
		font-size: 24upx;
		color: #6c70e9;
		padding-bottom: 16upx;
	}
	.num {
		font-size: 40upx;
		color: #FF5A1F;
	}
	.m-baos {
		font-size: 26upx;
		color: #6c70e9;
		text-align: left;
		margin-bottom: 60upx;
		margin-top: 40upx;
	}
	.m-baos span {
		font-size: 40upx;
		color: #FF5A1F;
		margin-left: 30upx;
		margin-right: 42upx;
	}
	.info {
		display: flex;
		align-items: center;
	}
	.info-box {
		
	}
	.img-box {
		width: 108upx;
		height: 108upx;
		border-radius: 50%;
		overflow: hidden;
		background: #C9C9C9;
		/* background: #83A5FA;
		border-radius: 50%;
		overflow: hidden; */
		margin-right: 30upx;
	}
	.img-box image {
		width: 100%;
		height: 100%;
	}
	.info-name {
		font-size: 36upx;
		color: #000;
	}
	.yrz {
		width: 90upx;
		height: 40upx;
		margin-top: 16upx;
		margin-bottom: 6upx;
	}
	.yrz image {
		width: 100%;
		height: 100%;
	}
	.yijied {
		/* width: 200upx;*/
		height: 60upx; 
		padding-left: 25upx;
		padding-right: 11upx;
		background: #FF5A1F;
		border-top-left-radius: 30upx;
		border-bottom-left-radius: 30upx;
		/* text-align: center; */
		line-height: 60upx;
		font-size: 32upx;
		color: #fff;
	}
	.already {
		font-size: 22upx;
		color: #666;
		margin-bottom: 10upx;
	}
	.tibao {
		font-size: 26upx;
		color: #fff;
		background: #FF5A1F;
		width: 192upx;
		height: 54upx;
		border-radius: 27upx;
		overflow: hidden;
		text-align: center;
		line-height: 54upx;
	}
	.progress-box {
		width: 670upx;
		height: 220upx;
		padding-top: 78upx;
		box-sizing: border-box;
		box-shadow: 0 0 20upx #F4F4F4;
		background: url(../../../../static/other/jindt-bg.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 40upx;
		margin-bottom: 100upx;
		/* top: -146upx; */
	}
	.p-name {
		font-size: 30upx;
		color: #000000;
	}
	.p-num {
		font-size: 24upx;
		color: #999;
		text-align: center;
		margin-top: 8upx;
		margin-bottom: 20upx;
	}
	.worse {
		font-size: 26upx;
		color: #4D4D4D;
		font-weight: 500;
		text-align: right;
		margin-top: 40upx;
		margin-right: 80upx;
	}
	.detail {
		width: 100%;
		background: #F7F7F7;
		padding: 80upx 40upx 0;
		box-sizing: border-box;
		position: relative;
		top: 480upx;
		border-top-left-radius: 36upx;
		border-top-right-radius: 36upx;
	}
	.detail .box {
		padding-bottom: 88upx;
	}
	.box1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 1em;
		margin-bottom: 107upx;
	}
	
	.title-box {
		display: flex;
		align-items: center;
		margin-bottom: 26upx;
	}
	.box1 .title-box {
		margin-bottom: 0upx;
	}
	.detail .title {
		font-size: 38upx;
		color: #000000;
		font-weight: bold;
		
	}
	.detail .neir {
		font-size: 30upx;
		color: #4D4D4D;
		margin-bottom: 20upx;
	}
	.neir1 {
		font-size: 30upx;
		color: #000;
		font-weight: bold;
		margin-bottom: 12upx;
		display: flex;
		align-items: center;
	}
	.neir1 span {
		font-weight: 500;
	}
	.neir2 {
		font-size: 30upx;
		color: #000000;
		font-weight: 500;
		margin-bottom: 20upx;
	}
	.box1 .neir2 {
		margin-bottom: 0upx;
	}
	.fuli {
		font-size: 30upx;
		font-weight: 500;
		line-height: 1em;
		color: #000000;
		padding: 19upx 34upx;
		border: 1upx solid #000000;
		border-radius:40upx;
		margin-right: 40upx;
		margin-bottom: 20upx;
	}
	.detail .neir span {
		color: #1A1A1A;
		font-weight: bold;
	}
	.baos-an {
		background: #fff;
		display: flex;
		justify-content: center;
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 160upx;
		padding-top: 20upx;
	}
	.an {
		display: flex;
		width: 670upx;
		justify-content: space-between;
	}
	.an1 {
		background: #FF5A1F;
		width: 670upx;
		height: 94upx;
		border-radius: 6upx;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #fff;
		/* margin-left: 40upx; */
	}
	.an2 {
		background: #FFE3D9;
		width: 240upx;
		height: 94upx;
		border-radius: 6upx;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #FF5A1F;
	}
	.biaoti-box {
		display: flex;
		margin: 76upx 10upx 100upx;
	}
	.biaoti {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #000000;
		font-size: 46upx;
		font-weight: bold;
	}
	.xinshui {
		font-size: 36upx;
		color: #FF5A1F;
	}
	.mingzi {
		font-size: 30upx;
		color: #666666;
		font-weight: 400;
	}
	.tibao-rs {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.reduce {
		width: 90upx;
		height: 60upx;
		background: #FFE3D9;
		border-radius: 30upx;
		text-align: center;
		line-height: 48upx;
		color: #FF5A1F;
		font-size: 76upx;
	}
	.tibao-rs input {
		width: 90upx;
		text-align: center;
	}
	.add {
		width: 90upx;
		height: 60upx;
		background: #FF5A1F;
		border-radius: 30upx;
		text-align: center;
		line-height: 54upx;
		color: #fff;
		font-size: 60upx;
	}
	.save1 {
		height: 94upx;
		width: 440upx;
		margin: 0 auto;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		margin-bottom: 40upx;
	}
	.toast-out {
	  position: fixed;
	  top: 30%;
	  left: 15%;
	  z-index: 99999;
	  width: 100%;
	  height: 100%;
	}
	.toast-out .toast-in {
	  max-width: 500upx;
	  min-height: 200upx;
	  background: rgba(0, 0, 0, 0.7);
	  padding: 12upx;
	  text-align: center;
	  color: white;
	  border-radius: 16upx;
	}
	.toast-out .toast-in span {
	  font-size: 32upx;
	}
	.toast-out .toast-in .toast-txt {
	  font-size: 32upx;
	  padding-top: 60upx;
	}
	.tishi {
		  font-size: 40upx;
		  color: #1A1A1A;
		  padding: 30upx;
	}
	.gongn {
		  margin: 60upx 30upx 0;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
	}
	.qixiao {
		  font-size: 30upx;
		  padding: 20upx 40upx;
		  background: #FFE3D9;
		  color: #FF5A1F;
		  border-radius: 40upx;
	}
	.quxiazai {
		  font-size: 30upx;
		  padding: 20upx 40upx;
		  background: #FF5A1F;
		  color: #fff;
		  border-radius: 40upx;
	}
	.slide-fade-enter-active {
	  transition: all 0.5s ease;
	}
	.slide-fade-leave-active {
	  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	{
	  opacity: 0;
	}
</style>
