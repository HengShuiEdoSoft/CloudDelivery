<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<block v-for="(item,index) in lists" :key="index">
				<view class="dui-service-detail-wrapper">
					<view class="dui-service-detail-title">
						{{item.title}}
					</view>
					<view class="dui-service-detail-content">
						{{item.content}}
					</view>
				</view>
			</block>
			<view class="dui-scrvice-tel" @tap="call">
				<text class="iconfont icon-dianhua"></text>
				<text>客服热线 {{tel}}</text>
			</view>
		</scroll-view>
		<view class="dui-online-service">
			<image src="../../static/img/call.jpg" mode=""></image>
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
			return {
				tel: "010-8888",
				lists: [{
					"title": "哪里可以下单叫车?",
					"content": "A.云配送-APP B.云配送-官网 C.微信小程序"
				}]
			}
		},
		methods: {
			call: function(e) {
				uni.makePhoneCall({
					phoneNumber: '010-8888' //仅为示例
				});
			}
		}
	}
</script>
<style>
	.scroll-container {
		height: 100%;
	}

	.dui-service-detail-wrapper {
		padding: 0 30upx 80upx 30upx;
		background-color: #fff;
		position: relative;
	}

	.dui-service-detail-title {
		padding: 60upx 0;
		font-size: 40upx;
	}

	.dui-service-detail-content {
		font-size: 28upx;
		color: #646464;
		line-height: 50upx;
	}
</style>
