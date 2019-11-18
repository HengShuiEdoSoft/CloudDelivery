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
				<input placeholder="18709886268" value="18709886268" />
			</view>
		</view>
		<view class="ui-order-container">
			<navigator class="ui-list-item" url="/pages/order/requirement">
				<view class="ui-li-title">额外需求</view>
				<view class="ui-li-right">
					是否需要搬运、返程等服务
					<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
				</view>
			</navigator>
			<view>
				<view class="ui-list-item">
					<view class="ui-li-title">订单备注</view>
					<view class="ui-li-right">
						如货物类别等
						<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
					</view>
				</view>
				<view class="ui-list-item">
					<view>1人跟车</view>
					<view>2人跟车</view>
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
					<text class="ui-price-now">20</text>
					<text class="ui-origin-price">￥35</text>
					<view class="ui-home-discount">
						优惠券已折扣
						<text>8元</text>
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
					<text class="ui-price-now">20</text>
					<text class="ui-origin-price">￥35</text>
				</view>
				<view class="ui-li-youhui">
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
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			type: '',
			current: null,
			is_now: false,
			car_time: null,
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
		this.car_time = parseInt(options.time);
		let date = new Date(this.car_time);
		this.date = date.Format('MM月dd日 hh:mm');
		this.car_time=date.Format('yyyy-MM-dd hh:mm:ss');
		this.is_now = options.is_now;
	},
	methods: {
		switchChange: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value);
		},
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		togglePopup(type, open) {
			this.type = type;
			this.$refs[open].open();
		},
		cancel(type) {
			this.$refs[type].close();
		},
		gotopay(type) {
			this.cancel(type);
			//支付
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
</style>
