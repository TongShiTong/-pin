<template>
	<view class="content-box">
		<view class="head">
			<view style="display: flex;justify-content: flex-end;height: 94upx;"><navigator class="zd" url="/pages/index/hunter_terminal/user/notice/notice" hover-class="none"><view v-if="noticenum > 0" style="background: #320000;width: 16upx;height: 16upx;border-radius: 50%;position: absolute;top:-8upx;right: 0;z-index: 1;"></view><image src="/static/user/notice-icon2x.png"></image></navigator></view>
			<view class="info" @tap="settingInfo">
				<view class="info-box">
					<view class="name">
						<view class="name-box">{{userInfo.realname}}</view>
						<view class="shiming" v-if="userInfo.isVerified==2"><image src="/static/yishiming.png"></image></view>
						<!-- <view class="level">
							<view class="level-img"><image src="/static/user/level-icon2x.png"></image></view>
							<view>一段猎手</view>
						</view> -->
					</view>
					<view class="grade">
						<!-- 可用余额 -->
						<span class="span1">{{mobile}}</span>
						<span v-if="userInfo.caution_status==1">未缴纳服务保障金</span>
						<span v-else>已缴纳服务保障金</span>
					</view>
					<view class="weishiming" v-if="userInfo.isVerified==0">未进行实名认证，暂不能接单！</view>
				</view>
				<view class="avatar">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
					<view style="font-size: 24upx;color: #fff;">服务分：{{userInfo.score}}</view>
				</view>
				<image src="/static/user/sbls.png" style="position: absolute;right: 0;bottom: 44upx;width: 72upx;height: 40upx;border-radius:20upx;"></image>
			</view>
		</view>
		<view class="datas">
			<!-- <navigator class="data-box" url="/pages/index/hunter_terminal/task" hover-class="none"> -->
				<view class="data-box" @tap="renWu">
					<view class="identi"><image src="/static/user/task-logo2x.png"></image></view>
					<view class="quantity">我的任务</view>
				</view>
			<!-- </navigator> -->
			<navigator class="data-box" url="/pages/index/hunter_terminal/wallet/wallet" hover-class="none">
				<view class="identi"><image src="/static/user/yue-logo2x.png"></image></view>
				<view class="quantity">我的钱包</view>
			</navigator>
			<navigator class="data-box" url="/pages/index/hunter_terminal/margin/margin" hover-class="none">
				<view class="identi"><image src="/static/user/baozhengjin-icon2x.png"></image></view>
				<view class="quantity">服务保障金</view>
			</navigator>
		</view>
		<!-- <navigator class="certi" url="/pages/index/hunter_terminal/hunter_prove/hunter_prove" hover-class="none">
			<view>请先进行实名认证</view>
			<view>前往认证</view>
		</navigator> -->
		<view class="list-box">
			<!-- <view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/collect/collect" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/shoucang.png"></image></view>
					<view>收藏岗位</view></view>
				<view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/bank_card/bank_card" hover-class="none"><view class="list" hover-class="none">
					<view class="list-img"><image src="/static/user/yinhangka.png"></image></view>
					<view>银行卡</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<!-- <view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/notes/notes"><view class="list">赏金记录</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/withdraw/withdraw" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/withdraw.png"></image></view>
					<view>提现申请</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists" v-if="userInfo.isVerified==0">
				<navigator url="/pages/index/hunter_terminal/hunter_prove/hunter_prove" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>猎手认证</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists" v-else-if="userInfo.isVerified==1">
				<view style="display: flex;justify-content: space-between;align-items: center;" @tap="proveSee"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>猎手认证</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view style="font-size: 26upx; color: #999;">已提交</view>
					<image style="width: 30upx;height: 30upx;" src="/static/user/gengduo-icon2x.png"></image>
				</view>
				</view>
			</view>
			<view class="lists" v-else-if="userInfo.isVerified==2">
				<view style="display: flex;justify-content: space-between;align-items: center;" @tap="proveSee"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>猎手认证</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view style="font-size: 26upx; color: #999;">已认证</view>
					<image style="width: 30upx;height: 30upx;" src="/static/user/gengduo-icon2x.png"></image>
				</view>
				</view>
			</view>
			<view class="lists" v-else>
				<navigator url="/pages/index/hunter_terminal/hunter_prove/hunter_prove" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/renzheng.png"></image></view>
					<view>猎手认证</view>
				</view><view style="display: flex;align-items: center;">
					<view style="font-size: 26upx; color: #999;">未通过</view>
					<image style="width: 30upx;height: 30upx;" src="/static/user/gengduo-icon2x.png"></image>
				</view></navigator>
			</view>
			<view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/invite/invite" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/invite.png"></image></view>
					<view>邀请好友</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/help/help" hover-class="none"><view class="list">
					<view class="list-img"><image style="width: 52upx; height: 52upx;" src="/static/user/help.png"></image></view>
					<view>帮助与反馈</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view>
			<!-- <view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/c_service/c_service" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/kefu.png"></image></view>
					<view>我的客服</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<!-- <view class="lists">
				<navigator url="/pages/Identity_switch/Identity_switch?yonggong=2" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/qiehuan.png"></image></view>
					<view>身份切换</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<!-- <view class="lists">
				<navigator url="/pages/about/about" hover-class="none"><view class="list">
					<view class="list-img"><image src="/static/user/guanyu.png"></image></view>
					<view>关于我们</view>
				</view><view class="jiantou"><image src="/static/user/gengduo-icon2x.png"></image></view></navigator>
			</view> -->
			<view class="lists">
				<navigator url="/pages/index/hunter_terminal/user/setting/setting" hover-class="none"><view class="list">
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
				noticenum:0,
				mobile: ''
	        }
	    },
		mounted() {
			this.userInfoData()
			this.noticeCount()
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
							console.log(res)
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
					url: '/pages/userinfo/userinfo'
				});
			},
			// 跳到任务
			renWu() {
				this.$store.state.footer_store.now_page_index=2
				uni.redirectTo({
					url: '/pages/index/index?typeid=5',
				});
			},
			// 查看认证
			proveSee() {
				uni.navigateTo({
					url: '/pages/prove_see/prove_see?id=2'
				});
			},
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
		background: url(../../../static/user/toutu-bg.png) no-repeat;
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
		align-items: flex-start;
		margin-bottom: 70upx;
		position: relative;
	}
	.info-box {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin-top: 16upx;
	}
	.avatar {
		
		/* background: #FF9900; */
	}
	.avatar image {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		overflow: hidden;
		background: #C9C9C9;
	}
	.name {
		display: flex;
		/* align-items: center; */
		font-size: 46upx;
		color: #fff;
		font-weight: bold;
	}
	.name .name-box {
		text-overflow: ellipsis;
		white-space:nowrap;
		max-width: 360upx;
		overflow: hidden;
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
	.level {
		font-size: 24upx;
		margin-left: 25upx;
		width:180upx;
		height:52upx;
		background:linear-gradient(90deg,rgba(200,218,255,1),rgba(116,162,252,1));
		border-radius:26upx;
		line-height: 52upx;
		display: flex;
		align-items: center;
	}
	.level-img {
		width: 38upx;
		height: 38upx;
		margin-left: 14upx;
		margin-right: 8upx;
	}
	.level-img image {
		width: 100%;
		height: 100%;
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
		margin-top: 16upx;
		margin-bottom: 20upx;
		font-weight: 300;
	}
	.weishiming {
		font-size: 24upx;
		color: #330000;
		text-align: left;
	}
	.grade .span1 {
		font-size: 26upx;
		color: #fff;
		opacity: 0.9;
		padding: 5upx 15upx;
		background: #FF5A1F;
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
		height: 238upx;
		box-shadow: 0 10upx 20upx #E6E6E6;
		position: relative;
		top: -90upx;
		border-radius:24upx;
		z-index: 1;
		/* background: url(../../../static/biejing.png) no-repeat;
		background-size: 100% 100%; */
		background: #fff;
	}
	.data-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.identi {
		width: 78upx;
		height: 78upx;
		margin-bottom: 24upx;
	}
	.identi image {
		width: 100%;
		height: 100%;
	}
	.quantity {
		font-size: 30upx;
		color: #1A1A1A;
		font-weight: bold;
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
