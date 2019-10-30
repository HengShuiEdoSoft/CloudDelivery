<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-wrapper">
				<view class="dui-gap"></view>
				<view class="dui-gap"></view>
				<view class="dui-basic-list">
					<block v-for="(item,index) in lists" :key="index">
						<navigator :url="'servicecenter-detail?id=' + index">
							<view class="dui-basic-list-item">
								<view class="dui-basic-list-item__container">
									<view class="dui-basic-list-item__content">
										<view class="dui-basic-list-item__content-title">
											{{item.name}}
										</view>
									</view>
									<view class="dui-basic-list-item__extra">
										<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
									</view>
								</view>
							</view>
						</navigator>
					</block>
				</view>
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
				lists: [{
					"name": "哪里可以下单叫车"
				}, {
					"name": "如何下单用车?"
				}, {
					"name": "如何叫例如尾板,开顶等特殊规格的车辆?"
				}, {
					"name": "..."
				}]
			}
		},
		methods: {

		}
	}
</script>
<style>
	.scroll-container {
		height: 100%;
		padding-bottom: 80upx;
	}
</style>
