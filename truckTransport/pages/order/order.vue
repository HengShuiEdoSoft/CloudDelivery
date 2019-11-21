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
			<view class="ui-home-btns"><view class="ui-use-now" @tap="togglePopup('bottom', 'pay')">下一步</view></view>
		</view>
		<uni-popup ref="pay" :type="type" :custom="true" :mask-click="true">
			<view class="ui-pop-container">
				<view class="ui-cost-price">
					<text>￥</text>
					<text class="ui-price-now">{{ order.pay_order_price }}</text>
					<text class="ui-origin-price">￥{{ order.order_price }}</text>
				</view>
				<view class="ui-li-youhui" @tap="couponSelect">
					<view class="ui-li-title">点击选择优惠券</view>
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
										<view class="ui-subtext">可用余额0.00元</view>
									</view>
								</view>
								<view><radio value="1" :checked="true" color="#FF5723" /></view>
							</label>
							<label class="ui-list-item" v-for="(item, index) in items" :key="item.value">
								<view class="ui-li-title">
									<view :class="item.icon"></view>
									<view class="ui-paytype-name">
										<view>{{ item.name }}</view>
									</view>
								</view>
								<view><radio :value="item.value" :checked="index === current" color="#FF5723" /></view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="ui-home-btns"><view class="ui-use-now" @tap="gotopay(pay)">去支付</view></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	computed: mapState(['sysconfig', 'order']),
	components: {
		uniPopup
	},
	data() {
		return {
			type: '',
			isOne: 0,
			current: null,
			order_is_now: false,
			order_user_driver_favorites: false,
			order_car_time: null,
			order_attach_des: '',
			date: null,
			items: [
				{
					name: '支付宝',
					value: '2',
					icon: 'iconfont icon-z-alipay'
				},
				{
					name: '微信',
					value: '3',
					icon: 'iconfont icon-weixin'
				}
			]
		};
	},
	onLoad(options) {
		let that = this;
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
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		couponSelect:function(){
			//onfire
			this.$fire.on(couponSelect,function(data){
				
			});
			uni.navigateTo({
				url:'/pages/mymoney/mycoupon-select'
			})
		},
		// 下一步，去支付
		async togglePopup(type, open) {
			this.type = type;
			this.$refs[open].open();
		},
		cancel(type) {
			this.$refs[type].close();
		},
		gotopay(type) {
			this.cancel(type);
			//支付
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
