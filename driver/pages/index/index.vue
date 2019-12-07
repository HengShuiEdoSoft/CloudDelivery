<template>
	<view class="content">
		<!--<uni-drawer :visible="visible" mode="right" @close="visible=false">
			<view class="ui-drawer-container">
				<view class="ui-options-title">筛选</view>
				<view class="ui-options-item">
					<view class="ui-option-title">价格区间</view>
					<view class="ui-option-body">
						<radio-group @change="radioChange">
							<label class="" v-for="(item, index) in items.type" :key="item.value">
							    <radio :value="item.value" :checked="index === current" color="#FF5723"/>
								<text class="ui-option-text">{{item.name}}</text>
							</label>	
						</radio-group>
					</view>
				</view>	
				<view class="ui-options-item">
					<view class="ui-option-title">是否加急</view>
					<view class="ui-option-body">
						<radio-group @change="radioChange">
							<label class="" v-for="(item, index) in items.isjiaji" :key="item.value">
								    <radio :value="item.value" :checked="index === current" color="#FF5723"/>
									<text class="ui-option-text">{{item.name}}</text>
							</label>	
						</radio-group>
					</view>
				</view>	
				<view class="ui-options-item">
					<view class="ui-option-title">价格区间</view>
					<view class="ui-option-body">
						<view class="ui-option-price-body"><input type="text" class="ui-option-price" maxlength="5"/></view>						
						<text> - </text>
						<view class="ui-option-price-body"><input type="text" class="ui-option-price" maxlength="5"/></view>
					</view>		
				</view>
				<view class="ui-options-item">
					<view class="ui-option-title">日期</view>
					<view class="ui-option-body">
						<radio-group @change="radioChange">
							<label class="" v-for="(item, index) in items.date" :key="item.value">
								    <radio :value="item.value" :checked="index === current" color="#FF5723"/>
									<text class="ui-option-text">{{item.name}}</text>
							</label>	
						</radio-group>
					</view>
				</view>
				<view class="ui-options-btns">
					<view class="ui-options-reset" @tap="optionsReset">重置</view>
					<view class="ui-options-sure" @tap="optionsYes">确定</view>
				</view>
			</view>
		</uni-drawer>-->
		<view class="ui-top-nav">
			<view class="ui-top-isworing">
				<switch checked color="#FF5723" @change="switchChange" />
				工作状态
			</view>
			<view>
				<!--<text class="iconfont icon-shaixuan" @tap="showDrawer"></text>-->
				<view class="iconfont icon-xiaoxi-xianxing" @tap="navTo('/pages/msgcenter/msgcenter')"></view>
			</view>
		</view>
		<view>
			<scroll-view class="scroll-container">
				<view class="ui-order-list-item" v-for="(item, index) in scramble_orders" :key="index">
					<view class="ui-order-list-item-top">
						<text class="ui-order-list-cartype">整车</text>
						<text>{{ item.order_details.car_time }}</text>
						<text class="ui-order-first">急</text>
					</view>
					<view class="ui-divide-line"></view>
					<view class="ui-order-timeline-container">
						<view class="ui-order-timeline uni-timeline">
							<view class="uni-timeline-item uni-timeline-first-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">{{ item.order_details.trip.departure.localtion }}{{ item.order_details.trip.departure.address }}</text>
								</view>
							</view>
							<view class="uni-timeline-item uni-timeline-last-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">{{ item.order_details.trip.destination.localtion }}{{ item.order_details.trip.destination.address }}</text>
								</view>
							</view>
						</view>
						<view class="ui-order-accept" @tap="scrambleorder(item.order_id)">接单</view>
					</view>
					<view class="ui-order-price">￥{{ item.order_details.order_price }}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import uniDrawer from '@/components/drawer/drawer.vue';
