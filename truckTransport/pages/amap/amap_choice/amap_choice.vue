<template>
	<view class="content">
		<view class="map_box">
			<view class="status_bar"></view>
			<view class="search_input">
				<view class="navigateback" @tap="navigateback"><uni-icons type="arrowleft" size="26"></uni-icons></view>
				<view class="search_input_input_box" @tap="goSearchAddressList">
					<input class="uni-input" :disabled="true" placeholder="从哪儿发货" :value="address_info.localtion" />
				</view>
				<view class="search_input_city_box" @tap="goCitySelect">
					{{ address_info.city }}
					<uni-icons type="arrowdown" size="10"></uni-icons>
				</view>
			</view>
			<map
				id="amap"
				:show-location="true"
				:longitude="address_info.longitude"
				:latitude="address_info.latitude"
				scale="16"
				:markers="markers"
				:polyline="polyline"
				@regionchange="regionchange"
				@tap="setLocation"
			></map>
			<view class="ui-select-container">
				<view class="input-group">
					<view class="input-row border">
						<text class="title iconfont icon-qiyeyuanquwuye"></text>
						<input type="text" focus :value="address_info.address" placeholder="楼层及门牌号" class="m-input" />
					</view>
					<view class="input-row border">
						<view class="input-row-b">
							<text class="title iconfont icon-yonghu"></text>
							<input type="text" focus :value="address_info.contact" placeholder="联系人" class="m-input" />
						</view>
						<view class=" input-row-b">
							<text class="title iconfont icon-dianhua"></text>
							<input type="text" focus :value="address_info.address_phone" placeholder="联系电话" class="m-input" />
						</view>
					</view>
				</view>
				<view class="btn-row"><button class="primary" type="primary" @tap="sure">选择出发地</button></view>
			</view>
		</view>
	</view>
</template>

<script>
let amap = require('@/common/amap.js');
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
	components: { uniIcons },
	data() {
		return {
			status: 1,
			address_info: {
				city: '衡水市',
				latitude: '39.90816',
				longitude: '116.434446',
				localtion: '冀州市',
				address: '',
				contact: '',
				address_phone: ''
			},
			markers: [
				{
					iconPath: '/static/amap/marker.png',
					id: 0,
					latitude: '',
					longitude: '',
					width: 23,
					height: 33,
					title: ''
				}
			],
			polyline: [],
			map: null
		};
	},
	onLoad(options) {
		let that = this;
		if (options.status) {
			that.status = options.status;
		}
		if (options.address_info) {
			that.address_info = options.address_info;
		}
		that.map = uni.createMapContext('amap', that);
		that.$fire.on('setAmapLocation', function(item) {
			let location = item.location.split(',');
			that.setMarker(0, location[0], location[1], item.district + item.address + item.name);
			that.setMapLocation(location[0], location[1]);
		});
		that.$fire.on('amapSelectCity', function(city) {
			that.address_info.city = city;
		});
	},
	methods: {
		setMarker(index, lon, lat, title) {
			this.$set(this.markers[index], 'longitude', lon);
			this.$set(this.markers[index], 'latitude', lat);
			this.$set(this.markers[index], 'title', title);
		},
		setMapLocation(lon,lat){
			this.$set(this.address_info, 'longitude', lon);
			this.$set(this.address_info, 'latitude', lat);
		},
		navigateback() {
			uni.navigateBack({
				delta: 1
			});
		},
		goSearchAddressList() {
			uni.navigateTo({
				url: '/pages/amap/search_address_list/search_address_list?city=' + this.city
			});
		},
		// 切换城市
		goCitySelect() {
			uni.navigateTo({
				url: '/pages/cityselect/cityselect?city=' + this.city + '&status=' + this.status + '&channel=amapSelectCity'
			});
		},
		setLocation(e) {
			console.log(e);
		},

		regionchange(e) {
			let that = this;
			that.map.getCenterLocation({
				success(res) {
					that.$set(that.markers[0], 'longitude', res.longitude);
					that.$set(that.markers[0], 'latitude', res.latitude);
					console.log(res);
					// amap.getRegeo()
					// 	.then(res => {
					// 		console.log(res);
					// 	})
					// 	.catch(err => {
					// 		console.log(err);
					// 	});
				},
				fail(err) {
					console.log(err);
				}
			});
		}
	}
};
</script>

<style>
.search_input {
	width: 100vw;
	display: flex;
	flex-direction: row;
	z-index: 999;
	height: 96rpx;
	overflow: hidden;
	background-color: #fff;
	align-items: center;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.search_input_city_box {
}
.map_box {
}
#amap {
	width: 100vw;
	height: calc(100vh - 482rpx - var(--status-bar-height));
}

.input-row .title {
	width: 56upx;
}
.ui-select-container {
	width: 100vw;
	height: 386upx;
	background: #fff;
}
.btn-row {
	margin-left: 10upx;
	margin-right: 10upx;
}
.m-input {
	flex: 1;
	padding: 26upx 0;
	width: 100%;
}
.input-group {
	margin-top: 20upx;
	padding: 0 20upx;
}
.input-row-b {
	display: flex;
	width: 50%;
}
</style>
