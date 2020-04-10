<template>
	<view class="content-box">
		<view class="head">
			<view style="display: flex;justify-content: flex-end;height: 94upx;"><navigator class="zd" url="/pages/index/enterprise_terminal/user/notice/notice" hover-class="none"><view v-if="noticenum > 0" style="background: #F54336;width: 16upx;height: 16upx;border-radius: 50%;position: absolute;top:-8upx;right: 0;z-index: 1;"></view><image src="/static/user/notice-icon2x1.png"></image></navigator></view>
			<view class="info" @tap="settingInfo">
				<view class="info-box">
					<view class="name">
						<view class="name-box">{{userInfo.nickname}}</view>
						<view class="shiming" v-if="userInfo.isCompanyVerified==2"><image src="/static/yirenzheng.png"></image></view>
						<!-- <view class="level"><view>一段猎手</view></view> -->
					</view>
					<view class="grade"><span class="span1">{{mobile}}</span></view>
					<view class="weishiming" v-if="userInfo.isCompanyVerified==0">未进行企业认证，暂不能发布岗位需求！</view>
				</view>
				<view class="avatar"><image :src="userInfo.avatar" mode="aspectFill"></image><image src="/static/user/sbqy.png" style="position: absolute;right: 0;bottom: 0;width: 72upx;height: 40upx;border-radius:20upx;"></image></view>
			</view>
		</view>
		<view class="datas">
			<!-- <navigator class="data-box" url="/pages/index/enterprise_terminal/enter_position?id=3" hover-class="none"> -->
				<view class="data-box" @tap="jinYong">
					<view><image src="/static/user/dianming.png"></image></view>
					<view>
						<view class="identi">今日用工中</view>
						<view class="quantity"><span style="font-size: 30upx;color: #FC565B;font-weight: bold;">{{yonggongzhong}}</span>个任务，去点名</view>
					</view>
				</view>
			<!-- </navigator> -->
			<view style="width: 2upx;height: 100upx;background: #E6E6E6;"></view>
			<!-- <view class="data-box">
				<view class="identi">可用余额</view>
				<view class="quantity">我的钱包</view>
			</view> -->
			<!-- <navigator class="data-box" url="/pages/index/enterprise_terminal/enter_position?id=4" hover-class="none"> -->
				<view class="data-box" @tap="daiJie">
					<view><image src="/static/user/daijiesuan.png"></image></view>
					<view>
						<view class="identi">用工完成</view>
						<view class="quantity"><span style="font-size: 30upx;color: #FC565B;font-weight: bold;">{{daijiesuan}}</span>个任务，去结算</view>
					</view>
				</view>
			<!-- </navigator> -->
		</view>
		<!-- <navigator class="certi" url="/pages/index/enterprise_terminal/enter_prove/enter_prove" hover-class="none">
			<view>请先进行实名认证</view>
			<view>前往认证</view>
		</navigator> -->
		<view class="list-box">
		<!-- <view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/collect/collect"><view class="list">收藏岗位</view><view>></view></navigator>
			</view>
			<view class="lists">
				<navigator url=""><view class="list">人才资料</view><view>></view></navigator>
			</view> -->
			<view class="lists">
				<navigator url="/pages/index/enterprise_terminal/user/wallet/wallet" hover-class="none"><view class="list">
					<view class="list-img"><image style="width: 52upx; height: 52upx;" src="/static/user/yue-logo2x.png"></image></view>
					<view>我的钱包</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists">
				<navigator url="/pages/index/enterprise_terminal/user/bank_card/bank_card" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/yinhangka.png"></image></view>
					<view>银行卡</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists" v-if="userInfo.isCompanyVerified==0">
				<navigator url="/pages/index/enterprise_terminal/enter_prove/enter_prove" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>企业认证</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists" v-else-if="userInfo.isCompanyVerified==1">
				<view style="display: flex;justify-content: space-between;align-items: center;" @tap="proveSee"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>企业认证</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view style="font-size: 26upx; color: #999;">已提交</view>
					<image style="width: 30upx;height: 30upx;" src="/static/user/gengduo-icon2x.png"></image>
				</view>
				</view>
			</view>
			<view class="lists" v-else-if="userInfo.isCompanyVerified==2">
				<view style="display: flex;justify-content: space-between;align-items: center;" @tap="proveSee"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>企业认证</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view style="font-size: 26upx; color: #999;">已认证</view>
					<image style="width: 30upx;height: 30upx;" src="/static/user/gengduo-icon2x.png"></image>
				</view>
				</view>
			</view>
			<view class="lists" v-else>
				<navigator url="/pages/index/enterprise_terminal/enter_prove/enter_prove" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>企业认证</view>
				</view><view style="display: flex;align-items: center;">
					<view style="font-size: 26upx; color: #999;">未通过</view>
					<image style="width: 30upx;height: 30upx;" src="/static/user/gengduo-icon2x.png"></image>
				</view></navigator>
			</view>
			<view class="lists">
				<navigator url="/pages/index/enterprise_terminal/user/invite/invite" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/invite.png"></image></view>
					<view>邀请好友</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists">
				<navigator url="/pages/index/enterprise_terminal/user/help/help" hover-class="none"><view class="list">
					<view class="list-img"><image style="width: 52upx; height: 52upx;" src="/static/user/help.png"></image></view>
					<view>帮助与反馈</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<!-- <view class="lists">
				<navigator url="/pages/index/enterprise_terminal/user/c_service/c_service" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/kefu.png"></image></view>
					<view>我的客服</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<!-- <view class="lists">
				<navigator url="/pages/Identity_switch/Identity_switch?yonggong=3" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/qiehuan.png"></image></view>
					<view>身份切换</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<view class="lists">
				<navigator url="/pages/index/enterprise_terminal/lz_shensu/lz_shensu" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/lzss.png"></image></view>
					<view>离职申诉</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists">
				<navigator url="/pages/index/enterprise_terminal/user/setting/setting" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/setting.png"></image></view>
					<view>设置</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
	    data() {
	        return {
				userInfo:{},
				noticenum: 0,
				yonggongzhong:'',
				daijiesuan:'',
				mobile: ''
	        }
	    },
		mounted() {
			this.userInfoData()
			this.noticeCount()
			this.statistics()
			uni.$on('notice',()=>{
				this.noticeCount()
			})
		},
	    methods: {
			userInfoData() {
				http.apiRequest({
					api: "/user/userinfo",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.userInfo=res.data
							// 脱敏.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
							this.mobile = this.userInfo.mobile
							// console.log(res)
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
			// 查看个人信息并修改
			settingInfo() {
				uni.navigateTo({
					url: '/pages/userinfo/userinfo?qiye=1'
				});
			},
			// 查看认证
			proveSee() {
				uni.navigateTo({
					url: '/pages/prove_see/prove_see?id=3'
				});
			},
			// 统计信息
			statistics() {
				http.apiRequest({
					api: "/common/getUserStatistics",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.daijiesuan = res.data.result.daijiesuan_JobsTotal
							this.yonggongzhong = res.data.result.yonggongzhong_JobsTotal
						}else {
							// uni.showToast({
							// 	title: res.msg
							// });
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			// 跳到今日用工页
			jinYong() {
				this.$store.state.footer_store.now_page_index=0
				uni.redirectTo({
					url: '/pages/index/index?typeid=3&id=3',
				});
			},
			// 跳到待计算页
			daiJie() {
				this.$store.state.footer_store.now_page_index=0
				uni.redirectTo({
					url: '/pages/index/index?typeid=3&id=4',
				});
			},
			// 消息统计
			noticeCount() {
				http.apiRequest({
					api: "/notice/getUnreadNoticeCount",
					method: "GET",
					data: {
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.noticenum=res.data.unreadCount
							// console.log(res)
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
	    }
	}
</script>

<style>
	.content-box {
		width: 750upx;
		padding-bottom: 60upx;
	}
	.head {
		background: url(../../../static/user/toutu-bg1.png) no-repeat;
		background-size: 100% 100%;
		height: 500upx;
		padding: 80upx 40upx 10upx;
		box-sizing: border-box;
		width: 100%;
	}
	.zd {
		margin-top: 12upx;
		margin-bottom: 55upx;
		width: 48upx;
		height: 48upx;
		position: relative;
	}
	.zd image {
		width: 100%;
		height: 100%;
	}
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 65upx;
		position: relative;
	}
	.info-box {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.avatar {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatar image {
		width: 100%;
		height: 100%;
		background: #C9C9C9;
	}
	.info-box .weishiming {
		font-size: 24upx;
		color: #320000;
	}
	.name {
		display: flex;
		/* align-items: center; */
		font-size: 46upx;
		color: #000000;
		font-weight: bold;
	}
	.shiming {
		width: 90upx;
		height: 40upx;
		margin-top: 4upx;
		margin-left: 22upx;
	}
	.shiming image {
		width: 100%;
		height: 100%;
	}
	.name .name-box {
		text-overflow: ellipsis;
		white-space:nowrap;
		max-width: 360upx;
		overflow: hidden;
	}
	.level {
		font-size: 24upx;
		margin-left: 25upx;
		width:166upx;
		height:52upx;
		background:linear-gradient(90deg,rgba(200,218,255,1),rgba(116,162,252,1));
		border-radius:26upx;
		line-height: 52upx;
	}
	.level view{
		background:linear-gradient(150deg,rgba(237,48,39,1) 6.4697265625%, rgba(255,130,97,1) 81.34765625%);
		-webkit-background-clip:text;
		-webkit-text-fill-color:transparent;
	}
	.grade {
		font-size: 24upx;
		color: #fff;
		text-align: left;
		margin-top: 20upx;
		margin-bottom: 20upx;
		font-weight: 300;
	}
	.grade .span1 {
		font-size: 26upx;
		color: #fff;
		opacity: 0.9;
		padding: 5upx 15upx;
		background: #666666;
		border-radius: 30upx;
		/* font-weight: bold; */
		margin-right: 10upx;
	}
	.datas {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 30upx;
		padding: 0 50upx;
		box-sizing: border-box;
		height: 180upx;
		box-shadow: 0 10upx 20upx #E6E6E6;
		position: relative;
		top: -90upx;
		border-radius:24upx;
		z-index: 1;
		background: #fff;
	}
	.data-box {
		display: flex;
	}
	.data-box image {
		width: 74upx;
		height: 74upx;
		margin-right: 10upx;
	}
	.identi {
		font-size: 32upx;
		color: #333;
		font-weight: bold;
		text-align: left;
		/* margin-bottom: 12upx; */
	}
	.quantity {
		font-size: 20upx;
		color: #999;
	}
	.certi {
		width: 100%;
		height: 80upx;
		font-size: 24upx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FF9900;
		padding: 0 40upx;
		margin-bottom: 40upx;
		box-sizing: border-box;
	}
	.list-box {
		width: 100%;
		margin-top: -46upx;
	}
	.lists {
		font-size: 34upx;
		text-align: left;
		color: #1A1A1A;
		/* font-weight: bold; */
		margin: 0 70upx;
	}
	.lists navigator {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list {
		/* height: 70upx;
		line-height: 70upx; */
		height: 120upx;
		display: flex;
		align-items: center;
		/* border-bottom: 1upx solid #ccc; */
	}
	.list-img {
		width: 48upx;
		height: 48upx;
		margin-right: 38upx;
	}
	.list-img image {
		width: 100%;
		height: 100%;
	}
	.jiantou {
		width: 30upx;
		height: 30upx;
	}
	.jiantou image {
		width: 100%;
		height: 100%;
	}
</style>
