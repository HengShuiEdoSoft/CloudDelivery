<template>
	<view class="content">
		<view class="ui-tip1">下单人资料</view>
		<view class="ui-order-container">
			<view class="ui-list-item">
				<text class="iconfont icon-rili"></text>
				<text>{{ date }}</text>
			</view>
			<view class="ui-list-item">
				<text class="iconfont icon-dianhua"></text>
				<input placeholder="18888888888" :value="order.phone" @blur="setPhone" />
			</view>
		</view>
		<view class="ui-order-container">
			<navigator class="ui-list-item" url="/pages/order/requirement">
				<view class="ui-li-title">额外需求</view>
				<view class="ui-li-right">
					{{ order_attach_des ? order_attach_des : '无' }}
					<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
				</view>
			</navigator>
			<view>
				<navigator class="ui-list-item" url="/pages/order/remark">
					<view class="ui-li-title">订单备注</view>
					<view class="ui-li-right">
						{{ order.remark ? order.remark : '' }}
						<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
					</view>
				</navigator>
				<view class="ui-list-item">
					<view class="ui-remark-item" @tap="isone(1)" :class="{ active: isOne === 1 }">1人跟车</view>
					<view class="ui-remark-item" @tap="isone(2)" :class="{ active: isOne === 2 }">2人跟车</view>
				</view>
			</view>
		</view>
		<view class="ui-order-container ui-list-item">
			<view class="ui-li-title">优先发送订单给我的司机</view>
			<view><switch @change="switchChange" /></view>
		</view>
		<view class="ui-tip">
			若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按
			<navigator>标准费用</navigator>
			结算。
		</view>
		<view class="ui-tip">
			<text></text>
			我已阅读并同意
			<navigator>《货物托运居间协议》</navigator>
		</view>
		<view class="ui-home-bottom">
			<view class="ui-home-price-container">
				<view class="ui-cost-price">
					<text>￥</text>
					<text class="ui-price-now">{{ order.pay_order_price }}</text>
					<text class="ui-origin-price">￥{{ order.order_price }}</text>
					<view class="ui-home-discount">
						优惠券已折扣
						<text>{{ order.coupon_price }}元</text>
					</view>
				</view>
				<navigator class="ui-price-detail" url="/pages/pricedetail/pricedetail">价格明细</navigator>
			</view>
			<view class="ui-home-btns"><view class="ui-use-now" @tap="togglePopup">下一步</view></view>
		</view>
		<uni-popup ref="pay" type="bottom" :custom="true" :mask-click="true">
			<view class="ui-pop-container">
				<view class="ui-cost-price">
					<text>￥</text>
					<text class="ui-price-now">{{ order.pay_order_price }}</text>
					<text class="ui-origin-price">￥{{ order.order_price }}</text>
				</view>
				<view class="ui-li-youhui" @tap="couponSelect">
					<view class="ui-li-title">{{ order.user_coupon_id > 0 ? order.coupon_title : '点击选择优惠券' }}</view>
					<view class="ui-li-right">
						更多
						<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
					</view>
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
	computed: mapState(['sysconfig', 'order', 'user']),
	components: {
		uniPopup
	},
	data() {
		return {
			// 支付平台
			provider: '',
			// 支付目标 0=>'钱包充值',1=>'订单支付'
			pay_type: 1,
			// 支付金额
			pay_money: 0,
			// 订单id
			order_id: 0,
			// 支付订单id
			pay_log_id: 0,

			isOne: 0,
			order_is_now: false,
			order_user_driver_favorites: false,
			order_car_time: null,
			order_attach_des: '',
			date: null,
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
			]
		};
	},
	onLoad(options) {
		let that = this;
		// #ifdef MP-WEIXIN
		that.pay_platform = 'miniapp';
		// #endif

		// #ifdef APP-PLUS
		that.pay_platform = 'app';
		// #endif
		
		if (that.$drmking.isEmpty(that.order.contact)) {
			that.order.contact = that.user.realname;
		}
		if (!that.$drmking.isPhone(that.order.phone)) {
			that.order.phone = that.user.phone;
		}
		let des = [];
		for (let i = 0; i < that.order.attach.length; i++) {
			if (that.order.attach[i].status) {
				des.push(that.order.attach[i].attach_title);
			}
		}
		that.order_attach_des = des.join('、');
		that.$fire.on('order_attach_des', function(data) {
			if (data.is_change) {
				let des = [];
				for (let i = 0; i < that.order.attach.length; i++) {
					if (data.attach_index.indexOf(i.toString()) !== -1) {
						that.order.attach[i].status = true;
						des.push(that.order.attach[i].attach_title);
					} else {
						that.order.attach[i].status = false;
					}
				}
				that.$store.commit('set_order_attach', that.order.attach);
				that.order_attach_des = des.join('、');
			}
		});
		that.$fire.on('order_remark', function(data) {
			that.$store.commit('set_order_remark', data);
		});
		that.$fire.on('order_coupon', function(data) {
			that.$store.commit('sure_order', data);
		});
		this.order_car_time = parseInt(options.time);
		let date = new Date(this.order_car_time);
		this.date = date.Format('MM月dd日 hh:mm');
		this.order_car_time = date.Format('yyyy-MM-dd hh:mm:ss');
		this.order_is_now = options.is_now;
	},
	methods: {
		setPhone(e) {
			this.order.phone = e.detail.value;
		},
		switchChange: function(e) {
			this.order.user_driver_favorites = e.target.value;
		},
		radioChange: function(e) {
			this.provider = e.detail.value;
		},
		couponSelect: function() {
			uni.navigateTo({
				url: '/pages/mymoney/mycoupon-select'
			});
		},
		// 下一步，去支付
		async togglePopup() {
			let that = this;
			if (that.$drmking.isEmpty(that.order_car_time)) {
				uni.showToast({
					icon: 'none',
					title: '用车时间已失效，请返回重选！'
				});
				return;
			}
			if (!that.$drmking.isPhone(that.order.phone)) {
				uni.showToast({
					icon: 'none',
					title: '联系手机号不正确！'
				});
				return;
			}
			this.$refs['pay'].open();
		},
		gotopay() {
			let that = this;
			let attach = [];
			if (that.order.attach.length > 0) {
				for (let i = 0; i < that.order.attach.length; i++) {
					let row = that.order.attach[i];
					if (row.status) {
						attach.push({
							attach_id: row.attach_id,
							attach_title: row.attach_title,
							attach_type: row.attach_type,
							attach_price: row.attach_price,
							attach_price_rate: row.attach_price_rate,
							attach_remark: row.attach_remark
						});
					}
				}
			}
			let order_details_json = {
				city_id: that.order.city_id,
				city_title: that.order.city_title,
				car_id: that.order.car_id,
				car_title: that.order.car_title,
				is_now: that.order_is_now,
				user_driver_favorites: that.order_user_driver_favorites,
				car_time: that.order_car_time,
				contact: that.user.realname,
				phone: that.order.phone,
				user_coupon_id: that.order.user_coupon_id,
				coupon_price: that.order.coupon_price,
				order_price: that.order.order_price,
				pay_order_price: that.order.pay_order_price,
				distance: that.order.distance,
				remark: that.order.remark + (that.isOne > 0 ? ';' + String(that.isOne) + '人跟车' : ''),
				attach: attach,
				trip: {
					departure: that.order.trip.departure,
					transfer: that.order.trip.transfer,
					destination: that.order.trip.destination
				}
			};

			if (order_details_json.pay_order_price > 0) {
				uni.showLoading({
					title: '订单提交中...'
				});
				that.$uniFly
					.post({
						url: '/api/order/addorder',
						params: {
							order_details_json: JSON.stringify(order_details_json)
						}
					})
					.then(res => {
						if (res.code == 0) {
							that.order_id = res.data.order_id;
							that.pay_money = res.data.pay_order_price;
							that.addpaylog();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: err
						});
					});
			} else {
				uni.showToast({
					icon: 'none',
					title: '订单金额不能为0'
				});
				that.$refs['pay'].close();
				return;
			}
		},
		addpaylog() {
			let that = this;
			if (that.order_id > 0 && that.pay_money > 0) {
				uni.showLoading({
					title: '订单下单中...'
				});
				that.$uniFly
					.post({
						url: '/api/pay_log/addpaylog',
						params: {
							order_id: that.order_id,
							pay_type: that.pay_type,
							pay_money: that.pay_money
						}
					})
					.then(res => {
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
						if (res.code == 0) {
							uni.showToast({
								icon:'none',
								title:'订单支付完成！'
							});
							setTimeout(function() {
								uni.navigateTo({
									url:'/pages/index/index'
								});
							}, 500);
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
		isone: function(index) {
			this.isOne = index;
		}
	}
};
</script>

<style>
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
.ui-tip1 {
	padding: 16upx 30upx 0;
	color: #999;
	font-size: 14px;
}
.ui-tip {
	padding: 16upx 30upx 0;
	font-size: 12px;
}
.ui-tip navigator {
	display: inline;
	color: #ff5723;
}
.ui-list-item {
	display: flex;
}
.iconfont {
	padding-right: 28upx;
}
input {
	font-size: 14px;
	height: 92upx;
	line-height: 92upx;
}
.ui-li-title {
	flex: 1;
	color: #333;
}
.ui-li-right {
	color: #999;
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
</style>