export default {
	components: { uniDrawer },
	computed: mapState(['forcedLogin', 'hasLogin', 'user', 'scramble_orders']),
	data() {
		return {
			visible: false,
			current: 0,
			items: {
				type: [
					{
						value: '1',
						name: '整车'
					},
					{
						value: '2',
						name: '非整车'
					}
				],
				isjiaji: [
					{
						value: '1',
						name: '是'
					},
					{
						value: '0',
						name: '否'
					}
				],
				date: [
					{
						value: '1',
						name: '今天'
					},
					{
						value: '2',
						name: '明天'
					}
				]
			}
		};
	},
	onLoad() {
		let that = this;
		that.$drmking
			.init(that)
			.then(async () => {
				let location_city = await that.$drmking.getLocationCity();
				if (that.$drmking.isEmpty(location_city)) {
					that.$drmking.getDefaultCity();
					await that.$drmking.changeLocationCity(that);
					location_city = that.$drmking.getLocationCity();
				}
				that.location_city = location_city;
				// uni.navigateTo({
				// 	url:'/pages/order/photoupload'
				// });
			})
			.catch(e => {
				console.log(e);
			});
		this.$fire.on('changeCity', function(data) {
			that.$drmking.setLocationCity(that, data);
		});
		this.$fire.on('setTrip', function(data) {
			that.setTrip(data);
		});
		that.$fire.on('pushToDriverOrderNotice', function(data) {			
			try{
				let order = {
					order_id: data.order_id,
					user_id: data.user_id,
					lon: data.lon,
					lat: data.lat,
					uphone: data.order.uphone,
					uname: data.order.uname,
					order_details: data.order.order_details
				};
				that.$store.commit('addPushToDriverOrderNotice', order);
				// that.$drmking.tts('有新订单发布，快去瞧瞧吧！');
			}catch(e){
				console.log(e);
			}
		});
	},
	methods: {
		switchChange: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value);
		},
		/*showDrawer:function(){
				this.visible=!this.visible
			},*/
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
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
				return false;
			} else {
				uni.navigateTo({
					url: url
				});
			}
		},
		//抢单
		scrambleorder: function(id) {
			let that = this;
			const data = {
				order_id: id
			};
			this.$uniFly
				.post({
					url: '/api/order/scrambleorder',
					params: data
				})
				.then(function(res) {
					if (res.code === 0) {
						uni.showToast({
							title: '抢单成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						//进入订单跟踪页面
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
.ui-top-nav {
	display: flex;
	padding: 0 30upx;
	line-height: 88upx;
	color: #fff;
	background: #424456;
}
.ui-top-nav .iconfont {
	display: inline-block;
	width: 88upx;
	font-size: 24px;
	text-align: right;
}
.ui-top-isworing {
	flex: 1;
	font-size: 14px;
}
.ui-top-isworing switch {
	transform: scale(0.7, 0.7);
}
.ui-options-title {
	padding: 30upx;
	font-size: 16px;
	line-height: 80upx;
}
.ui-options-item {
	display: flex;
}
.ui-option-title {
	padding: 0 30upx;
	font-size: 14px;
	color: #666;
	line-height: 88upx;
}
.ui-option-body radio {
	transform: scale(0.7, 0.7);
}
.ui-option-body {
	line-height: 88upx;
	font-size: 14px;
}
.ui-option-text {
	padding-right: 10px;
}
.ui-option-price-body {
	vertical-align: middle;
	display: inline-block;
	width: 70px;
	background: #f3f4f5;
	border-radius: 8upx;
}
.ui-option-price {
	padding: 0 10px;
	margin: 8upx 0;
	font-size: 14px;
}
.ui-options-btns {
	position: fixed;
	bottom: 0;
	display: flex;
	width: 100%;
	text-align: center;
	line-height: 88upx;
	color: #fff;
}
.ui-options-reset {
	flex-grow: 2;
	background-color: #ff9801;
}
.ui-options-sure {
	flex-grow: 3;
	background-color: #ff5723;
}
.scroll-container {
	height: 100%;
}
.ui-order-cont {
	flex: 1;
}
.ui-order-price {
	font-weight: 600;
	text-align: right;
}
.ui-order-timeline-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.ui-order-timeline {
	flex: 1;
}
.ui-order-item-more {
	color: #ccc;
}
.ui-order-first {
	margin-left: 40upx;
	padding: 2upx 8upx;
	font-size: 12px;
	color: #ff5723;
	border: 1px dashed #ff5723;
	border-radius: 48upx;
}
.ui-order-accept {
	padding: 8upx 30upx;
	font-size: 14px;
	color: #fff;
	border-radius: 40upx;
	background: linear-gradient(45deg, #ff9801, #ff5723);
}
</style>
