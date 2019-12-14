<template>
	<view class="content" v-if="order !== null">
			<view class="ui-order-list-item">
				<map
					id="amap"
					:show-location="true"
					:longitude="order.order_details_json.trip.destination.lon"
					:latitude="order.order_details_json.trip.destination.lat"
					scale="16"
					:markers="markers"
					:polyline="polyline"
				></map>
				<view class="dui-orderdetail-date">{{ order.create_time }}</view>
				<view class="dui-orderdetail-state">您已接单</view>
			</view>
			<view class="ui-order-list-item">
				<view class="ui-order-list-item-top">
					<text class="ui-orderno-color">{{ order.ocode }}</text>
				</view>
				<view class="ui-order-list-item-top">
					<text class="ui-cartype-color">{{ order.create_time }}</text>
					<text class="dui-orderdetail-distance">行程大约{{ order.order_details_json.distance }}公里</text>
				</view>
				<view class="ui-divide-line"></view>
				<view class="ui-order-timeline-container">
					<view class="ui-order-timeline uni-timeline">
						<view class="uni-timeline-item uni-timeline-first-item">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">{{ order.order_details_json.trip.departure.localtion }}{{ order.order_details_json.trip.departure.address }}</text>
								<text @tap="openSysMap(order.order_details_json.trip.departure)" class="ui-daohang">一键导航</text>
							</view>
						</view>
						<view class="uni-timeline-item" v-for="(passbyitem, index) in order.order_details_json.trip.transfer" :key="index">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">{{ passbyitem.localtion }}{{ passbyitem.address }}</text>
								<text @tap="openSysMap(passbyitem)" class="ui-daohang">一键导航</text>
							</view>
						</view>
						<view class="uni-timeline-item uni-timeline-last-item">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">{{ order.order_details_json.trip.destination.localtion }}{{ order.order_details_json.trip.destination.address }}</text>
								<text @tap="openSysMap(order.order_details_json.trip.destination)" class="ui-daohang">一键导航</text>
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
				<view class="dui-orderdetail-demand" @tap="photoUpLoad">拍照回单(免费)</view>
			</view>
			<view class="ui-orderdetail-cont" style="overflow: hidden;">
				<view class="dui-orderdetail-info">
					<image src="../../static/img/HeadImg.jpg" mode=""></image>
					<text>{{ order.order_details_json.contact }}</text>
				</view>
				<view class="dui-orderdetail-call" @tap="call"><text class="iconfont icon-dianhua"></text></view>
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
					说明: 若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按
					<navigator>标准费用</navigator>
					结算。
				</view>
			</view>
			<view class="dui-confirm-btn-box">
				<button type="primary" class="dui-orderdetail-confirm-btn1" @tap="completeSure">
					确认完成
					<text>*请确认完成,结束本单服务</text>
				</button>
			</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
