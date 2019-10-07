<template>
	<view class="content">
		<view class="dui-basic-tips">
			暂无
		</view>
	</view>
</template>
<script>
	export default {
		onNavigationBarButtonTap: function() {
			uni.navigateTo({
				url: "../mymoney/mymoney"
			});
		},
		data() {
			return {

			}
		},
		methods: {}
	}
</script>
<style>

</style>
