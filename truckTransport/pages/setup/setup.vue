<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container dui-reduce">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									音效提示
								</view>
								<view class="dui-basic-list-item__content-note">
									打开后将以予语音为你播报订单状态
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
			<view class="dui-basic-list">
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container dui-reduce">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									设置密码
								</view>
								<view class="dui-basic-list-item__content-note">
									若你已经设置过密码，点击此处也可修改密码
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
			<view class="dui-basic-list">
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									常用路线
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
			<view class="dui-basic-list">
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									用户协议
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
									隐私政策
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
									货运业务收费标准
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
									搬家业务收费标准
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
			<view class="dui-basic-list">
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									分享
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
									给我们评分
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
									关于
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
		<view class="dui-fixed-bottom-btn">
			<text>退出登录</text>
		</view>
	</view>
</template>
<script>
</script>
<style>
	.scroll-container {
		height: 100%;
		padding-bottom: 20%;
	}

	.dui-fixed-bottom-btn {
		background-color: #fff;
		color: #FF5723;
		font-size: 32upx;
		text-align: center;
	}

	.dui-fixed-bottom-btn text {
		display: block;
		margin-top: 15upx;
		margin-bottom: 15upx;
	}

	.dui-basic-list-item__container {
		padding: 26upx 30upx;
	}

	.dui-reduce {
		padding-top: 8upx;
		padding-bottom: 8upx;
	}

	.dui-basic-list-item__content-note {
		font-size: 24upx;
		margin-top: 0;
	}

	.dui-basic-list-item__extra {
		width: auto;
	}
</style>
