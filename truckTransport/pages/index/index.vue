<template>
	<view class="content">
		<view>
			<uni-drawer :visible="visible" mode="left" @close="visible = false">
				<view class="ui-drawer-top">
					<navigator url="/pages/userinfo/userinfo"><image src="../../static/img/HeadImg.jpg" class="ui-portrait"></image></navigator>
					<view class="ui-drawer-top-body">
						<view class="ui-username"><text>135****5687</text></view>
						<navigator url="../viplevel/viplevel">
							<view class="ui-member-level">
								<text>会员等级</text>
								<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
							</view>
						</navigator>
					</view>
				</view>
				<view style="padding:30upx;">
					<view class="ui-list">
						<view hover-class="ui-list-item-hover" @tap="navTo('/pages/orderlist/orderlist')">
							<text class="iconfont icon-huoche"></text>
							<text>订单列表</text>
						</view>
						<view hover-class="ui-list-item-hover" @tap="navTo('/pages/address/address')">
							<text class="iconfont icon-weizhi"></text>
							<text>常用地址</text>
						</view>
						<view hover-class="ui-list-item-hover" @tap="navTo('/pages/mymoney/mymoney')">
							<text class="iconfont icon-qianbao-kuai"></text>
							<text>我的钱包</text>
							<image src="../../static/img/quan.png"></image>
						</view>
						<view hover-class="ui-list-item-hover" @tap="navTo('/pages/driver/driver')">
							<text class="iconfont icon-siji-"></text>
							<text>我的司机</text>
						</view>
						<view hover-class="ui-list-item-hover" @tap="navTo('/pages/servicecenter/servicecenter')">
							<text class="iconfont icon--kefu"></text>
							<text>客服中心</text>
						</view>
						<view hover-class="ui-list-item-hover" @tap="navTo('/pages/setup/setup')">
							<text class="iconfont icon-shezhi"></text>
							<text>更多设置</text>
						</view>
					</view>
				</view>
			</uni-drawer>
		</view>
		<navigator class="ui-top-city-select" :url="'/pages/cityselect/cityselect?city=' + location_city.city.city_title + '&status=1&channel=changeCity'">
			当前城市：{{ location_city.city.city_title }}
			<text>切换</text>
		</navigator>
		<view class="ui-car-select">
			<view class="ui-car-name-list">
				<view class="ui-car-name-item" v-for="(item, index) in location_city.cars_list" :key="item.car_id" :class="{ active: current === index }" @click="tabChange(index)">
					{{ item.car_title }}
				</view>
			</view>
			<view class="ui-divide-line"></view>
			<view>
				<swiper class="ui-carinfos" @change="swiperChange" :current="current">
					<swiper-item class="ui-carinfo-item" v-for="(item, index) in location_city.cars_list" :key="item.car_id">
						<view class="ui-carinfo-body">
							<navigator :url="'/pages/cardetail/cardetail?id=' + item.car_id" hover-class="none">
								<image :src="item.car_icon" class="ui-carinfo-image"></image>
								<view class="ui-carinfo-cont">
									<view>载重:{{ item.car_load }}公斤</view>
									<view>
										长宽高：
										<text>{{ item.car_lenght }}</text>
										*
										<text>{{ item.car_width }}</text>
										*
										<text>{{ item.car_height }}米</text>
									</view>
									<view>载货体积:{{ item.car_cargo_volume }}方</view>
								</view>
							</navigator>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="uni-timeline-box">
			<view class="uni-timeline">
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider">发</view>
					<view class="uni-timeline-item-content" @tap="navTo('/pages/map/map')">
						<block v-if="order.trip.departure.localtion == ''"><view class="ui-address">请输入发货地址</view></block>
						<block v-else>
							<view class="ui-address">{{ order.trip.departure.localtion }}</view>
							<view class="ui-subtext">{{ order.trip.departure.address }}</view>
							<view class="ui-subtext">{{ order.trip.departure.contact }} {{ order.trip.departure.phone }}</view>
						</block>
					</view>
				</view>
				<view v-for="(item, index) in order.trip.transfer" :key="index" class="uni-timeline-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content" @tap="navTo('/pages/map/map')">
						<block v-if="item.localtion == ''"><view class="ui-address">请输入收货地址</view></block>
						<block v-else>
							<view class="ui-address">{{ item.localtion }}</view>
							<view class="ui-subtext">{{ item.address }}</view>
							<view class="ui-subtext">{{ item.contact }} {{ item.phone }}</view>
						</block>
					</view>
					<view class="delete_address" @tap="deleteAddress('transfer', index)">删除</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider">收</view>
					<view class="uni-timeline-item-content" @tap="navTo('/pages/map/map')">
						<block v-if="order.trip.destination.localtion == ''"><view class="ui-address">请输入收货地址</view></block>
						<block v-else>
							<view class="ui-address">{{ order.trip.destination.localtion }}</view>
							<view class="ui-subtext">{{ order.trip.destination.address }}</view>
							<view class="ui-subtext">{{ order.trip.destination.contact }} {{ order.trip.destination.phone }}</view>
						</block>
					</view>
					<view class="delete_address" @tap="deleteAddress('destination')">删除</view>
				</view>
				<view class="uni-timeline-item add_address_box"><view class="add_address" @tap="addAddress">添加收货地址</view></view>
			</view>
		</view>

		<view class="ui-home-bottom">
			<view class="ui-home-price-container">
				<view class="ui-cost-price">
					<text>￥</text>
					<text class="ui-price-now">{{ order.pay_order_price }}</text>
					<text class="ui-origin-price">￥{{ order.order_price }}</text>
					<view class="ui-home-discount">
						优惠券已折扣
						<text>{{ order.coupon_price }}元</text>
					</view>
				</view>
				<navigator class="ui-price-detail" url="/pages/pricedetail/pricedetail">价格明细</navigator>
			</view>
			<view class="ui-home-btns">
				<view class="ui-use-now" @tap="orderSure">现在用车</view>
				<view class="ui-appoint" style="display: flex;justify-content: center;">
					<text class="iconfont icon-shijian-xianxing"></text>
					<hTimePicker sTime="0" cTime="23" interval="10" sDay="0" dayNum="3" @changeTime="changeTime"><view slot="pCon" class="changeTime">预约</view></hTimePicker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniDrawer from '@/components/drawer/drawer.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import hTimePicker from '@/components/h-timePicker/h-timePicker.vue';
