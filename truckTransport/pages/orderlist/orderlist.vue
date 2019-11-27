<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item, index) in tab" :class="{ active: current == index }" :key="index" :data-current="index" @tap="tabChange">
				{{ item.name }}
			</view>
		</view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view class="scroll-container">
					<view v-if="empty[0]">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator
						class="ui-order-list-item"
						v-for="(item, index) in newsList[0]"
						:url="'/pages/orderdetail/orderdetail?ocode=' + item.ocode"
						:key="item.order_id"
						@longtap="deleteOrder(item.order_id)"
					>
						<view class="ui-daizhifu" v-if="item.status === 0">待支付</view>
						<view class="ui-hujiao" v-if="item.status === 1">呼叫中...</view>
						<view class="ui-hujiao" v-if="item.status === 2">等待运送</view>
						<view class="ui-hujiao" v-if="item.status === 3">运送中</view>
						<view class="ui-order-list-item-top">
							<text class="ui-order-list-cartype">{{ item.car }}</text>
							<text>{{ item.create_time }}</text>
						</view>
						<view class="ui-divide-line"></view>
						<view class="ui-order-timeline-container">
							<view class="ui-order-timeline uni-timeline">
								<view class="uni-timeline-item uni-timeline-first-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">{{ item.order_details_json.trip.departure.localtion }}{{ item.order_details_json.trip.departure.address }}</text>
									</view>
								</view>
								<view
									class="uni-timeline-item"
									v-for="(passbyitem, index) in item.order_details_json.transfer"
									:key="index"
									v-if="item.order_details_json.transfer.length != 0"
								>
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">{{ passbyitem.localtion }}{{ passbyitem.address }}</text>
									</view>
								</view>
								<view class="uni-timeline-item uni-timeline-last-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">
											{{ item.order_details_json.trip.destination.localtion }}{{ item.order_details_json.trip.destination.address }}
										</text>
									</view>
								</view>
							</view>
							<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
						<view class="ui-order-price">{{ '￥' + item.order_price }}</view>
					</navigator>
					<view class="loading">{{ loadingText[0] }}</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container">
					<view v-if="empty[1]">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator
						class="ui-order-list-item ui-daizhifu"
						v-for="(item, index) in newsList[1]"
						:url="'/pages/orderdetail/orderdetail?ocode=' + item.ocode"
						:key="item.order_id"
						@longtap="deleteOrder(item.order_id)"
					>
						<view class="ui-wancheng">已完成</view>
						<view class="ui-order-list-item-top">
							<text class="ui-order-list-cartype">{{ item.car }}</text>
							<text>{{ item.sure_time }}</text>
						</view>
						<view class="ui-divide-line"></view>
						<view class="ui-order-timeline-container">
							<view class="ui-order-timeline uni-timeline">
								<view class="uni-timeline-item uni-timeline-first-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">{{ item.order_details_json.trip.departure.localtion }}{{ item.order_details_json.trip.departure.address }}</text>
									</view>
								</view>
								<view
									class="uni-timeline-item"
									v-for="(passbyitem, index) in item.order_details_json.transfer"
									:key="index"
									v-if="item.order_details_json.transfer.length != 0"
								>
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">{{ passbyitem.localtion }}{{ passbyitem.address }}</text>
									</view>
								</view>
								<view class="uni-timeline-item uni-timeline-last-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">
											{{ item.order_details_json.trip.destination.localtion }}{{ item.order_details_json.trip.destination.address }}
										</text>
									</view>
								</view>
							</view>
							<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
						<view class="ui-order-price">{{ '￥' + item.order_price }}</view>
					</navigator>
					<view class="loading">{{ loadingText[1] }}</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container">
					<view v-if="empty[2]">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator
						class="ui-order-list-item"
						v-for="(item, index) in newsList[2]"
						:url="'/pages/orderdetail/orderdetail?ocode=' + item.ocode"
						:key="item.order_id"
						@longtap="deleteOrder(item.order_id)"
					>
						<view class="ui-quxiao" v-if="item.status === 11">取消订单</view>
						<view class="ui-quxiao" v-if="item.status === 12">支付超时</view>
						<view class="ui-quxiao" v-if="item.status === 13">呼叫超时</view>
						<view class="ui-order-list-item-top">
							<text class="ui-order-list-cartype">{{ item.car }}</text>
							<text>{{ item.cancel_time }}</text>
						</view>
						<view class="ui-divide-line"></view>
						<view class="ui-order-timeline-container">
							<view class="ui-order-timeline uni-timeline">
								<view class="uni-timeline-item uni-timeline-first-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">{{ item.order_details_json.trip.departure.localtion }}{{ item.order_details_json.trip.departure.address }}</text>
									</view>
								</view>
								<view
									class="uni-timeline-item"
									v-for="(passbyitem, index) in item.order_details_json.transfer"
									:key="index"
									v-if="item.order_details_json.transfer.length != 0"
								>
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">{{ passbyitem.localtion }}{{ passbyitem.address }}</text>
									</view>
								</view>
								<view class="uni-timeline-item uni-timeline-last-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">
											{{ item.order_details_json.trip.destination.localtion }}{{ item.order_details_json.trip.destination.address }}
										</text>
									</view>
								</view>
							</view>
							<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
						<view class="ui-order-price">{{ '￥' + item.order_price }}</view>
					</navigator>
					<view class="loading">{{ loadingText[2] }}</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			empty: [false, false, false],
			loadingText: ['', '', ''],
			page: [1, 1, 1],
			has_next: [true, true, true],
			reload: [true, true, true],
			newsList: [[], [], []],
			tab: [
				{
					name: '进行中'
				},
				{
					name: '已完成'
				},
				{
					name: '已取消'
				}
			],
			status: ['0,1,2,3', '4,5', '11,12,13']
		};
	},
	onShow() {
		this.getnewsList();
	},
	onPullDownRefresh: function() {
		this.$set(this.has_next, this.current, true);
		this.$set(this.reload, this.current, true);
		this.$set(this.page, this.current, 1);
		this.getnewsList();
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		this.getnewsList();
		/*let that=this;
			let timer=null;
			if(timer != null){
			   clearTimeout(timer);
			}
			timer = setTimeout(function(){
			   this.getnewsList();   
			}, 1000);*/
	},
	methods: {
		tabChange: function(e) {
			var index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.current = index;
			this.$set(this.has_next, this.current, true);
			this.$set(this.reload, this.current, true);
			this.$set(this.page, this.current, 1);
			this.getnewsList();
		},
		swiperChange: function(e) {
			var index = e.target.current || e.detail.current;
			this.current = index;
		},
		deleteOrder: function(ocode) {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除该条信息吗',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						const data = {
							ocode: ocode
						};
						this.$uniFly
							.post({
								url: '/api/order/delorder',
								params: data
							})
							.then(function(res) {
								uni.hideNavigationBarLoading();
								if (res.code === 0) {
									uni.showToast({
										title: '删除',
										icon: 'success',
										mask: true,
										duration: 3000
									});
								} else {
									uni.showToast({
										content: res.msg,
										showCancel: false
									});
								}
							})
							.catch(function(error) {
								uni.hideNavigationBarLoading();
								uni.showToast({
									content: error,
									showCancel: false
								});
							});
					}
				}
			});
		},
		getnewsList: function() {
			let _self = this;
			let current = _self.current;
			if (_self.has_next[current]) {
				uni.showNavigationBarLoading();
				_self.$set(_self.loadingText, current, '加载中...');
				const data = {
					page: this.page[current],
					status: this.status[current]
				};
				this.$uniFly
					.post({
						url: '/api/order/getorderlist',
						params: data
					})
					.then(function(res) {
						uni.hideNavigationBarLoading();
						if (res.code === 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list;
								list = _self.parseOrderList(list);
								_self.$set(_self.empty, current, false);
								_self.newsList[current] = _self.reload[current] ? list : _self.newsList[current].concat(list);
								_self.$set(_self.newsList, current, _self.newsList[current]);
								_self.$set(_self.page, current, _self.page[current]++);
								_self.$set(_self.reload, current, false);
								_self.$set(_self.has_next, current, res.has_next);
								if (res.has_next) {
									_self.$set(_self.loadingText, current, '加载更多');
								} else {
									_self.$set(_self.loadingText, current, '已加载全部');
								}
							} else {
								_self.$set(_self.empty, current, true);
								_self.$set(_self.loadingText, current, '');
							}
						} else {
							uni.showToast({
								content: res.msg,
								showCancel: false
							});
						}
					})
					.catch(function(error) {
						uni.hideNavigationBarLoading();
						uni.showToast({
							content: error,
							showCancel: false
						});
					});
			}
		},
		parseOrderList(list) {
			for (let i = 0; i < list.length; i++) {
				list[i].order_details_json = JSON.parse(list[i].order_details_json);
			}
			return list;
		}
	}
};
</script>

<style>
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
</style>
