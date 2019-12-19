<template>
	<view class="content">
		<view class="status_bar"></view>
		<view class="ui-grid" style="background: #FF5723;color:#fff;">
			<view class="ui-grid-item ui-grid-item4" @tap="navTo('/pages/index/qiang')">
				<text class="iconfont icon-huoche1"></text>
				<view>抢单大厅</view>
			</view>
			<view class="ui-grid-item ui-grid-item4" @tap="navTo('/pages/order/order')">
				<text class="iconfont icon-dingdan1"></text>
				<view>个人订单</view>
			</view>
			<view class="ui-grid-item ui-grid-item4" @tap="navTo('/pages/user/pickup')">
				<text class="iconfont icon-qianbao-kuai"></text>
				<view>金额提现</view>
			</view>
			<view class="ui-grid-item ui-grid-item4" @tap="navToInfo">
				<text class="iconfont icon-renzheng"></text>
				<view>车辆信息</view>
			</view>
		</view>
		<view style="margin-top:30upx;">
			<view class="ui-title">精选文章</view>
			<swiper @change="swiperChange" :current="current">
				<swiper-item>
					<view class="ui-grid">
						<view class="ui-grid-item ui-grid-item2">
							<text class="iconfont icon-single"></text>
							<view>
								<view>电子表格你先忙</view>
								<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
							</view>
						</view>
						<view class="ui-grid-item ui-grid-item2">
							<text class="iconfont icon-single"></text>
							<view>
								<view>电子表格你先忙</view>
								<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="ui-grid">
						<view class="ui-grid-item ui-grid-item2">
							<text class="iconfont icon-single"></text>
							<view>
								<view>电子表格你先忙</view>
								<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
							</view>
						</view>
						<view class="ui-grid-item ui-grid-item2">
							<text class="iconfont icon-single"></text>
							<view>
								<view>电子表格你先忙</view>
								<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="margin-top:30upx;">
			<view class="ui-title">简讯</view>
			<view style="padding:0 30upx;"><textscroll :list="list"/></view>
		</view>
		<view style="margin-top:30upx;width:100vw;overflow: hidden;">
			<view class="ui-title">推荐阅读</view>		
			<view>
				<view class="ui-article-list">
					<view>电子表格你先忙</view>
					<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
				</view>
				<view class="ui-article-list">
					<view>电子表格你先忙</view>
					<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
				</view>
				<view class="ui-article-list">
					<view>电子表格你先忙</view>
					<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
				</view>
				<view class="ui-article-list">
					<view>电子表格你先忙</view>
					<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
				</view>
				<view class="ui-article-list">
					<view>电子表格你先忙</view>
					<view class="ui-subtext">上拉活儿网尽享好礼上拉活儿网尽享好礼上拉活儿网尽享好礼上拉活儿网尽享好礼</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		data(){
			return{
				current:0,
				list:['1分钟前，无夏购买了会员无夏购买了会员无夏购买了会员无夏购买了会员无夏购买了会员无夏购买了会员','2分钟前，无夏购买了会员无夏购买了会员无夏购买了会员','3分钟前，无夏购买了会员']
			}
		},
		computed: mapState(['hasLogin']),
		methods:{
			swiperChange: function(e) {
				let index = e.target.current || e.detail.current;
				this.current = index;
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
		}
	}
</script>

<style>
	.content{background: #fff;}
	swiper{height:104upx;}
</style>
