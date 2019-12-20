<template>
	<view class="content">
		<view class="dui-driver-information">
			<view class="dui-driver-headimg"><image src="/static/img/HeadImg.jpg" mode=""></image></view>
			<view class="dui-driver-info">
				<view class="">{{ dname }}</view>
			</view>
		</view>
		<view class="dui-driver-contact">
			<view @tap="call">
				<text class="iconfont icon-dianhua"></text>
				呼叫司机
			</view>
			<!-- 			<view class="">
				<text class="iconfont icon-liaotianduihua"></text>
				聊天
			</view> -->
		</view>
		<map id="amap" :show-location="true" :longitude="lon" :latitude="lat" scale="18" :markers="markers" :polyline="polyline"></map>
	</view>
</template>

<script>
let amap = require('@/common/amap.js');
export default {
	onNavigationBarButtonTap: function(e) {
		let index = e.index;
		if (index === 0) {
			this.show = !this.show;
		}
	},
	data() {
		return {
			markers: [
				{
					iconPath: '/static/amap/huowu.png',
					id: 0,
					latitude: '',
					longitude: '',
					width: 23,
					height: 33,
					title: '货物当前位置',
					callout: {
						content: '货物当前位置',
						color: '#000',
						bgColor: '#fff',
						display: 'ALWAYS',
						textAlign: 'center'
					}
				}
			],
			polyline: [],
			map: null,
			show: false,
			ocode: '',
			dphone: '',
			dname: '',
			lat: 0,
			lon: 0
		};
	},
	onLoad(options) {
		let that = this;
		that.ocode = options.ocode;
		that.dphone = options.phone;
		that.dname = options.dname;
		that.getDetail();
		that.map = uni.createMapContext('amap', that);
	},
	methods: {
		call: function(e) {
			let that = this;
			uni.makePhoneCall({
				phoneNumber: that.dphone
			});
		},
		getDetail: function() {
			let that = this;
			const data = {
				ocode: that.ocode
			};
			that.$uniFly
				.post({
					url: '/api/order/getorderlocation',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						that.lon = res.data.lon;
						that.lat = res.data.lat;
						that.$set(that.markers[0], 'longitude', res.data.lon);
						that.$set(that.markers[0], 'latitude', res.data.lat);
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
		// 设置地图中心位置
		setMapLocation(lon, lat) {
			this.$set(this.address_info, 'longitude', lon);
			this.$set(this.address_info, 'latitude', lat);
		}
	}
};
</script>

<style>
#amap {
	width: 100vw;
	height: calc(100vh - 357upx);
}

cover-view {
	position: absolute;
	right: 20upx;
	width: 200upx;
	padding: 0 15upx;
	background-color: #424456;
	color: #e2e2e2;
	font-size: 28upx;
	text-align: center;
	line-height: 80upx;
}

.dui-cv-two {
	top: 80upx;
}

.dui-cv-three {
	top: 160upx;
}

.dui-cv-four {
	top: 238upx;
}

.dui-driver-information {
	display: flex;
	width: 100%;
	padding: 20upx 30upx;
	box-sizing: border-box;
	background-color: #fff;
	border-top: 1upx solid #e2e2e2;
}

.dui-driver-headimg {
	width: 120upx;
	height: 120upx;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 30upx;
}

.dui-driver-headimg image {
	width: 100%;
	height: 100%;
}

.dui-driver-info view {
	font-size: 26upx;
	color: #999;
}

.dui-driver-info view:first-child {
	font-size: 30upx;
	color: #212121;
}

.dui-driver-contact {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: #fff;
	border-top: 1upx solid #e2e2e2;
}

.dui-driver-contact view {
	flex: 1;
	text-align: center;
	line-height: 80upx;
	font-size: 26upx;
	color: #999;
}

.dui-driver-contact view:first-child {
	border-right: 1upx solid #e2e2e2;
}

.dui-driver-contact view text {
	font-size: 32upx;
	color: #212121;
	margin-right: 15upx;
}

.dui-price-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20upx;
	background-color: #fff;
}

.dui-price {
	font-size: 50upx;
	color: #ff5723;
}

.dui-price text:first-child {
	font-size: 30upx;
}

.dui-price-details {
	font-size: 30upx;
	color: #999;
}

.dui-price-details .iconfont {
	display: inline-block;
	transform: rotate(180deg);
}
</style>
