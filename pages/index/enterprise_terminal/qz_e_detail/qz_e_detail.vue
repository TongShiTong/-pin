<template>
	<view class="content-box">
		<view class="hader">
			<view class="hader-box">
				<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon1.png" @tap="back"></image>
				<view>岗位详情</view>
				<view>
					<view class="caozuo" v-if="status!=3">
						<view class="source" @tap="shareFriend" v-if="detail.margin_status==2">
							<image style="width: 48upx;height: 48upx;margin-right: 40upx;" src="/static/other/share.png" mode=""></image>
							<!-- <button open-type='share' class="btnshare">分享</button> -->
						</view>
						<view class="source" @tap="openMb">
							<image style="width: 48upx;height: 48upx;" src="/static/gengduo1.png"></image>
							<!-- <button open-type='share' class="btnshare">分享</button> -->
						</view>
					</view>
				</view>
			</view>
			<view class="campany">
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
				<view>
					<view class="caozuo" v-if="status!=3">
						<view class="source" @tap="shareFriend" v-if="detail.margin_status==2">
							<image style="width: 48upx;height: 48upx;margin-right: 40upx;" src="/static/other/share1.png" mode=""></image>
							<!-- <button open-type='share' class="btnshare">分享</button> -->
						</view>
						<view class="source" @tap="openMb">
							<image style="width: 48upx;height: 48upx;" src="/static/gengduo2.png"></image>
							<!-- <button open-type='share' class="btnshare">分享</button> -->
						</view>
					</view>
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
				<view style="display: flex;justify-content: space-between;align-items: center;" @click="openMap">
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
			<view style="height: 200upx;" v-if="status!=4"></view>
		</view>
		<view class="baos-an" v-if="status==1">
			<view class="an">
				<view class="an3" @tap="frontMoney">支付定金</view>
				<!-- <view class="an2" @tap="change">修改岗位</view> -->
			</view>
		</view>
		<view class="baos-an" v-else-if="status==2">
			<view class="an3" @tap="qzZhaopin">查看提报</view>
		</view>	
		<view class="baos-an" v-else-if="status==3">
			<view class="an3" @tap="shangJia">上架</view>
		</view>	
		<view v-else></view>
		<view v-if="hbIsShow">
		  <view class="hb_zzc">
			<view @tap="coloseMb" style="width: 100%;height: 100%;position: absolute;"></view>
			<view class="baiban1" v-if="status==1">
				<view style="border-bottom: 1upx solid #E6E6E6;" @tap="change">编辑</view>
				<view @tap="onMove">删除</view>
			</view>
			<view class="baiban2" v-if="status==2">
				<view @tap="xiaJia">下架</view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import http from '@/tools/utils/http.js'
	import $ from 'jquery'
	import Map from '@/tools/utils/openMap.js'
	import wx from 'weixin-js-sdk'
	export default {
		components: {uniPopup},
		data() {
			return {
				scroll:false,
				detail: {},
				job_tags:[],
				jobData: {},
				userInfo: {},
				hbIsShow: false,
				itemid:"",
				progress:0,
				status:'',
				longitude:'',
				dimension:'',
				address_name:'',
				url:"http://lsp.jiuduanfw.com/pages/index/hunter_terminal/qz_p_detail/qz_p_detail"
				// sharewx:'',
			}
		},
		onLoad(e) {
			// console.log(e)
			this.plus()
			this.itemid = e.itemid
			this.status = e.status
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
						this.jobData = res.data.jobData
						this.userInfo = res.data.userInfo
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
			// uni.$on('update',function(data){
			// 	console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			// })
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
					// for(var i in s) {
					// 	if('weixin' == s[i].id) {
					// 		_thant.sharewx = s[i]
					// 		this.sharewx = _thant.sharewx
					// 	}
					// }
					}, function(e){
						alert("获取分享服务列表失败："+e.message);
					});
				}
			},
			openMap() {
				let that = this
				$.ajax({
				    type: "get",
				    dataType: 'jsonp',
				    data: {
				        key: "2CABZ-2ZP6U-SBTVG-4KP5J-LHPHZ-WABBI", // 填申请到的key
				        address: that.detail.address, //具体的地址
				        output: 'jsonp' //返回格式：支持JSON/JSONP，默认JSON
				    },
				    jsonp: "callback",
				    jsonpCallback: "QQmap",
				    url: "https://apis.map.qq.com/ws/geocoder/v1/?",
				    success: function (json) {
				        if(json.status == 0) {
							console.log(json)
				            let lat = json.result.location.lat;
				            let lng = json.result.location.lng;
							let name1 = json.result.title
				            console.log('经度：', lat);
				            console.log('纬度：', lng);
							console.log(name1);
							// uni.openLocation({
							// 	latitude: lat,
							// 	longitude: lng,
							// 	success: function () {
							// 		console.log('success');
							// 	}
							// });
							Map.openMap(lat, lng, name1, 'gcj02')
				        } else {
				            alert('错误信息：', json.message);
							console.log(json)
				        }
				    },
				    error: function (err) { 
				        alert("异常错误，请刷新浏览器后重试");
				    }
				})
				// Map.openMap(this.latitude, this.longitude, this.name, 'wgs84')
			},
			// 到任务详情页面
			qzZhaopin() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/qz_renwu/qz_renwu?itemid=' + this.itemid
				});
			},
			// 删除信息
			onMove() {
				let that = this
				this.hbIsShow=false
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '确定删除此岗位吗？',
					success: function(res) {
						if (res.confirm) {
							http.apiRequest({
								api: "/jobs/jobRemove",
								method: "POST",
								data: {
									itemid:that.itemid,
								},
								secuss: (res, httpStatus) => {
									if (res.code == 1) {
										uni.$emit('onmove',{})
										uni.navigateBack({
											delta: 1
										})
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 下架
			xiaJia() {
				let that = this
				this.hbIsShow=false
				uni.showModal({
					title: '提示',
					confirmColor:'#FF5A1F',
					content: '下架后此岗位将不会再被提报人才，确定下架此岗位吗？',
					success: function(res) {
						if (res.confirm) {
							http.apiRequest({
								api: "/jobs/jobFullSetShow",
								method: "POST",
								data: {
									itemid: that.itemid,
									isShow: 2,
								},
								secuss: (res, httpStatus) => {
									if (res.code == 1) {
										uni.$emit('onmove',{})
										uni.navigateBack({
											delta: 1
										})
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 上架
			shangJia() {
				http.apiRequest({
					api: "/jobs/jobFullSetShow",
					method: "POST",
					data: {
						itemid: this.itemid,
						isShow: 1,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							uni.$emit('onmove',{})
							uni.navigateBack({
								delta: 1
							})
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
			// 关闭蒙板
			coloseMb() {
				this.hbIsShow=false
			},
			// 打开蒙板
			openMb() {
				this.hbIsShow=true
			},
			change() {
				this.hbIsShow=false
				let that=this
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/qz_change/qz_change?itemid=' + that.itemid
				});
			},
			quxiao() {
				this.$refs.popupFabu.close()
			},
			xiazaiApp() {
				location.href = 'http://lsp.jiuduanfw.com/down';  
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
			// 返回
			back() {
				history.back()
			},
			// 结算
			billing() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/billing_details/billing_details?itemid=' + this.itemid
				});
			},
			// 跳到支付页面
			frontMoney() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/qz_pay/qz_pay?itemid=' + this.itemid
				});
			},
			// 跳到提报记录页
			record() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/record/record?itemid=' + this.itemid
				});
			},
			// 跳到点名页
			reportNum() {
				uni.navigateTo({
					// 传递在详情页接收
					url: '/pages/index/enterprise_terminal/check_in/check_in?itemid=' + this.itemid
				});
			},
			//结算明细
			billingDetail(e) {
				var end = e.currentTarget.dataset.end
				// if(end==1) {
					uni.navigateTo({
						// 传递在详情页接收
						url: '/pages/billing_details/billing_details?itemid=' + this.itemid + '&end=' + end
					});
				// }else {
					// uni.navigateTo({
						// 传递在详情页接收
						// url: '/pages/billing_details/billing_details?itemid=' + this.itemid
					// });
				// }
			},
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		/* background: #F4F4F4; */
		position: relative;
	}
	.main {
		padding: 74upx 40upx 48upx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 16upx;
		height: 540upx;
		margin-top: 100upx;
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
	.caozuo {
		display: flex;
		align-items: center;
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
		font-size: 50upx;
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
	}
	.an1 {
		background: #FF5A1F;
		width: 440upx;
		height: 94upx;
		border-radius: 6upx;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #fff;
		margin-right: 40upx;
	}
	.an3 {
		background: #FF5A1F;
		width: 670upx;
		height: 94upx;
		border-radius: 6upx;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #fff;
		/* margin-right: 40upx; */
	}
	.an2 {
		background: #FFE3D9;
		width: 200upx;
		height: 94upx;
		border-radius: 6upx;
		text-align: center;
		line-height: 94upx;
		font-size: 36upx;
		color: #FF5A1F;
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
	.hb_zzc{position: fixed;width: 100%;height: 100%;left: 0;top:0;background: rgba(0,0,0,0.5);display: flex;align-items: center;justify-content: center;z-index: 1000;}
	.baiban1 {
		width: 240upx;
		height: 190upx;
		background: url(../../../../static/baiban2.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 130upx;
		right: 40upx;
		padding-top: 12upx;
		box-sizing: border-box;
		line-height: 88upx;
		text-align: center;
		font-size: 32upx;
		font-weight: 500;
		color: #000000;
	}
	.baiban2 {
		width: 240upx;
		height: 100upx;
		background: url(../../../../static/baiban2.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 130upx;
		right: 40upx;
		padding-top: 8upx;
		box-sizing: border-box;
		line-height: 88upx;
		text-align: center;
		font-size: 32upx;
		font-weight: 500;
		color: #000000;
	}
</style>
