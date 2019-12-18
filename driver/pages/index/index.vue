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
		<view>
			<view class="ui-grid">
				<view @tap="goaview(item.text, item.scode)" class="ui-grid-item ui-grid-item4" v-for="(item, index) in fuwuList" :key="index">
					<image class="center-img" :src="item.url" mode="aspectFit"></image>
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>

		<view style="margin-top:30upx;">
			<view class="ui-title">用车租车</view>
			<swiper @change="swiperChange" :current="current">
				<swiper-item v-for="(item, index) in yczcList" :key="index">
					<view class="ui-grid" @tap="goaview(item.text, item.scode)">
						<view class="ui-grid-item ui-grid-item2" style="width: 100%;">
							<text class="iconfont icon-single"></text>
							<view>
								<view>{{ item.text }}</view>
								<view class="ui-subtext">{{ item.content }}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="margin-top:30upx;">
			<view class="ui-title">司机动态</view>
			<view style="padding:0 30upx;"><textscroll :list="orderList" /></view>
		</view>
		<view style="margin-top:30upx;width: 100vw;overflow: hidden;">
			<view class="ui-title">常见问题</view>
			<view>
				<view @tap="goaview(item.text, item.scode)" class="ui-article-list" v-for="(item, index) in cjwtList" :key="index">
					<view>{{ item.text }}</view>
					<view class="ui-subtext">{{ item.content }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			current: 0,
			list: [],
			fuwuList: [],
			yczcList: [],
			orderList: [],
			cjwtList: []
		};
	},
	computed: mapState(['hasLogin', 'user']),
	onLoad() {
		let that = this;
		that.$drmking
			.init(that)
			.then(async () => {
				let location_city = await that.$drmking.getLocationCity();
				if (that.$drmking.isEmpty(location_city)) {
					that.$drmking.getDefaultCity();
					await that.$drmking.changeLocationCity(that);
					location_city = that.$drmking.getLocationCity();
				}
				that.location_city = location_city;
			})
			.catch(e => {
				console.log(e);
			});
		that.getFuwuList();
		that.getYczcList();
		that.getOrderList();
		that.getCjwtList();
	},
	methods: {
		goaview(text, scode) {
			uni.navigateTo({
				url: '/pages/setup/aview?title=' + text + '&scode=' + scode
			});
		},
		getFuwuList() {
			let that = this;
			that.$uniFly
				.post({
					url: '/api/article/getarticlelist',
					params: {
						sname: that.$drmking.md5('全部服务')
					}
				})
				.then(res => {
					if (res.code == 0) {
						let list = [];
						for (let i = 0; i < res.data.list.length; i++) {
							list.push({
								scode: res.data.list[i].scode,
								url: res.data.list[i].img_image,
								text: res.data.list[i].title
							});
						}
						that.fuwuList = list;
					}
				})
				.catch(err => {});
		},
		getYczcList() {
			let that = this;
			that.$uniFly
				.post({
					url: '/api/article/getarticlelist',
					params: {
						sname: that.$drmking.md5('用车租车')
					}
				})
				.then(res => {
					if (res.code == 0) {
						let list = [];
						for (let i = 0; i < res.data.list.length; i++) {
							//截取html标签
							let dd = res.data.list[i].content.replace(/<[^>]+>/g, '');
							//截取空格等特殊标签
							let dds = dd.replace(/ /gi, '');
							dds = dds.replace(/&nbsp;/gi, '');
							list.push({
								scode: res.data.list[i].scode,
								text: res.data.list[i].title,
								content: dds
							});
						}
						that.yczcList = list;
					}
				})
				.catch(err => {});
		},
		getOrderList() {
			let that = this;
			that.$uniFly
				.get({
					url: '/api/order/gettop10',
				})
				.then(res => {
					if (res.code == 0) {
						that.orderList = res.data;
					}
				})
				.catch(err => {});
		},
		getCjwtList() {
			let that = this;
			that.$uniFly
				.post({
					url: '/api/article/getarticlelist',
					params: {
						sname: that.$drmking.md5('常见问题')
					}
				})
				.then(res => {
					if (res.code == 0) {
						let list = [];
						for (let i = 0; i < res.data.list.length; i++) {
							//截取html标签
							let dd = res.data.list[i].content.replace(/<[^>]+>/g, '');
							//截取空格等特殊标签
							let dds = dd.replace(/ /gi, '');
							dds = dds.replace(/&nbsp;/gi, '');
							list.push({
								scode: res.data.list[i].scode,
								text: res.data.list[i].title,
								content: dds
							});
						}
						that.cjwtList = list;
					}
				})
				.catch(err => {});
		},
		swiperChange: function(e) {
			let index = e.target.current || e.detail.current;
			this.current = index;
		},
		navToInfo: function() {
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
				if (this.user.car_number !== undefined) {
					uni.navigateTo({
						url: '/pages/mycar/mycar'
					});
				} else {
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
				uni.switchTab({
					url: url,
					fail(e) {
						uni.navigateTo({
							url: url
						});
					}
				});
			}
		}
	}
};
</script>

<style>
.content {
	background: #fff;
}
swiper {
	height: 104upx;
}
.center-text {
	text-align: center;
}
.center-img {
	width: 100%;
	height: 64px;
}
.ui-grid {
	flex-wrap: wrap;
}
._notice{
	height: 40px !important;
}
</style>
