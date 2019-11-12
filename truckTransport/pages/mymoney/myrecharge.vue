<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view scroll-y="true">
			<view class="dui-recharge-list">
				<view class="dui-recharge-item active">
					<view class="dui-recharge-no">
						400元
					</view>
					<view class="dui-recharge-describe">
						送20优惠券
					</view>
				</view>
				<view class="dui-recharge-item">
					<view class="dui-recharge-no">
						1000元
					</view>
					<view class="dui-recharge-describe">
						送20优惠券
					</view>
				</view>
				<view class="dui-recharge-item">
					<view class="dui-recharge-no">
						3000元
					</view>
					<view class="dui-recharge-describe">
						送20优惠券
					</view>
				</view>
				<view class="dui-recharge-item">
					<view class="dui-recharge-no">
						6000元
					</view>
					<view class="dui-recharge-describe">
						赠送360 <br> +送20优惠券
					</view>
				</view>
			</view>
			<view class="dui-recharge-firstcharge">
				首值礼包 <text class="iconfont icon-liwu"></text>
			</view>
			<view class="dui-recharge-firstcharge-body">
				<view>赠送20元优惠券</view>
				<view>券包含 10元立减券×2张</view>
			</view>
			<view class="dui-recharge-paymode">
				<view class="dui-recharge-paymode-title">
					支付方式
				</view>
				<view class="dui-paymode-list">
					<radio-group @change="radioChange">
						<label class="dui-paymode-list-item" v-for="(item, index) in items" :key="item.value">
							<view class="dui-paymode-title">
								<view :class="item.icon"></view>
								<view class="dui-paymode-name">
									{{item.name}}
								</view>
							</view>
							<view>
								<radio :value="item.value" :checked="index === current" color="#FF5723" />
							</view>
						</label>
					</radio-group>
				</view>
			</view>
		</scroll-view>
		<view class="dui-fixed-bottom-btn">
			<navigator url="addaddress">
				<button class="primary" type="primary">
					立即充值
					<view class="dui-fixed-bottom-tip">
						(实际到账400元)
					</view>
				</button>
			</navigator>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type: "",
				current: null,
				items: [{
					name: "支付宝",
					value: "1",
					icon: "iconfont icon-z-alipay"
				}, {
					name: "微信",
					value: "2",
					icon: "iconfont icon-weixin"
				}]
			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
	.content {
		background-color: #fff;
	}

	scroll-view {
		margin-bottom: 140upx;
	}

	.dui-recharge-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30upx 15upx;
	}

	.dui-recharge-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		width: 230upx;
		height: 132upx;
		text-align: center;
		background-color: #f0f4f7;
	}

	.dui-recharge-item.active {
		background-color: #fdf4ef;
		border: 1upx solid #FF5723;
	}

	.dui-recharge-no {
		font-size: 32upx;
	}

	.dui-recharge-describe {
		font-size: 24upx;
		color: #5f6062;
	}

	.dui-recharge-firstcharge {
		margin-top: 15upx;
		width: 200upx;
		height: 50upx;
		line-height: 50upx;
		background-color: #FF5723;
		border-radius: 0 25upx 25upx 0;
		text-align: center;
		color: #fff;
		font-size: 28upx;
	}

	.dui-recharge-firstcharge .icon-liwu {
		margin-left: 10upx;
	}

	.dui-recharge-firstcharge-body {
		margin-left: 40upx;
		padding: 24upx 0;
		border-bottom: 1upx solid #e2e2e2;
	}

	.dui-recharge-firstcharge-body view:first-child {
		font-size: 28upx;
		color: #FF5723;
	}

	.dui-recharge-firstcharge-body view:nth-child(2) {
		width: 80%;
		font-size: 24upx;
		color: #919191;
	}

	.dui-recharge-paymode {
		margin-left: 40upx;
	}

	.dui-recharge-paymode-title {
		font-size: 30upx;
		padding-top: 20upx;
	}

	.dui-paymode-list {
		font-size: 14px;
		line-height: 84upx;
	}

	.dui-paymode-list-item {
		display: flex;
		align-items: center;
		margin: 20upx 40upx 20upx 10upx;
	}

	.dui-paymode-title {
		flex: 1;
	}

	.dui-paymode-name {
		display: inline-block;
	}

	.dui-paymode-list .iconfont {
		display: inline-block;
		vertical-align: top;
		font-size: 32px;
		padding-right: 14px;
	}

	.icon-z-alipay {
		color: #45B1FF;
	}

	.icon-weixin {
		color: #59F04C;
	}

	.dui-fixed-bottom-tip {
		font-size: 24upx;
		margin-top: -30upx;
	}
</style>
