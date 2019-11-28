<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-user-bj"></view>
			<view class="dui-wrapper">
				<view @tap="navTo('/pages/setup/setup')">
					<view class="dui-user-information">
						<image src="../../static/img/HeadImg.jpg" mode=""></image>
						<text class="dui-user-name">{{username}}</text>
					</view>
				</view>
				<view class="dui-user-assets">
					<view @tap="navTo('/pages/user/details')">
						<view class="dui-user-detail">提现明细</view>
					</view>
					<view class="dui-user-total">
						<view class="dui-user-total-item">
							<text v-if="!hasLogin">0</text>
							<text>{{list.order_total}}</text>
							<text>总接单</text>
						</view>
						<view class="dui-user-total-item">
							<text v-if="!hasLogin">0</text>
							<text>{{list.order_total_price}}</text>
							<text>总收入</text>
							<view @tap="navTo('/pages/user/pickup')" class="dui-user-pickup">提现</view>
						</view>
					</view>
					<view class="dui-user-income-detail">
						<view class="dui-user-income-item">
							<text>今日</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text v-if="!hasLogin">0/0</text>
								<text>{{list.day_order_total}}/{{list.day_order_total_price}}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>本周</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text v-if="!hasLogin">0/0</text>
								<text>{{list.week_order_total}}/{{list.week_order_total_price}}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>本月</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text v-if="!hasLogin">0/0</text>
								<text>{{list.month_order_total}}/{{list.month_order_total_price}}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>好评</text>
							<text class="dui-user-praise">100%</text>
						</view>
					</view>
				</view>
				<view class="dui-user-routine">
					<view @tap="navTo('/pages/mycar/mycar')">
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
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: "/pages/setup/setup"
				});
			}
		},
		data() {
			return {
				username:"",
				list:{}
			}
		},
		onLoad() {
			this.getUserphone();
			this.getUsername()
		},
		computed: mapState(['forcedLogin','hasLogin','user']),
		methods: {
			getUsername() {
				if(this.user.phone){
					this.username = this.user.phone.replace(this.user.phone.substring(3, 7), '****');
				}
				else{
					this.username='未登录';
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
			getData:function(){
				let that=this
				this.$uniFly
				.post({
					url: '/api/user/getusernextlevel',
					params:{}
				})
				.then(function(res) {
					if (res.code === 0 ) {
						that.list=res.data
										
					} else {
						uni.showToast({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showToast({
						content: error,
						showCancel: false
					});
				});
			}
		}
	}
</script>
<style>
	scroll-view {
		height: 100%;
		padding-bottom: 40upx;
	}
</style>
