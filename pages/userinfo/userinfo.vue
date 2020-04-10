<template>
	<view class="content-box">
		
		<!-- <view class="rz-picter">
		  <image :src="avatar" class="img-avatar"></image>
		  <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @tap="changeImage($event)" ref="avatarInput" class="uppic">

		</view> -->
		
		<view class="form">
			<label class="call-box" @tap="changeImage">
				<view class="call">头像</view>
				<view class="avatar">
					<image style="width: 64upx;height: 64upx;" :src="avatar" mode="aspectFill"></image>
					<image style="width: 24upx;height: 24upx;margin-left: 10upx;" src="/static/other/chakan.png"></image>
				</view>
			</label>

			<label class="call-box">
				<view class="call">手机号</view>
				<view class="name-box">{{mobile}}</view>
			</label>
			<label class="call-box">
				<view class="call">用户名</view>
				<view class="name-box" v-if="qiye==1">{{userInfo.nickname}}</view>
				<view class="name-box" v-else>{{userInfo.realname}}</view>
			</label>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				userInfo:{},
				mobile: '',
				avatar:'',
				qiye:'',
			}
		},
		onLoad(e) {
			this.qiye=e.qiye
			this.userInfoData()
		},
		methods: {
			changeImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ["original"],
					success: (res) => {
						// console.log('321',res);
						uni.uploadFile({
							url: http.baseUrl + "/common/upload",
							filePath: res.tempFiles[0].path,
							//filePath: res.tempFilePath,
							name: "file",
							header: {
								'token': uni.getStorageSync('token'),
								'X-Requested-With': 'XMLHttpRequest',
								// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							},
							success: (res) => {
								// console.log('123',res);
			
								if (res.statusCode == 200) {
									var resData = JSON.parse(res.data);
									// console.log(resData);
									this.avatar=http.cdnUrl+resData.data.url
									if (typeof resData == "object" && typeof resData.code != "undefined" && resData.code == 1) {
										
										//图片上传成功
										//添加到相册
										http.apiRequest({
											api: "/user/profile",
											method: "GET",
											data: {
												avatar: resData.data.url,
											},
											secuss: (res, httpStatus) => {
												//照片添加到相册成功
											},
										});
									}
			
								} else {
									//图片上传失败
								}
							},
							fail: (res) => {},
						});
					},
					fail: () => {},
				});
			},
			// 获取会员信息
			userInfoData() {
				http.apiRequest({
					api: "/user/userinfo",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.userInfo=res.data
							this.mobile = this.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
							this.avatar=res.data.avatar
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
		}
	}
</script>

<style>
.content-box {
		width: 100%;
		padding-top: 60upx;
	}
	.form {
		width: 100%;
		padding: 0upx 40upx 0;
		box-sizing: border-box;
	}
	.call-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 120upx;
		/* padding-top: 30upx; */
		border-bottom: 1upx solid #E6E6E6;
	}
	.call {
		font-size: 32upx;
		color: #1A1A1A;
		width: 120upx;
	}

	.name-box {
		color: #999;
		font-size: 28upx;
	}
	.avatar {
		display: flex;
		align-items: center;
	}
	
	
	.yg_content{
				margin-top: 50upx;
				text-align: center;
			}
			#upimg{
				display: none;
			}
			.yg_content p{
				padding: 10upx;
				display: inline-block;
				color: #fff;
				background: #08c;
				border: 1upx #ccc solid;
				border-radius: 10upx;
			}
			.yg_content p:active{
				opacity: .5;
			}
			.showimg{
				margin: 20upx auto;
				border: 1upx #ccc solid;
				border-radius: 10upx;
				width: 200upx;
				height: 200upx;
			}
			.showimg img{
				width: 100%;
				height: 100%;
			}

</style>
