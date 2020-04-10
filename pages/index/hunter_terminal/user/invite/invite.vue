<template>
	<view class="content-box">
		<view class="back">
			<view style="display: flex;align-items: center;" @tap="back">
				<image src="/static/yaoqing/back.png" style="width: 22upx;height: 38upx;margin-right: 15upx;"></image>
				<view>返回</view>
			</view>
			<view @tap="shareFriend">分享</view>
		</view>
		<view style="height: 766upx;"></view>
		<view style="font-size: 26upx; text-align: right;padding-right: 98upx;height: 680upx;">活动规则</view>
		<view class="invite">
			<view class="box" @tap="shareFriend">
				<view class="img"><image src="/static/yaoqing/weixin-icon.png"></image></view>
				<view class="wenan">微信邀请</view>
			</view>
			<view class="box" @tap="erweima">
				<view class="img"><image src="/static/yaoqing/erweima-icon.png"></image></view>
				<view class="wenan">二维码邀请</view>
			</view>
			<view class="box copyLink" @tap="fuzhi" :data-clipboard-text="url">
				<view class="img"><image src="/static/yaoqing/lianjia-icon%20.png"></image></view>
				<view class="wenan">复制链接</view>
			</view>
		</view>
		<uni-popup ref="popupFabu" type="center">
			<view class="tishi">此功能需要下载app呦!</view>
			<view class="gongn">
				<view class="qixiao" @tap="quxiao">在看看</view>
				<view class="quxiazai" @tap="xiazaiApp">去下载</view>
			</view>
		</uni-popup>
		<view v-show="linkIsShow">
		  <view class="hb_zzc">
			<view class="link_cons">
			 <view class="iconfont"
				 @click="showLinsk()">x</view>
			  <!-- <image src="/static/other/tg_logo.png" mode="aspectFill"></image> -->
			  <view class="ewm_box">
				<view id="qrcode" class="qrcode">
	
				</view>
			  </view>
			</view>
		  </view>
		</view>
		
		<view class="zhanji">
			<view class="info">
				<view class="shuju">2</view>
				<view class="shujuWA">成功邀请(人)</view>
			</view>
			<view class="info">
				<view class="shuju">6588.69</view>
				<view class="shujuWA">获得赏金(元)</view>
			</view>
			<view class="info">
				<view class="shuju">6</view>
				<view class="shujuWA">进行中(人)</view>
			</view>
		</view>
		<navigator class="chakan" url="/pages/invite_detail/invite_detail" hover-class="none"><span>查看详情</span><image style="width: 22upx;height: 26upx;" src="/static/other/chakan.png"></image></navigator>
		<view class="more">更多详情查看活动规则</view>
	</view>
</template>

<script>
	import Clipboard from 'clipboard';
	import { qrcanvas } from 'qrcanvas';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import http from '@/tools/utils/http.js';
	export default {
		components:{uniPopup},
		data() {
			return {
				user_id:'',
				linkIsShow:false,
				shares:null,//定义标示分享
				url:""
			}
		},
		onLoad() {
			this.plus()
			this.user_id=uni.getStorageSync("user_id")
			this.url = http.cdnUrl + "/pages/share_hb/share_hb?userid=" + this.user_id
		},
		methods: {
			plus() {
				let _thant=this;
				if(window.plus){
					 plus.share.getServices(function(s){
					_thant.shares = s;
					}, function(e){
						alert("获取分享服务列表失败："+e.message);
					});
				  }
			  },
			  quxiao() {
				  this.$refs.popupFabu.close()
			  },
			  xiazaiApp() {
			  	location.href = 'http://lsp.jiuduanfw.com/down';  
			  },
			  back() {
				 history.back()
			  },
			erweima() {
				this.linkIsShow = !this.linkIsShow;
				var canvas1 = qrcanvas({
				  data: decodeURIComponent(this.url),
				  size:122,
				});
				document.getElementById("qrcode").innerHTML = '';
				document.getElementById('qrcode').appendChild(canvas1);
			},
			showLinsk: function () {
				this.linkIsShow = !this.linkIsShow;
			  },
			shareFriend: function() {
				let _that=this;
			  if(this.shares!=null){//app
				  plus.share.sendWithSystem({content:'一起来猎手聘',href:this.url}, function(){
					  console.log('分享成功');
				  }, function(e){
					  console.log('分享失败：'+JSON.stringify(e));
				  });
			  }else{//h5
				  this.$refs.popupFabu.open()
			  }
            },
			fuzhi() {
				let clipboard = new Clipboard(".copyLink");
				clipboard.on('success',e => {
				  uni.showToast({
				  	title: '复制成功,去粘贴！',
				  	duration: 1500
				  });
				});
				clipboard.on('error',e => {
					uni.showToast({
						title: '复制失败哦,重新试试?',
						duration: 1500
					});
				});
			},
		}
	}
</script>

<style>
.content-box {
	width: 100%;
	height: 2922upx;
	background: url(../../../../../static/yaoqing/yaoqing.png) no-repeat;
	background-size: 100% 100%;
}
.invite {
	padding: 0 112upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 300upx;
}
.back {
	font-size: 32upx;
	color: #FEFEFE;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 110upx 40upx 0;
}
.box {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.img {
	width: 112upx;
	height: 112upx;
	margin-bottom: 60upx;
}
.img image {
	width: 100%;
	height: 100%;
}
.wenan {
	font-size: 28upx;
	color: #FFE6A3;
}
.zhanji {
	padding: 0 116upx 0 76upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.info {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.shuju {
	font-size: 50upx;
	color: #fff;
	font-weight: bold;
	opacity: 0.9;
	margin-bottom: 24upx;
}
.shujuWA {
	font-size: 26upx;
	color: #fff;
	opacity: 0.6;
}
.chakan {
	font-size: 28upx;
	color: #fff;
	opacity: 0.8;
	margin-top: 30upx;
	margin-left: 308upx;
	margin-bottom: 540upx;
	align-items: center;
	display: flex;
}

.more {
	text-align: center;
	font-size: 22upx;
	color: #fff;
}
.hb_zzc,.link_zzc{position: fixed;width: 100%;height: 100%;left: 0;top:0;background: rgba(0,0,0,0.5);display: flex;align-items: center;justify-content: center;z-index: 1000;}
.link_cons{width: 80%;height: 860upx; border-radius: 40upx;background: #fff;position: relative; background: url(../../../../../static/yaoqing/tg_logo.png) no-repeat;background-size: 600upx 860upx;}
.link_cons>image{width: 100%; overflow: hidden;}
.ewm_box{width: 560upx;margin:480upx auto 0 10upx;overflow: hidden;}
  .ewm_box image{width: 100%;}
  .qrcode{text-align: center;}
  .iconfont {
	  text-align: right;
	  margin-right: 30upx;
  }
  .tishi {
	  font-size: 40upx;
	  color: #1A1A1A;
	  padding: 30upx;
  }
  .gongn {
	  margin: 60upx 30upx 0;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
  }
  .qixiao {
	  font-size: 30upx;
	  padding: 20upx 40upx;
	  background: #FFE3D9;
	  color: #FF5A1F;
	  border-radius: 40upx;
  }
  .quxiazai {
	  font-size: 30upx;
	  padding: 20upx 40upx;
	  background: #FF5A1F;
	  color: #fff;
	  border-radius: 40upx;
  }
</style>
