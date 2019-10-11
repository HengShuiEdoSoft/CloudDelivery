<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-detail-wrapper">
				<block v-for="(item,index) in lists" :key="index">
					<view class="dui-service-detail-title">
						{{item.title}}
					</view>
					<view class="dui-service-detail-content">
						{{item.content}}
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tel: "010-8888",
				lists: [{
					"title": "问:我的司机是什么?",
					"content": "答:该是什么就是什么。"
				}, {

					"title": "问:怎样收藏司机?",
					"content": "答:点击收藏页面就知道了。"
				}]
			}
		},
		methods: {}
	}
</script>
<style>
	.content {
		background-color: #fff;
	}

	.dui-service-detail-wrapper {
		padding: 0 30upx 60upx 30upx;
		background-color: #fff;
		position: relative;
	}

	.dui-service-detail-title {
		padding-top: 50upx;
		font-size: 30upx;
		font-weight: bold;
	}

	.dui-service-detail-content {
		padding-top: 50upx;
		font-size: 28upx;
		color: #646464;
		line-height: 50upx;
	}
</style>