let amap = require('@/common/amap-wx.js');
export default {
	components: {
		uniDrawer,
		uniPopup,
		hTimePicker
	},
	data() {
		return {
			visible: false,
			current: 0,
			is_now: false,
			location_city: {
				city: {
					city_id: 0,
					city_title: '',
					is_default: 1,
					amap_citycode: '',
					status: 1
				},
				cars: {},
				cars_list: []
			},
			address_tpl: {
				lat: '39.907761',
				lon: '116.405467',
				localtion: '北京',
				address: '',
				contact: '',
				phone: ''
			},
			map_key: ''
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'user', 'sysconfig', 'order']),
	onLoad() {
		let that = this;
		that.$drmking
			.init(that)
			.then(async () => {
				let location_city = await that.$drmking.getLocationCity();
				if (that.$drmking.isEmpty(location_city)) {
					that.$drmking.getDefaultCity();
					console.log(12);
					await that.$drmking.changeLocationCity(that);
					location_city = that.$drmking.getLocationCity();
				}
				that.location_city = location_city;
				that.map_key = that.sysconfig.amap_api[Math.floor(Math.random() * that.sysconfig.amap_api.length)];
			})
			.catch(e => {
				//TODO handle the exception
				console.log(e);
			});
		this.$fire.on('changeCity', function(data) {
			console.log(data);
			that.$drmking.setLocationCity(that, data);
		});
	},
	methods: {
		tabChange: function(index) {
			this.current = index;
			let car = this.location_city.cars_list[this.current];
			this.$store.commit('set_order_car', car);
		},
		swiperChange: function(e) {
			var index = e.target.current || e.detail.current;
			this.current = index;
			let car = this.location_city.cars_list[this.current];
			this.$store.commit('set_order_car', car);
		},
		cheackTrip() {
			let that = this;
			let trip = that.order.trip;
			let origin = '';
			let waypoints = [];
			let destination = '';
			// 判断出发地是否为空
			if (trip.departure.localtion != '') {
				origin = trip.departure.lon + ',' + trip.departure.lat;
				for (let i = 0; i < trip.transfer.length; i++) {
					if (trip.transfer[i].localtion != '') {
						waypoints.push(trip.transfer[i].lon + ',' + trip.transfer[i].lat);
					}
				}
				if (trip.destination.localtion != '') {
					destination = trip.destination.lon + ',' + trip.destination.lat;
				}
			}
			let flag = false;
			if (origin != '') {
				if (destination != '' || waypoints.length > 0) {
					flag = true;
				}
			}
			if (flag) {
				if (destination == '') {
					destination = waypoints.slice(waypoints.length - 1, 1)[0];
				}
				let map = new amap.AMapWX({ key: 'dda21b01a2a7cb53b46c90c718d2bafb' });
				map.getDrivingRoute({
					strategy: 4,
					origin: origin,
					waypoints: waypoints.join(';'),
					destination: destination,
					success: function(data) {
						that.$store.commit('set_order_trip', { trip: that.order.trip, distance: data.paths[0].distance });
					},
					fail: function(info) {
						uni.showModal({
							title: '路线计算失败，是否重新计算',
							content: '',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
			}
		},
		addAddress() {
			let max_address_num = parseInt(this.sysconfig.max_address_num);
			if (this.order.trip.transfer.length >= max_address_num - 2) {
				uni.showToast({
					icon: 'none',
					title: '最多添加个' + (max_address_num - 2) + '中转地址'
				});
				return;
			}
			this.order.trip.transfer.push(this.order.trip.destination);
			this.order.trip.destination = this.address_tpl;
			this.cheackTrip();
		},
		deleteAddress(type, index) {
			if (type == 'transfer') {
				this.order.trip.transfer.splice(index, 1);
				this.cheackTrip();
			}
			if (type == 'destination') {
				if (this.order.trip.transfer.length > 0) {
					let destination = this.order.trip.transfer.splice(this.order.trip.transfer.length - 1, 1);
					this.order.trip.destination = destination[0];
					this.cheackTrip();
				} else {
					uni.showToast({
						icon: 'none',
						title: '最少有一个收货地址'
					});
				}
			}
		},
		navTo: function(url) {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					showCancel: true,
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				});
			} else {
				uni.navigateTo({
					url: url
				});
			}
		},
		changeTime(date_time) {
			this.is_now = false;
			this.goOrderSure(date_time);
		},
		orderSure() {
			this.is_now = true;
			this.goOrderSure();
		},
		goOrderSure(date_time) {
			let now = new Date();
			let use_car_diff_time = parseInt(this.sysconfig.use_car_diff_time);
			if (date_time) {
				let time = Date.parse(date_time.replace(/-/g, '/'));
				if (time < now.getTime() + use_car_diff_time * 60 * 1000) {
					uni.showToast({
						icon: 'none',
						title: '预约时间间隔不能小于' + use_car_diff_time + '分钟'
					});
					return;
				}
				date_time = time;
			} else {
				date_time = now.getTime() + (use_car_diff_time + 5) * 60 * 1000;
			}
			uni.navigateTo({
				url: '/pages/order/order?time=' + date_time + '&is_now=' + this.is_now
			});
		}
	},
	onNavigationBarButtonTap(e) {
		var index = e.index;
		if (index === 0) {
			this.visible = !this.visible;
		}
	}
};
</script>

<style>
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}

.ui-list .iconfont {
	margin-right: 40upx;
	margin-left: 8upx;
	font-size: 16px;
	color: #424456;
}

.ui-list {
	font-size: 14px;
}

.ui-list > view {
	line-height: 92upx;
	color: #424456;
}

.ui-list-item-hover {
	background: #f5f7f9;
}

.ui-list image {
	padding-left: 20upx;
	width: 82upx;
	height: 32upx;
	vertical-align: middle;
}

.ui-drawer-top {
	display: flex;
	padding: 40upx 30upx;
}

.ui-portrait {
	width: 120upx;
	height: 120upx;
	border-radius: 30px;
}

.ui-drawer-top-body {
	flex: 1;
	padding-left: 40upx;
}

.ui-username {
	font-size: 17px;
}

.ui-member-level {
	display: inline-block;
	margin-top: 20upx;
	padding: 8upx 32upx;
	font-size: 12px;
	line-height: 16px;
	color: #fff;
	border-radius: 4px;
	background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IjU4RDVDRjNDMDg5REQ1NTUzOTBGRDZGNjlBQTA2NTlBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGMDEwREZBREFEMTExRTk5QTRCQjU0NEE3NzAxMEIyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMDEwREY5REFEMTExRTk5QTRCQjU0NEE3NzAxMEIyIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2M3N2ZiMWYtM2I2My00OGVhLWIxOTgtZmY0NjUyYTBkY2FjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmNjNzdmYjFmLTNiNjMtNDhlYS1iMTk4LWZmNDY1MmEwZGNhYyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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);
	background-position: left top;
	background-size: 100% 100%;
}

.ui-member-level .iconfont {
	padding-left: 12upx;
}

.ui-car-select {
	background-color: #fff;
}

.ui-carinfos {
	padding: 30upx;
	height: 220upx;
}

.ui-carinfo-body > navigator {
	display: flex;
}

.ui-carinfo-image {
	padding: 15upx;
	width: 286upx;
	height: 148upx;
}

.ui-carinfo-cont {
	flex: 1;
	padding: 32upx 15upx;
	font-size: 12px;
	line-height: 1.5;
}

.ui-carinfo-cont > view {
	display: block;
	color: #666;
}

.uni-timeline {
	margin: 32upx 16upx;
	padding: 30upx;
	box-sizing: border-box;
	border-radius: 2px;
	background: #fff;
}

.ui-home-btns {
	display: flex;
	color: #fff;
	text-align: center;
}

.ui-use-now {
	padding: 20upx 0;
	font-size: 20px;
	background: #ff5723;
	flex-grow: 2;
}

.ui-appoint {
	padding: 20upx 0;
	font-size: 20px;
	flex-grow: 1;
	background: #ff9801;
}
</style>
