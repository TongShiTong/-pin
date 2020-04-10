<template>
	<view>
		<input class="input" type="text" v-model="name">
		<view @tap="save">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:''
			}
		},
		onLoad(e) {
			this.name = e.name;
		},
		onUnload() {
			uni.$emit('repair',{name:this.name})
		},
		methods: {
			save() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
