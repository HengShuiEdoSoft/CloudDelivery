<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-detail-wrapper">
				<block v-for="(item, index) in lists" :key="index">
					<view class="dui-service-detail-title">{{ item.title }}</view>
					<view class="dui-service-detail-content"><parser :html="item.content"></parser></view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import parser from '@/components/jyf-Parser/index';
export default {
	components: {
		parser
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
		getList() {
			let that = this;
			that.$uniFly
				.post({
					url: '/api/article/getarticlelist',
					params: {
						sname: that.$drmking.md5('我的司机说明')
					}
				})
				.then(res => {
					if (res.code == 0) {
						that.lists = res.data.list;
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
.content {
	background-color: #fff;
}

.dui-service-detail-wrapper {
	padding: 0 30upx 60upx 30upx;
	background-color: #fff;
	position: relative;
}

.dui-service-detail-title {
	padding-top: 50upx;
	font-size: 30upx;
	font-weight: bold;
}

.dui-service-detail-content {
	padding-top: 50upx;
	font-size: 28upx;
	color: #646464;
	line-height: 50upx;
}
</style>