let amap = require('@/common/amap.js');
export default {
	computed: mapState(['sysconfig']),
	data() {
		return {
			channel: 'setTrip',
			status: 1,
			is_destination: false,
			transfer_index: 0,
			init_flag: false,
			markers: [],
			polyline: [{ points: [], color: '#0091ff', width: 6 }],
			map: null,
			order: null,
			sure_images: null
		};
	},
	onLoad(options) {
		this.ocode = options.ocode;
		this.getDetail();
		let that = this;
		that.map = uni.createMapContext('amap', that);
		that.$fire.on('SUREIMAGES', function(data) {
			that.sure_images = data.join(',');
		});
	},
	methods: {
		openSysMap(localtion) {
			amap.getRegeo()
				.then(res => {
					let info = res[0];
					let dst = new plus.maps.Point(localtion.lon, localtion.lat);
					let des = localtion.localtion + localtion.address;
					let src = new plus.maps.Point(info.longitude, info.latitude);
					plus.maps.openSysMap(dst, des, src);
				})
				.catch(err => {
					console.log(err);
				});
		},
		drawMap(trip) {
			let that = this;
			let markers = [];
			let polyline = [];
			let origin = trip.departure.lon + ',' + trip.departure.lat;
			markers.push({
				iconPath: '/static/amap/marker.png',
				id: 0,
				latitude: trip.departure.lat,
				longitude: trip.departure.lon,
				width: 23,
				height: 33,
				title: trip.departure.localtion + trip.departure.address,
				callout: {
					content: trip.departure.localtion + trip.departure.address,
					color: '#000',
					bgColor: '#fff',
					display: 'ALWAYS',
					textAlign: 'center'
				}
			});
			let waypoints = [];
			for (let i = 0; i < trip.transfer.length; i++) {
				let item = trip.transfer[i];
				markers.push({
					iconPath: '/static/amap/marker.png',
					id: 0,
					latitude: item.lat,
					longitude: item.lon,
					width: 23,
					height: 33,
					title: item.localtion + item.address,
					callout: {
						content: item.localtion + item.address,
						color: '#000',
						bgColor: '#fff',
						display: 'ALWAYS',
						textAlign: 'center'
					}
				});
				waypoints.push(item.lon + ',' + item.lat);
			}
			let destination = trip.destination.lon + ',' + trip.destination.lat;
			markers.push({
				iconPath: '/static/amap/marker.png',
				id: 0,
				latitude: trip.destination.lat,
				longitude: trip.destination.lon,
				width: 23,
				height: 33,
				title: trip.destination.localtion + trip.destination.address,
				callout: {
					content: trip.destination.localtion + trip.destination.address,
					color: '#000',
					bgColor: '#fff',
					display: 'ALWAYS',
					textAlign: 'center'
				}
			});
			waypoints.join(';');
			that.markers = markers;
			amap.getDrivingRoute(origin, destination, waypoints)
				.then(data => {
					let points = [];
					if (data.paths && data.paths[0] && data.paths[0].steps) {
						let steps = data.paths[0].steps;
						for (let i = 0; i < steps.length; i++) {
							let poLen = steps[i].polyline.split(';');
							for (let j = 0; j < poLen.length; j++) {
								let item = poLen[j];
								item = item.split(',');
								points.push({
									longitude: parseFloat(item[0]),
									latitude: parseFloat(item[1])
								});
							}
						}
					}
					that.$set(that.polyline[0], 'points', points);
				})
				.catch(err => {
					uni.showModal({
						title: '路线规划失败，是否重新规划？',
						content: '',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								that.drawMap(trip);
							} else if (res.cancel) {
							}
						}
					});
				});
		},
		photoUpLoad: function() {
			uni.navigateTo({
				url: '/pages/order/photoupload'
			});
		},
		call: function(e) {
			uni.makePhoneCall({
				phoneNumber: this.order.order_details_json.contact
			});
		},
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
						that.drawMap(res.data.order_details_json.trip);
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
		completeSure: function() {
			let that = this;
			const data = {
				order_id: that.order.order_id,
				sure_images: that.sure_images
			};
			if (that.$drmking.isEmpty(data.sure_images)) {
				uni.showToast({
					icon: 'none',
					title: '请上传回执后再确认完成!'
				});
				return;
			}
			that.$uniFly
				.post({
					url: '/api/order/sureorder',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.reLaunch({
							url: '/pages/index/index'
						});
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
		}
	}
};
</script>
<style>
#amap {
	width: 100%;
	height: 350upx;
}

.icon-dianhua {
	margin-right: 10upx;
}

.ui-tips {
	padding: 20upx 0;
	font-size: 12px;
	color: #999;
}

.ui-tips navigator {
	display: inline;
}

.dui-orderdetail-confirm-btn1 {
	background-color: #dd524d;
	border-radius: 0;
}

.dui-orderdetail-confirm-btn1 text {
	display: block;
	font-size: 24upx;
}

.dui-orderdetail-info {
	float: left;
	display: flex;
	align-items: center;
}

.dui-orderdetail-info image {
	width: 100upx;
	height: 100upx;
	margin-right: 20upx;
}

.dui-orderdetail-info text {
	font-size: 32upx;
}

.dui-orderdetail-call {
	float: right;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100upx;
	height: 100upx;
	background-color: #3bd1ab;
	border-radius: 50%;
	color: #fff;
}

.dui-orderdetail-call text {
	position: relative;
	left: 5upx;
	top: 5upx;
	font-size: 46upx;
}

.dui-orderdetail-demand {
	width: 100%;
	box-sizing: border-box;
	margin: 10upx 0 20upx;
	padding: 20upx 30upx;
	border-radius: 36upx;
	font-size: 26upx;
	color: #555;
	background-color: #f1f1f1;
}

.dui-orderdetail-date {
	margin-top: 30upx;
	font-size: 28upx;
	color: #999;
}

.dui-orderdetail-state {
	margin-top: 10upx;
	font-size: 30upx;
}

.dui-orderdetail-distance {
	color: #797979;
	float: right;
}
</style>
