<template>
	<view class="content">
		<scroll-view scroll-y="true" class="scroll-container" :style="height">
			<view v-if="empty">
				<view class="dui-notyet-wrapper">
					<image src="../../static/img/NoOrder.jpg" mode=""></image>
					<text>信息空空如也！</text>
				</view>
			</view>
			<view  v-if="!empty" class="dui-msgcenter-list">
				<block v-for="(item, index) in lists" :key="index">
					<view class="dui-msgcenter-item-box">
						<view class="dui-msgcenter-item">
							<view v-if="item.msg_type === 0" class="dui-msgcenter-logo"><image src="/static/img/setup.png"></image></view>
							<view v-if="item.msg_type === 1" class="dui-msgcenter-logo"><image src="/static/img/file.png"></image></view>
							<view class="dui-msgcenter-flex-column">
								<view class="dui-msgcenter-title">
									<text v-if="item.msg_type === 0">系统通知</text>
									<text v-if="item.msg_type === 1">订单通知</text>
									<text class="dui-msgcenter-date">{{ item.create_time }}</text>
								</view>
								<view class="dui-msgcenter-content">{{ item.msg }}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="loading">{{ loadingText }}</view>
		</scroll-view>
	</view>
</template>

<script>
let timer = null;
export default {
	data() {
		return {
			loadingText: '',
			empty: false,
			page: 1,
			reload: true,
			has_next: true,
			lists: [],
			height:''
		};
	},
	onLoad() {
		this.height=uni.getSystemInfoSync().windowHeight+'px';
	},
	onShow: function() {
		this.getList();
	},
	onPullDownRefresh: function() {
		this.has_next = true;
		this.reload = true;
		this.page = 1;
		this.getList();
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		let that = this;
		let timer = null;
		if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			that.getList();
		}, 1000);
	},
	methods: {
		getList: function() {
			let that = this;
			if (that.has_next) {
				uni.showNavigationBarLoading();
				that.loadingText = '加载中...';
				const data = {
					page: that.page
				};
				that.$uniFly
					.post({
						url: '/api/notice/getnoticelist',
						params: data
					})
					.then(function(res) {
						uni.hideNavigationBarLoading();
						if (res.code === 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list;
								that.empty = false;
								// let list=_self.parseOrderList(res.data);
								that.lists = that.reload ? list : that.lists.concat(list);
								that.page++;
								that.reload = false;
								that.has_next = res.data.has_next;
								if (res.data.has_next) {
									that.loadingText = '加载更多';
								} else {
									that.loadingText = '已加载全部';
								}
							} else {
								that.empty = true;
								that.loadingText = '';
							}
						} else {
							uni.showModal({
								content: res.msg,
								showCancel: false
							});
						}
					})
					.catch(function(error) {
						uni.hideNavigationBarLoading();
						uni.showModal({
							content: error,
							showCancel: false
						});
					});
			}
		}
	}
};
</script>

<style>
	.dui-msgcenter-content{
		white-space: pre-wrap;
	}
	.scroll-container {
		height: 100%;
	}
</style>
