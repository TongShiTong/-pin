<template>
	<view class="content-box">
		<!-- <view class="heard" @tap="back">发布</view> -->
		<view class="each">
			<view class="each-name">基本信息</view>
			<view class="each-box">
				<view style="width: 220upx;text-align: left;font-size: 32upx; color: #1A1A1A;">岗位名称</view>
				<input type="text" placeholder="请输入岗位名称" v-model="pTitle">
			</view>
			<view class="each-box">
				<view style="width: 220upx;text-align: left;font-size: 32upx; color: #1A1A1A;">岗位类型</view>
				<input style="text-align: right;width: 420upx;" type="text" placeholder="请选择" v-model="typeName" disabled="true" @click="openPopup">
				<!-- <view> -->
					<view class="jiantou" @click="openPopup"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
					<uni-popup :radius="radius" ref="popup" type="bottom" style="overflow: hidden;">
						<view style="display: flex;justify-content: space-between;height: 730upx;font-size: 26upx;color: #666;font-weight: 400;">
							<view style="background: #F5F5F5;width: 300upx;height: 790upx;position: relative;top:-30upx;left: -30upx;text-align: center;overflow-y: scroll;">
							<view style="height: 94upx;position: relative;" v-for="(item,index) in categoryPan" :class="{active:index==indexes}" :key="index" @click="bindClick(index)">
								<view :class="{active2:index==indexes}" style="height: 48upx;line-height: 48upx; width: 97%;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">{{item.name}}</view>
							</view></view>
							<view style="position: relative;top:-30upx;width: 390upx;height: 790upx; text-align: center;overflow-y: scroll;">
							<view style="height: 94upx;line-height: 94upx;" v-for="(item,i) in categoryChs" :key="'info1-'+i" :class="{active1:i==tindexes}" @click="towSort(i)">{{item.name}}</view></view>
						</view>
						<!-- <uni-tag :text="item.name" type="success" :inverted="inverted" :class="{active:index==indexes}" :circle="true" v-for="(item,index) in categoryList" :key="index" @click="bindClick(index)"></uni-tag> -->
						<!-- <button class="save2" @click="closePopup">确认</button> -->
					</uni-popup>
				<!-- </view> -->
			</view>
			<!-- <view class="each-box">
				<view style="font-size: 32upx; color: #1A1A1A;width: 220upx;text-align: left;">岗位性质</view>
				<view class="gwxz-box">
					<view class="qidai"><image src="/static/qidai.png"></image></view>
					<view class="gwxz" v-for="(item,i) in xingzhi" :key="'01'+i" :class="{gwxz_active:i==0}">{{item}}</view>
				</view>
			</view> -->
			<view class="each-box">
				<view style="width: 220upx;text-align: left;font-size: 32upx; color: #1A1A1A;">人数</view>
				<input type="number" placeholder="请输入所需人数" v-model="pNumber">
			</view>
			<view class="each-box">
				<view style="font-size: 32upx; color: #1A1A1A;">性别</view>
				<!-- <view class="choose-six">
					 <radio-group @change="chooseSex">
						 <label class="uni-list-cell uni-list-cell-pd radio" v-for="(item, index) in sex" :key="item.value">
							 <radio :value="item.value" :checked="index === param" color="#FF5A1F"/>{{item.name}}
						 </label>
					 </radio-group>
				</view> -->
				<view class="gwxz-box1">
					<view class="gwxz" v-for="(item,i) in sex" :key="'02'+i" :class="{gwxz_active:i==sexIndex}" @tap="chooseSex(i)">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<view class="each">
			<view class="each-name">薪酬</view>
			<view class="each-box">
				<view style="width: 220upx;text-align: left;font-size: 32upx; color: #1A1A1A;">薪资</view>
				<input class="input" type="number" placeholder="请输入金额" v-model="salary"><span style="display: inline-block;width: 200upx;">元/人/天</span>
			</view>
		</view>
		
		<view class="each">
			<view class="each-name">赏金<span style="padding-left: 370upx;font-size: 24upx;color: #FF5A1F;">实发劳动报酬的百分比</span></view>
			<view class="each-box">
				<view style="width: 260upx;text-align: left;font-size: 32upx; color: #1A1A1A;">赏金比例</view>
				<view style="width: 200upx;">
				   <xfl-select 
					   :list="ptwork_bounty_ratio"
					   :clearable="false"
					   :listShow="false"
					   :isCanInput="false"  
					   :style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;'"
					   :placeholder = "''"
					   :initValue="'20%'"
					   :selectHideType="'independent'"
						@change="changeBounty"
				   >
				   </xfl-select>
			   </view>
