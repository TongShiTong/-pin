<template>
	<view class="content-box">
		<view class="bb_detial" v-for="(item,index) in sjList" :key="index">
			<view class="rz_renyuan">{{item.year}}年</view>
			<view>
				<view class="reny_xq" v-for="(val,index) in item.data" :key="'1'+index" @tap="myZhangdan(val.sett_month)">
					<view>
						<view class="name">{{val.month}}月账单</view>
						<!-- <view class="call">已结算</view> -->
					</view>
					<view class="yubao">
						<view>{{val.bountyTotal}}</view>
						<view style="width: 14upx;height: 22upx;margin-left: 10upx;">
							<image style="width: 100%;height: 100%;" src="/static/xianyou.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="sjList.length==0" class="more">暂无数据</view>
	</view>
</template>

<script>
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				itemid:'',
				sjList:[]
			}
		},
		onLoad(e) {
			let that = this
			that.itemid=e.itemid
			that.sjBaobiao()
		},
		methods: {
			sjBaobiao() {
				let that = this
				http.apiRequest({
					api: "/sett_details/getSettListByCompany",
					method: "GET",
					data: {
						job_id: this.itemid,
					},
					secuss: (res, httpStatus) => {
						if (res.code == 1) {
							that.sjList = res.data.settSummaryList
							for(let n=0;n<that.sjList.length;n++) {
								that.sjList[n].year=that.sjList[n].sett_month.toString().substr(0,4)
								that.sjList[n].month=that.sjList[n].sett_month.toString().substr(4)
							}
							var map = {},
							    dest = [];
							for(var i = 0; i < that.sjList.length; i++){
							    var ai = that.sjList[i];
							    if(!map[ai.year]){
							        dest.push({
							            year: ai.year,
							            data: [ai]
							        });
							        map[ai.year] = ai;
							    }else{
							        for(var j = 0; j < dest.length; j++){
							            var dj = dest[j];
							            if(dj.id == ai.id){
							                dj.data.push(ai);
							                break;
							            }
							        }
							    }
							}
							that.sjList=dest
							console.log(that.sjList)
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
			myZhangdan(i) {
				uni.navigateTo({
					// 传递 userid 在详情页接收
					url: '/pages/index/enterprise_terminal/m_inform/m_inform?itemid=' + this.itemid + '&month='+ i
				});
			}
		}
	}
</script>

<style>
	.content-box {
		width: 100%;
		padding-top: 92upx;
		position: relative;
		background: #F7F7F7;
	}
	.bb_detial {
		margin: 0 40upx 40upx;
		background: #FFFFFF;
		box-shadow:0px 0px 10px 0px rgba(230, 230, 230, 0.35);
		border-radius:6upx;
	}
	.rz_renyuan {
		height: 96upx;
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
		padding: 0 40upx;
		box-sizing: border-box;
		line-height: 96upx;
		border-bottom: 1upx solid #E6E6E6;
	}
	.reny_xq {
		height: 144upx;
		padding: 0 40upx;
		font-size: 36upx;
		font-weight: bold;
		box-sizing: border-box;
		border-bottom: 1upx solid #E6E6E6;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.reny_xq:last-child {
		border-bottom: none;
	}
	.yubao {
		font-size: 36upx;
		color: #000000;
		font-weight: bold;
		line-height: 1em;
		display: flex;
	}
	.name {
		font-size: 34upx;
		color: #000000;
		font-weight: bold;
		line-height: 1em;
		/* margin-bottom: 20upx; */
	}
	
	.call {
		line-height: 1em;
		font-size: 26upx;
		font-weight: 500;
		color: #999999;
	}
	.more {
		font-size: 28upx;
		color: #666;
		text-align: center;
	}
</style>
