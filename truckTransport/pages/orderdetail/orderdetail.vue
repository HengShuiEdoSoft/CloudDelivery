<template>
	<view class="content" v-if="order!==null">
		<view class="ui-orderdetail-cont ui-orderdetail-top">
			<image src="../../static/img/HeadImg.jpg" class="ui-od-portrait"></image>
			<view>{{ order.dname }}</view>
		</view>
		<view class="ui-orderdetail-cont">
			<view class="ui-orderdetail-date">
				<view class="ui-od-date">{{ order.sure_time }}</view>
				<view class="ui-od-ordernumber">订单号:{{ order.ocode }}</view>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			ocode: '',
			order: null
		};
	},
	onLoad(options) {
		this.ocode = options.ocode;
		this.getDetail();
	},
	methods: {
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
						content: error,
						showCancel: false
					});
				});
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
</style>
