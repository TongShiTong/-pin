<template>
	<view class="content-box" >
		<view class="each">
			<!-- <view class="each-name">薪酬</view> -->
			<view class="each-box">
				<view>姓名</view>
				<input class="input" type="text" placeholder="请输入姓名" v-model="name" maxlength="4">
			</view>
		</view>
		<view class="each">
			<view class="each-box">
				<view>性别</view>
				<radio-group @change="chooseSex">
					<label class="uni-list-cell uni-list-cell-pd radio" v-for="(item, index) in sex" :key="item.value">
						<radio :value="item.value" :checked="index === param" color="#FF5A1F"/>{{item.name}}
					</label>
				</radio-group>
			</view>
		</view>
		<view class="each">
			<!-- <view class="each-name">薪酬</view> -->
			<view class="each-box">
				<view>手机号</view>
				<input class="input" @blur="yzMobile" type="number" placeholder="请输入手机号" v-model="mobile">
			</view>
			<view v-if="zqMobile" style="font-size: 26upx;color: #f00;position: absolute;right: 40upx; bottom: -30upx;">请输入正确的手机号</view>
		</view>
		<view class="each">
			<!-- <view class="each-name">薪酬</view> -->
			<view class="each-box">
				<view>身份证号</view>
				<input class="input" type="text" @blur="yzCard" placeholder="请输入身份证号" v-model="idcard">
			</view>
			<view v-if="zqCard" style="font-size: 26upx;color: #f00;position: absolute;right: 40upx; bottom: -30upx;">请输入正确的身份证号</view>
		</view>
		<view class="each">
			<view style="margin: 0 40upx;font-size: 32upx;color: #1A1A1A;padding-top: 44upx;">备注</view>
			<view class="each-box1">
				<textarea @blur="bindTextAreaBlur" :adjust-position="adjustPosition" :cursor-spacing='cursorSpacing' placeholder="请描述该人才的特点..." style="width: 100%;letter-spacing: 4upx;height: 240upx;border: 1upx solid #E6E6E6;padding: 20upx;box-sizing: border-box;"/>
			</view>
		</view>
		<view class="save-box1">
			<view class="save" @tap="addTalent()">完成</view>
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
				cursorSpacing:20,
				adjustPosition:true,
				zqMobile: false,
				idcard: '',
				zqCard: false,
				param: 1,
				sex:[{
					value:'1',
					name:'男'
				},{
					value:'2',
					name:'女'
				}],
				editorCtx:'',
				gender:2,
				isFormSubmit: false,
			}
		},
		methods: {
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
			bindTextAreaBlur: function (e) {
				this.editorCtx = e.detail.value
			},
			// 验证手机号
			yzMobile(e) {
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
			// 添加人才
			addTalent() {
				if (this.isFormSubmit) {
					return;
				}
				this.isFormSubmit = true;
				http.apiRequest({
					api: "/worker/workerAdd",
					method: "POST",
					data: {
						name: this.name,
						mobile: this.mobile,
						idcard: this.idcard,
						gender: this.gender,
						remark: this.editorCtx
					},
					secuss: (res, httpStatus) => {
						this.isFormSubmit = false;
						if (res.code == 1) {
							uni.showToast({
								title: res.msg,
							});
							uni.$emit('updates',{})
							setTimeout(()=>{
								uni.navigateBack({
								    delta: 1
								});
							},500)
						}else {
							uni.showToast({
								title: res.msg
							});
						}
					},
					error: (res, httpStatus) => {
						this.isFormSubmit = false;
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
.input-checkbox {
  width: 40px;
  height: 40px;
  -webkit-appearance: none;
  position: absolute;
  outline: none;
  border: none;
/* &::after {
    left: 0;
    top: 0;
	content: >; */
    /* content: url("../assets/images/round.svg"); */
/*  }
  &:checked:after {
    left: 0;
    top: 0;
	content: >; */
    /* content: url("../assets/images/done.svg"); */
  /* } */
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
	font-size: 26upx;
	font-weight: bold;
	color: #1a1a1a;
	background: #fafafa;
	padding: 52upx 40upx 20upx;
	box-sizing: border-box;
}
.each-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 40upx;
	font-size: 32upx;
	color: #1A1A1A;
	/* font-weight: bold; */
	height: 120upx;
	border-bottom: 1upx solid #e6e6e6;
}
.each-box view {
	width: 300upx;
}
.each-box1 {
	margin: 36upx 40upx;
	font-size: 30upx;
	color: #1A1A1A;
	/* font-weight: bold; */
	/* border: 1upx solid #e6e6e6; */
	height: 240upx;
}

.each-box .input {
	font-size: 30upx;
	/* margin-left: 160upx; */
	text-align: right;
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
