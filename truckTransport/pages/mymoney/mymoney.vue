<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-money-list-group">
			<view class="dui-money-card-wrapper">
				<view class="dui-money-card">
					<text>当前余额(元)</text>
					<text>0.00</text>
					<text class="dui-money-recharge-btn">立即充值▸</text>
				</view>
				<view class="dui-money-list-item" style="padding-left:20upx ; padding-right: 20upx;">
					<view class="dui-money-number">
						<view>
							<text class="iconfont icon-Raidobox-xuanzhong"></text>
							<text>本金</text><br>
						</view>
						<view class="">
							
							<text style="font-size:20upx; color:#858585;">
								0.00
							</text>
						</view>
					</view>
					<view class="dui-money-number">
						<view>
							<text class="iconfont icon-Raidobox-xuanzhong"></text>
							<text>赠金</text><br>
						</view>
						<view class="">
							
							<text style="font-size:20upx; color:#858585;">
								0.00
							</text>
						</view>
					</view>
					<view class="dui-money-number">
						<view>
							<text class="iconfont icon-Raidobox-xuanzhong"></text>
							<text>待支付金额</text><br>
								<text class="iconfont icon-wenhao-yuankuang"></text>
						</view>
						<view class="">							
							<text style="font-size:20upx; color:#858585;">
								0.00
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="dui-money-list-group">
			<navigator url="mycoupon">
				<view class="dui-money-list-item">
					<text class="iconfont icon-youhuijuan"></text>
					<text style="flex: 1;margin-left: 26upx;font-size:28upx;">优惠券</text>
					<text class="iconfont icon-gengduo-shuxiang"></text>
				</view>
			</navigator>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<style>
	.dui-money-card-wrapper {
		margin: 20upx 0 40upx 0;
		border: 1upx solid #e2e2e2;
		border-radius: 15upx;
		box-shadow: 0upx 4upx 10upx #e2e2e2;
	}

	.dui-money-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 280upx;
		padding: 0 50upx;
		background-color: #3c3c46;
		border-radius: 15upx;
		color: #fff;
	}

	.dui-money-card text:first-child {
		font-size: 24upx;
		margin: 60upx 0 20upx 0;
	}

	.dui-money-card text:nth-child(2) {
		font-size: 36upx;
	}

	.dui-money-number {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.dui-money-recharge-btn {
		font-size: 24upx;
		background-color: #ff5723;
		margin-top: 30upx;
		padding: 15upx 24upx;
		border-radius: 30upx;
		letter-spacing: 4upx;
	}

	.icon-Raidobox-xuanzhong {
		font-size: 18upx;
		color: #dbdbdb;
		margin-right: 18upx;
	}
	.icon-wenhao-yuankuang{
		color: #9a9a9a;
	}
	.icon-Raidobox-xuanzhong+text{
		font-size: 24upx;	
	}
</style>
