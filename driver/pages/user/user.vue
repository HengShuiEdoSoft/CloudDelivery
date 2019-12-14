<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-user-bj"></view>
			<view class="dui-wrapper">
				<view @tap="navTo('/pages/setup/setup')">
					<view class="dui-user-information">
						<image :src="user.avatar ? user.avatar : '/static/img/HeadImg.jpg'"></image>
						<text class="dui-user-name">{{ user.phone ? user.phone.replace(user.phone.substring(3, 7), '****') : '未登录' }}</text>
					</view>
				</view>
				<view class="dui-user-assets">
					<view @tap="navTo('/pages/user/details')"><view class="dui-user-detail">提现明细</view></view>
					<view class="dui-user-total">
						<view class="dui-user-total-item">
							<text>{{ user.wallet ? user.wallet : 0 }}元</text>
							<text>钱包</text>
						</view>
						<view class="dui-user-total-item"><view @tap="navTo('/pages/user/pickup')" class="dui-user-pickup">提现</view></view>
					</view>
					<view class="dui-user-income-detail">
						<view class="dui-user-income-item">
							<text>今日</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text>{{ drivecenter.day_order_total }}/{{ drivecenter.day_order_total_price }}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>本周</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text>{{ drivecenter.week_order_total }}/{{ drivecenter.week_order_total_price }}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>本月</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text>{{ drivecenter.month_order_total }}/{{ drivecenter.month_order_total_price }}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>总接单/总收入</text>
							<text class="dui-user-praise">{{ drivecenter.order_total }}/{{ drivecenter.order_total_price }}</text>
						</view>
					</view>
				</view>
				<view class="dui-user-routine">
					<view @tap="navToInfo">
						<view class="dui-user-routine-item">
							<text class="iconfont icon-huoche"></text>
							<text>我的车辆</text>
						</view>
					</view>
					<view @tap="navTo('/pages/servicecenter/servicecenter')">
						<view class="dui-user-routine-item">
							<text class="iconfont icon--kefu"></text>
							<text>客服中心</text>
						</view>
					</view>
					<view @tap="navTo('/pages/user/about')">
						<view class="dui-user-routine-item">
							<text class="iconfont icon-xinxi-yuankuang"></text>
							<text>关于我们</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['forcedLogin', 'hasLogin','isConfirm', 'user']),
	onNavigationBarButtonTap: function(e) {
		let index = e.index;
		if (index === 0) {
			uni.navigateTo({
				url: '/pages/setup/setup'
			});
		}
	},
	data() {
		return {
			drivecenter: {
				order_total: 0,
				day_order_total: 0,
				week_order_total: 0,
				month_order_total: 0,
				order_total_price: 0,
				day_order_total_price: 0,
				week_order_total_price: 0,
				month_order_total_price: 0
			}
		};
	},
	onLoad() {
		this.getUsername();
	},
	methods: {
		getUsername() {
			if (this.user.phone) {
				this.username = this.user.phone.replace(this.user.phone.substring(3, 7), '****');
			} else {
				this.username = '未登录';
			}
		},
		navToInfo:function(){
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
			} else{ 
				if(this.user.car_number!==undefined){
					uni.navigateTo({
						url: '/pages/mycar/mycar'
					});
				}else{
					uni.navigateTo({
						url: '/pages/mycar/carinfo'
					});
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
		getData: function() {
			let that = this;
			this.$uniFly
				.post({
					url: '/api/user/getusernextlevel',
					params: {}
				})
				.then(function(res) {
					if (res.code === 0) {
						that.list = res.data;
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
scroll-view {
	height: 100%;
	padding-bottom: 40upx;
}
</style>
