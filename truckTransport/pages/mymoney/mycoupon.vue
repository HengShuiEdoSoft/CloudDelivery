<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view>
			<!-- <view class="dui-coupon-input"><input type="text" value="" focus="true" placeholder="按此输入兑换码" /></view> -->
			<view v-if="list.length === 0">
				<view class="dui-notyet-wrapper">
					<image src="../../static/img/NoCoupon.jpg" mode=""></image>
					<text>您的优惠券为空</text>
				</view>
			</view>
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
						<view v-if="item.status === 1"><navigator class="ui-coupon-use" :url="'/pages/index/index' + item.user_coupon_id">立即使用</navigator></view>
						<view v-if="item.status === 0"><view class="ui-coupon-use-b">不可用</view></view>
					</view>
					<view :class="{ active: index == current }" class="ui-coupon-detail">
						<view>1.适用车型：{{ item.car_title }}</view>
						<view>2.适用城市（区域）：全国</view>
						<view>3.使用限制：满{{ item.sill }}使用</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: '',
			show: false,
			reload: true,
			has_next: true,
			page: 1,
			list: []
		};
	},
	onLoad() {
		this.getList();
	},
	onPullDownRefresh: function() {
		this.has_next = true;
		this.reload = true;
		this.getList();		
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		this.getList();
	},
	methods: {
		seeDetail(index) {
			this.current = index;
		},
		getList: function() {
			let _self = this;
			if (_self.has_next) {
				uni.showNavigationBarLoading();
				// _self.$set(_self.loadingText, current, '加载中...');
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
						if (res.code === 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list;
								_self.list = _self.list ? list : _self.list.concat(list);
								_self.page = _self.page++;
								_self.reload = false;
								_self.has_next = res.has_next;
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
		}
	}
};
</script>

<style>
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
