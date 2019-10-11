<template>
	<view class="content">
		<view class="dui-basic-tips">
			暂无
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {

			}
		},
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.redirectTo({
					url: "/pages/mymoney/mymoney"
				});
			}
		},
		methods: {}
	}
</script>
<style>

</style>
