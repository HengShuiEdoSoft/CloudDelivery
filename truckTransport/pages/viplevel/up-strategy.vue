<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view scroll-y="true" :style="height">
			<block v-for="(item, index) in lists" :key="index">
				<view class="dui-up-item">
					<view class="dui-up-column">{{ item.title }}</view>
					<view class="dui-up-content-box">
						<view class="dui-up-content-body"><parser :html="item.content"></parser></view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>
<script>
import parser from '@/components/jyf-Parser/index';
export default {
	components: {
		parser
	},
	onNavigationBarButtonTap: function(e) {
		var index = e.index;
		if (index === 0) {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	},
	onLoad() {
		this.height="height:"+uni.getSystemInfoSync().windowHeight+'px';
		this.getList();
	},
	onPullDownRefresh() {
		this.getList();
		uni.stopPullDownRefresh();
	},
	data() {
		return {
			height:'',
			lists: []
		};
	},
	methods: {
		getList() {
			let that = this;
			that.$uniFly
				.post({
					url: '/api/article/getarticlelist',
					params: {
						sname: that.$drmking.md5('会员升级攻略')
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

scroll-view {
	height: 100%;
}

.dui-up-item {
	padding: 40upx 0;
	border-bottom: 1upx solid #e2e2e2;
}

.dui-up-column {
	padding-left: 20upx;
	font-size: 30upx;
	border-left: 8upx solid #ff5723;
}

.dui-up-content-box {
	margin-top: 40upx;
	padding: 0 30upx;
}

.dui-up-content-title {
	font-size: 28upx;
}

.dui-up-content-body {
	margin-top: 30upx;
	font-size: 26upx;
	line-height: 40upx;
	color: #999;
}
</style>
