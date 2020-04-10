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
			
			<view class="each-box">
				<view style="width: 220upx;text-align: left;font-size: 32upx; color: #1A1A1A;">人数</view>
				<input type="number" placeholder="请输入所需人数" v-model="pNumber">
			</view>
			<view class="each-box">
				<view style="width: 260upx;text-align: left;font-size: 32upx; color: #1A1A1A;">年龄</view>
				<!-- <input class="input" type="number" placeholder="请输入比例" v-model="scale"><span style="width: 60upx;">%</span> -->
				<input @click="xzAge" style="text-align: right;width: 420upx;" type="text" placeholder="请选择" v-model="age" disabled="true">
				<!-- <view> -->
				<view class="jiantou" @click="xzAge"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
				<uni-popup ref="popupAge" type="bottom">
					<view class="queding">
						<view @tap="quXiao">取消</view>
						<view style="color: #FF5A1F;" @tap="queDing">确定</view>
					</view>
					<view class="timeduan">
						<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
					</view>
				</uni-popup>
				<!-- <view style="width: 200upx;">
					<xfl-select 
						:list="ageList"
						:clearable="false"
						:listShow="false"
						:isCanInput="false"  
						:style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;padding-right: 60upx;'"
						:placeholder = "'请选择'"
						:selectHideType="'hideAll'"
						@change="changeAge"
					>
					</xfl-select>
				</view> -->
			</view>
		</view>
		
		<view class="each">
			<view class="each-name">薪酬</view>
			<view class="each-box">
				<view style="width: 220upx;text-align: left;font-size: 32upx; color: #1A1A1A;">综合工资</view>
				<input @click="xzAgegz" style="text-align: right;width: 420upx;" type="text" placeholder="请选择" v-model="zhgz" disabled="true">
				<!-- <view> -->
				<view class="jiantou" @click="xzAgegz"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
				<uni-popup ref="popupZhgz" type="bottom">
					<view class="queding">
						<view @tap="quXiaogz">取消</view>
						<view style="color: #FF5A1F;" @tap="queDinggz">确定</view>
					</view>
					<view class="timeduan">
						<mt-picker :slots="slotss" @change="onValuesChangegz"></mt-picker>
					</view>
				</uni-popup>
				<!-- <view style="width: 200upx;">
					<xfl-select 
						:list="zhgzList"
						:clearable="false"
						:listShow="false"
						:isCanInput="false"  
						:style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;padding-right: 60upx;'"
						:placeholder = "'请选择'"
						:selectHideType="'hideAll'"
						@change="changeZhgz"
					>
					</xfl-select>
				</view> -->
			</view>
			<view class="each-box">
				<view style="width: 260upx;text-align: left;font-size: 32upx; color: #1A1A1A;">计薪方式</view>
				<!-- <input class="input" type="number" placeholder="请输入比例" v-model="scale"><span style="width: 60upx;">%</span> -->
				<view style="width: 240upx;">
					<xfl-select 
						:list="jxfsList"
						:clearable="false"
						:listShow="false"
						:isCanInput="false"  
						:style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;padding-right: 60upx;'"
						:placeholder = "'请选择'"
						:selectHideType="'hideAll'"
						@change="changeJxfs"
					>
					</xfl-select>
				</view>
			</view>
		</view>
		
		<view class="each">
			<view class="each-name">赏金<span style="padding-left: 400upx;font-size: 24upx;color: #FF5A1F;">需要支付3个月赏金</span></view>
			<view class="each-box">
				<view style="width: 260upx;text-align: left;font-size: 32upx; color: #1A1A1A;">赏金<span style="font-size: 24upx;color: #666666;font-weight: 400;margin-left: 10upx;">(人/月)</span></view>
				<!-- <input class="input" type="number" placeholder="请输入比例" v-model="scale"><span style="width: 60upx;">%</span> -->
				<view style="display: flex;align-items: center;">
					<!-- <view @tap="jianSj">-</view> -->
					<image @tap="jianSj" style="width: 48upx;height: 48upx;" src="/static/jian.png"></image>
					<view style="margin: 0 20upx;font-size: 32upx;color: #1A1A1A;font-weight: bold;">{{qzsj}}</view>
					<!-- <view @tap="jiaSj">+</view> -->
					<image @tap="jiaSj" style="width: 48upx;height: 48upx;" src="/static/jia.png"></image>
				</view>
			</view>
		</view>
		
		<view class="each">
			<view class="each-name">工作时间</view>
			<view class="each-box">
				<view style="width: 200upx;text-align: left;font-size: 32upx; color: #1A1A1A;">开始用工日期</view>
				<input style="text-align: right;width: 400upx;margin-right: -40upx;" type="text" disabled="true" placeholder="请选择" @click="open" v-model="time">
				<view class="jiantou" @click="open"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
			</view>
			<view class="each-box">
				<view style="width: 200upx;text-align: left;font-size: 32upx; color: #1A1A1A;">截止招聘日期</view>
				<!-- <input class="input" type="number" placeholder="请输入比例" v-model="scale"><span style="width: 60upx;">%</span> -->
				<input style="text-align: right;width: 400upx;margin-right: -40upx;" type="text" disabled="true" placeholder="请选择" @click="openJzrq" v-model="jzrqtime">
				<view class="jiantou" @click="openJzrq"><image style="width: 30upx;height: 30upx;margin-top: 8upx;" src="/static/user/gengduo-icon2x.png"></image></view>
			</view>
			
			<!-- <view class="each-box">
				<view style="width: 160upx;text-align: left;font-size: 32upx; color: #1A1A1A;">时间制度</view>
				<view style="display: flex;align-items: center;">
					<view style="width: 240upx;">
						<xfl-select 
							:list="timezdList"
							:clearable="false"
							:listShow="false"
							:isCanInput="false"  
							:style_Container="'height: 50px; font-size: 32upx;color:#1a1a1a;padding-right: 60upx;'"
							:placeholder = "'请选择'"
							:selectHideType="'hideAll'"
							@change="timeZd"
						>
						</xfl-select>
					</view>
				</view>
			</view> -->
		</view>
		<view class="each">
			<view class="each-name">福利待遇</view>
			<view class="each-boxfl">
				<view v-for="(item,i) in welfareInsex" :key="i" @tap="fullWelfare(i)" :class="{xzWelfare:item.isshow}">{{item.name}}</view>
			</view>
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
		<uni-calendar style="width: 300upx;"
		   ref="jzzprq"
		   :buxian="true"
		   :insert="false"
		   @confirm="confirmJzrq"
		   :disableBefore="true"
		   :range="false"
		   :date="time"
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
			<view class="savea"><span style="font-size: 24upx;">预算：￥</span><span>{{pNumber*3*qzsj}}</span></view>
			<view class="save" @tap="release()">确定修改</view>
		<uni-popup ref="popupFabu" type="bottom" :radius="radius">
			<view class="payOrder">
			  <view class="title1">{{orderData.jobData.title}}<span style="font-size: 40upx;margin-left: 25upx;">{{orderData.jobData.salary}}</span></view>
			  <view class="xuqiu-box">
				  <view class="qzshangjin">
					<view class="cszhi">{{orderData.jobData.bounty}}</view>
					<view class="csjs">赏金(元/人/月)</view>
				  </view>
				  <view class="qzrenshu">
					<view class="cszhi">{{orderData.jobData.total}}</view>
					<view class="csjs">需求人数(人)</view>
				  </view>
			  </view>
			  <view class="orderNo1">订单编号：{{orderData.order.orderNo}}</view>
				<view class="orderInfo1">
					<view class="">
						预计总赏金
					</view>
					<view class="yjshangjin">
						{{qzsj}}*{{pNumber}}*3={{pNumber*3*qzsj}}
					</view>
				</view>
				<view class="wxts">
					<view class="jingg">
						<image style="width: 32upx;height: 32upx;margin-right: 15upx;" src="/static/jinggao.png"></image>
						<view>温馨提示</view>
					</view>
					<view>
						员工入职后，如果试用期内（15天）不合格，员工离职，企业有一次要求猎手无偿补员的机会。
					</view>
				</view>
			
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
				timezd:'',
				timezdList:['8:00-17:00','9:00-18:00'],
				jzrqtime:'不限',
				jzrqtime1:'2070-01-01',
				welfareInsex:[],
				full_welfare:{},
				qzsj:'',
				zdsj:'',
				zgsj:'',
				jxfs:'',
				jxfsIndex:0,
				jxfsList:[],
				zhgz:'',
				qyzhgz:'',
				zhgzList:['面议','3k-6k','4.5k-8k'],
				age:'',
				qyage:'',
				ageList:['不限','18-45岁'],
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
					
				],
				slots: [
					{
					  flex: 1,
					  values: ['18','20','25','30','35','40','45','50','55','60'],
					  className: 'slot1',
					  textAlign: 'right'
					}, {
					  divider: true,
					  content: '-',
					  className: 'slot2'
					}, {
					  flex: 1,
					  values: ['18','20','25','30','35','40','45','50','55','60'],
					  className: 'slot3',
					  textAlign: 'left'
					}
				],
				slotss: [
					{
					  flex: 1,
					  values: ['2.0k','3.0k','3.5k','4.0k','4.5k','5.0k','5.5k','6.0k','6.5k','7.0k','8.0k'],
					  className: 'slot1',
					  textAlign: 'right'
					}, {
					  divider: true,
					  content: '-',
					  className: 'slot2'
					}, {
					  flex: 1,
					  values: ['2.0k','3.0k','3.5k','4.0k','4.5k','5.0k','5.5k','6.0k','6.5k','7.0k','8.0k'],
					  className: 'slot3',
					  textAlign: 'left'
					}
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
						for (let i in res.data.config.full_salary_calculation) {
						    this.jxfsList.push(res.data.config.full_salary_calculation[i])
						}
						this.zdsj = res.data.config.full_bounty_min
						this.zgsj = res.data.config.full_bounty_max
						this.full_welfare=res.data.config.full_welfare
						// this.$set(this.full_welfare,'isshow', false);
						for (let m in this.full_welfare) {
							
							let obj={name:this.full_welfare[m]}
							this.$set(obj,'isshow', false);
							this.welfareInsex.push(obj)
						}
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
						this.qzsj = detail.jobData.bounty
						this.pTitle = detail.title
						this.pNumber = detail.total
						this.salary = detail.wage
						this.age = detail.jobData.age_range
						this.zhgz = detail.jobData.salary
						// this.scale = detail.bounty_ratio
						this.gender = detail.gender
						this.param = detail.gender-1
						if(this.gender=='3') {
							this.sexIndex=0
						}else {
							this.sexIndex=this.gender
						}

						this.address = detail.address.split(" ")
						this.whereaddress = this.address[0]
						this.deladdress = this.address[1]
					
						this.timeChoose = detail.interviewtime
						this.worktime = detail.worktime
						this.editorCtx = detail.description
						this.ziNumber = detail.description.length
						this.cid = detail.category_id
						this.time = res.data.jobData.work_start_date
						if(res.data.jobData.recruitment_end_date=="2070-01-01") {
							this.jzrqtime = '不限'
							this.jzrqtime1 = '2070-01-01'
						}else {
							this.jzrqtime = res.data.jobData.recruitment_end_date
							this.jzrqtime1 = res.data.jobData.recruitment_end_date
						}
						this.categoryType()
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
		methods: {
			// 确定年龄
			queDing() {
				this.age = this.qyage
				this.$refs.popupAge.close()
			},
			// 取消年龄默认
			quXiao() {
				this.$refs.popupAge.close()
			},
			onValuesChange(picker, values) {
			  if (values[0] > values[1]) {
				setTimeout(() => {
					  picker.setSlotValue(1, values[0]);
				},10)
			  }
			 this.qyage=values[0]+'-'+values[1]
			 console.log(picker, values)
			},
			// 选择年龄
			xzAge() {
				this.$refs.popupAge.open()
			},
			// 确定工资
			queDinggz() {
				this.zhgz = this.qyzhgz
				this.$refs.popupZhgz.close()
			},
			// 取消工资默认
			quXiaogz() {
				this.$refs.popupZhgz.close()
			},
			onValuesChangegz(picker, values) {
			  if (values[0] > values[1]) {
				setTimeout(() => {
					  picker.setSlotValue(1, values[0]);
				},10)
			  }
			 this.qyzhgz=values[0]+'-'+values[1]
			 console.log(picker, values)
			},
			// 选择工资
			xzAgegz() {
				this.$refs.popupZhgz.open()
			},
			// 选择时间制度
			timeZd(e) {
				this.timezd = e.newVal
			},
			// 打开日历
			openJzrq(){
				// 获取招聘截止日期
				this.$refs.jzzprq.open();
			},
			// 福利
			fullWelfare(i) {
				this.welfareInsex[i].isshow =!this.welfareInsex[i].isshow
				if(this.welfareInsex[i].isshow) {
					this.job_tags = this.job_tags+','+this.welfareInsex[i].name
				}else {
					this.job_tags = this.job_tags.replace(","+this.welfareInsex[i].name,'')
				}
			},
			// 赏金加减
			jianSj() {
				if(this.qzsj<=this.zdsj) {
					uni.showToast({
						title: "赏金已达到最低标准，不可以再减哦！"
					});
				}else {
					this.qzsj = this.qzsj-50
				}
			},
			jiaSj() {
				this.qzsj = parseInt(this.qzsj)+ 50
			},
			// 选择计薪方式
			changeJxfs(e) {
				console.log(e)
				this.jxfs=e.newVal
				this.jxfsIndex = e.index+1
			},
			// 选择综合工资
			changeZhgz(e) {
				this.zhgz=e.newVal
			},
			// 选择年龄
			changeAge(e) {
				this.age=e.newVal
			},
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
			// 截止日期返回事件
			confirmJzrq(e) {
				console.log(e)
				if(e.buxianrq!='') {
					this.jzrqtime = e.buxianrq;
					this.jzrqtime1 = '2070-01-01'
				}else {
					this.jzrqtime = e.fulldate;
					this.jzrqtime1 = e.fulldate;
				}
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
							// type: '2',
							title: this.pTitle,
							total: this.pNumber,
							wage: this.salary,
							billing_type:'2',
							address: this.address,
							bounty_ratio: this.scale,
							description: this.editorCtx,
							job_tags:this.job_tags,
							gender:this.gender,
							job_start_date: this.time,
							days: this.days,
							interviewtime: this.timeChoose,
							worktime: this.worktime,
							recruitment_end_date: this.jzrqtime1,
							salary_calculation: this.jxfsIndex,
							salary: this.zhgz,
							bounty: this.qzsj,
							age_range: this.age,
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
				// 			type: '2',
				// 			title: this.pTitle,
				// 			total: this.pNumber,
				// 			wage: this.salary,
				// 			billing_type:'2',
				// 			address: this.address,
				// 			bounty_ratio: this.scale,
				// 			description: this.editorCtx,
				// 			job_tags:this.job_tags,
				// 			gender:this.gender,
				// 			job_start_date: this.date,
				// 			days: this.days,
				// 			interviewtime: this.timeChoose,
				// 			worktime: this.worktime,
				// 			recruitment_end_date: this.jzrqtime1,
				// 			salary_calculation: this.jxfsIndex,
				// 			salary: this.zhgz,
				// 			bounty: this.qzsj,
				// 			age_range: this.age,
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
					api: "/order/fullTimeDepositOrder",
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
	.each-boxfl {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 30upx 40upx 0;
		font-size: 30upx;
		color: #666;
	}
	.each-boxfl view {
		padding: 20upx 30upx;
		margin: 0 40upx 30upx 0;
		background: #F7F7F7;
		border-radius: 35upx;
		line-height: 1em;
	}
	/* .each-boxfl view:nth-child(4n) {
		margin-right: 0;
	} */
	.each-boxfl .xzWelfare {
		background: #FF5A1F !important;
		color: #FFFFFF;
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
	 		  font-size: 44upx;
	 		  color: #000000;
	 		  font-weight: bold;
	 		  text-align: center;
	 		  margin-top: 60upx;
	 		  margin-bottom: 55upx;
	 		  line-height: 1em;
	 }
	 .xuqiu-box {
	 		 display: flex;
	 		 justify-content: center;
	 		 align-items: center;
	 		 margin-bottom: 60upx;
	 }
	 .cszhi {
	 		 font-size: 36upx;
	 		 font-weight: bold;
	 		 color: #000000;
	 		 line-height: 1em;
	 		 margin-bottom: 32upx;
	 }
	 .csjs {
	 		 font-weight: 500;
	 		 font-size: 28upx;
	 		 color: #666666;
	 }
	 .qzshangjin {
	 		 text-align: center;
	 		 margin-right: 86upx;
	 }
	 .qzrenshu {
	 		 text-align: center;
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
	 .orderNo1 {
	 		 font-size: 22upx;
	 		 color: #999999;
	 		 text-align: center;
	 		 margin-bottom: 80upx;
	 }
	 .orderInfo1 {
	 	display: flex;
	 	justify-content: space-between;
	 	align-items: center;
	 	font-size: 28upx;
	 	font-weight: 500;
	 	color: #000000;
	 	line-height: 1em;
	 	padding: 60upx 0upx;
	 	margin: 0 10upx;
	 	border-top: 1upx solid #E6E6E6;
	 }
	 .yjshangjin {
	 	font-size: 32upx;
	 	font-weight: bold;
	 }
	 .wxts {
	 	width: 670upx;
	 	height: 166upx;
	 	background: #F7F7F7;
	 	margin: 0 auto 20upx;
	 	padding: 30upx;
	 	font-size: 22upx;
	 	color: #999999;
	 	font-weight: 500;
	 	box-sizing: border-box;
	 	border-radius:4upx;
	 }
	 .jingg {
	 	display: flex;
	 	align-items: center;
	 	font-size: 24upx;
	 	color: #F54336;
	 	margin-bottom: 22upx;
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
		transform: translateX(-30upx);
	 }
	 .save1 {
	 	height: 94upx;
		width: 670upx;
	 	background: #FF5A1F;
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
	 .timeduan {
	 	font-weight: 500;
	 	width: 100%;
	 }
	 .queding {
	 	position: absolute;
	 	background: #FFFFFF;
	 	z-index: 1;
	 	top: 0upx;
	 	width: 750upx;
	 	transform: translateX(-30upx);
	 	display: flex;
	 	justify-content: space-between;
	 	align-items: center;
	 	font-size: 30upx;
	 	font-weight: 500;
	 	padding: 0 30upx;
	 	box-sizing: border-box;
	 	height: 80upx;
	 	border-bottom: 1px solid #e5e5e5;;
	 }
</style>
