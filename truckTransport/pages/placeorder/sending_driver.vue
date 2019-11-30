<template>
	<view class="content">
		<view class="dui-notice-driver">
			<view class="dui-notice-body">
				<text>正在通知附近的司机 </text>
				<text>已等待: <text>256分28秒</text></text>
			</view>
			<view class="dui-notice-body">
				<text>中货车</text>
			</view>
		</view>
		<map id="amap" :show-location="true" :longitude="address_info.longitude" :latitude="address_info.latitude" scale="18"
		 :markers="markers" :polyline="polyline" @regionchange="regionchange"></map>
		<view class="dui-btn-bottom">
			<button type="primary">加小费</button>
		</view>
	</view>
</template>

<script>
	let amap = require('@/common/amap.js');
	export default {
		data() {
			return {
				channel: 'setTrip',
				status: 1,
				is_destination: false,
				transfer_index: 0,
				init_flag: false,
				address_info: {
					city: '',
					latitude: '',
					longitude: '',
					localtion: '',
					address: '',
					contact: '',
					phone: ''
				},
				markers: [{
					iconPath: '/static/amap/marker.png',
					id: 0,
					latitude: '',
					longitude: '',
					width: 23,
					height: 33,
					title: '',
					callout: {
						content: '',
						color: '#000',
						bgColor: '#fff',
						display: 'ALWAYS',
						textAlign: 'center'
					}
				}],
				polyline: [],
				map: null
			};
		},
		onLoad(options) {
			let that = this;
			that.map = uni.createMapContext('amap', that);
			if (options.channel) {
				that.channel = options.channel;
			}
			if (options.status) {
				that.status = parseInt(options.status);
			}
			if (options.is_destination) {
				that.is_destination = Boolean(options.is_destination);
			}
			if (options.transfer_index) {
				that.transfer_index = parseInt(options.transfer_index);
			}
			if (options.address_info) {
				that.address_info = options.address_info;
			} else {
				amap.getRegeo()
					.then(res => {
						let info = res[0];
						that.setMapLocation(info.longitude, info.latitude);
					})
					.catch(err => {
						console.log(err);
					});
			}
			that.$fire.on('setAmapLocation', function(item) {
				let location = item.location.split(',');
				let lon = location[0];
				let lat = location[1];
				that.setMapLocation(lon, lat);
			});
			that.$fire.on('amapSelectCity', function(city) {
				that.setMapCity(city.city_title);
				that.$set(that.address_info, 'localtion', '');
			});
		},
		methods: {
			// 设置地图标记点和搜索框标题
			setMarker(index, lon, lat, title) {
				this.$set(this.markers[index], 'longitude', lon);
				this.$set(this.markers[index], 'latitude', lat);
				this.$set(this.markers[index], 'title', title);
				this.$set(this.markers[index].callout, 'content', title);
				this.$set(this.address_info, 'localtion', title);
			},
			// 设置地图中心位置
			setMapLocation(lon, lat) {
				this.$set(this.address_info, 'longitude', lon);
				this.$set(this.address_info, 'latitude', lat);
			},
			// 设置地图城市信息
			setMapCity(city) {
				this.$set(this.address_info, 'city', city);
			},
			navigateback() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 地图移动确定地图中心点
			regionchange(e) {
				let that = this;
				that.map.getCenterLocation({
					success(res) {
						if (that.init_flag == false) {
							that.init_flag = true;
						} else {
							amap.getRegeo(res.longitude + ',' + res.latitude)
								.then(res => {
									let info = res[0];
									let addressComponent = info.regeocodeData.addressComponent;
									that.setMapCity(addressComponent.city, addressComponent.citycode);
									that.setMapLocation(info.longitude, info.latitude);
									if (info.regeocodeData.aois.length > 0) {
										that.setMarker(0, info.longitude, info.latitude, addressComponent.district + info.regeocodeData.aois[0].name);
									} else {
										that.setMarker(0, info.longitude, info.latitude, addressComponent.district + info.regeocodeData.addressComponent
											.township);
									}
								})
								.catch(err => {
									console.log(err);
								});
						}
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
	#amap {
		width: 100vw;
		height: calc(88vh - 141upx);
	}

	.dui-notice-driver {
		width: 100%;
		box-sizing: border-box;
		padding:20upx 30upx;
		border-top:1upx solid #e2e2e2;
		background-color: #fff;
		color: #999;
	}

	.dui-notice-body {
		font-size: 30upx;
		line-height: 50upx;
	}

	.dui-notice-body text {
		margin-right: 35upx;
	}

	.dui-notice-body text text {
		color: #FF9801;
		font-weight: 800;
	}

	.dui-btn-bottom {
		display: flex;
		align-items: center;
		width: 100%;
		height: 12vh;
		padding: 0 20upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.dui-btn-bottom button {
		width: 100%;
		background-color: #FF5723;
	}
</style>
