<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<!-- <view class="dui-coupon-input"><input type="text" value="" focus="true" placeholder="按此输入兑换码" /></view> -->
		<view v-if="list.length === 0">
			<view class="dui-notyet-wrapper">
				<image src="/static/img/NoCoupon.jpg" mode=""></image>
				<text>您的优惠券为空</text>
			</view>
		</view>
		<scroll-view class="scroll-view" v-if="list.length > 0" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower">
			<view class="ui-coupon-list">
				<view class="ui-coupon-item" v-for="(item, index) in list" :key="item.user_coupon_id">
					<view class="ui-coupon-item-body">
						<view>
							<view class="ui-coupon-price">
								<text>￥</text>
								<text class="ui-coupon-price-num">{{ item.coupon_price }}</text>
							</view>
							<view class="ui-coupon-subtext">{{ item.coupon_title }}</view>
						</view>
						<view class="ui-coupon-center">
							<view>{{ item.car_title }}</view>
							<view class="ui-coupon-time">满{{ item.sill }}使用</view>
							<view @tap="seeDetail(index)" class="ui-coupon-detail-btn">
								更多详情
								<text class="iconfont icon-gengduo-hengxiang"></text>
							</view>
						</view>
						<view v-if="item.status === 0" @tap="receiveCoupon"><view class="ui-coupon-use">领取全部</view></view>
						<view v-if="item.status === 1"><navigator class="ui-coupon-use" :url="'/pages/index/index?user_coupon_id=' + item.user_coupon_id">立即使用</navigator></view>
						<view v-if="item.status === -1"><view class="ui-coupon-use-b">失效</view></view>
					</view>
					<view :class="{ active: index == current }" class="ui-coupon-detail">
						<view>1.适用车型：{{ item.car_title }}</view>
						<view>2.适用城市（区域）：全国</view>
						<view>3.使用限制：满{{ item.sill }}使用</view>
					</view>
				</view>
			</view>
			<view class="loading">{{ loadingText }}</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: '',
			show: false,
			loadingText: '',
			reload: true,
			has_next: true,
			page: 1,
			list: [],
			height: ''
		};
	},
	onLoad() {
		this.getList();
	},
	onShow() {},
	methods: {
		upper: function() {
			this.has_next = true;
			this.reload = true;
			this.page = 1;
			this.getList();
		},
		lower: function() {
			this.getList();
		},
		seeDetail(index) {
			this.current = index;
		},
		receiveCoupon: function() {
			let that = this;
			this.$uniFly
				.post({
					url: '/api/user_coupon/addusercoupon',
					params: {}
				})
				.then(function(res) {
					uni.hideNavigationBarLoading();
					if (res.code === 0) {
						uni.showToast({
							title: '领取成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						that.upper();
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
						content: JSON.stringify(error),
						showCancel: false
					});
				});
		},
		deleteCoupon: function(id, index) {
			let that = this;
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除该条信息吗',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						const data = {
							user_coupon_ids: id
						};
						this.$uniFly
							.post({
								url: '/api/user_coupon/delusercoupon',
								params: data
							})
							.then(function(res) {
								uni.hideNavigationBarLoading();
								if (res.code === 0) {
									uni.showToast({
										title: '已删除',
										icon: 'success',
										mask: true,
										duration: 3000
									});
									that.list.splice(index, 1);
									that.$set(that, 'list', that.list);
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
									content: JSON.stringify(error),
									showCancel: false
								});
							});
					}
				}
			});
		},
		getList: function() {
			let _self = this;
			if (_self.has_next) {
				uni.showNavigationBarLoading();
				_self.loadingText = '加载中...';
				const data = {
					page: this.page
				};
				this.$uniFly
					.post({
						url: '/api/user_coupon/getusercouponlist',
						params: data
					})
					.then(function(res) {
						uni.hideNavigationBarLoading();
						if (res.code == 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list;
								for (let i = 0; i < list.length; i++) {
									if (list[i].car_id == 0) {
										list[i].car_title = '通用';
									}
								}
								_self.list = _self.reload ? list : _self.list.concat(list);
								_self.page = _self.page + 1;
								_self.reload = false;
								_self.has_next = res.data.has_next;
								if (res.data.has_next) {
									_self.loadingText = '加载更多';
								} else {
									_self.loadingText = '已加载全部';
								}
							} else {
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
							content: JSON.stringify(error),
							showCancel: false
						});
					});
			}
		}
	}
};
</script>

<style>
.scroll-view {
	/* #ifdef H5 */
	height: calc(100vh - 100rpx - env(safe-area-inset-bottom) - var(--status-bar-height));
	/* #endif */
	/* #ifdef APP-PLUS */
	height: calc(100vh - env(safe-area-inset-bottom));
	/* #endif */
}
.dui-coupon-input {
	background-color: #fff;
	padding: 35upx;
}
.ui-coupon-detail {
	padding: 28upx;
	display: none;
	color: #999;
	background: #fff;
}
.ui-coupon-detail.active {
	display: block;
}
.ui-coupon-item {
	margin: 30upx 16upx;
	font-size: 14px;
}
.ui-coupon-subtext {
	font-size: 12px;
	color: #999;
}
.ui-coupon-item-body {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 8upx;
	padding: 28upx;
	border-bottom: 4upx solid #ff5723;
	background: #fff;
	border-radius: 8upx;
}
.ui-coupon-price {
	padding-right: 20upx;
	margin-right: 20upx;
	color: #ff5723;
	border-right: 1px dashed #eee;
}
.ui-coupon-price-num {
	font-size: 36px;
}
.ui-coupon-center {
	flex: 1;
	font-size: 16px;
}
.ui-coupon-time {
	padding-top: 8upx;
	font-size: 12px;
}
.ui-coupon-detail-btn {
	padding-top: 12upx;
	font-size: 12px;
	color: #999;
}
.ui-coupon-use {
	display: inline-block;
	padding: 8upx 24upx;
	border-radius: 54upx;
	color: #ff5723;
	border: 1px solid #ff5723;
}
.ui-coupon-use-b {
	display: inline-block;
	padding: 8upx 24upx;
	border-radius: 54upx;
	color: #999;
	border: 1px solid #ccc;
}
</style>
