<template>
	<view class="content">
		<view class="height">
			<!-- 这里是状态栏 -->
		</view>
		<!-- <mask v-if="showMask"></mask> -->
		<!-- 用人企业端 -->
		<enterMy v-if="page_code=='enterMy'"></enterMy>
		<sendOut v-if="page_code=='sendOut'"></sendOut>
		<enterPosition v-if="page_code=='enterPosition'" :id="id"></enterPosition>
		
		<!-- 猎手端 -->
		<hunterHome v-if="page_code=='home'"></hunterHome>
		<hunterMy v-if="page_code=='hunterMy'"></hunterMy>
		<hunterPosition v-if="page_code=='hunterPosition'" ref="mychild"></hunterPosition>
		<talentContainer v-if="page_code=='talentContainer'"></talentContainer>
		<task v-if="page_code=='task'"></task>
		<!-- <fr-loading></fr-loading> -->
		<footerNav v-if="page_code!='sendOut'" class="content-box" :task="task1"></footerNav>
	</view>
</template>

<script>
	import enterMy from "@/pages/index/enterprise_terminal/enter_my.vue";
	import enterPosition from "@/pages/index/enterprise_terminal/enter_position.vue";
	import sendOut from "@/pages/index/enterprise_terminal/send_out.vue";
	import footerNav from "@/components/footer/footer_nav.vue";
	import hunterMy from "@/pages/index/hunter_terminal/hunter_my.vue";
	import hunterPosition from "@/pages/index/hunter_terminal/hunter_position.vue";
	import talentContainer from "@/pages/index/hunter_terminal/talent_container.vue"
	import task from "@/pages/index/hunter_terminal/task.vue"
	import hunterHome from "@/pages/index/hunter_terminal/hunter_home.vue"
	import mask from '@/components/mask.vue';
	import http from '@/tools/utils/http.js'
	export default {
		data() {
			return {
				scroll:false,
				task1:'',
				id:''
				// title: 'onBackPress',
				// showMask: false
			}
		},
		onPageScroll: function(e) {
			// console.log(e)
			if(e.scrollTop>170){
				this.scroll = true
				uni.$emit('scroll',{scroll:this.scroll})
			}else {
				this.scroll = false
				uni.$emit('scroll',{scroll:this.scroll})
			}
		},
	
		components: {
			enterMy,
			enterPosition,
			sendOut,
			footerNav,
			hunterMy,
			hunterPosition,
			talentContainer,
			task,
			hunterHome
		},
		
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			},
		},
	
		onLoad(e) {
			if(e.id) {
				this.id = e.id
			}
			this.task1=e.task
			uni.showLoading({
				title: '加载中...',
			});
			http.apiRequest({
				api: "/token/check",
				method: "GET",
				data: {
				},
				secuss: (res, httpStatus) => {
					uni.hideLoading();
					if (res.code == 1) {
						if(uni.getStorageSync("group_id")==2) {
							this.hunter()
						}else if(uni.getStorageSync("group_id")==3) {
							this.enterprise()
						} else {

						}
					}else {
						let token1 = ''
						uni.setStorageSync("token",token1)
						uni.reLaunch({
							url: '/pages/login/code_login'
						});
					}
				},
				error: (res, httpStatus) => {
					uni.hideLoading();
					uni.showToast({
						title: "请检查网络..."
					});
				},
			});
		},
		
		methods: {
			enterprise() {
				this.$store.dispatch('menu_3')
			},
			hunter () {
				this.$store.dispatch('menu_5')
			}
		}
		
	}
</script>

<style>
	 
	.content {
		width: 100%;
		text-align: center;
		background: #fff;
		padding-bottom: 140upx;
	}
	.height {
		height: var(--status-bar-height);
		width: 100%;
	}
	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
