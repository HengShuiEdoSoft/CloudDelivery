<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-vip-bj"></view>
			<view class="dui-service-wrapper">
				<view class="dui-vip-card">
					<view class="dui-vip-type">
						<text>普通会员</text>
						<navigator url="corporate-vip">
							升级为企业会员
						</navigator>
					</view>
					<view class="dui-vip-phone">
						188****8888
					</view>
					<view class="dui-vip-steps">
						当前成长值 : 0
					</view>
				</view>
				<view class="dui-vip-strategy">
					<navigator url="get-value" class="dui-vip-growth">
						升级白银会员还差1成长值 >
					</navigator>
					<navigator url="up-strategy" class="dui-vip-strategy-btn">
						升级攻略
					</navigator>
				</view>
				<view class="dui-vip-equity">
					<view class="dui-vip-equity-title">会员权益</view>
					<view class="dui-vip-giftpackage-list">
						<view class="dui-vip-giftpackage-item">
							<view class="dui-vip-giftpackage unlock">
								<text class="iconfont icon-youhuijuan"></text>
							</view>
							<text>优惠礼包</text>
						</view>
						<view class="dui-vip-giftpackage-item">
							<view class="dui-vip-giftpackage">
								<text class="iconfont icon-suoding"></text>
							</view>
							<text>优惠礼包</text>
						</view>
						<view class="dui-vip-giftpackage-item">
							<view class="dui-vip-giftpackage">
								<text class="iconfont icon-suoding"></text>
							</view>
							<text>优惠礼包</text>
						</view>
						<view class="dui-vip-giftpackage-item">
							<view class="dui-vip-giftpackage">
								<text class="iconfont icon-suoding"></text>
							</view>
							<text>优惠礼包</text>
						</view>
						<view class="dui-vip-giftpackage-item">
							<view class="dui-vip-giftpackage">
								<text class="iconfont icon-suoding"></text>
							</view>
							<text>优惠礼包</text>
						</view>
					</view>
				</view>
				<view class="dui-vip-equity">
					<view class="dui-vip-equity-title">
						优惠礼包
					</view>
					<view class="dui-vip-Receive-item">
						<view class="dui-vip-Receive-body">
							<view>【白银会员】:</view>
							<view>3元优惠券+5元余额券+20元优惠券(9米6)</view>
						</view>
						<navigator url="/pages/mymoney/mycoupon-gift" class="dui-vip-Receive-btn">
							领取
						</navigator>
					</view>
					<view class="dui-vip-Receive-item">
						<view class="dui-vip-Receive-body">
							<view>【黄金会员】:</view>
							<view>3元优惠券+5元余额券+20元优惠券(9米6)</view>
						</view>
					</view>
					<view class="dui-vip-Receive-item">
						<view class="dui-vip-Receive-body">
							<view>【铂金会员】:</view>
							<view>3元优惠券+5元余额券+20元优惠券(9米6)</view>
						</view>
					</view>
					<view class="dui-vip-Receive-item">
						<view class="dui-vip-Receive-body">
							<view>【钻石会员】:</view>
							<view>3元优惠券+5元余额券+20元优惠券(9米6)</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
</script>
<style>
	scroll-view {
		height: 100%;
		padding-bottom: 40upx;
	}

	.dui-vip-bj {
		position: absolute;
		top: -1480upx;
		left: 50%;
		width: 1780upx;
		height: 1780upx;
		border-radius: 50%;
		background-color: #424456;
		transform: translateX(-50%);
	}

	.dui-vip-card {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 250upx;
		box-sizing: border-box;
		margin-top: 20upx;
		padding: 40upx 40upx 0 40upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #b8bbc4;
	}

	.dui-vip-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 40upx;
		color: #424456;
	}

	.dui-vip-type navigator {
		padding: 5upx 15upx;
		font-size: 28upx;
		border: 1px solid #424456;
		border-radius: 24upx;
	}

	.dui-vip-phone {
		margin-top: 10upx;
		font-size: 20upx;
		color: #40424e;
	}

	.dui-vip-strategy {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 75upx;
		padding: 0 30upx;
		box-sizing: border-box;
		background-color: #ffe5b0;
		border-radius: 0 0 20upx 20upx;
		box-shadow: 0 2upx 8upx #A8A8A8;
	}

	.dui-vip-growth {
		font-size: 28upx;
		color: #805025;
	}

	.dui-vip-strategy-btn {
		padding: 5upx 16upx;
		font-size: 24upx;
		color: #805025;
		background-color: #fdf1cc;
		border: 1px solid #e1d19e;
		border-radius: 22upx;
	}

	.dui-vip-equity {
		margin-top: 20upx;
		padding: 40upx 0;
		background-color: #fff;
		border-radius: 20upx;
	}

	.dui-vip-equity-title {
		font-size: 38upx;
		color: #743c11;
		text-align: center;
	}

	.dui-vip-giftpackage-list {
		display: flex;
		flex-wrap: wrap;
	}

	.dui-vip-giftpackage-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		padding-top: 40upx;
	}

	.dui-vip-giftpackage {
		width: 90upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		background-color: #f2f2f4;
		border-radius: 50%;
	}

	.dui-vip-giftpackage.unlock {
		background-color: #FF5723;
	}

	.dui-vip-giftpackage .icon-suoding {
		font-size: 50upx;
		color: #d8d8da;
	}

	.dui-vip-giftpackage .icon-youhuijuan {
		font-size: 50upx;
		color: #fff;
	}

	.dui-vip-giftpackage-item text {
		font-size: 26upx;
		margin-top: 20upx;
	}

	.dui-vip-Receive-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40upx;
		margin-top: 40upx;
	}

	.dui-vip-Receive-body view {
		font-size: 24upx;
	}

	.dui-vip-Receive-btn {
		padding: 5upx 20upx;
		font-size: 28upx;
		color: #FF5723;
		border: 1px solid #FF5723;
		border-radius: 40upx;
		text-align: center;
	}
	.dui-vip-steps {
		margin-top: 30upx;
		width: 100%;
		font-size: 30upx;
		color:#424456 ;
	}
	
</style>
