<template>
	<view class="content">
		<view class="dui-notyet-wrapper">
			<image src="../../static/img/NoOrder.jpg" mode=""></image>
			<text>暂无可咨询订单</text>
		</view>
	</view>
</template>
<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.reLaunch({
					url: "/pages/index/index"
				});
			}
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>
<style>
	.dui-notyet-wrapper image {
		width: 170upx;
		height: 200upx;
	}

	.dui-notyet-wrapper text {
		margin: 40upx 0 70upx 0;
		color: #8d8d8d;
	}
</style>
