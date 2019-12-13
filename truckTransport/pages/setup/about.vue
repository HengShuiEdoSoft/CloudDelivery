<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-about-icon">
				<image src="/static/img/logo.png"></image>
				<text>{{ sysconfig.site_name }}</text>
			</view>

			<view class="dui-about-wrapper">
				<view class="dui-about-text">
					<parser :html="data?data.content:''"></parser>
				</view>
				<view class="ui-divide-line"></view>
				<view class="dui-about-text">
					电话：
					<text @tap="call">{{ sysconfig.service_tel }}</text>
					<br />
					邮箱：
					<text>{{ sysconfig.service_email }}</text>
					<br />
					网址：
					<text>{{ sysconfig.site_root_host }}</text>
					<br />
				</view>
			</view>
		</scroll-view>
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
	data() {
		return {
			data: null
		};
	},
	onLoad() {
		this.getData();
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
				scode: _self.$drmking.md5('关于我们')
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
						content: JSON.stringify(error),
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

.dui-about-icon {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50upx 0;
	font-size: 28upx;
}

.dui-about-icon image {
	width: 150upx;
	height: 150upx;
	margin-bottom: 30upx;
}

.dui-about-wrapper {
	padding: 0 36upx;
	background-color: #fff;
}

.dui-about-text {
	padding: 36upx 0;
	font-size: 30upx;
	color: #212121;
	line-height: 50upx;
}

text {
	color: #ff5723;
}
</style>
