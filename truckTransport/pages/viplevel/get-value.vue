<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view scroll-y="true">
			<view class="dui-get-title">
				获取记录
			</view>
			<view class="dui-get-body">
				<view class="dui-notyet-wrapper" v-if="empty">
					<image src="../../static/img/Consultation.jpg" mode=""></image>
					<text>暂无获取记录</text>
				</view>
			</view>
		</scroll-view>
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
			return {
				empty: true
			}
		}
	}
</script>

<style>
	.content {
		background-color: #fff;
	}

	.dui-get-title {
		margin: 30upx 0;
		padding-left: 10px;
		font-size: 30upx;
		border-left: 4px solid #FF5723;
	}

	.dui-notyet-wrapper image {
		width: 210upx;
		height: 200upx;
	}

	.dui-notyet-wrapper text {
		margin: 86upx 0 70upx 0;
		color: #8d8d8d;
	}
</style>
