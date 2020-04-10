<template>
	<view>
		欢迎来到猎手聘
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		mounted() {
			uni.navigateTo({
				url: '/pages/index/enterprise_terminal/send_out',
			});
		},
		// h5支持，浏览器，app不支持
		// onBackPress(options) {
		// 	console.log(options)
		//     if (options.from === 'navigateBack') {
		//       return false;
		//     }
		//     this.onreturn();
		//     return true;
		//   },
		methods: {
			
		}
	}
</script>

<style>
</style>
