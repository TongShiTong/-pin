<template>
	<view class="content-box">
		<view class="heard">
			<view class="main1" @tap="qzOpeninfo">
				<view class="campany">
					<view class="name">{{detail.title}}</view>
					<view class="many">赏金<span>{{detail.jobData.bounty}}*3</span></view>
				</view>
				<view class="need">杭州 | 需要{{detail.total}}人 | {{detail.jobData.salary_calculation==1? "计件":detail.jobData.salary_calculation==2? "计时":detail.jobData.salary_calculation==3? "底薪+提成":"其他"}} | 长工</view>
				<view class="day">薪资<span style="font-size: 36upx;color: #0B0B0B; font-weight: bold;margin-left: 16upx;">{{detail.jobData.salary}}</span></view>
				<view class="xiangyou"><image src="/static/xianyou.png"></image></view>
			</view>
		</view>
		<view class="renyuan_qk">人员情况</view>
		<view class="chakan_ry">
			<view class="tb_renyuan">
				<view class="tb_ds" v-if="xiajia==2">提报人员<span>0人</span></view>
				<view class="tb_ds" v-else>提报人员<span>{{tongji.workerReport}}人</span></view>
				<view style="width: 52upx;height: 10upx;background: #FFFFFF;margin: 12upx 0 44upx;"></view>
				<view class="tbry_ck1" v-if="xiajia==2">已清空</view>
				<view class="tbry_ck" @tap="ckTibao" v-else>立即查看</view>
			</view>
			<view class="rz_renyuan">
				<view class="tb_ds">在职人员<span>{{tongji.onboarding}}/{{detail.total}}人</span></view>
				<view style="width: 52upx;height: 10upx;background: #FFFFFF;margin: 12upx 0 44upx;"></view>
				<view class="rzry_ck" @tap="ruzhiRenyuan">立即查看</view>
			</view>
		</view>
		<view class="mx_title">
			<view>招聘赏金</view>
			<view class="yubao" @tap="lishiBaobiao">
				<view>赏金月报</view>
				<view style="width: 14upx;height: 22upx;margin-left: 10upx;">
					<image style="width: 100%;height: 100%;" src="/static/xianyou.png"></image>
				</view>
			</view>
		</view>
		<view class="shangjin">
			<view class="sj_info">
				<view class="sj_box" @tap="yueduBaobiao">
					<view class="qian">
						{{tongji.monthSett}}
					</view>
					<view>上月赏金（元）</view>
				</view>
				<view class="sj_box" @tap="lishiBaobiao">
					<view class="qian">
						{{tongji.allSett}}
					</view>
					<view>已产生赏金（元）</view>
				</view>
			</view>
			<view class="syyc_sj">
				<view><span style="font-size: 24upx;color: #999999;margin-right: 10upx;">剩余赏金</span>{{detail.jobData.bounty_surplus}}元</view>
				<view style="width: 2upx;height: 25upx;margin: 0 22upx;background: #999999;"></view>
				<view><span style="font-size: 24upx;color: #999999;margin-right: 10upx;">预存赏金</span>{{detail.jobData.bounty_prepaid}}元</view>
			</view>
			<view class="yucun_sj" style="justify-content: center;" v-if="xiajia==2">
				<!-- <view class="yucun" @tap="yuCunsj">预存</view> -->
				<view class="jiesuan" @tap="jieSuansjqd">结算账单</view>
			</view>
			<view class="yucun_sj" v-else>
				<view class="yucun" @tap="yuCunsj">预存</view>
				<view class="jiesuan" @tap="jieSuansj">结算</view>
			</view>
		</view>
		<view v-if="msShuju.length!=0">
			<view class="mx_title">
				<view>面试安排</view>
				<view class="yubao">
					<view @tap="msList">所有面试</view>
					<view style="width: 14upx;height: 22upx;margin-left: 10upx;">
						<image style="width: 100%;height: 100%;" src="/static/xianyou.png"></image>
					</view>
				</view>
			</view>
			<view>
				<view class="mianshi">
					<!-- <view class="tody">今天</view> -->
					<view>{{msinfo.interview_date}} | {{msinfo.time_period}}</view>
				</view>
				<view class="ms_detial">
					<view class="fzren">负责人：{{msinfo.hr_name}}</view>
					<view class="ms_tine">
						<view>联系方式：</view>
						<view style="margin-right: 10upx;font-weight: bold;" @tap="callPhone" :data-ph="item" v-for="(item,index) in hr_mobile" :key="index">{{item}}</view>
					</view>
					<view>地址：{{msinfo.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getWeek,formatDate} from '@/components/date.js'
	import http from '@/tools/utils/http.js'
	export default {
		filters: {
			getWeek(time) {
				var date = new Date(time);
				return getWeek(date)
			}
		},
		data() {
			return {
				itemid:'',
				xiajia:'',
				day:'',
				detail:{
					jobData:{}
				},
				msinfo:{
					
				},
				hr_mobile:[],
				msShuju:[],
				tongji:{}
			}
		},
	
		onLoad(e) {
			let that = this
			that.itemid=e.itemid
			that.xiajia=e.xiajia
			that.viewList()
			that.tongJi()
			if(that.xiajia==1) {
				uni.setNavigationBarTitle({
					title: "已下架"
				})
			}else if(that.xiajia==2) {
				uni.setNavigationBarTitle({
					title: "已结算"
				})
			}
			var day1 = new Date();
			day1.setTime(day1.getTime());
			// var s1 = day1.getFullYear()+''+(day1.getMonth()+1);
			if(day1.getMonth()==0) {
				var year = day1.getFullYear()-1
				var s1 = year+''+'12';
			}else {
				var s1 = day1.getFullYear()+''+(day1.getMonth());
			}
			that.day = s1
			uni.$on('lizhi',()=>{
				that.tongJi()
			})
			uni.$on('jiesuanh',()=>{
				that.tongJi()
				that.getDetail()
				that.xiajia=2
				uni.setNavigationBarTitle({
					title: "已结算"
				})
			})
			that.getDetail()
		},
		methods: {
			// 获取详情
			getDetail() {
				http.apiRequest({
					api: "/jobs/getJobDetail",
					method: "GET",
					data: {
						itemid: this.itemid
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.detail = res.data
							console.log(res)
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			// 结算赏金
			jieSuansj() {
				let that = this
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/jiesuan/jiesuan?itemid=' + that.itemid
				});
			},
			jieSuansjqd() {
				let that = this
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/jiesuan/jiesuan?yjiesuan=1&itemid=' + that.itemid
				});
			},
			// 预存赏金
			yuCunsj() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/yucun/yucun?itemid=' + this.itemid
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
			// 获取历史报表
			lishiBaobiao() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/history_inform/history_inform?itemid=' + this.itemid
				});
			},
			// 获取每月报表
			yueduBaobiao() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/m_inform/m_inform?itemid=' + this.itemid +'&month=' + this.day
				});
			},
			// 到面试列表
			msList() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/sy_ms/sy_ms?itemid=' + this.itemid
				});
			},
			// 入职人员
			ruzhiRenyuan() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/rz_list/rz_list?hasback=1&itemid=' + this.itemid
				});
			},
			
			// 获取第一条面试
			viewList() {
				let that = this
				http.apiRequest({
					api: "/interview/getInterviewList",
					method: "GET",
					data: {
						jobs_id: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log(res)
							that.msShuju = res.data.rows
							that.msinfo = res.data.rows[0]
							if(res.data.rows.length==0){
								
							}else {
								that.hr_mobile = res.data.rows[0].hr_mobile.split(",")
								console.log('258',that.hr_mobile)
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
			},
			// 获取统计
			tongJi() {
				let that = this
				http.apiRequest({
					api: "/jobs/getJobDetailTotal",
					method: "GET",
					data: {
						itemid: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							console.log('233',res)
							that.tongji = res.data
						}else {
							
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			//跳到岗位详情
			qzOpeninfo() {
				if(this.detail.margin_status==2&&this.detail.jobData.isShow==2) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=3&itemid=' + this.itemid
					});
				}else if(this.detail.margin_status==2&&this.detail.jobData.isShow==1) {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=2&itemid=' + this.itemid
					});
				}else {
					uni.navigateTo({
						// 传递 userid 在详情页接收
						url: '/pages/index/enterprise_terminal/qz_e_detail/qz_e_detail?status=4&itemid=' + this.itemid
					});
				}
			},
			// 到提报人才页面
			ckTibao() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/qz_record/qz_record?itemid=' + this.itemid +'&pNum=' + this.detail.remaining
				});
			}
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		padding-top: 48upx;
		position: relative;
	}
	.heard {
		width: 100%;
		height: 240upx;
		background: linear-gradient(#FC5337, #ffffff);
		position: relative;
	}
	.renyuan_qk{
		font-size: 40upx;
		color: #000000;
		font-weight: bold;
		margin: 116upx 24upx 36upx;
	}
	.main1 {
		padding: 55upx 35upx 45upx;
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0upx 20upx 20upx #FAFAFA;
		position: absolute;
		width: 702upx;
		height: 260upx;
		top: 24upx;
		left: 24upx;
		border-radius: 16upx;
	}
	.campany {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 40upx;
		color: #000000;
		line-height: 1em;
		font-weight: bold;
		position: relative;
		margin-bottom: 32upx;
	}
	.need {
		font-size: 26upx;
		color: #333333;
		line-height: 1em;
		margin-bottom: 36upx;
	}
	.name {
		max-width: 380upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient: vertical;
	}
	.day {
		text-align: left;
		font-size: 26upx;
		font-weight: 500;
		color: #000000;
		line-height: 1em;
	}
	.xiangyou {
		position: absolute;
		right: 35upx;
		top: 40%;
		width: 14upx;
		height: 22upx;
	}
	.xiangyou image {
		width: 100%;
		height: 100%;
	}
	.many {
		font-size: 26upx;
		color: #000;
		font-weight: 500;
	}
	.many span {
		font-size: 38upx;
		color: #FF5A1F;
		font-weight: bold;
		margin-left: 16upx;
		margin-right: 65upx;
	}
	.chakan_ry {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 24upx;
	}
	.tb_renyuan {
		width: 340upx;
		height: 240upx;
		border-radius: 8upx;
		background: url(../../../../static/tibao.png) no-repeat;
		background-size: 100% 100%;
		padding: 50upx 40upx 22upx;
		box-sizing: border-box;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.rz_renyuan {
		width: 340upx;
		height: 240upx;
		border-radius: 8upx;
		background: url(../../../../static/ruzhi.png) no-repeat;
		background-size: 100% 100%;
		padding: 50upx 40upx 22upx;
		box-sizing: border-box;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.tb_ds {
		font-size: 34upx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.tb_ds span {
		font-size: 26upx;
		margin-left: 15upx;
	}
	.tbry_ck {
		width: 260upx;
		height: 56upx;
		background: #FFFFFF;
		border-radius: 28upx;
		font-size: 26upx;
		color: #0057D1;
		font-weight: bold;
		text-align: center;
		line-height: 56upx;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.tbry_ck1 {
		width: 260upx;
		height: 56upx;
		background: #FFFFFF;
		border-radius: 28upx;
		font-size: 26upx;
		color: #0057D1;
		opacity: 0.6;
		font-weight: bold;
		text-align: center;
		line-height: 56upx;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.rzry_ck {
		width: 260upx;
		height: 56upx;
		background: #FFFFFF;
		border-radius: 28upx;
		font-size: 26upx;
		color: #D25900;
		font-weight: bold;
		text-align: center;
		line-height: 56upx;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.mx_title {
		margin: 70upx 24upx 36upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 40upx;
		color: #000000;
		font-weight: bold;
		line-height: 1em;
	}
	.yubao {
		font-size: 26upx;
		color: #000000;
		font-weight: 500;
		display: flex;
	}
	.shangjin {
		margin: 0 24upx;
		width: 702upx;
		/* height: 380upx; */
		background: url(../../../../static/zhaopinsj1.png) no-repeat;
		background-size: 100% 100%;
		border-radius: 12upx;
		font-size: 28upx;
		color: #000000;
		line-height: 1em;
		padding: 60upx 0upx 30upx;
		box-sizing: border-box;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.sj_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.sj_box {
		width: 50%;
		text-align: center;
	}
	.qian {
		font-size: 46upx;
		font-weight: bold;
		color: #525AFF;
		line-height: 1em;
		margin-bottom: 30upx;
	}
	.mianshi {
		margin: 0 40upx 24upx;
		display: flex;
		align-items: center;
		font-size: 32upx;
		font-weight: bold;
		color: #0B0B0B;
	}
	.syyc_sj {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 42upx 0 46upx;
	}
	.yucun_sj {
		margin: 0 80upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26upx;
		font-weight: 500;
	}
	.yucun {
		width: 200upx;
		height: 68upx;
		background: #525AFF;
		border-radius: 34upx;
		line-height: 68upx;
		text-align: center;
		color: #FFFFFF;
	}
	.jiesuan {
		width: 200upx;
		height: 68upx;
		background: #FFFFFF;
		border-radius: 34upx;
		line-height: 68upx;
		text-align: center;
		color: #555EFF;
	}
	.tody {
		margin-right: 26upx;
		color: #FB5337;
		font-size: 36upx;
	}
	.ms_detial {
		width: 670upx;
		height: 172upx;
		padding: 20upx 40upx 0upx;
		box-sizing: border-box;
		background: #F7F7F7;
		border-radius: 8upx;
		margin: 0 auto 100upx;
		font-size: 28upx;
		color: #999999;
		font-weight: 500;
	}
	.ms_tine {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		/* font-size: 46upx; */
		color: #000000;
		font-weight: 500;
		line-height: 1em;
		margin-bottom: 20upx;
	}
	.fzren {
		font-size: 26upx;
		color: #000000;
		font-weight: 500;
		margin-bottom: 20upx;
	}
	.shuju {
		text-align: center;
		color: #999;
		font-size: 32upx;
		margin: 60upx;
	}
</style>
