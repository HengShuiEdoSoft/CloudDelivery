<template>
	<view class="content" v-if="order!==null">
		<view class="ui-orderdetail-cont ui-orderdetail-top" v-if="order.status===1">
			<image src="/static/img/HeadImg.jpg" class="ui-od-portrait"></image>
			<view>正在通知附近的司机...</view>
		</view>
		<view class="ui-orderdetail-cont ui-orderdetail-top" v-if="order.status===2||order.status===3||order.status===4||order.status===5">
			<image src="/static/img/HeadImg.jpg" class="ui-od-portrait"></image>
			<view>{{ order.dname }}</view>
		</view>
		<view v-if="order.status==0" class="ui-orderdetail-cont">
			<!-- <view @tap="quitOrder(order.order_id)" class="ui-order-pay-btn">取消订单</view> -->
			<view @tap="togglePopup" class="ui-order-pay-btn-b">去支付</view>
		</view>
		<view v-if="order.status==1" class="ui-orderdetail-cont">
			<view @tap="quitOrder(order.order_id)" class="ui-order-pay-btn">取消订单</view>
		</view>
		<view v-if="order.status==2" class="ui-orderdetail-cont">
			<navigator :url="'/pages/placeorder/sending?dname='+order.dname+'&phone='+order.dphone+'&ocode='+order.ocode" class="ui-order-pay-btn">货物追踪</navigator>
			<view @tap="quitOrder(order.order_id)" class="ui-order-pay-btn">取消订单</view>
			<view @tap="call" class="ui-order-pay-btn-b">呼叫司机</view>
			<view @tap="makecall" class="ui-order-pay-btn-b">投诉</view>
		</view>
		<view v-if="order.status==3" class="ui-orderdetail-cont">
			<navigator :url="'/pages/placeorder/sending?dname='+order.dname+'&phone='+order.dphone+'&ocode='+order.ocode" class="ui-order-pay-btn">货物追踪</navigator>
			<view @tap="call" class="ui-order-pay-btn-b">呼叫司机</view>
			<view @tap="makecall" class="ui-order-pay-btn-b">投诉</view>
		</view>
		<view class="ui-orderdetail-cont">
			<view v-if="order.status==0||order.status==1" class="ui-orderdetail-date">
				<view class="ui-od-date">发布时间：{{ order.create_time }}</view>
			</view>
			<view v-if="order.status==2" class="ui-orderdetail-date">				
				<view class="ui-od-date">接单时间：{{ order.driver_time }}</view>
			</view>
			<view v-if="order.status==3" class="ui-orderdetail-date">
				<view class="ui-od-date">到达时间：{{order.arrives_time }}</view>
			</view>
			<view v-if="order.status==4||order.status==5" class="ui-orderdetail-date">
				<view class="ui-od-date">完成时间：{{ order.sure_time }}</view>
			</view>
			<view class="ui-orderdetail-date">
				<view class="ui-od-date">订单号：{{ order.ocode }}</view>
			</view>
			<view class="ui-divide-line"></view>
			<view class="ui-order-timeline-container">
				<view class="ui-order-timeline uni-timeline">
					<view class="uni-timeline-item uni-timeline-first-item">
						<view class="uni-timeline-item-divider"></view>
						<view class="uni-timeline-item-content">
							<text class="ui-address">{{ order.order_details_json.trip.departure.localtion }}{{ order.order_details_json.trip.departure.address }}</text>
						</view>
					</view>
					<view class="uni-timeline-item" v-for="(passbyitem, index) in order.order_details_json.trip.transfer" :key="index">
						<view class="uni-timeline-item-divider"></view>
						<view class="uni-timeline-item-content">
							<text class="ui-address">{{ passbyitem.localtion }}{{ passbyitem.address }}</text>
						</view>
					</view>
					<view class="uni-timeline-item uni-timeline-last-item">
						<view class="uni-timeline-item-divider"></view>
						<view class="uni-timeline-item-content">
							<text class="ui-address">{{ order.order_details_json.trip.destination.localtion }}{{ order.order_details_json.trip.destination.address }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ui-orderdetail-cont">
			<view class="ui-od-info-item">
				<view class="ui-od-info-left">订单车型</view>
				<view class="ui-od-info-right">{{ order.car }}</view>
			</view>
			<view class="ui-od-info-item" v-for="(item, index) in order.attach" :key="item.attach_id">
				<view class="ui-od-info-left">额外需求</view>
				<view class="ui-od-info-right">{{ item.attach_title }}</view>
			</view>
			<view class="ui-od-info-item">
				<view class="ui-od-info-left">备注</view>
				<view class="ui-od-info-right">{{ order.order_details_json.remark }}</view>
			</view>
			<view class="ui-od-info-item">
				<view class="ui-od-info-left">联系人</view>
				<view class="ui-od-info-right">{{ order.order_details_json.contact }}</view>
			</view>
		</view>
		<view class="ui-orderdetail-cont">
			<view class="ui-od-price-list">
				<view class="ui-od-price-type">实付金额</view>
				<view class="ui-od-price-pay">￥{{ order.pay_order_price }}</view>
			</view>
			<view class="ui-od-price-list-b">
				<view class="ui-od-price-type">订单价格</view>
				<view class="ui-od-price-right">￥{{ order.order_price }}</view>
			</view>
			<view class="ui-od-price-list-b">
				<view class="ui-od-price-type">优惠券</view>
				<view class="ui-od-price-right">-￥{{ order.coupon_price }}</view>
			</view>
			<view class="ui-divide-line"></view>
			<view class="ui-tips">
				若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按
				<navigator url="/pages/setup/transportstandard">标准费用</navigator>
				结算。
			</view>
		</view>
		<uni-popup ref="pay" type="bottom" :custom="true" :mask-click="true">
			<view class="ui-pop-container">
				<view class="ui-cost-price">
					<text>￥</text>
					<text class="ui-price-now">{{ order.pay_order_price }}</text>
					<text class="ui-origin-price">￥{{ order.order_price }}</text>
				</view>
				<view>
					<view class="ui-tip1">选择支付方式</view>
					<view class="ui-list">
						<radio-group @change="radioChange">
							<label class="ui-list-item">
								<view class="ui-li-title">
									<view class="iconfont icon-zhanghuyue"></view>
									<view class="ui-paytype-name">
										<view>余额支付</view>
										<view class="ui-subtext">可用余额{{ user.wallet }}元</view>
									</view>
								</view>
								<view><radio value="syspay" color="#FF5723" /></view>
							</label>
							<label class="ui-list-item" v-for="item in items" :key="item.value">
								<view class="ui-li-title">
									<view :class="item.icon"></view>
									<view class="ui-paytype-name">
										<view>{{ item.name }}</view>
									</view>
								</view>
								<view><radio :value="item.value" color="#FF5723" /></view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="ui-home-btns"><view class="ui-use-now" @tap="gotopay">去支付</view></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	computed: mapState(['user','sysconfig']),
	components: {
		uniPopup
	},
	data() {
		return {
			ocode: '',
			order: null,
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
			pay_money: 0,
			pay_type: 1,
			pay_cate_id: 0,
			pay_platform: '',
			provider: 'alipay'
		};
	},
	onLoad(options) {
		this.ocode = options.ocode;
		this.getDetail();
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
	methods: {
		radioChange: function(e) {
			this.provider = e.detail.value;
		},
		call: function(e) {
			let that=this;
			uni.makePhoneCall({
				phoneNumber: that.order.dphone
			});
		},
		makecall:function(e) {
			let that=this;
			uni.makePhoneCall({
				phoneNumber: that.sysconfig.service_tel
			});
		},
		getDetail: function() {
			let that = this;
			const data = {
				ocode: that.ocode
			};
			that.$uniFly
				.post({
					url: '/api/order/getorder',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						res.data.order_details_json = JSON.parse(res.data.order_details_json);
						that.order = res.data;
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
		quitOrder(order_id){
			let that=this;
			const data = {
				order_id: order_id
			};
			that.$uniFly
				.post({
					url: '/api/order/cancelorder',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							title: '订单已取消',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						uni.navigateBack({
							delta:1
						});
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
		async togglePopup() {
			this.$refs['pay'].open();
		},
		gotopay: function() {
			this.addpaylog();
		},
		addpaylog() {
			let that = this;
			if (that.order.order_id > 0 && that.order.pay_order_price > 0) {
				uni.showLoading({
					title: '订单下单中...'
				});
				that.$uniFly
					.post({
						url: '/api/pay_log/addpaylog',
						params: {
							order_id: that.order.order_id,
							pay_type: that.pay_type,
							pay_money: that.order.pay_order_price
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							that.pay_log_id = res.data;
							that.pay();
						} else {
							uni.showModal({
								title: '订单下单失败，重新尝试？',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										that.addpaylog();
									} else if (res.cancel) {
										that.$refs['pay'].close();
										return;
									}
								}
							});
						}
					})
					.catch(err => {
						uni.showModal({
							title: '订单下单失败，重新尝试？',
							content: JSON.stringify(err),
							success: function(res) {
								if (res.confirm) {
									that.addpaylog();
								} else if (res.cancel) {
									that.$refs['pay'].close();
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
				that.$refs['pay'].close();
				return;
			}
		},
		pay() {
			let that = this;
			if (that.pay_log_id > 0) {
				uni.showLoading({
					title: '订单支付中...'
				});
				console.log({
							pay_log_id: that.pay_log_id,
							pay_platform: that.pay_platform,
							provider: that.provider,
							openid: that.user.minwxapp_id
						});
				that.$uniFly
					.post({
						url: '/api/pay_log/pay',
						params: {
							pay_log_id: that.pay_log_id,
							pay_platform: that.pay_platform,
							provider: that.provider,
							// openid: that.user.minwxapp_id
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							// 余额支付成功直接返回首页
							if (that.provider == 'syspay') {
								that.$store.commit('login', res.data.data);
								uni.showToast({
									icon: 'none',
									title: '订单支付完成！'
								});
								setTimeout(function() {
									uni.reLaunch({
										url: '/pages/index/index'
									});
								}, 1500);
							} else {
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
										console.log('fail:' + JSON.stringify(err));
										uni.showModal({
											title: '订单支付失败，重新尝试？',
											content: JSON.stringify(err),
											success: function(res) {
												if (res.confirm) {
													that.pay();
												} else if (res.cancel) {
													that.$refs['pay'].close();
													return;
												}
											}
										});
									}
								});
								// #endif
								// app支付
								// #ifdef APP-PLUS
								console.log(res.data);
								uni.requestPayment({
									provider: that.provider,
									orderInfo: res.data.data, //微信、支付宝订单数据
									success: function(res) {
										that.$drmking.paySure(that,pay_log_id,'/pages/index/index');
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
										uni.showModal({
											title: '订单支付失败，重新尝试？',
											content: JSON.stringify(err),
											success: function(res) {
												if (res.confirm) {
													that.pay();
												} else if (res.cancel) {
													that.$refs['pay'].close();
													return;
												}
											}
										});
									}
								});
								// #endif
							}
						} else {
							uni.showModal({
								title: '订单支付失败，重新尝试？',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										that.pay();
									} else if (res.cancel) {
										that.$refs['pay'].close();
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
									that.$refs['pay'].close();
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
				that.$refs['pay'].close();
				return;
			}
		}
	}
};
</script>

<style>
.ui-od-info-left {
	width: 64px;
}
.ui-tips {
	padding: 20upx 0;
	font-size: 12px;
	color: #999;
}
.ui-tips navigator {
	display: inline;
}
.ui-od-price-list {
	display: flex;
	line-height: 64upx;
}
.ui-order-pay-btn{
	display:inline-block;
	padding:0 20upx;
	margin:20upx 10upx 20upx 0;
	line-height: 80upx;
	border:1upx solid #FF5723;
	color:#FF5723;
	border-radius: 4px;
}
.ui-order-pay-btn-b{
	display:inline-block;
	padding:0 20upx;
	margin:20upx 10upx 20upx 0;
	line-height: 80upx;
	border:1upx solid #FF5723;
	color:#fff;
	background: #FF5723;
	border-radius: 4px;
}
.ui-home-btns {
	display: flex;
	color: #fff;
	font-size: 14px;
	text-align: center;
}
.ui-use-now {
	flex: 1;
	padding: 20upx 0;
	font-size: 20px;
	background: #ff5723;
}
.ui-order-container {
	margin: 16upx;
	padding: 0 20upx;
	font-size: 14px;
	line-height: 92upx;
	background: #fff;
}
.ui-pop-container {
	margin: 16upx;
	padding-top: 30upx;
	background: #fff;
	border-radius: 4px;
}
.ui-list {
	padding: 0 30upx 30upx;
	font-size: 14px;
	line-height: 84upx;
}
.ui-pop-container .ui-list .ui-list-item {
	height: 96upx;
}
.ui-list .iconfont {
	display: inline-block;
	vertical-align: top;
	font-size: 32px;
}
.icon-zhanghuyue {
	color: #ff5723;
}
.icon-z-alipay {
	color: #45b1ff;
}
.icon-weixin {
	color: #59f04c;
}
.ui-paytype-name {
	display: inline-block;
}
.ui-paytype-name > view {
	line-height: 42upx;
}
.ui-paytype-name .ui-subtext {
	color: #999;
	font-size: 12px;
}
radio {
	transform: scale(0.7);
}
.ui-pop-container .ui-tip1 {
	padding-bottom: 30upx;
}
.ui-li-youhui {
	display: flex;
	padding: 20upx 30upx;
	font-size: 14px;
}
.ui-li-youhui .ui-li-title {
	color: #999;
}
.ui-remark-item {
	margin: 8upx;
	line-height: 48upx;
	padding: 8upx 24upx;
	background: #eee;
	border-radius: 36px;
}
.ui-remark-item.active {
	color: #ff9801;
	background: #faf6db;
}
.ui-tip1 {
	padding: 16upx 30upx 0;
	color: #999;
	font-size: 14px;
}
.ui-li-title {
	flex: 1;
	color: #333;
}
.ui-li-right {
	color: #999;
}
.ui-list-item {
	display: flex;
}
.ui-pop-container .ui-tip1 {
	padding-bottom: 30upx;
}
 .iconfont {
	padding-right: 28upx;
}
	.dui-notice-driver {
		width: 100%;
		box-sizing: border-box;
		padding:20upx 30upx;
		border-top:1upx solid #e2e2e2;
		background-color: #fff;
		color: #999;
	}

	.dui-notice-body {
		font-size: 30upx;
		line-height: 50upx;
	}

	.dui-notice-body text {
		margin-right: 35upx;
	}

	.dui-notice-body text text {
		color: #FF9801;
		font-weight: 800;
	}

	.dui-btn-bottom {
		display: flex;
		align-items: center;
		width: 100%;
		height: 12vh;
		padding: 0 20upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.dui-btn-bottom button {
		width: 100%;
		background-color: #FF5723;
	}
</style>
