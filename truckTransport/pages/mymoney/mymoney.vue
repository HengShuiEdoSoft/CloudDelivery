<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-money-list-group">
			<view class="dui-money-card-wrapper">
				<view class="dui-money-card">
					<text>当前余额(元)</text>
					<text>{{list.wallet}}</text>
					<navigator url="/pages/mymoney/myrecharge" class="dui-money-recharge-btn">
						立即充值▸
					</navigator>
				</view>
				<!-- <view class="dui-money-list-item" style="padding-left:20upx ; padding-right: 20upx;">
					<view class="dui-money-number">
						<view>
							<text class="iconfont icon-Raidobox-xuanzhong"></text>
							<text class="dui-money-number-title">本金</text>
						</view>
						<view>
							<text class="dui-money-specific">
								0.00
							</text>
						</view>
					</view>
					<view class="dui-money-number">
						<view>
							<text class="iconfont icon-Raidobox-xuanzhong"></text>
							<text class="dui-money-number-title">赠金</text>
						</view>
						<view>
							<text class="dui-money-specific">
								0.00
							</text>
						</view>
					</view>
					<view class="dui-money-number">
						<view>
							<text class="iconfont icon-Raidobox-xuanzhong"></text>
							<text class="dui-money-number-title">待支付金额</text>
							<text class="iconfont icon-wenhao-yuankuang"></text>
						</view>
						<view>
							<text class="dui-money-specific">
								0.00
							</text>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view class="dui-money-list-group" @tap="invoice">
			<navigator url="myinvoicing">
				<view class="dui-money-number" style="padding: 20upx 30upx;">
					<view>
						<text class="iconfont icon-fapiaotianchong"></text>
						<text class="dui-coupon-title">发票报销</text>
						<text>开发票 ></text>
					</view>
					<view class="dui-coupon-title-tips">
						您的发票报销助手
					</view>
				</view>
			</navigator>
		</view>
		<view class="dui-money-list-group">
			<navigator url="mycoupon">
				<view class="dui-money-number" style="padding: 20upx 30upx;">
					<view>
						<text class="iconfont icon-youhuijuan"></text>
						<text class="dui-coupon-title">券</text>
						<text>查看全部 ></text>
					</view>
					<view class="dui-coupon-title-tips">
						各种优惠券
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>
<script>
	import service from '../../service.js';
	import {
		mapState
	} from 'vuex'
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
			return {
				list:{
					wallet:12.00
				}
			}
		},
		onShow() {
			//钱包余额
			this.list.wallet=this.user.wallet;
		},
		computed: mapState(['isCompany','user']),
		methods: {
			invoice:function(){
				if(!this.isCompany){
					uni.showModal({
						title: '非企业用户',
						content: '您的账号为非企业账号，是否继续成为企业账号',
						showCancel: true,
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/viplevel/corporate-vip'
								});
							}else{
								uni.navigateBack({
									delta:1
								})
							}
						}
					});
				}
			}
		}
	}
</script>
<style>
	.dui-money-card-wrapper {
		margin: 20upx 30upx 40upx 30upx;
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
	}

	.dui-money-number view {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dui-money-number view:first-child {
		margin-bottom: 8upx;
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
	}

	.icon-wenhao-yuankuang {
		color: #9a9a9a;
	}

	.dui-money-number-title {
		margin: 0 18upx;
		font-size: 24upx;
	}

	.icon-fapiaotianchong,
	.icon-youhuijuan {
		font-size: 28upx;
	}

	.icon-wenhao-yuankuang {
		font-size: 24upx;
	}

	.dui-money-specific {
		font-size: 20upx;
		color: #858585;
		margin-left: 40upx;
	}

	.dui-coupon-title {
		flex: 1;
		margin-left: 16upx;
		font-size: 28upx;
	}

	.dui-coupon-title+text,
	.dui-coupon-title-tips {
		font-size: 26upx;
		color: #858585;
	}

	.dui-coupon-title-tips {
		padding-left: 44upx;
	}
</style>
