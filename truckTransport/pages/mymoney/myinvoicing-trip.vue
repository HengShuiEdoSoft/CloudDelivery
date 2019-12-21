<template>
	<view class="content">
		<scroll-view  @scrolltoupper="upper" @scrolltolower="lower" class="scroll-container" scroll-y :style="height">
			<view v-if="lists.length < 1">
				<view class="dui-notyet-wrapper">
					<image src="/static/img/NoOrder.jpg" mode=""></image>
					<text>您还没有可开发票</text>
				</view>
			</view>
			<view class="ui-order-list" v-if="lists.length > 0">
				<checkbox-group class="ui-order-list-item" @change="checkboxChange">
					<block v-for="(item, index) in lists" :key="index">
						<view class="ui-order-list-item-top">
							<text class="ui-order-list-cartype">{{ item.car }}</text>
							<text>{{ item.sure_time }}</text>
						</view>
						<view class="ui-divide-line"></view>
						<view class="ui-list-line">
							<view class="ui-order-content">
								<view class="ui-ocode">订单号：{{ item.ocode }}</view>
								<view>行程：{{ item.order_details_json.trip.departure.localtion }} - {{ item.order_details_json.trip.destination.localtion }}</view>
							</view>
							<view><checkbox :value="String(index)" :checked="item.checked" color="#FF5723" /></view>
						</view>
						<view class="ui-order-price">￥{{ item.order_price }}</view>
					</block>
				</checkbox-group>
				<view class="loading">{{ loadingText }}</view>
			</view>
			<view class="dui-fixed-bottom-btn" @tap="goInvoice">
				<view><button class="primary" type="primary">开发票</button></view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			loadingText: '',
			empty: false,
			page: 1,
			reload: true,
			has_next: true,
			lists: [],
			order_ids: '',
			price: 0,
			height: ''
		};
	},
	onLoad() {
		this.height="height:"+uni.getSystemInfoSync().windowHeight+'px';
	},
	onNavigationBarButtonTap: function(e) {
		let index = e.index;
		if (index === 0) {
			uni.redirectTo({
				url: '/pages/mymoney/mymoney'
			});
		}
	},
	onShow: function() {
		this.getList();
	},	
	methods: {
		upper: function() {
			this.has_next = true;
			this.reload = true;
			this.page = 1;
			this.getList();
		},
		lower: function() {
			let _self = this;
			let timer = null;
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.getList();
			}, 1000);
		},
		checkboxChange: function(e) {
			let order_ids = [];
			let price = 0;
			let indexs = e.detail.value;
			for (let i = 0; i < indexs.length; i++) {
				order_ids.push(this.lists[i].order_id);
				price = price + parseFloat(this.lists[i].order_price);
			}
			this.order_ids = order_ids.join(',');
			this.price = price;
		},
		getList: function() {
			let _self = this;
			if (_self.has_next) {
				uni.showNavigationBarLoading();
				_self.loadingText = '加载中...';
				const data = {
					page: this.page,
					status: '4,5',
					invoice_status: 0
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
								_self.empty = false;
								list = _self.parseOrderList(list);
								_self.lists = _self.reload ? list : _self.lists.concat(list);
								_self.page = _self.page+1;
								_self.reload = false;
								_self.has_next = res.data.has_next;
								if (res.data.has_next) {
									_self.loadingText = '加载更多';
								} else {
									_self.loadingText = '已加载全部';
								}
							} else {
								_self.empty = true;
								_self.loadingText = '';
							}
						} else {
							uni.showModal({
								content: res.msg,
								showCancel: false
							});
						}
					})
					.catch(function(error) {
						uni.hideNavigationBarLoading();
						uni.showModal({
							content: error,
							showCancel: false
						});
					});
			}
		},
		goInvoice: function() {
			let that = this;
			const data = {
				order_ids: that.order_ids,
				price: that.price
			};
			that.$uniFly
				.post({
					url: '/api/invoice/addinvoice',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							title: '已提交发票申请',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000);						
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
		parseOrderList(list) {
			for (let i = 0; i < list.length; i++) {
				list[i].order_details_json = JSON.parse(list[i].order_details_json);
				list[i]['checked'] = false;
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
.ui-order-price {
	line-height: 80upx;
	font-weight: 600;
	text-align: right;
}
.ui-ocode {
	color: #ff5723;
}
.ui-order-content {
	flex: 1;
	line-height: 64upx;
}
.ui-list-line {
	padding: 20upx 0;
	display: flex;
	align-items: center;
}
</style>
