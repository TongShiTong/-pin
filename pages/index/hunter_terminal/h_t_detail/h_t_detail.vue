<template>
	<view class="content-box">
		<view class="hader">
			<image style="width: 48upx;height: 48upx;" src="/static/other/back-icon.png" @tap="back"></image>
			<view style="padding: 0 150upx 0 220upx;">人才信息</view>
			<view class="source" @tap="move()" v-if="disabled"><image style="width: 40upx; height: 40upx;margin-right: 6upx;" src="/static/bianji.png"></image>编辑</view>
		</view>
		<view class="each">
			<view class="each-box">
				<view>姓名</view>
				<input type="text" v-model="name" :disabled="disabled" :class="{'input1':disabled,'input':!disabled}">
			</view>
		</view>
		<view class="each">
			<view class="each-box">
				<view>性别</view>
				<radio-group @change="chooseSex" :class="{'input1':disabled,'input':!disabled}">
					<label class="uni-list-cell uni-list-cell-pd radio" v-for="(item, index) in sex" :key="item.value">
						<radio :value="item.value" :checked="index === param" :disabled="disabled" color="#FF5A1F"/>{{item.name}}
					</label>
				</radio-group>
			</view>
		</view>
		<view class="each">
			<view class="each-box">
				<view>手机号</view>
				<input type="text" v-model="mobile" @blur="yzMobile" :disabled="disabled" :class="{'input1':disabled,'input':!disabled}">
			</view>
			<view v-if="zqMobile" style="font-size: 26upx;color: #f00;position: absolute;right: 40upx; bottom: -30upx;">请输入正确的手机号</view>
		</view>
		<view class="each">
			<view class="each-box">
				<view>身份证号</view>
				<input class="input" type="text" @blur="yzCard" v-model="idcard" :disabled="disabled" :class="{'input1':disabled,'input':!disabled}">
			</view>
			<view v-if="zqCard" style="font-size: 26upx;color: #f00;position: absolute;right: 40upx; bottom: -30upx;">请输入正确的身份证号</view>
		</view>
		<view class="each">
			<view style="margin: 0 40upx;font-size: 32upx;color: #1A1A1A;padding-top: 44upx;">备注</view>
			<view class="each-box1">
				<textarea @blur="bindTextAreaBlur" placeholder="请描述该人才的特点..." adjust-position="true" cursor-spacing='20' v-model="content" :disabled="disabled" :class="{'input1':disabled,'input':!disabled}" style="width: 100%;letter-spacing: 4upx;height: 240upx;border: 1upx solid #E6E6E6;padding: 20upx;box-sizing: border-box;"/>
			</view>
		</view>
		<view class="save-box1">
			<!-- <view class="save" @tap="move()" v-if="disabled">编辑</view> -->
			<view class="save" @tap="save()" v-if="!disabled">完成</view>
		</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				name:'',
				mobile: '',
				zqMobile: false,
				idcard: '',
				zqCard: false,
				content: '',
				param: '',
				itemid:'',
				disabled: true,
				sex:[{
					value:'1',
					name:'男'
				},{
					value:'2',
					name:'女'
				}],
				gender:''
			}
		},
		onLoad(e) {
			// console.log(e)
			this.itemid=e.itemid
			http.apiRequest({
				api: "/worker/getWorkerDetail",
				method: "GET",
				data: {
					itemid: e.itemid
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						let detail = res.data
						this.name = detail.name
						this.mobile = detail.mobile
						this.idcard = detail.idcard
						this.content = detail.remark
						this.param = detail.gender-1
						this.gender = detail.gender
						// console.log(res)
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
			// uni.$on("repair", (data) => {
			// 	console.log(data.name)
			// 	this.name=data.name
			// });
		},
		// onUnload(e) {
		// 	uni.$off("repair", () => {
		// 		//loadData();
		// 	});
		// },
		methods: {
			back() {
				history.back()
			},
			// 选择性别
			chooseSex (evt) {
				for (let i = 0; i < this.sex.length; i++) {
					if (this.sex[i].value === evt.target.value) {
						this.param = i;
						break;
					}
				}
				// console.log(evt)
				this.gender = evt.detail.value
				// console.log(this.gender)
			},
			// 验证手机号
			yzMobile(e) {
				// console.log(e)
				if((/^1[23456789]\d{9}$/.test(e.detail.value))) {
					this.zqMobile = false
				}else {
					this.zqMobile = true
				}
			},
			// 验证身份证
			yzCard(e) {
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(idcardReg.test(e.detail.value)) {
					this.zqCard = false
				}else {
					this.zqCard = true
				}
			},
			move() {
				this.disabled=false
			},
			bindTextAreaBlur: function (e) {
				this.editorCtx = e.detail.value
			},
			save() {
				// console.log(this.gender)
				http.apiRequest({
					api: "/worker/workerEdit",
					method: "POST",
					data: {
						itemid: this.itemid,
						name: this.name,
						mobile: this.mobile,
						idcard: this.idcard,
						gender: this.gender,
						remark: this.content
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.disabled=true
							uni.$emit('updates',{})
							setTimeout(()=>{
								uni.navigateBack({
								    delta: 1
								});
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
			}
			// xiugai() {
			// 	uni.navigateTo({
			// 		// 传递 userid 在详情页接收
			// 		url: '/pages/index/hunter_terminal/repair_detail/repair_detail?name=' + this.name
			// 	});
			// }
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
	}
	.hader {
		margin: 67upx 40upx 27upx;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		font-size: 36upx;
		color: #1A1A1A;
		font-weight: bold;
	}
	.source {
		font-size: 28upx;
		color: #333;
		font-weight: 400;
		display: flex;
		align-items: center;
	}
	.radio {
		padding-right: 60upx;
	}
	.radio:nth-child(2) {
		padding-right: 0upx;
	}
	.each {
		position: relative;
	}
	.each-name {
		text-align: left;
		font-size: 32upx;
		font-weight: bold;
		color: #1a1a1a;
		/* background: #fafafa; */
		padding: 52upx 40upx 20upx;
		box-sizing: border-box;
	}
	.each-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 40upx;
		font-size: 32upx;
		color: #1a1a1a;
		/* font-weight: bold; */
		height: 120upx;
		border-bottom: 1upx solid #e6e6e6;
	}
	.each-box view {
		width: 300upx;
	}
	/* .each-box:last-child {
		border: none;
	} */
	.each-box input {
		font-size: 30upx;
		text-align: right;
	}
	.input1 {
		color: #999;
	}
	.each-box span {
		font-size: 30upx;
		color: #1A1A1A;
		font-weight: bold;
	}
	.choose-six {
		display: flex;
		align-items: center;
	}
	.each-box1 {
		margin: 36upx 40upx;
		font-size: 30upx;
		color: #1A1A1A;
		/* font-weight: bold; */
		/* border: 1upx solid #e6e6e6; */
		height: 240upx;
	}
	.save {
		width: 440upx;
		height: 94upx;
		margin: 0 auto;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
		/* position: fixed;
		bottom: 86upx; */
	}
	.save-box1 {
		width: 100%;
		background: #ffffff;
		position: fixed;
		bottom: 0;
		height: 160upx;
		padding-top: 20upx;
		display: flex;
		justify-content: center;
	 }
</style>
