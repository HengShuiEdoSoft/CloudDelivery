<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index"
			 :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view class="scroll-container">
					<navigator url="/pages/order/orderdetail">
						<view class="ui-order-list-item ui-hujiao">
							<view class="dui-gap"></view>
							<view class="dui-gap"></view>
							<view class="ui-order-list-item-top"><text class="ui-orderno-color">20191010101012341456</text></view>
							<view class="ui-order-list-item-top"><text class="ui-cartype-color">09月20日 10:22</text></view>
							<view class="ui-order-list-item-top"><text>货物类型: <text class="ui-cartype-color">整车</text></text> </view>
							<view class="ui-divide-line"></view>
							<view class="ui-order-timeline-container">
								<view class="ui-order-timeline uni-timeline">
									<view class="uni-timeline-item uni-timeline-first-item">
										<view class="uni-timeline-item-divider"></view>
										<view class="uni-timeline-item-content">
											<text class="ui-address">衡水人民政府</text>
										</view>
									</view>
									<view class="uni-timeline-item uni-timeline-last-item">
										<view class="uni-timeline-item-divider"></view>
										<view class="uni-timeline-item-content">
											<text class="ui-address">怡然城</text>
										</view>
									</view>
								</view>
								<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
							</view>
							<view class="ui-divide-line"></view>
							<view class="dui-gap"></view>
							<view class="ui-od-price-list">
								<view class="ui-od-price-type">需要加急?</view>
								<view>否</view>
							</view>
						</view>
						<view class="ui-orderdetail-cont">
							<view class="ui-od-price-list">
								<view class="ui-od-price-type">客户已支付</view>
								<view class="ui-od-price-pay">￥23.09</view>
							</view>
						</view>
					</navigator>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container">
					<navigator url="/pages/order/photoupload">
						<view class="ui-order-list-item ui-daizhifu">
							<view class="dui-gap"></view>
							<view class="dui-gap"></view>
							<view class="ui-order-list-item-top"><text class="ui-orderno-color">20191010101012341456</text></view>
							<view class="ui-order-list-item-top"><text class="ui-cartype-color">09月20日 10:22</text></view>
							<view class="ui-order-list-item-top"><text>货物类型: <text class="ui-cartype-color">整车</text></text> </view>
							<view class="ui-divide-line"></view>
							<view class="ui-order-timeline-container">
								<view class="ui-order-timeline uni-timeline">
									<view class="uni-timeline-item uni-timeline-first-item">
										<view class="uni-timeline-item-divider"></view>
										<view class="uni-timeline-item-content">
											<text class="ui-address">衡水人民政府</text>
										</view>
									</view>
									<view class="uni-timeline-item uni-timeline-last-item">
										<view class="uni-timeline-item-divider"></view>
										<view class="uni-timeline-item-content">
											<text class="ui-address">怡然城</text>
										</view>
									</view>
								</view>
								<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
							</view>
							<view class="ui-divide-line"></view>
							<view class="dui-gap"></view>
							<view class="ui-od-price-list">
								<view class="ui-od-price-type">需要加急?</view>
								<view>否</view>
							</view>
						</view>
						<view class="ui-orderdetail-cont">
							<view class="ui-od-price-list">
								<view class="ui-od-price-type">客户已支付</view>
								<view class="ui-od-price-pay">￥23.09</view>
							</view>
						</view>
					</navigator>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view>3</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tab: [{
					name: "进行中",
				}, {
					name: "已完成",
				}, {
					name: "已取消",
				}]
			}
		},
		methods: {
			tabChange: function(e) {
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index;
			},
			swiperChange: function(e) {
				var index = e.target.current || e.detail.current;
				this.current = index;
			}
		}
	}
</script>

<style>
	.scroll-container {
		height: 100%;
	}
