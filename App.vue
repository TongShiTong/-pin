<script>
	import http from '@/tools/utils/http.js'
	import {
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			// 是否领过红包
			http.apiRequest({
				api: "/red_envelope/checkRedEnvelope",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						let hbfirst = '1'
						uni.setStorageSync("hbfirst",hbfirst)
						// console.log(res)
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
			console.log('App Launch');
			if(window.plus){
				const _self = this;
				const _handlePush = function(message) {
					/**
					 * 通过 vuex 来同步页面的数据，仅做演示。
					 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。
					 */
					uni.redirectTo({
						url: '/pages/index/index',
					});
					_self.updatePushMessage(message);
				};
				plus.push.addEventListener('click', function(message) {
					plus.nativeUI.toast('push click');
					_handlePush(message);
				});
				plus.push.addEventListener('receive', function(message) {
					plus.nativeUI.toast('push receive');
					_handlePush(message);
				});
			}
		},
		onShow: function(e) {
			// console.log(e)
			if(typeof e =="undefined"||typeof e.path =="undefined") {
			
			}else if(e.path=="pages/index/hunter_terminal/p_detail/p_detail") {
				uni.reLaunch({
					url: '/pages/index/hunter_terminal/p_detail/p_detail?jiedan=1&itemid=' + e.query.itemid
				});
			}else {
				if(e.path=="pages/share_hb/share_hb") {
					uni.reLaunch({
						url: '/pages/share_hb/share_hb?userid=' + e.query.userid
					});
				}else {
					http.apiRequest({
						api: "/token/check",
						method: "GET",
						data: {
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								http.apiRequest({
									api: "/user/userinfo",
									method: "GET",
									data: {
										
									},
									secuss: (res, httpStatus) => {
										if (res.code == 1) {
											const token = res.data.token
											const user_id = res.data.user_id
											const group_id = res.data.group_id
											const isVerified = res.data.isVerified
											const isCompanyVerified = res.data.isCompanyVerified
											const caution_status = res.data.caution_status
											uni.setStorageSync("user_id",user_id)
											uni.setStorageSync("token",token)
											uni.setStorageSync("group_id",group_id)
											uni.setStorageSync("isVerified",isVerified)
											uni.setStorageSync("isCompanyVerified",isCompanyVerified)
											uni.setStorageSync("caution_status",caution_status)
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
							}else {
								let token1 = ''
								uni.setStorageSync("token",token1)
								uni.reLaunch({
									url: '/pages/login/code_login'
								});
							}
						},
						error: (res, httpStatus) => {
							uni.showToast({
								title: "请检查网络..."
							});
						},
					});
				}
			}
		},
		onHide: function() {
			console.log('App Hide');
		},
	}
</script>

<style>
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		background: #fff;
	}
	uni-page-head .uni-page-head {
		padding-top: 60upx;
		height: 70px;
		/* background: #F5F5F5; */
	}
	button::after{ border: none;} 
	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
		background: #fff;
	}

	button {
		style: none
	}
	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
/* 	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	} */

	input::-webkit-input-placeholder {
		color: #ccc;
	}
	input::-moz-placeholder {
		color: #ccc;
	}
	input::-ms-input-placeholder {
		color: #ccc;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		/* background-color: #0faeff; */
	}
	
	uni-checkbox .uni-checkbox-input {
		border-radius: 50%;
		background: #FFE3D9;
		color: #c7d8ff !important;
	}
	uni-checkbox .uni-checkbox-input:before {
	    font: normal normal normal 14px/1 uni;
	    content: "\EA08";
	    font-size: 22px;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-48%) scale(.73);
	    -webkit-transform: translate(-50%,-48%) scale(.73);
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		/* border: 1upx solid #FF5A1F; */
		background: #FF5A1F;
		color: #fff !important;
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		font-size: 42upx !important;
	}
</style>
