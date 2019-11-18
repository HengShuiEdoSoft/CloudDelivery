<template>
	<view class="content cardetail-content">
		<swiper>
			<swiper-item v-for="(item, index) in car.car_images" :key="index" class="ui-cardetail-item"><image :src="item"></image></swiper-item>
		</swiper>
		<view class="ui-cardetail-container">
			<view class="ui-cardetail-title">载货空间及重量</view>
			<view class="ui-cardetail-body">
				<text class="ui-dot"></text>
				<text>{{ '载货空间' + car.car_cargo_volume + '方，载重' + car.car_load + '公斤' }}</text>
			</view>
		</view>
		<view class="ui-cardetail-container">
			<view class="ui-cardetail-title">用车参考</view>
			<view class="ui-cardetail-body">
				<parser :html="car.car_reference"></parser>
			</view>
		</view>
	</view>
</template>

<script>
import parser from '@/components/jyf-Parser/index';
export default {
	components: {
		parser
	},
	data() {
		return {
			id: 0,
			carsInfos: [],
			car: {},
			car_refererances:''
		};
	},
	async onLoad(options) {
		this.id = parseInt(options.id);
		let that = this;
		that.carsInfos = await that.$drmking.getCarInfos(that);
		if (!that.$drmking.isEmpty(that.carsInfos) && that.carsInfos[that.id]) {
			that.car = that.carsInfos[that.id];
			let title = that.car.car_title + '详情页';
			uni.setNavigationBarTitle({ title: title });
			return;
		}
	},
	methods: {}
};
</script>

<style>
.content.cardetail-content {
	background: #fff;
}
.ui-cardetail-container {
	padding: 30upx 60upx;
}
.ui-cardetail-title {
	margin: 15px 0;
	padding-left: 12px;
	font-size: 18px;
	font-weight: 600;
	line-height: 1;
	border-left: 3px solid #ff5723;
}
.ui-cardetail-body {
	padding-left: 15px;
	font-size: 14px;
	line-height: 34px;
	color: #666;
}
.ui-dot {
	display: inline-block;
	margin-right: 10px;
	vertical-align: middle;
	width: 4px;
	height: 4px;
	background: #ddd;
}
swiper {
	height: 527upx;
}
.ui-cardetail-item {
	width: 100%;
}
.ui-cardetail-item image {
	width: 100%;
	height: 527upx;
}
</style>
