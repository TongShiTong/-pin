<template>
	<view class="content-box">
		<view class="footer">
			<view :class="'footer_item ' + (item.size=='big'?'big_item':'')  " :style="'width:'+item_width" @click="change_nav(index)" v-for="(item,index) in footer_nav" :key="index">
				<image :src="index==now_index?item.select_icon:item.icon" mode=""></image>
				<view :class="{'active':index==now_index}">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			change_nav(index){
				if(index=='1'&&(this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code=='enterPosition' || this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code=='enterMy')) {
					uni.navigateTo({
						url: '/pages/index/enterprise_terminal/send_out',
					});
				}else{
					this.$store.commit("change_page",index)
				}
			}
		},
		computed:{
			item_width(){
				let length = this.$store.state.footer_store.footer_nav.length;
				switch (length){
					case 1:
						return '100%'
						break;
					case 2:
						return '50%'
						break;
					case 3:
						return '33.3%'
						break;
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
			footer_nav(){
				console.log(this.$store.state.footer_store.footer_nav)
				return this.$store.state.footer_store.footer_nav
			},
			now_index(){
				return this.$store.state.footer_store.now_page_index;
			}
		}
	}
</script>

<style>
	@import "./footer_nav.css";
</style>
