<template>
	<view class="content">
		<navigator class="ui-top-city-select" :url="'/pages/cityselect/cityselect?city=' + city_title + '&status=1&channel=changeCityPrice'">
			当前城市：{{ city_title }}
			<text>切换</text>
		</navigator>
		<view>
			<swiper indicator-dots="true" @change="swiperChange" :current="current">
				<swiper-item class="ui-tsci-item" v-for="(item, index) in cars_list" :key="item.car_id">
					<view class="ui-tsci-body">
						<view class="ui-tsci-title">{{ item.car_title }}</view>
						<view><image :src="item.car_icon" class="ui-tsci-image"></image></view>
						<view class="ui-carinfo-cont">
							<view>
								<view class="ui-subtext">载重</view>
								<view>{{ item.car_load }}公斤</view>
							</view>
							<view>
								<view class="ui-subtext">长宽高</view>
								<view>{{ item.car_lenght + '*' + item.car_width + '*' + item.car_height + '米' }}</view>
							</view>
							<view>
								<view class="ui-subtext">载货体积</view>
								<view>{{ item.car_cargo_volume }}方</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="ui-ts-container" v-if="cars_list.length>0">
			<view>
				<view class="ui-ts-title">基本路费</view>
				<view class="ui-ts-list">
					<view class="ui-ts-list-item" v-for="(item, index) in cars_list[current].base_price_json" :key="index">
						<view v-if="item.type == 's'">{{ '起步价(' + item.num + '公里)' }}</view>
						<view v-if="item.type == 's'">{{ item.price + '元' }}</view>
						<view v-if="item.type == 'm'">{{ '分段价(~' + item.num + '公里)' }}</view>
						<view v-if="item.type == 'm'">{{ item.price + '元/公里' }}</view>
						<view v-if="item.type == 'e'">{{ '分段价(' + item.num + '公里及以上)' }}</view>
						<view v-if="item.type == 'e'">{{ item.price + '元/公里' }}</view>
					</view>
				</view>
				<view class="ui-ts-title">附加服务</view>
				<view class="ui-ts-list">
					<view class="ui-ts-list-item" v-for="item in attach" :key="item.attach_id">
						<view v-if="item.attach_type === 0">{{ item.attach_title }}</view>
						<view v-if="item.attach_type === 0">{{ (parseFloat(item.attach_price) == 0 ? item.attach_remark : item.attach_price) + '元' }}</view>
						<view v-if="item.attach_type === 1">{{ item.attach_title }}</view>
						<view v-if="item.attach_type === 1">
							{{ (parseFloat(item.attach_price_rate) == 0 ? item.attach_remark : '订单总额的' + parseFloat(item.attach_price_rate) * 100) + '%' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ui-tip"></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
let amap = require('@/common/amap-wx.js');
export default {
	data() {
		return {
			current: 0,
			city_id: 0,
			city_title: '',
			cars_list: [],
			attach: []
		};
	},
	computed: mapState(['sysconfig']),
	onLoad(options) {
		let that = this;
		if (options.city_id) {
			that.city_id = parseInt(options.city_id);
		}
		if (that.$drmking.isEmpty(that.city_id)) {
			let default_city = that.$drmking.getDefaultCity();
			that.city_id = default_city.city_id;
			that.city_title = default_city.city_title;
		}
		that.getData();
	},
	onShow() {
		let that = this;
		this.$fire.on('changeCityPrice', function(data) {
			that.city_id = data.city_id;
			that.city_title = data.city_title;
			that.getData();
		});
	},
	methods: {
		swiperChange: function(e) {
			var index = e.target.current || e.detail.current;
			this.current = index;
		},
		async getData() {
			let that = this;
			that.attach = await that.$drmking.getAttachList(that);
			let car_infos = await that.$drmking.getCarInfos(that);
			let city_price = await that.$drmking.getCityPriceList(that, that.city_id);
			let cars_list=[];			
			for (let car_id in city_price) {
				let car = car_infos[car_id];
				car['base_price_json'] = city_price[car_id]['base_price_json'];
				cars_list.push(car);
			}
			that.cars_list=cars_list;
		}
	}
};
</script>

<style>
.content {
	font-size: 14px;
	background: #fff;
}
swiper {
	height: 680upx;
}
.ui-tsci-title {
	padding: 80upx 0 30upx;
	font-size: 24px;
	text-align: center;
}
.ui-tsci-body {
	text-align: center;
}
.ui-tsci-image {
	width: 572upx;
	height: 296upx;
}
.ui-subtext {
	font-size: 12px;
	color: #999;
}
.ui-carinfo-cont {
	display: flex;
	padding: 20upx 10%;
	text-align: center;
}
.ui-carinfo-cont > view {
	width: 33.3333%;
}
.ui-ts-container {
	padding: 0 30upx;
	line-height: 64upx;
}
.ui-ts-list-item:nth-child(2n + 1) {
	background: #f8f8f8;
}
.ui-ts-list-item {
	display: flex;
	color: #666;
	padding: 0 16upx;
}
.ui-ts-list-item > view {
	width: 50%;
}
.ui-top-city-select{text-align: center;}
</style>
