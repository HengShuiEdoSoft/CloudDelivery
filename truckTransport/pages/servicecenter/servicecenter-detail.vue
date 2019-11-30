<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-detail-wrapper">
				<view class="dui-service-detail-title">{{ data.title }}</view>
				<view class="dui-service-detail-content"><parser :html="data.content"></parser></view>
			</view>
			<view class="dui-scrvice-tel" @tap="call">
				<text class="iconfont icon-dianhua"></text>
				<text>客服热线 {{ sysconfig.service_tel }}</text>
			</view>
		</scroll-view>
		<view class="dui-online-service"><image src="../../static/img/call.jpg" @tap="call"></image></view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import parser from '@/components/jyf-Parser/index';
export default {
	components: {
		parser
	},
	computed: mapState(['sysconfig']),
	onNavigationBarButtonTap: function(e) {
		let index = e.index;
		if (index === 0) {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	},
	onLoad(options) {
		this.scode = options.scode;
		this.getData();
	},
	data() {
		return {
			data: {
				
			}
		};
	},
	methods: {
		call: function(e) {
			uni.makePhoneCall({
				phoneNumber: this.sysconfig.service_tel
			});
		},
		getData() {
			let _self = this;
			const data = {
				scode: this.scode
			};
			this.$uniFly
				.get({
					url: '/api/article/getarticledetail',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						_self.data = res.data;
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
.scroll-container {
	height: 100%;
}

.dui-service-detail-wrapper {
	padding: 0 30upx 80upx 30upx;
	background-color: #fff;
	position: relative;
}

.dui-service-detail-title {
	padding: 60upx 0;
	font-size: 40upx;
}

.dui-service-detail-content {
	font-size: 28upx;
	color: #646464;
	line-height: 50upx;
}
</style>
