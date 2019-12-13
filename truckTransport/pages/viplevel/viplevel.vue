<template>
	<view class="content">
			<view class="dui-vip-bj"></view>
			<view class="dui-service-wrapper">
				<view class="dui-vip-card">
					<view class="dui-vip-type">
						<text>{{ user.user_level_id > 0 && !$drmking.isEmpty(levellist)? levellist[user.user_level_id].level_title : '新用户' }}</text>
						<navigator url="corporate-vip" v-if="user.user_type == 0">升级为企业会员</navigator>
						<view v-if="user.user_type == 1">企业会员</view>
					</view>
					<view class="dui-vip-phone">{{ user.phone ? user.phone.replace(user.phone.substring(3, 7), '****') : '未登录' }}</view>
					<view class="dui-vip-steps">当前等级成长值 : {{ user.user_level_id > 0 && !$drmking.isEmpty(levellist) ? levellist[user.user_level_id].level_rule : 0 }}</view>
				</view>
				<view class="dui-vip-strategy">
					<view class="dui-vip-growth">距离下一等级还差{{ score }}成长值 ></view>
					<navigator url="up-strategy" class="dui-vip-strategy-btn">升级攻略</navigator>
				</view>
				<view class="dui-vip-equity" v-for="(item_level, item_level_key) in levellist" :key="item_level.user_level_id">
					<view class="dui-vip-equity-title">{{ item_level.level_title }}会员权益</view>
					<block v-for="(gift_pack_item, gift_pack_index) in item_level.gift_pack_list" :key="gift_pack_item.gift_pack_id">
						<view class="dui-vip-giftpackage-list">
							<view class="dui-vip-giftpackage-item">
								<view class="dui-vip-giftpackage" v-if="gift_pack_item.status == 0"><text class="iconfont icon-suoding"></text></view>
								<view class="dui-vip-giftpackage unlock" v-if="gift_pack_item.status == 1"><text class="iconfont icon-youhuijuan"></text></view>
								<text>{{ gift_pack_item.gift_pack_title }}</text>
							</view>
						</view>
						<view class="dui-vip-equity">
							<view class="dui-vip-equity-title">优惠礼包</view>
							<view class="dui-vip-Receive-item" v-for="(gift_item, gift_index) in gift_pack_item.gift_list" :key="gift_item.gift_id">
								<view class="dui-vip-Receive-body">
									<view>【{{ gift_pack_item.gift_pack_title }}】:</view>
									<view v-for="(coupon_item, coupon_index) in gift_item.coupon_list" :key="coupon_index">
										{{ coupon_item.coupon_title }} {{ coupon_item.coupon_price }}元
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			levellist: {},
			score: 0,
			height:''
		};
	},
	async onLoad() {
		let that = this;
		let user_level_list = await that.$drmking.getUserLevelList(that);
		if (!that.$drmking.isEmpty(user_level_list)) {
			that.levellist = user_level_list;
		}
		this.getData();
	},
	onShow() {
		
	},
	computed: mapState(['user']),
	methods: {
		getData: function() {
			let that = this;
			this.$uniFly
				.post({
					url: '/api/user/getusernextlevel',
					params: {}
				})
				.then(function(res) {
					if (res.code == 0) {
						that.score = res.data;
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
scroll-view {
	height: 100%;
	padding-bottom: 40upx;
}

.dui-vip-bj {
	position: absolute;
	top: -1480upx;
	left: 50%;
	width: 1780upx;
	height: 1780upx;
	border-radius: 50%;
	background-color: #424456;
	transform: translateX(-50%);
}

.dui-vip-card {
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 250upx;
	box-sizing: border-box;
	margin-top: 20upx;
	padding: 40upx 40upx 0 40upx;
	border-radius: 20upx 20upx 0 0;
	background-color: #b8bbc4;
}

.dui-vip-type {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 40upx;
	color: #424456;
}

.dui-vip-type navigator,
.dui-vip-type view {
	padding: 5upx 15upx;
	font-size: 28upx;
	border: 1px solid #424456;
	border-radius: 24upx;
}

.dui-vip-phone {
	margin-top: 10upx;
	font-size: 20upx;
	color: #40424e;
}

.dui-vip-strategy {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 75upx;
	padding: 0 30upx;
	box-sizing: border-box;
	background-color: #ffe5b0;
	border-radius: 0 0 20upx 20upx;
	box-shadow: 0 2upx 8upx #a8a8a8;
}

.dui-vip-growth {
	font-size: 28upx;
	color: #805025;
}
.dui-vip-strategy-btn {
	padding: 5upx 16upx;
	font-size: 24upx;
	color: #805025;
	background-color: #fdf1cc;
	border: 1px solid #e1d19e;
	border-radius: 22upx;
}

.dui-vip-equity {
	margin-top: 20upx;
	padding: 40upx 0;
	background-color: #fff;
	border-radius: 20upx;
}

.dui-vip-equity-title {
	font-size: 38upx;
	color: #743c11;
	text-align: center;
}

.dui-vip-giftpackage-list {
	display: flex;
	flex-wrap: wrap;
}

.dui-vip-giftpackage-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
	padding-top: 40upx;
}

.dui-vip-giftpackage {
	width: 90upx;
	height: 90upx;
	line-height: 90upx;
	text-align: center;
	background-color: #f2f2f4;
	border-radius: 50%;
}
.active .dui-vip-giftpackage {
	border: 2px solid rgba(255, 255, 255, 0.6);
	box-sizing: border-box;
}
.dui-vip-giftpackage.unlock {
	background-color: #ff5723;
}

.dui-vip-giftpackage .icon-suoding {
	font-size: 50upx;
	color: #d8d8da;
}

.dui-vip-giftpackage .icon-youhuijuan {
	font-size: 50upx;
	color: #fff;
}

.dui-vip-giftpackage-item text {
	font-size: 26upx;
	margin-top: 20upx;
}

.dui-vip-Receive-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40upx;
	margin-top: 40upx;
}

.dui-vip-Receive-body view {
	font-size: 14px;
	line-height: 1.5;
}

.dui-vip-Receive-btn {
	padding: 5upx 20upx;
	font-size: 28upx;
	color: #ff5723;
	border: 1px solid #ff5723;
	border-radius: 40upx;
	text-align: center;
}
.dui-vip-steps {
	margin-top: 30upx;
	width: 100%;
	font-size: 30upx;
	color: #424456;
}
</style>
