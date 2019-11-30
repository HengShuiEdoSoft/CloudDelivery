<template>
	<view class="content">
		<scroll-view class="scroll-container">
			<view class="ui-order-list-item">
				<map id="amap" :show-location="true" :longitude="address_info.longitude" :latitude="address_info.latitude" scale="18"
				 :markers="markers" :polyline="polyline" @regionchange="regionchange"></map>
				<view class="dui-orderdetail-date">
					2019年11月30日 10:00
				</view>
				<view class="dui-orderdetail-state">
					您已接单
				</view>
			</view>
			<view class="ui-order-list-item">
				<view class="ui-order-list-item-top"><text class="ui-orderno-color">20191010101012341456</text></view>
				<view class="ui-order-list-item-top">
					<text class="ui-cartype-color">09月20日 10:22</text>
					<text class="dui-orderdetail-distance">行程大约100公里</text>
				</view>
				<view class="ui-divide-line"></view>
				<view class="ui-order-timeline-container">
					<view class="ui-order-timeline uni-timeline">
						<view class="uni-timeline-item uni-timeline-first-item">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">衡水人民政府</text>
								<text class="ui-subtext">河北省衡水市和平路</text>
							</view>
						</view>
						<view class="uni-timeline-item uni-timeline-last-item">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">怡然城</text>
								<text class="ui-subtext">河北省衡水市和平路</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ui-orderdetail-cont">
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">货物类型</view>
					<view class="ui-od-info-right">家电</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">重量</view>
					<view class="ui-od-info-right">1.00KG</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">规格</view>
					<view class="ui-od-info-right">1.00米*1.00米*1.00米</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">额外需求</view>
				</view>
				<view class="dui-orderdetail-demand">
					无额外需求
				</view>
				<view class="dui-orderdetail-demand" @tap="navTo">
					拍照回单(免费)
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">保险</view>
					<view class="ui-od-info-right">10倍保额</view>
				</view>
			</view>
			<view class="ui-orderdetail-cont" style="overflow: hidden;">
				<view class="dui-orderdetail-info">
					<image src="../../static/img/HeadImg.jpg" mode=""></image>
					<text>黄先生</text>
				</view>
				<view class="dui-orderdetail-call" @tap="call">
					<text class="iconfont icon-dianhua"></text>
				</view>
			</view>
			<view class="ui-orderdetail-cont">
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">向客户收取</view>
					<view class="ui-od-price-pay">￥100.00</view>
				</view>
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">总里程费</view>
					<view class="ui-od-price-pay">￥90.00</view>
				</view>
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">保险费</view>
					<view class="ui-od-price-pay">￥10.00</view>
				</view>
				<view class="ui-od-price-list-b">
					<view class="ui-od-price-type">总计100.00元</view>
					<view class="ui-od-price-right">价格明细</view>
				</view>
				<view class="ui-divide-line"></view>
				<view class="ui-tips">说明: 若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按<navigator>标准费用</navigator>结算。</view>
			</view>
			<view class="dui-confirm-btn-box">
				<button type="primary" class="dui-orderdetail-confirm-btn1">
					确认完成
					<text>*请确认完成,结束本单服务</text>
				</button>
			</view>
		</scroll-view>
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
			navTo: function() {
				uni.navigateTo({
					url: '/pages/order/photoupload'
				});
			},
			call: function(e) {
				uni.makePhoneCall({
					phoneNumber: '18888888888'
				});
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
		background-color: #DD524D;
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
		background-color: #3BD1AB;
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
