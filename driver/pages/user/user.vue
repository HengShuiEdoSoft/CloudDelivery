<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-user-bj"></view>
			<view class="dui-wrapper">
				<navigator url="/pages/setup/setup">
					<view class="dui-user-information">
						<image src="../../static/img/HeadImg.jpg" mode=""></image>
						<text class="dui-user-name">尼古拉斯·赵四</text>
						<text class="dui-user-phone">18888888888</text>
					</view>
				</navigator>
				<view class="dui-user-assets">
					<navigator url="/pages/user/details">
						<view class="dui-user-detail">提现明细</view>
					</navigator>
					<view class="dui-user-total">
						<view class="dui-user-total-item">
							<text>{{list.order_total}}</text>
							<text>总接单</text>
						</view>
						<view class="dui-user-total-item">
							<text>{{list.order_total_price}}</text>
							<text>总收入</text>
							<navigator url="/pages/user/pickup" class="dui-user-pickup">提现</navigator>
						</view>
					</view>
					<view class="dui-user-income-detail">
						<view class="dui-user-income-item">
							<text>今日</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text>{{list.day_order_total}}/{{list.day_order_total_price}}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>本周</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text>{list.week_order_total}}/{{list.week_order_total_price}}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>本月</text>
							<view class="dui-user-income-box">
								<text>接单量/收入</text>
								<text>{list.month_order_total}}/{{list.month_order_total_price}}</text>
							</view>
						</view>
						<view class="dui-user-income-item">
							<text>好评</text>
							<text class="dui-user-praise">100%</text>
						</view>
					</view>
				</view>
				<view class="dui-user-routine">
					<navigator url="/pages/mycar/mycar">
						<view class="dui-user-routine-item">
							<text class="iconfont icon-huoche"></text>
							<text>我的车辆</text>
						</view>
					</navigator>
					<navigator url="/pages/servicecenter/servicecenter">
						<view class="dui-user-routine-item">
							<text class="iconfont icon--kefu"></text>
							<text>客服中心</text>
						</view>
					</navigator>
					<navigator url="/pages/user/about">
						<view class="dui-user-routine-item">
							<text class="iconfont icon-xinxi-yuankuang"></text>
							<text>关于我们</text>
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
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
				list:{}
			}
		},
		methods: {
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
