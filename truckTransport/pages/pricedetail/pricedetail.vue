<template>
	<view class="content">
		<view class="status_bar"></view>
		<view class="nav-bar">
			<view class="nav-left" @tap="navBack"><text class="iconfont icon-shangyiyehoutuifanhui"></text></view>
			<view class="nav-center">价格明细</view>
			<view class="nav-right" @tap="navTo('/pages/setup/transportstandard')">收费标准</view>
		</view>
		<view class="ui-pli-container" style="padding: 40upx 80upx;">
			<text>￥</text>
			<text class="ui-total-price">{{ order.pay_order_price }}</text>
			<text>（总共{{ order.distance }}公里）</text>
		</view>

		<view class="ui-tip" style="padding: 40upx 80upx;">若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按标准费用结算。</view>
		<view class="ui-divide-line"></view>
		<view style="padding: 40upx 80upx;">
			<view class="ui-price-list-item" v-if="order.distance_price > 0">
				<view class="ui-pli-name">起步价（{{ order.car_title }}）</view>
				<view>￥{{ order.car_base_price_json[0]['price'] }}</view>
			</view>
			<view class="ui-price-list-item" v-if="order.distance_price > 0 && (order.distance - order.car_base_price_json[0]['num']) > 0">
				<view class="ui-pli-name">
					超出里程价（{{ order.distance - order.car_base_price_json[0]['num'] }}公里）
				</view>
				<view>￥{{ order.distance_price - order.car_base_price_json[0]['price'] }}</view>
			</view>
			<block v-for="(item, index) in order.attach" :key="index">
				<view class="ui-price-list-item" v-if="item.status == true">
					<view class="ui-pli-name">{{ item.attach_title }}</view>
					<view>￥{{ item.order_price }}</view>
				</view>
			</block>
			<view class="ui-price-list-item" v-if="order.user_coupon_id > 0">
				<view class="ui-pli-name">优惠券</view>
				<view>-￥{{ order.coupon_price }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['order']),
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		navTo: function(url) {
			uni.navigateTo({
				url: url
			});
		},
		navBack: function() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
	/*onNavigationBarButtonTap: function(e) {
		var index = e.index;
		if (index === 0) {
			uni.navigateTo({
				url: '/pages/setup/transportstandard'
			});
		}
	}*/
};
</script>

<style>
.content {
	background: #fff;
}
.content .ui-divide-line {
	padding: 0;
	margin: 0 80upx;
}
.ui-price-list-item {
	display: flex;
	font-size: 14px;
	line-height: 64upx;
}
.ui-pli-name {
	flex: 1;
}
.ui-total-price {
	font-size: 28px;
	font-weight: 600;
}
.ui-pli-container {
	text-align: center;
	font-size: 14px;
}
</style>