<!-- 				<input class="input" type="number" placeholder="请输入比例" v-model="scale"><span style="width: 60upx;">%</span> -->
			</view>
		</view>
		
		<view class="each">
			<view class="each-name">工作时间</view>
			<view class="each-box">
				<view style="width: 200upx;text-align: left;font-size: 32upx; color: #1A1A1A;">开始用工日期</view>
				<input style="text-align: right;width: 380upx;margin-right: -40upx;" type="text" disabled="true" placeholder="请选择" v-model="date" @click="open">
				
				<view class="jiantou" @click="open"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
			</view>
			<view class="each-box">
				<view style="width: 260upx;text-align: left;font-size: 32upx; color: #1A1A1A;">用工天数</view>
				<!-- <input class="input" type="number" placeholder="请输入比例" v-model="scale"><span style="width: 60upx;">%</span> -->
				<view style="width: 200upx;">
					<xfl-select 
						:list="list"
						:clearable="false"
						:listShow="false"
						:tian="true"
						:isCanInput="false"  
						:style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;'"
						:placeholder = "''"
						:initValue="'1'"
						:selectHideType="'independent'"
						@change="changeDays"
					>
					</xfl-select>
				</view>
			</view>
			<view class="each-box">
				<view style="width: 160upx;text-align: left;font-size: 32upx; color: #1A1A1A;">报到时间</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker mode="time" :value="timeChoose" start="00:00" end="23:59" @change="bindTimeChange">
								<view style="display: flex;align-items: center;">
									<view class="uni-input" style="color: #1A1A1A;">{{timeChoose}}</view>
									<view class="jiantou" style="margin-left: 10upx;"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="each-box">
				<view style="width: 160upx;text-align: left;font-size: 32upx; color: #1A1A1A;">工作时长</view>
				<view style="display: flex;align-items: center;">
					<view style="width: 240upx;">
						<xfl-select 
							:list="shichang"
							:clearable="false"
							:listShow="false"
							:isCanInput="false"
							:shichang="true"
							:style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;'"
							:placeholder = "''"
							:initValue="'8'"
							:selectHideType="'independent'"
							@change="shiChang"
						>
						</xfl-select>
					</view>
				</view>
			</view>
			<!-- <view class="each-box">
				<view style="width: 160upx;text-align: left;font-size: 32upx; color: #1A1A1A;">工作地址</view>
				<view @tap="chooseLocation" style="display: flex;">
					<input type="text" placeholder="请选择" v-model="address">
					<view class="jiantou" style="margin-left: 10upx;"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
				</view>
			</view> -->
		</view>
		<view class="each">
			<view class="each-name">工作地址</view>
			<view class="each-box">
				<view style="font-size: 32upx; color: #1A1A1A;width: 160upx;text-align: left;">所在地区</view>
				<view @tap="chooseLocation" style="display: flex;">
					<input type="text" placeholder="请选择" v-model="whereaddress" disabled="true">
					<view class="jiantou" style="margin-left: 10upx;"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
				</view>
			</view>
			<view class="each-box">
				<view style="font-size: 32upx; color: #1A1A1A;width: 220upx;text-align: left;">详细地址</view>
				<input type="text" placeholder="请输入详细地址" v-model="deladdress">
			</view>
		</view>
		<w-picker
		    mode="region"
		    :defaultVal="['浙江省','杭州市','江干区']"
		    :areaCode="['33','3301','330108']"
		    :hideArea="false"
		    @confirm="onConfirm" 
			@cancel="onCancel"
		    ref="region" 
		    themeColor="#FF5A1F">
		</w-picker>
		<uni-calendar style="width: 300upx;"
		   ref="calendar"
		   :insert="false"
		   @confirm="confirm"
		   :disableBefore="true"
		   :range="false"
		   :date="date"
			/>
		
		<view class="each">
			<view style="display: flex;justify-content: space-between;align-items: center;background: #fafafa; font-size: 26upx;padding-right: 40upx;">
				<view class="each-name">工作内容和要求</view>
				<view style="padding-top: 30upx;color: #FF5A1F;font-weight: bold;" @tap="muBan">选择模板</view>
			</view>
			
			<uni-popup ref="popupMuban" type="center">
				<view>
					<view style="margin-top: 40upx;">
							<view style="font-size: 28upx;color: #010101;font-weight:500;display: flex;justify-content: space-between;">
								<view></view>
								<view>模板一</view>
								<view style="font-size: 24upx;color: #FF5A1F;" @tap="xuanMuban(1)">使用</view>
							</view>
							<view class="muban" style="font-size: 23upx;color: #666;text-align: justify;font-weight: 300;">
								<view>招募要求：</view>
								<p>1.18-35周岁，高中或同等以上学历（大专及以上学历优先考虑），性别专业不限；</p>
								<p>2.有热情，有进取心，积极向上，希望通过努力改变自己的人生；</p>	
								<p>3.良好的服务意识和团队精神，良好的素质素养。</p>	
								<view>工作内容：</view>
								<p>1.处理店铺各项基本业务（比如顾客接待、商品整理、收银、清扫等）。</p>	 
							</view>
						</view>
						<view style="margin-top: 40upx;">
							<view style="font-size: 28upx;color: #010101;font-weight:500;display: flex;justify-content: space-between;">
								<view></view>
								<view>模板二</view>
								<view style="font-size: 24upx;color: #FF5A1F;" @tap="xuanMuban(2)">使用</view>
							</view>
							<view class="muban" style="font-size: 23upx;color: #666;text-align: justify;font-weight: 300;">
								<view>岗位职责：</view>
								<p>1、接待顾客的咨询，了解顾客的需求并达成销售；</p>
								<p>2、负责做好货品销售记录、盘点、账目核对等工作，按规定完成各项销售统计工作；</p>
								<p>3、完成商品的来货验收、上架陈列摆放、补货、退货、防损等日常营业工作；</p>
								<p>4、做好所负责区域的卫生清洁工作；</p>
								<p>5、完成上级领导交办的其他任务。</p>
								<view>任职资格：</view>
								<p>1、高中以上学历；</p>
								<p>2、有相关工作经验者优先；</p>
								<p>3、具有较强的沟通能力及服务意识，吃苦耐劳；</p>
								<p>4、年龄18-40岁，身体健康。</p>
								<view>工作时间：8小时排班制</view>
							</view>
						</view>
					<!-- <view v-if="mubanChoss" class="mubanChoss" @tap="xuanMuban(1)">选择模板</view>
					<view v-else class="mubanChoss" @tap="xuanMuban(2)">选择模板</view> -->
				</view>
			</uni-popup>
			
			<view style="padding-top: 30upx; margin:0 40upx;min-height: 200upx;">
				<textarea @input="input" @blur="bindTextAreaBlur" :maxlength="maxlength" auto-height="true" :adjust-position="adjustPosition" :cursor-spacing='cursorSpacing' v-model="editorCtx" style="width: 100%;letter-spacing: 4upx;text-align: justify;"/>
			</view>
			<view style="color: #999;font-size: 24upx;text-align: right;margin-right: 40upx;padding-bottom: 20upx;">{{ziNumber}}/500</view>
		</view>
		<view class="each">
			<view class="each-name"></view>
		</view>
		<view class="save-box">
			<view class="savea"><span style="font-size: 24upx;">预算：￥</span><span>{{pNumber*salary*(1+scale/100)*days}}</span></view>
			<view class="save" @tap="release()">确定修改</view>
		<uni-popup ref="popupFabu" type="bottom" :radius="radius">
			<view class="payOrder">
			  <!-- <h1 class="title">订单详情</h1> -->
			  <view class="title1">{{orderData.jobData.title}}</view>
			  <view class="wage">{{orderData.jobData.wage}}元/天</view>
			  <view class="wage">{{orderData.jobData.total}}人</view>
			  <view class="wage">{{orderData.jobData.days}}天</view>
			  <view class="orderNo">订单编号：{{orderData.order.orderNo}}</view>
				<ul class="orderInfo">
					<li>
					   <h1>用工预算</h1>
					   <p>{{orderData.jobData.wage}}*{{orderData.jobData.total}}*{{orderData.jobData.days}}*{{1+orderData.jobData.bounty_ratio/100}}={{orderData.jobData.wage*orderData.jobData.total*orderData.jobData.days*(1+orderData.jobData.bounty_ratio/100)}}</p>
					</li>
			
					<li>
					  <h1>定金</h1>
					  <p>{{orderData.jobData.wage*orderData.jobData.total*orderData.jobData.days*(1+orderData.jobData.bounty_ratio/100)}}*{{orderData.jobData.prepaymentRatio}}%={{orderData.order.amount}}</p>
					</li>
				<!-- 	<li>
					  <h1>支付订单</h1>
					  <p>{{orderData.order.amount}}</p>
					</li> -->
				</ul>
				<view class="info">需支付预算总金额的{{orderData.jobData.prepaymentRatio}}%的订金</view>
			
				<h1 class="title">支付方式</h1>
			    <ul class="payWay">
					<li @tap="cepay" v-if="parseInt(orderData.userInfo.money)<parseInt(orderData.order.amount)" style="margin-bottom: 40upx;">
						<view class="way">
							<img src="/static/yuezhifu.png" >
							<view class="payTxt" style="color: #aaa;">
							  余额支付<span style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{infoMany.money}}）</span>
							</view>
						</view>
						<view><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
					</li>
					<li @tap="choosePayWay(3)" v-else style="margin-bottom: 40upx;">
						<view class="way">
							<img src="/static/yuezhifu.png" >
							<view class="payTxt">
							  余额支付<span style="font-size:24upx;color: #aaa;font-weight: 400;">（余额&nbsp;{{infoMany.money}}）</span>
							</view>
						</view>
						<view v-if="choose3"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
						<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
					</li>
					<li @tap="choosePayWay(1)" style="margin-bottom: 40upx;">
						<view class="way">
							<img src="/static/zfb.png" >
							<view class="payTxt">
							  支付宝支付
							</view>
						</view>
						<view v-if="choose1"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
						<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
					</li>
					<!-- <li @tap="choosePayWay(2)">
						<view class="way">
							<img src="/static/wx.png">
							<view class="payTxt">
							  微信支付
							</view>
						</view>
						<view v-if="choose2"><image src="/static/other/zhifu.png" style="width: 40upx;height: 40upx;"></image></view>
						<view v-else><view style="width: 39upx;height: 39upx;border:1upx solid #FFE3D9; border-radius: 50%;"></view></view>
					</li> -->
				</ul>
				<view style="height: 200upx;"></view>
				<view class="save-box1">
					<view class="save1" @tap="submit">￥{{orderData.order.amount}} 定金支付</view>
				</view>
			</view>
		</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniCalendar from "@/components/uni-calendar/uni-calendar"
	import xflSelect from '@/components/xfl-select/xfl-select.vue'; 
	import wPicker from "@/components/w-picker/w-picker.vue";
	import http from '@/tools/utils/http.js'
	var util = require('../../../../common/util.js');
	var formatLocation = util.formatLocation;
	 export default {
		components: {uniPopup,uniTag,uniCalendar,xflSelect,wPicker},
		data() {
			return {
				maxlength:500,
				cursorSpacing:20,
				adjustPosition:true,
				timeChoose: '8:00',
				worktime: 8,
				inverted: true,
				radius: true,
				autoplay:false,
				indicatorDots: true,
				mubanChoss:true,
				categoryList: [],
				categoryPan:[],
				categoryChs:[],
				cid:'',
				indexes: -1,
				tindexes: -1,
				type:'',
				static: 0,
				param: 2,
				sexIndex:0,
				sex:[{
					value:'3',
					name:'不限',
					checked: 'true'
				},{
					value:'1',
					name:'男'
				},{
					value:'2',
					name:'女'
				}],
				ziNumber: 0,
				pTitle: '',
				pNumber: '',
				salary: '',
				scale: '20',
				location: {},
				address: '',
				whereaddress:'',
				deladdress:'',
				editorCtx:'',
				job_tags:'',
				days:'1'	,
				gender:'',
				date:'',
				date1:'',
				time:'',
				typeName:'',
				jobs_part_time_maxday:'',
				itemid:'',
				orderData:{
					jobData:{},
					order:{},
					userInfo:{}
				},
				infoMany:{},
				paytype:'alipay',
				choose1: true,
				choose2: false,
				choose3: false,
				list: [       //要展示的数据
					// '1',
					// // {value: '香蕉', disabled: true},
					// '2',
					// "3",
					// "4",
					// "5",
					// "6",
					// "7",
					// "8",
					// "9",
					// "10",
					// "11",
					// "12",
					// "13",
					// "14",
					// "15",
				],
				shichang: ['1','2','3','4','5','6','7','8','9','10','11','12'],
				xingzhi: ['零工','长工'],
				ptwork_bounty_ratio:[],
			}
		},
		onLoad(e) {
			// this.release()
			// 获取明天的日期
			this.itemid=e.itemid
			var day1 = new Date();
			day1.setTime(day1.getTime()+24*60*60*1000);
			var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
			this.date1 = s1
			http.apiRequest({
				api: "/common/config",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						this.jobs_time = res.data.config.jobs_part_time_maxday	
						for(let n=1; n<=this.jobs_time;n++) {
							this.list.push(n)
							this.list = this.list.join(',').split(',');
						}
						this.ptwork_bounty_ratio = res.data.config.ptwork_bounty_ratio.split(",")
						for(let i=0;i<this.ptwork_bounty_ratio.length;i++) {
							this.ptwork_bounty_ratio[i] = this.ptwork_bounty_ratio[i] + '%'
						}
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
			this.userInfoData()
			http.apiRequest({
				api: "/jobs/getJobDetail",
				method: "GET",
				data: {
					itemid: e.itemid
				},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						let detail = res.data
						this.pTitle = detail.title
						this.pNumber = detail.total
						this.salary = detail.wage
						// this.scale = detail.bounty_ratio
						this.gender = detail.gender
						this.param = detail.gender-1
						if(this.gender=='3') {
							this.sexIndex=0
						}else {
							this.sexIndex=this.gender
						}
						this.days = detail.jobData.days
						
						
						var day1 = new Date(detail.jobData.job_start_date);
						day1.setTime(day1.getTime()+24*60*60*1000*(detail.jobData.days-1));
						var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
						this.date = detail.jobData.job_start_date
						
						this.address = detail.address.split(" ")
						this.whereaddress = this.address[0]
						this.deladdress = this.address[1]
					
						this.timeChoose = detail.interviewtime
						this.worktime = detail.worktime
						this.editorCtx = detail.description
						this.ziNumber = detail.description.length
						this.cid = detail.category_id
						this.categoryType()
						// console.log(res)
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
			bindTextAreaBlur: function (e) {
				this.editorCtx = e.detail.value
			},
			// 获取用户信息
			userInfoData() {
				http.apiRequest({
					api: "/user/userinfo",
					method: "GET",
					data: {
						
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.infoMany=res.data
							// console.log(res)
							// if(res.data.isCompanyVerified==0) {
							// 	this.hasCompanyVerified=true
							// 	setTimeout(()=>{
							// 		this.show = true
							// 	},100)
							// }else{
							// 	this.hasCompanyVerified=false
							// }
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
			// 选择地址
			chooseLocation: function () {
				this.$refs.region.show()
				// uni.chooseLocation({
				// 	success: (res) => {
				// 		// this.hasLocation = true,
				// 		this.location = formatLocation(res.longitude, res.latitude),
				// 		this.address = res.address
				// 	}
				// })
			},
			// 选择时长
			shiChang(e) {
				console.log(e)
				this.worktime = e.newVal
			}, 
			// 选择时间
			bindTimeChange: function(e) {
				this.timeChoose = e.target.value
			},
			// 选择岗位性质
			xingZhi(e) {
				
			},
			// 选择模板
			muBan() {
				this.$refs.popupMuban.open()
			},
			//选择模板
			xuanMuban(index) {
				if(index==1) {
					let ctx="招募要求：\r\n    1.18-35周岁，高中或同等以上学历（大专及以上学历优先考虑），性别专业不限；\r\n    2.有热情，有进取心，积极向上，希望通过努力改变自己的人生；\r\n    3.良好的服务意识和团队精神，良好的素质素养。\r\n工作内容：\r\n    1.处理店铺各项基本业务（比如顾客接待、商品整理、收银、清扫等）。"
					this.editorCtx=ctx
					this.$refs.popupMuban.close()
				}else {
					let ctx1="岗位职责：\r\n    1、接待顾客的咨询，了解顾客的需求并达成销售；\r\n    2、负责做好货品销售记录、盘点、账目核对等工作，按规定完成各项销售统计工作；\r\n    3、完成商品的来货验收、上架陈列摆放、补货、退货、防损等日常营业工作；\r\n    4、做好所负责区域的卫生清洁工作；\r\n    5、完成上级领导交办的其他任务。\r\n任职资格：\r\n    1、高中以上学历；\r\n    2、有相关工作经验者优先；\r\n    3、具有较强的沟通能力及服务意识，吃苦耐劳；\r\n    4、年龄18-40岁，身体健康。\r\n工作时间：8小时排班制"
					this.editorCtx=ctx1
					this.$refs.popupMuban.close()
				}
			},
			// 选择赏金
			changeBounty(e) {
				this.scale = e.newVal.slice(0,2)
			},
			// 选择天数
			changeDays(e) {
				this.days = e.newVal
			},
			input: function (e) {
				// this.ziNumber = e.target.cursor
				this.ziNumber = e.detail.value.length
				// console.log(e)
			},
			// 选择招聘分类类型
			bindClick(index) {
				this.tindexes = -1
				this.cid=this.categoryPan[index].id
				this.indexes = index
				console.log(this.cid)
				for(let j=0 ; j < this.categoryList[this.categoryPan[index].id].length ; j++) {
					if(this.categoryPan[index].id==this.categoryList[this.categoryPan[index].id][j].pid){
							this.categoryChs = this.categoryList[this.categoryPan[index].id]
							// console.log(this.categoryChs)
					}else{
						
					}
				}
			},
			// 二级选择分类
			towSort(i) {
				this.cid=this.categoryChs[i].id
				this.tindexes = i
				this.typeName = this.categoryChs[i].name
				this.$refs.popup.close()
			},
			// 选择招聘对象性别
			chooseSex (i) {
				// for (let i = 0; i < this.sex.length; i++) {
				// 	if (this.sex[i].value === i.target.value) {
				// 		this.param = i;
				// 		break;
				// 	}
				// }
				// this.gender = i.detail.value
				// console.log(this.gender)
				this.sexIndex=i
				this.gender = this.sex[i].value
				console.log(this.gender)
			},
			// 返回上级
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 打开日历
			open(){
				// 获取明天的日期
				var day1 = new Date();
				day1.setTime(day1.getTime()+24*60*60*1000);
				var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
				this.date = s1
				this.$refs.calendar.open();
			},
			onConfirm(val){
				console.log(val);
				this.whereaddress = val.result
				this.$refs.region.hide()
			},
			onCancel(val) {
				console.log(val);
				this.$refs.region.hide()
			},
			// 选择日期返回的事件
			confirm(e) {
				// this.days = e.range.data.length
				// if(this.days<=0){
				// 	//e.range.end=e.range.begin;
					// this.time = e.range.begin;
				// 	this.days=1;
				// }else{
				// 	this.time = e.range.begin + "," +e.range.end
				// }
				this.time = e.fulldate;
				
				this.date = e.fulldate
				// console.log(e);
				// if(e.range.data.length>this.jobs_time) {
				// 	uni.showToast({
				// 		title: "您所选的时间不能超过"+this.jobs_time+"天",
				// 		duration:3000
				// 	});
				// }
			},
			onTransition(e) {
				console.log(e)
				this.mubanChoss=!this.mubanChoss
			},
			// 打开类型选择弹框
			openPopup(){
				this.$refs.popup.open()
			},
			// 关闭类型选择弹框
			closePopup(){
				this.$refs.popup.close()
			},
			// 调取分类接口
			categoryType() {
				// console.log('asd',this.cid)
				http.apiRequest({
					api: "/category/categoryChilds",
					method: "GET",
					data: {
						type: 'jobs',
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							this.categoryList = res.data;
							let newData= expand(this.categoryList);
							let typeCid = this.cid
							// console.log(typeCid)
							// 让分类展开为一维数组
							function expand(data){
							    let expandData = [];
							    for(let key in data){
							        expandData.push(...data[key])
							    }
							    return expandData;
							}
							for(let i=0; i<newData.length; i++) {
								if(typeCid==newData[i].id){
									this.typeName = newData[i].name
								}else {
									
								}
							}
							// console.log(typeCid)
							// console.log(newData)
							this.categoryPan = this.categoryList[0]
							// console.log(this.categoryList)		
						}
					},
					error: (res, httpStatus) => {
						uni.showToast({
							title: "请检查网络..."
						});
					},
				});
			},
			// 调取发布接口
			release() {
				this.address = this.whereaddress+" "+this.deladdress
				// if(this.static==1) {
					http.apiRequest({
						api: "/jobs/jobEdit",
						method: "POST",
						data: {
							itemid: this.itemid,
							cid: this.cid,
							// type: '1',
							title: this.pTitle,
							total: this.pNumber,
							wage: this.salary,
							billing_type:'2',
							address: this.address,
							bounty_ratio: this.scale,
							description: this.editorCtx,
							job_tags:'',
							gender:this.gender,
							job_start_date: this.date,
							days: this.days,
							interviewtime: this.timeChoose,
							worktime: this.worktime
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								this.order()
								this.$refs.popupFabu.open()
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
				// }else {
				// 	http.apiRequest({
				// 		api: "/jobs/jobAdd",
				// 		method: "POST",
				// 		data: {
				// 			cid: this.cid,
				// 			type: '1',
				// 			title: this.pTitle,
				// 			total: this.pNumber,
				// 			wage: this.salary,
				// 			billing_type:'2',
				// 			address: this.address,
				// 			bounty_ratio: this.scale,
				// 			description: this.editorCtx,
				// 			job_tags:'',
				// 			gender:this.gender,
				// 			job_start_date: this.date,
				// 			days: this.days,
				// 			interviewtime: this.timeChoose,
				// 			worktime: this.worktime
				// 		},
				// 		secuss: (res, httpStatus) => {
				// 			if (res.code == 1) {
				// 				this.static = 1
				// 				this.itemid = res.data.jobData.id
				// 				this.order()
				// 				this.$refs.popupFabu.open()
				// 			}else {
				// 				uni.showToast({
				// 					title: res.msg
				// 				});
				// 			}
				// 		},
				// 		error: (res, httpStatus) => {
				// 			uni.showToast({
				// 				title: "请检查网络..."
				// 			});
				// 		},
				// 	});
				// }
			},
			// 选择支付方式
			choosePayWay(index) {
				switch (index) {
					case 1:
					this.choose1=true
					this.choose2=false
					this.choose3=false
					this.paytype = 'alipay'
					break;
					case 2:
					this.choose1=false
					this.choose2=true
					this.choose3=false
					this.paytype = 'wxpay'
					break;
					case 3:
					this.choose1=false
					this.choose2=false
					this.choose3=true
					this.paytype = 'balancepay'
					break;
				}
			},
			cepay() {
				uni.showToast({
					title: '余额不足，请选择其他支付方式！'
				});
			},
			submit() {
				if(this.paytype =='balancepay') {
					http.apiRequest({
						api: "/pay/balanceSubmit",
						method: "GET",
						data: {
							order_id: this.orderData.order.id,
						},
						secuss: (res, httpStatus) => {
							if (res.code == 1) {
								uni.showToast({
									title: res.msg
								});
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/pay_result/pay_result?orderid=' + this.orderData.order.id
									});
								},500)
							}else {
								uni.showToast({
									title: res.msg
								});
							}
						},
						// html: (html,htmlpstatus) => {
						// 	this.content = html
						// 	console.log(this.content)
						// },
						error: (res, httpStatus) => {
							uni.showToast({
								title: "请检查网络..."
							});
						},
					});
				}else {
					location.href = http.baseUrl+'/pay/submit?type=' + this.paytype + '&order_id=' + this.orderData.order.id;
				}
			},
			order() {
				http.apiRequest({
					api: "/order/partTimeDepositOrder",
					method: "GET",
					data: {
						jobs_id: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							// uni.showToast({
							// 	title: res.msg
							// });
							this.orderData = res.data.orderData
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
		},

	};
</script>

<style>
	.content-box {
		width: 100%;
		padding-bottom: 60upx;
		padding-top: 60upx;
	}
	.heard {
		line-height: 40px;
		height: 40px;
		font-size: 16px;
		background: url(../../../../static/other/back-icon.png) no-repeat top 10upx left 40upx;
		background-size: 48upx 48upx;
	}
	.each {
		
	}
	.each-name {
		text-align: left;
		font-size: 26upx;
		font-weight: bold;
		color: #666;
		background: #fafafa;
		padding: 52upx 40upx 20upx;
		box-sizing: border-box;
	}
	.each-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 40upx;
		font-size: 30upx;
		color: #999;
		/* font-weight: bold; */
		height: 120upx;
		border-bottom: 1upx solid #e6e6e6;
	}
	.each-box:last-child {
		border: none;
	}
	.each-box input {
		font-size: 32upx;
		text-align: right;
		font-weight: 400;
	}
	.jiantou {
		background: #fff;
		width: 30upx;
	}
	input {
		color: #1A1A1A;
	}
	textarea {
		text-align: left;
		width: 660upx;
	}
	.radio {
		padding-right: 60upx;
	}
	.radio:nth-child(3) {
		padding-right: 0upx;
	}
	.each-box .input {
		margin-left: 160upx;
	}
	.gwxz-box {
		display: flex;
		align-items: center;
		margin-right: 12upx;
		position: relative;
	}
	.gwxz-box1 {
		display: flex;
		align-items: center;
		position: relative;
	}
	.qidai {
		width: 94upx;
		height: 37upx;
		position: absolute;
		top: -24upx;
		right: -12upx;
	}
	.qidai image {
		width: 100%;
		height: 100%;
	}
	.gwxz {
		width: 108upx;
		height: 54upx;
		border-radius: 28upx;
		text-align: center;
		line-height: 56upx;
		margin-right: 30upx;
		font-size: 30upx;
		border: 1px solid #FFE3D9;
	}
	.gwxz-box1 .gwxz:nth-child(3) {
		margin-right: 0upx;
	}
	.gwxz_active {
		width: 110upx;
		height: 56upx;
		background: #FF5A1F;
		color: #FFFFFF;
		border: none;
	}
	.each-box span {
		font-size: 30upx;
		color: #1A1A1A;
		font-weight: bold;
		width: 110upx;
		text-align: right;
	}
	.choose-six {
		display: flex;
		align-items: center;
		color: #1A1A1A;
	}
	.swiper {
		height: 400upx;
		position: relative;
	}
	.swiper swiper-item {
		overflow: scroll !important;
	}
	.mubanChoss {
		width: 300upx;
		height: 94upx;
		margin: 0 auto;
		margin-top: 60upx;
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-radius: 6upx;
	}
	.muban view{
		font-size: 24upx;
		color: #666;
		margin: 20upx 0;
	}
	.save-box {
		width: 600upx;
		margin: 0 auto;
		background: #ffffff;
		/* position: fixed; */
		bottom: 0;
		/* height: 160upx; */
		padding-top: 20upx;
		padding-bottom: 40upx;
		/* margin-left: -40upx; */
		display: flex;
		justify-content: center;
	}
	.save {
		width: 300upx;
		height: 94upx;
		/* margin: 0 auto; */
		background: #FF5A1F;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 94upx;
		border-bottom-right-radius: 6upx;
		border-top-right-radius: 6upx;
	}
	.savea {
		width: 300upx;
		height: 94upx;
		/* margin: 0 auto; */
		background: #FFE3D9;
		font-size: 36upx;
		color: #FF5A1F;
		text-align: center;
		line-height: 94upx;
		border-bottom-left-radius: 6upx;
		border-top-left-radius: 6upx;
	}
	.active {
		background: #FFF !important;
		font-weight: bold;
		/* border-left: 6upx solid #FF5A1F; */
	}
	.active2 {
		border-left: 6upx solid #FF5A1F;
	}
	.active1 {
		background: #FFF !important;
		/* font-weight: bold; */
		color: #FF5A1F;
	}
	.payOrder{
			width: 100%;
			/* background: #f2f2f2; */
			background: #fff;
		}
	 .title{text-align: left; padding:65upx 10upx 26upx;line-height: 1em; font-size: 28upx;color: #666;}
	 .title1 {
		  font-size: 50upx;
		  color: #000000;
		  /* font-weight: bold; */
		  text-align: center;
		  margin-top: 68upx;
		  margin-bottom: 55upx;
	 }
	 .wage {
		  font-size: 34upx;
		  color: #1A1A1A;
		  /* font-weight: bold; */
		  margin-bottom: 26upx;
		  text-align: center;
	 }
	 .orderNo{
		  font-size: 22upx;
		  color: #666;
		  text-align: center;
		  margin-top: -8upx;
		  margin-bottom: 80upx;
	 }
	 .payway {
		  display: flex;
		  align-items: center;
		  justify-content: space-between
	 }
	 .way {
		  display: flex;
		  align-items: center;
	 }
	.orderInfo{background: #fff;padding: 0 10upx;}
	 .orderInfo li{display: flex;align-items: center;justify-content: space-between;margin-bottom: 40upx;}
	 .orderInfo li h1{font-size: 32upx;color: #666;}
	 .orderInfo li p{font-size: 34upx;color: #000;font-weight: bold;}
	 .info {
		  margin-top: -20upx;
		  color: #666;
		  font-size: 22upx;
		  text-align: right;
		  margin-right: 10upx;
	 }
	 .payWay{background: #fff;padding:0 10upx;}
	 .way {
		display: flex;
		align-items: center;
	 }
	 .payWay li{display: flex;align-items: center;justify-content: space-between;margin-bottom: 10upx;height: 40upx;}
	 .payWay li img{width: 48upx;}
	 .payTxt{font-size: 34upx;color: #000;margin-left: 30upx;}
	/* .buyBtn{width: calc(100% - 52upx);margin: 60upx auto 0 auto;background: #FF5A1F;text-align: center;color: #fff;height: 94upx;line-height:94upx;
	 font-size: 34upx;} */
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
	 .save1 {
	 	height: 94upx;
	 	background: #FF5A1F;
		padding: 0 96upx;
	 	font-size: 32upx;
	 	color: #fff;
	 	text-align: center;
	 	line-height: 94upx;
	 	border-radius: 6upx;
	 }
	 .save2 {
	 	height: 94upx;
		width: 400upx;
	 	background: #FF5A1F;
	 	font-size: 32upx;
	 	color: #fff;
	 	text-align: center;
	 	line-height: 94upx;
	 	border-radius: 6upx;
	 }
</style>
