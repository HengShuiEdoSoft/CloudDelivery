<template>
	<view class="content">
		<view class="dui-notyet-wrapper">
			<image src="../../static/img/NoDriver.jpg" mode=""></image>
			<text>收藏好司机直接发单给他们</text>
			<view class="dui-notyet-btn" @tap="togglePopup('center', 'collection')">去收藏司机 </view>
		</view>
		<uni-popup ref="collection" :type="type" :custom="true" :mask-click="false">
			<view class="dui-collection-wrapper">
				暂无
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: "/pages/driver/driverexplain"
				});
			}
		},
		components: {
			uniPopup
		},
		data() {
			return {
				show: false,
				type:"",
			}
		},
		methods: {
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open()
			}
		}
	}
</script>
<style>
	.dui-notyet-wrapper image {
		width: 170upx;
		height: 200upx;
	}

	.dui-notyet-wrapper text {
		margin: 86upx 0 70upx 0;
		color: #8d8d8d;
	}

	.dui-notyet-btn {
		width: 290upx;
		height: 85upx;
		line-height: 85upx;
		background-color: #fff2de;
		color: #FF5723;
		text-align: center;
		border-radius: 10upx;
	}
	.dui-collection-wrapper{
		width: 570upx;
		height:560upx ;
		padding: 50upx;
		background-color: #fff;
		border-radius: 10upx;
	}
</style>
