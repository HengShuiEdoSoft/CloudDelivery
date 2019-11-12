<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index"
			 :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="ui-coupon-list">
						<view class="ui-coupon-item">
							<view class="ui-coupon-item-body">
								<view>
									<view class="ui-coupon-price"><text>￥</text><text class="ui-coupon-price-num">10</text></view>
									<view class="ui-coupon-subtext">下单立减</view>
								</view>
								<view class="ui-coupon-center">
									<view>拉货就找云配送</view>
									<view class="ui-coupon-time">2019.10.21~2019.10.28</view>
									<view @tap="isShow" class="ui-coupon-detail-btn">更多详情<text class="iconfont icon-gengduo-hengxiang"></text></view>
								</view>
								<view>
									<navigator class="ui-coupon-use">立即使用</navigator>
								</view>
							</view>
							<view :class="{active:show}" class="ui-coupon-detail">
								<view>1.适用车型：所有车型</view>
								<view>2.适用城市（区域）：全国</view>
								<view>3.有效时间：2019.10.21~2019.10.28</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="ui-coupon-list ash-placing">
						<view class="ui-coupon-item">
							<view class="ui-coupon-item-body">
								<view>
									<view class="ui-coupon-price"><text>￥</text><text class="ui-coupon-price-num">10</text></view>
									<view class="ui-coupon-subtext">下单立减</view>
								</view>
								<view class="ui-coupon-center">
									<view>拉货就找云配送</view>
									<view class="ui-coupon-time">2019.10.21~2019.10.28</view>
									<view @tap="isShow" class="ui-coupon-detail-btn">更多详情<text class="iconfont icon-gengduo-hengxiang"></text></view>
								</view>
								<view>
									<navigator class="ui-coupon-use">已使用</navigator>
								</view>
							</view>
							<view :class="{active:show}" class="ui-coupon-detail">
								<view>1.适用车型：所有车型</view>
								<view>2.适用城市（区域）：全国</view>
								<view>3.有效时间：2019.10.21~2019.10.28</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="ui-coupon-list ash-placing">
						<view class="ui-coupon-item">
							<view class="ui-coupon-item-body">
								<view>
									<view class="ui-coupon-price"><text>￥</text><text class="ui-coupon-price-num">10</text></view>
									<view class="ui-coupon-subtext">下单立减</view>
								</view>
								<view class="ui-coupon-center">
									<view>拉货就找云配送</view>
									<view class="ui-coupon-time">2019.10.21~2019.10.28</view>
									<view @tap="isShow" class="ui-coupon-detail-btn">更多详情<text class="iconfont icon-gengduo-hengxiang"></text></view>
								</view>
								<view>
									<navigator class="ui-coupon-use">已过期</navigator>
								</view>
							</view>
							<view :class="{active:show}" class="ui-coupon-detail">
								<view>1.适用车型：所有车型</view>
								<view>2.适用城市（区域）：全国</view>
								<view>3.有效时间：2019.10.21~2019.10.28</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				current: 0,
				tab: [{
					name: "未使用",
				}, {
					name: "已使用",
				}, {
					name: "已过期",
				}]
			}
		},
		onLoad() {

		},
		methods: {
			isShow: function() {
				this.show = !this.show
			},
			tabChange: function(e) {
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index;
			},
			swiperChange: function(e) {
				var index = e.target.current || e.detail.current;
				this.current = index;
			}
		}
	}
</script>
<style>
	swiper {
		height: 100%;
	}

	scroll-view {
		height: 100%;
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
		border-bottom: 4upx solid #FF5723;
		background: #fff;
		border-radius: 8upx;
	}

	.ui-coupon-price {
		padding-right: 20upx;
		margin-right: 20upx;
		color: #FF5723;
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
		color: #FF5723;
		border: 1px solid #FF5723;
	}

	.ui-coupon-list.ash-placing {
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		filter: grayscale(100%);
		filter: gray;
	}
</style>
