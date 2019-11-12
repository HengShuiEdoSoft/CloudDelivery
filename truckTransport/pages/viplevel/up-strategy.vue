<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view scroll-y="true">
			<block v-for="(item,index) in lists" :key="index">
				<view class="dui-up-item">
					<view class="dui-up-column">{{item.name}}</view>
					<block v-for="(item,index) in item.content" :key="index">
						<view class="dui-up-content-box">
							<view class="dui-up-content-title">
								{{item.title}}
							</view>
							<view class="dui-up-content-body">
								{{item.body}}
							</view>
						</view>
					</block>
				</view>
			</block>
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
				lists: [{
					"name": "会员说明",
					"content": [{
						"title": "什么是会员?",
						"body": "会员:即更好服务于用户,所建立的会员等级系统,即更好服务于用户会员:即更好服务于用户,所建立的会员等级系统,即更好服务于用户会员:即更好服务于用户,所建立的会员等级系统,即更好服务于用户会员:即更好服务于用户,所建立的会员等级系统,即更好服务于用户"
					}, {
						"title": "会员是什么?",
						"body": "vip"
					}]
				}, {
					"name": "会员升降级规则",
					"content": [{
						"title": "如何提升等级?",
						"body": "会员:即更好服务于用户,所建立的会员等级系统,即更好服务于用户"
					}, {
						"title": "等级如何提升?",
						"body": "1<2<4<5<6"
					}]
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

	scroll-view {
		height: 100%;
	}

	.dui-up-item {
		padding: 40upx 0;
		border-bottom: 1upx solid #e2e2e2;
	}

	.dui-up-column {
		padding-left: 20upx;
		font-size: 30upx;
		border-left: 8upx solid #FF5723;
	}

	.dui-up-content-box {
		margin-top: 40upx;
		padding: 0 30upx;
	}

	.dui-up-content-title {
		font-size: 28upx;
	}

	.dui-up-content-body {
		margin-top: 30upx;
		font-size: 26upx;
		line-height: 40upx;
		color: #999;
	}
</style>
