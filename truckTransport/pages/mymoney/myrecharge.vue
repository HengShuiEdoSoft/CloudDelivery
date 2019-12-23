<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view scroll-y="true">
			<view class="dui-recharge-list">
				<view class="dui-recharge-item" :class="{ active: index === cur }" v-for="(item, index) in list" :key="item.pay_cate_id" @tap="chargrchange(index)">
					<view>
						<view class="dui-recharge-no">{{ item.pay_money }}元</view>
						<view class="dui-recharge-describe">送{{ item.coupon_price_total }}优惠券</view>
					</view>
				</view>
			</view>
			<view class="dui-recharge-firstcharge">
				充值礼包
				<text class="iconfont icon-liwu"></text>
			</view>
			<view class="dui-recharge-firstcharge-body" v-if="list.length > 0">
				<view v-for="(item, index) in list[cur].coupon_list" :key="index">赠送 {{ item.coupon_title }} x {{ item.coupon_num }}张</view>
			</view>
			<view class="dui-recharge-paymode">
				<view class="dui-recharge-paymode-title">支付方式</view>
				<view class="dui-paymode-list">
					<radio-group @change="radioChange">
						<block v-for="item in items" :key="item.value">
						<!-- #ifdef MP-WEIXIN -->
						<label v-if="item.value !='alipay'" class="dui-paymode-list-item">
							<view class="dui-paymode-title">
								<view :class="item.icon"></view>
								<view class="dui-paymode-name">{{ item.name }}</view>
							</view>
							<view><radio :value="item.value" :checked="index === current" color="#FF5723" /></view>
						</label>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || H5 -->
						<label class="dui-paymode-list-item">
							<view class="dui-paymode-title">
								<view :class="item.icon"></view>
								<view class="dui-paymode-name">{{ item.name }}</view>
							</view>
							<view><radio :value="item.value" :checked="index === current" color="#FF5723" /></view>
						</label>
						<!-- #endif -->
						</block>
					</radio-group>
				</view>
			</view>
		</scroll-view>
		<view class="dui-fixed-bottom-btn">
			<view @tap="gotopay">
				<button class="primary" type="primary">
					立即充值
					<view class="dui-fixed-bottom-tip">(实际到账{{ pay_money }}元)</view>
				</button>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			type: '',
			cur: 0,
			current: 0,
			items: [
				{
					name: '支付宝',
					value: 'alipay',
					icon: 'iconfont icon-z-alipay'
				},
				{
					name: '微信',
					value: 'wxpay',
					icon: 'iconfont icon-weixin'
				}
			],
			list: [],
			pay_money: 0,
			pay_type: 0,
			pay_cate_id: 0,
			pay_platform: '',
			provider: 'alipay'
		};
	},
	onLoad() {
		this.getdata();
		let that = this;
		// #ifdef MP-WEIXIN
		that.pay_platform = 'miniapp';
		// #endif

		// #ifdef APP-PLUS
		that.pay_platform = 'app';
		// #endif

		// #ifdef H5
		that.pay_platform = 'web';
		// #endif
	},
	computed: mapState(['user']),
	methods: {
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					this.provider = this.items[i].value;
					break;
				}
			}
		},
		chargrchange: function(index) {
			this.cur = index;
			this.pay_money = this.list[index].pay_money;
			this.pay_cate_id = this.list[index].pay_cate_id;
		},
		getdata: function() {
			let that = this;
			this.$uniFly
				.get({
					url: '/api/pay_cate/getpaycatelist',
					params: {}
				})
				.then(function(res) {
					if (res.code == 0) {
						let list = [];
						for (let i in res.data) {
							list.push(res.data[i]);
						}
						that.list = list;
						if (list.length > 0) {
							that.pay_cate_id = list[0].pay_cate_id;
							that.pay_money = list[0].pay_money;
						}
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content: JSON.stringify(error),
						showCancel: false
					});
				});
		},
		gotopay: function() {
			this.addpaylog();
		},
		addpaylog() {
			let that = this;
			if (that.pay_cate_id > 0 && that.pay_money > 0) {
				uni.showLoading({
					title: '正在创建订单...'
				});
				let paylog_data = {
					order_id: that.pay_cate_id,
					pay_type: that.pay_type,
					pay_money: that.pay_money
				};
				// console.log(paylog_data);
				that.$uniFly
					.post({
						url: '/api/pay_log/addpaylog',
						params: paylog_data
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							that.pay_log_id = res.data;
							that.pay();
						} else {
							uni.showModal({
								title: '下单失败，重新尝试？',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										that.addpaylog();
									} else if (res.cancel) {
										return;
									}
								}
							});
						}
					})
					.catch(err => {
						uni.showModal({
							title: '下单失败，重新尝试？',
							content: JSON.stringify(err),
							success: function(res) {
								if (res.confirm) {
									that.addpaylog();
								} else if (res.cancel) {
									return;
								}
							}
						});
					});
			} else {
				uni.showToast({
					icon: 'none',
					title: '订单不存在!'
				});
				return;
			}
		},
		pay() {
			let that = this;
			if (that.pay_log_id > 0) {
				uni.showLoading({
					title: '支付中...'
				});
				that.$uniFly
					.post({
						url: '/api/pay_log/pay',
						params: {
							pay_log_id: that.pay_log_id,
							pay_platform: that.pay_platform,
							provider: that.provider,
							openid: that.user.minwxapp_id
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							let pay_log_id = res.data.pay_log_id;
							// 微信或支付宝支付,调用uni.requestPayment,拉起第三方支付
							// 微信小程序支付
							// #ifdef MP-WEIXIN
							uni.requestPayment({
								provider: that.provider,
								orderInfo: res.data.data, //微信、支付宝订单数据
								timeStamp: res.data.data.timeStamp,
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: res.data.data.signType,
								paySign: res.data.data.paySign,
								success: function(res) {
									that.$drmking.paySure(that,pay_log_id,'/pages/index/index');
								},
								fail: function(err) {
									// console.log('fail:' + JSON.stringify(err));
									uni.showModal({
										title: '支付失败，重新尝试？',
										content: JSON.stringify(err),
										success: function(res) {
											if (res.confirm) {
												that.pay();
											} else if (res.cancel) {
												return;
											}
										}
									});
								}
							});
							// #endif
							// app支付
							// #ifdef APP-PLUS
							// console.log(res.data);
							uni.requestPayment({
								provider: that.provider,
								orderInfo: res.data.data, //微信、支付宝订单数据
								success: function(res) {
									that.$drmking.paySure(that,pay_log_id,'/pages/index/index');
								},
								fail: function(err) {
									// console.log('fail:' + JSON.stringify(err));
									uni.showModal({
										title: '支付失败，重新尝试？',
										content: JSON.stringify(err),
										success: function(res) {
											if (res.confirm) {
												that.pay();
											} else if (res.cancel) {
												return;
											}
										}
									});
								}
							});
							// #endif
						} else {
							uni.showModal({
								title: '订单支付失败，重新尝试？',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										that.pay();
									} else if (res.cancel) {
										return;
									}
								}
							});
						}
					})
					.catch(err => {
						uni.showModal({
							title: '订单支付失败，重新尝试？',
							content: JSON.stringify(err),
							success: function(res) {
								if (res.confirm) {
									that.pay();
								} else if (res.cancel) {
									return;
								}
							}
						});
					});
			} else {
				uni.showToast({
					icon: 'none',
					title: '订单不存在!'
				});
				return;
			}
		}
	}
};
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
	padding: 30upx 15upx;
}

.dui-recharge-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
	padding: 0 10upx;
	width: 240upx;
	box-sizing: border-box;
	text-align: center;
}
.dui-recharge-item > view {
	padding: 40upx 0;
	width: 100%;
	box-sizing: border-box;
	background-color: #f0f4f7;
}
.dui-recharge-item.active > view {
	background-color: #fdf4ef;
	border: 2upx solid #ff5723;
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
	background-color: #ff5723;
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
	color: #ff5723;
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
	color: #45b1ff;
}

.icon-weixin {
	color: #59f04c;
}

.dui-fixed-bottom-tip {
	font-size: 24upx;
	margin-top: -30upx;
}
</style>
