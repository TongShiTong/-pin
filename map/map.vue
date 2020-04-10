<template>
	<view class="content-box">
		<baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler">
		    <view class="seach">
		    	<label><input v-model="keyword"><view>:搜索</view></label>
		    	<!-- <label><view>地区：</view><input v-model="location"></label> -->
		    </view>
			<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getLoctionSuccess" @locationError="getLocationError"></bm-geolocation>
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
			<bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
		</baidu-map>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import http from '@/tools/utils/http.js'
	import {BmGeolocation,BmMarker,BmNavigation,BmLocalSearch} from 'vue-baidu-map'
	var util = require('../common/util.js');
	var formatLocation = util.formatLocation;
	export default {
		components: {uniPopup,BmGeolocation,BmMarker,BmNavigation,BmLocalSearch},
		data() {
			return {
				center: {lng: 120.19, lat: 30.26},
				zoom: 3,
				location: '杭州',
				keyword: '百度',
			};
		},
		created(){
		    var me = this;	  
		},
		onLoad(){

		},
		methods: {
			handler ({BMap, map}) {
			    console.log(BMap, map)
			    this.zoom = 15
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					console.log(r);
					_this.center = {lng: r.longitude, lat: r.latitude};		// 设置center属性值
					_this.initLocation = true;
					_this.zoom = 15
					//alert('您的位置：'+r.point.lng+','+r.point.lat);
					console.log('center:', _this.center)	// 如果这里直接使用this是不行的
				},{enableHighAccuracy: true})
			},
			locationSuccess() {
				console.log(point,AddressComponent, marker)
			},
			getLocationError() {
				console.log(point,AddressComponent, marker)
			},
			select:function(item,index){
				var me = this;
				me.currIndex = index;
				var point = item.location;
				me.makerConf.position =  [point.lng,point.lat];
				me.center = [point.lng,point.lat];    
			},	
		},
		"watch":{
		
		}
	}
</script>

<style>
.content-box {
	width: 100%;
}
.bm-view {
	width: 100%;
	height: 600upx;
	margin-top: 60upx;
	position: relative;
}
.seach {
	display: flex;
	position: absolute;
	top: 20upx;
	left: 124upx;
	z-index: 10;
	background: #fff;
	border: 1px solid #999;
	border-radius: 10upx;
	font-size: 32upx;
	color: #1A1A1A;
	padding: 10upx 20upx;
}
label {
	display: flex;
}
</style>
