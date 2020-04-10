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
		<view style="height: 46upx;"></view>
		<view v-if="msShuju.length!=0">
			<view class="renyuan_qk">
				<view>面试安排</view>
				<view class="yubao">
					<view @tap="msList">所有面试</view>
					<view style="width: 14upx;height: 22upx;margin-left: 10upx;">
						<image style="width: 100%;height: 100%;" src="/static/xianyou.png"></image>
					</view>
				</view>
			</view>
			<view class="ms_detial">
				<view class="mshi_box">
					<view class="mianshi">
						<view>{{msinfo.interview_date}} | {{msinfo.time_period}}</view>
					</view>
				</view>
				
				<view class="fzren">负责人：{{msinfo.hr_name}}</view>
				
				<view class="ms_tine">
					<view>联系方式：</view>
					<view style="margin-right: 10upx;font-weight: bold;" @tap="callPhone" :data-ph="item" v-for="(item,index) in hr_mobile" :key="index">{{item}}</view>
				</view>
				<view>地址：{{msinfo.address}}</view>
			</view>
		</view>
		<view class="mx_title">人员情况</view>
		<view class="chakan_ry">
			<view class="tb_renyuan">
				<view class="tb_ds" v-if="isjiesuan==3">提报人员<span>0人</span></view>
				<view class="tb_ds" v-else>提报人员<span>{{tongji.workerReport}}人</span></view>
				<view style="width: 52upx;height: 10upx;background: #FFFFFF;margin: 12upx 0 44upx;"></view>
				<view class="tbry_ck1" v-if="isjiesuan==3">已清空</view>
				<view class="tbry_ck" @tap="ckTibao" v-else>立即查看</view>
			</view>
			<view class="rz_renyuan">
				<view class="tb_ds">在职人员<span>{{tongji.onboarding}}人</span></view>
				<view style="width: 52upx;height: 10upx;background: #FFFFFF;margin: 12upx 0 44upx;"></view>
				<view class="rzry_ck" @tap="ruzhiRenyuan">立即查看</view>
			</view>
		</view>
		<view class="mx_title">
			<view>招聘赏金</view>
			<view @tap="lishiBaobiao" class="yubao">
				<view>赏金月报</view>
				<view style="width: 14upx;height: 22upx;margin-left: 10upx;">
					<image style="width: 100%;height: 100%;" src="/static/xianyou.png"></image>
				</view>
			</view>
		</view>
		<view class="shangjin">
			<view class="sj_box" @tap="yueduBaobiao">
				<view class="qian">
					{{tongji.monthSett}}
				</view>
				<view>上月赏金（元）</view>
			</view>
			<view @tap="lishiBaobiao" class="sj_box">
				<view class="qian">
					{{tongji.allSett}}
				</view>
				<view>已产生赏金（元）</view>
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
				day:'',
				detail:{
					jobData:{},
				},
				msinfo:{
					
				},
				hr_mobile:[],
				msShuju:[],
				tongji:{},
				isjiesuan:'',
			}
		},
	
		onLoad(e) {
			let that = this
			that.itemid=e.itemid
			that.isjiesuan = e.isjiesuan
			if(that.isjiesuan==3) {
				uni.setNavigationBarTitle({
					title: "已结算"
				})
			}
			that.viewList()
			that.tongJi()
			var day1 = new Date();
			day1.setTime(day1.getTime());
			if(day1.getMonth()==0) {
				var year = day1.getFullYear()-1
				var s1 = year+''+'12';
			}else {
				var s1 = day1.getFullYear()+''+(day1.getMonth());
			}
			that.day = s1
			http.apiRequest({
				api: "/jobs/getJobDetail",
				method: "GET",
				data: {
					itemid: e.itemid
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						that.detail = res.data
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
		},
		methods: {
			// 获取历史报表
			lishiBaobiao() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/history_inform/history_inform?itemid=' + this.itemid
				});
			},
			// 获取每月报表
			yueduBaobiao() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/m_inform/m_inform?itemid=' + this.itemid +'&month=' + this.day
				});
			},
			// 到面试列表
			msList() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/ms_list/ms_list?itemid=' + this.itemid
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
							console.log(res)
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
			// 入职人员
			ruzhiRenyuan() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/rz_list/rz_list?itemid=' + this.itemid +'&isjiesuan=' + this.isjiesuan
				});
			},
			//跳到岗位详情
			qzOpeninfo() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/qz_p_detail/qz_p_detail?itemid=' + this.itemid
				});
			},
			// 到提报人才页面
			ckTibao() {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/hunter_terminal/qz_record/qz_record?itemid=' + this.itemid
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 40upx;
		color: #000000;
		font-weight: bold;
		line-height: 1em;
		margin: 70upx 24upx 36upx;
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
		margin: 0 24upx 100upx;
		width: 702upx;
		height: 240upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: url(../../../../static/zhaopinsj.png) no-repeat;
		background-size: 100% 100%;
		border-radius: 12upx;
		font-size: 26upx;
		color: #999999;
		box-shadow:0px 0px 12upx 0px rgba(177,177,177,0.3);
	}
	.sj_box {
		width: 50%;
		text-align: center;
	}
	.qian {
		font-size: 42upx;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 1em;
		margin-bottom: 50upx;
	}
	.mshi_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 0upx 30upx;
	}
	.mianshi {
		display: flex;
		align-items: center;
		font-size: 32upx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.tody {
		margin-right: 26upx;
		color: #FFFFFF;
		font-size: 36upx;
	}
	.ms_detial {
		width: 702upx;
		height: 260upx;
		padding: 36upx 30upx;
		box-sizing: border-box;
		background: #3388FF;
		border-radius: 12upx;
		margin: 0 auto;
		font-size: 28upx;
		color: #FFFFFF;
		font-weight: 500;
		line-height: 1em;
	}
	.ms_tine {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		/* font-size: 60upx; */
		color: #FFFFFF;
		font-weight: 500;
		line-height: 1em;
		margin-bottom: 30upx;
	}
	.fzren {
		font-size: 28upx;
		color: #FFFFFF;
		font-weight: 500;
		margin-bottom: 30upx;
	}
	.shuju {
		text-align: center;
		color: #999;
		font-size: 32upx;
		margin: 60upx;
	}
</style>
