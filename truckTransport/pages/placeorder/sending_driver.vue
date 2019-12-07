<template>
	<view class="content">
		<view class="dui-notice-driver">
			<view class="dui-notice-body">
				<text>正在通知附近的司机 </text>
				<text>已等待: <text>256分28秒</text></text>
			</view>
			<view class="dui-notice-body">
				<text>{{order.car}}</text>
			</view>
		</view>
		<map id="amap" :show-location="true" :longitude="order.order_details_json.trip.departure.lon" :latitude="order.order_details_json.trip.departure.lat" scale="18"
		 :markers="markers"></map>
		<view class="dui-btn-bottom">
			<button type="primary" @tap="quitOrder(order.order_id)">取消</button>
		</view>
	</view>
</template>

<script>
	let amap = require('@/common/amap.js');
	export default {
		data() {
			return {
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
				map: null
			};
		},
		onLoad(options) {
			let that = this;
			that.map = uni.createMapContext('amap', that);
			this.getDetail();
		},
		methods: {
			// 设置地图中心位置
			setMapLocation(lon, lat) {
				this.$set(this.order.order_details_json.trip.departure.lon, 'longitude', lon);
				this.$set(this.order.order_details_json.trip.departure.lat, 'latitude', lat);
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
						} else {
							uni.showModal({
								content: res.msg,
								showCancel: false
							});
						}
					})
					.catch(function(error) {
						uni.showModal({
							content: error,
							showCancel: false
						});
					});
			},
			quitOrder(order_id){
				let that=this;
				const data = {
					order_id: order_id
				};
				that.$uniFly
					.post({
						url: '/api/order/cancelorder',
						params: data
					})
					.then(function(res) {
						if (res.code == 0) {
							uni.showToast({
								title: '订单已取消',
								icon: 'success',
								mask: true,
								duration: 3000
							});
							uni.navigateTo({
								url:'/pages/index/index'
							})
						} else {
							uni.showModal({
								content: res.msg,
								showCancel: false
							});
						}
					})
					.catch(function(error) {
						uni.showModal({
							content: error,
							showCancel: false
						});
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
