<template>
	<view class="content">
		<view class="map_box">
			<view class="status_bar"></view>
			<view class="search_input">
				<view class="navigateback" @tap="navigateback"><uni-icons type="arrowleft" size="26"></uni-icons></view>
				<view class="search_input_input_box" @tap="goSearchAddressList">
					<input class="uni-input" :disabled="true" placeholder="请输入地址" :value="address_info.localtion" />
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
				scale="18"
				:markers="markers"
				:polyline="polyline"
				@regionchange="regionchange"
			></map>
			<view class="ui-select-container">
				<view class="input-group">
					<view class="input-row border">
						<text class="title iconfont icon-qiyeyuanquwuye"></text>
						<input type="text" focus @input="setAddress" :value="address_info.address" placeholder="楼层及门牌号" class="m-input" />
					</view>
					<view class="input-row border">
						<view class="input-row-b">
							<text class="title iconfont icon-yonghu"></text>
							<input type="text" focus @input="setContact" :value="address_info.contact" placeholder="联系人" class="m-input" />
						</view>
						<view class=" input-row-b">
							<text class="title iconfont icon-dianhua"></text>
							<input type="text" focus @input="setPhone" :value="address_info.phone" placeholder="联系电话" class="m-input" />
						</view>
					</view>
				</view>
				<view class="btn-row"><button class="primary" type="primary" @tap="sure">确定</button></view>
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
			channel: 'setTrip',
			status: 1,
			icon: '',
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
			markers: [
				{
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
				}
			],
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
		if (options.icon) {
			that.$set(that.markers[0], 'iconPath', '/static/amap/' + options.icon + '.png');
			that.icon = options.icon;
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
		setAddress(e) {
			this.$set(this.address_info, 'address', e.detail.value);
		},
		setContact(e) {
			this.$set(this.address_info, 'contact', e.detail.value);
		},
		setPhone(e) {
			this.$set(this.address_info, 'phone', e.detail.value);
		},
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
		// 跳转搜索地址页
		goSearchAddressList() {
			let that=this;
			uni.navigateTo({
				url: '/pages/amap/search_address_list/search_address_list?icon='+that.icon+'&city=' + that.address_info.city
			});
		},
		// 切换城市
		goCitySelect() {
			uni.navigateTo({
				url: '/pages/cityselect/cityselect?city=' + this.address_info.city + '&status=' + this.status + '&channel=amapSelectCity'
			});
		},
		// 确定返回
		sure() {
			let that = this;
			if (that.$drmking.isEmpty(that.address_info.localtion)) {
				uni.showToast({
					icon: 'none',
					title: '请输入地址！'
				});
				return;
			}
			if (!that.$drmking.isEmpty(that.address_info.phone)) {
				if (!that.$drmking.isPhone(that.address_info.phone)) {
					uni.showToast({
						icon: 'none',
						title: '手机号码不正确！'
					});
					return;
				}
			}
			if (that.channel == 'setTrip') {
				if (that.status == 1) {
					that.$fire.fire('setTrip', { type: 'departure', index: that.transfer_index, address: that.address_info });
				} else {
					if (that.is_destination) {
						that.$fire.fire('setTrip', { type: 'destination', index: that.transfer_index, address: that.address_info });
					} else {
						that.$fire.fire('setTrip', { type: 'transfer', index: that.transfer_index, address: that.address_info });
					}
				}
			} else {
				that.$fire.fire(that.channel, that.address_info);
			}
			setTimeout(function() {
				that.navigateback();
			}, 500);
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
									that.setMarker(0, info.longitude, info.latitude, addressComponent.district + info.regeocodeData.addressComponent.township);
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
view {
	font-size: 28upx;
}
.search_input {
	width: 100vw;
	display: flex;
	flex-direction: row;
	z-index: 999;
	height: 96upx;
	overflow: hidden;
	background-color: #fff;
	align-items: center;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.search_input_input_box {
	flex: 1;
}
.search_input_city_box {
	padding-right: 30upx;
}
.map_box {
}
#amap {
	width: 100vw;
	height: calc(100vh - 482upx - var(--status-bar-height));
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
