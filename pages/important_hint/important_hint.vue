<script>
	export default {
		data() {
			return {
				
			}
		},

		methods: {
			back() {
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>
<template>
	<view class="uni-column">
		<view style="font-size: 60upx;font-weight: bold;text-align: center;margin-bottom: 60upx;">重要提示</view>
		
		<view style="line-height: 2em;">
			<p>1、注销QQ帐号是不可恢复的操作。为了保护你的合法权益,在开始操作前,请你自行备份拟注销帐号相关的信息和数据,并务必审慎阅读、充分理解以下内容。如果你有任何疑问、意见、建议,可与猎手聘客户服务部门联系,我们会给予你必要的帮助。</p>
			<p>2、注销申请提交后，猎手聘客服会通过注册使用的手机号联系您，跟你确认注销事宜，请保持手机的畅通，以免漏接电话。</p>
			<p>3、帐号的个人资料和历史信息(包含昵称、头像、人才资料信息、资金流水、用人需求、用工任务、考勤信息等)都将无法找回。</p>
			<p>4、注销账号前，您的账号未完成的任务必须完成后方可注销账号，账号内未提现的资金也需要提现。</p>
			<p>5、注销账号时猎手聘会审核账号，确保账号没有违法违规信息，如有违法违规信息，猎手聘有权将信息作为证据存档。</p>
			<p>6、注销账号后，帐号的所有功能或服务都将无法继续使用。</p>
		</view>
		
		<view style="width: 670upx;height: 92upx;border-radius: 6upx;text-align: center;margin: 0 auto;background: #FF5A1F;font-weight: 300;font-size: 32upx;color: #FFFFFF;line-height: 92upx;margin-top: 80upx;" @tap="back">
			关闭
		</view>
	
	</view>
</template>

<style>
	.uni-column {
		width: 100%;
		/* display: flex;
		flex-direction: column; */
		height: auto;
		/* background-color: #fff;
		height: 100%;
		font-size: 32upx;
		line-height: 1.6;
		 */
		margin: 60upx 40upx;
	}
	.content {

		display: flex;
		flex: 1;
		margin-bottom: 100upx;
		 
	}
	.foot {
		position: fixed;
		width: 100%;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>
