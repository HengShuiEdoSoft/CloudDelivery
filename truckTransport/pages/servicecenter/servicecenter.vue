<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-wrapper">
				<view class="dui-service-bj"></view>
				<!--<view class="dui-scrvice-custom-wrapper" style="color: #fff;">
					<text>最近订单</text>
					<navigator url="complaintorder">更多<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></navigator>
				</view>
				<view class="dui-scrvice-order">
					暂未开通
				</view>
				<view class="dui-gap"></view>
				<view class="dui-gap"></view>-->

				<view class="dui-scrvice-custom-wrapper" style="background-color: #fff;"><text>常见问题</text></view>
				<view class="dui-basic-list">
					<block v-for="(item, index) in lists" :key="item.article_category_id">
						<navigator :url="'servicecenter-list?sname=' + item.name+'&title='+item.title">
							<view class="dui-basic-list-item">
								<view class="dui-basic-list-item__container">
									<view class="dui-basic-list-item__content">
										<view class="dui-basic-list-item__content-title">{{ item.stitle }}</view>
									</view>
									<view class="dui-basic-list-item__extra"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
								</view>
							</view>
						</navigator>
					</block>
				</view>
				<view class="dui-gap"></view>
				<view class="dui-gap"></view>
				<!--<navigator url="feedback">
					<view class="dui-scrvice-custom-wrapper" style="background-color: #fff;">
						<text>我的反馈记录</text>
						<view class="dui-basic-list-item__extra">
							<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
						</view>
					</view>
				</navigator>-->
				<view class="dui-scrvice-tel" @tap="call">
					<text class="iconfont icon-dianhua"></text>
					<text>客服热线 {{ sysconfig.service_tel }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="dui-online-service"><image src="../../static/img/call.jpg" @tap="call"></image></view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['sysconfig']),
	onNavigationBarButtonTap: function(e) {
		let index = e.index;
		if (index === 0) {
			uni.navigateTo({
				url: '/pages/mymoney/mydetailed'
			});
		}
	},
	data() {
		return {
			lists: []
		};
	},
	onLoad() {
		this.getList();
	},
	onPullDownRefresh() {
		this.getList();
		uni.stopPullDownRefresh();
	},
	methods: {
		call: function(e) {
			uni.makePhoneCall({
				phoneNumber: this.sysconfig.service_tel
			});
		},
		getList: function() {
			let that = this;
			that.$uniFly
				.get({
					url: '/api/article_category/getarticlecategorylist',
					params: {}
				})
				.then(res => {
					if (res.code == 0) {
						that.lists = res.data;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					}
				})
				.catch(err => {
					uni.showToast({
						icon: 'none',
						title: '获取失败请重试！'
					});
				});
		}
	}
};
</script>
<style>
.scroll-container {
	height: 100%;
}

.dui-service-wrapper {
	padding: 0 15upx;
	position: relative;
}

.dui-service-bj {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 300upx;
	background-color: #434456;
}

.dui-basic-list-item__container {
	padding-top: 35upx;
	padding-bottom: 35upx;
}

.dui-scrvice-custom-wrapper {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40upx 30upx;
	font-size: 32upx;
}

.dui-scrvice-custom-wrapper navigator {
	font-size: 28upx;
}

.dui-basic-list-item__content,
.dui-basic-list-item__extra {
	font-size: 26upx;
	color: #797979;
}

.dui-scrvice-order {
	position: relative;
	width: 100%;
	height: 294upx;
	background-color: #fff;
	border-radius: 4upx;
	box-shadow: 0px 2px 5px #e2e2e2;
}
</style>
