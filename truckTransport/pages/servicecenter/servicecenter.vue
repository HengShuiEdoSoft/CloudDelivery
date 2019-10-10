<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-wrapper">			
					<view class="dui-service-bj"></view>
					<view class="dui-scrvice-custom-wrapper" style="color: #fff;">
						<text>最近订单</text>
						<navigator url="">更多<text class="iconfont icon-gengduo-shuxiang"></text></navigator>
					</view>
					<view class="dui-scrvice-order">
						暂无
					</view>				
				<view class="dui-gap"></view>
				<view class="dui-basic-list">
					<navigator url="">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										下单叫车
									</view>
								</view>
								<view class="dui-basic-list-item__extra">
									<text class="iconfont icon-gengduo-shuxiang"></text>
								</view>
							</view>
						</view>
					</navigator>
					<navigator url="">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										费用与支付
									</view>
								</view>
								<view class="dui-basic-list-item__extra">
									<text class="iconfont icon-gengduo-shuxiang"></text>
								</view>
							</view>
						</view>
					</navigator>
					<navigator url="">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										拉货途中
									</view>
								</view>
								<view class="dui-basic-list-item__extra">
									<text class="iconfont icon-gengduo-shuxiang"></text>
								</view>
							</view>
						</view>
					</navigator>
					<navigator url="">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										售后服务
									</view>
								</view>
								<view class="dui-basic-list-item__extra">
									<text class="iconfont icon-gengduo-shuxiang"></text>
								</view>
							</view>
						</view>
					</navigator>
					<navigator url="">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										其他问题
									</view>
								</view>
								<view class="dui-basic-list-item__extra">
									<text class="iconfont icon-gengduo-shuxiang"></text>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view class="dui-gap"></view>
				<navigator url="">
					<view class="dui-scrvice-custom-wrapper" style="background-color: #fff;">
						<text>我的反馈记录</text>
						<text class="iconfont icon-gengduo-shuxiang"></text>
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: "/pages/mymoney/mydetailed"
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
	.scroll-container {
		height: 100%;
		padding-bottom: 80upx;
	}

	.dui-service-wrapper {
		padding: 0 15upx;
		position: relative;
	}

	.dui-service-bj {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 300upx;
		background-color: #434456;
	}

	.dui-basic-list-item__container {
		padding-top: 35upx;
		padding-bottom: 35upx;
	}

	.dui-scrvice-custom-wrapper {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40upx 30upx;
		font-size: 34upx;
	}

	.dui-scrvice-custom-wrapper navigator {
		font-size: 28upx;
	}

	.dui-scrvice-order {
		position: relative;
		width: 100%;
		height: 294upx;
		background-color: #fff;
		border-radius: 4upx;
	}
</style>
