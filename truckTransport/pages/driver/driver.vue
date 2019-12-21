<template>
	<view class="content">
		<!-- <scroll-view class="scroll-container" scroll-y :style="height"> -->
		<view class="dui-notyet-wrapper" v-if="lists.length===0">
			<image src="../../static/img/NoDriver.jpg" mode=""></image>
			<text>收藏好司机直接发单给他们</text>
			<view class="dui-notyet-btn" @tap="togglePopup('center', 'collection')">去收藏司机</view>
		</view>
		<view class="ui-list" v-if="lists.length!=0">
			<view class="ui-list-item" v-for="(item, index) in lists" :key="item.user_driver_favorites_id" @longpress="deleteDriver(item.user_driver_favorites_id,index)">
				<view class="ui-list-title">{{ item.dname }}</view>
				<view class="ui-list-subtext">{{ item.phone }}</view>
			</view>
			<view class="dui-fixed-bottom-btn"><button class="primary" type="primary" @tap="togglePopup('center', 'collection')">去收藏司机</button></view>
			<view class="loading">{{ loadingText }}</view>
		</view>
		<!-- </scroll-view> -->
		<uni-popup ref="collection" :type="type" :custom="true" :mask-click="true">
			<view class="dui-collection-wrapper">
				<view class="input-group">
					<view class="input-row border">
						<text class="title iconfont icon-dianhua"></text>
						<input type="text" v-model="driver_phone" value="13123" placeholder="手机号码" class="m-input" />
					</view>
				</view>
				<view class="btn-row"><button class="primary" type="primary" @tap="addDriver()">添加收藏</button></view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	onNavigationBarButtonTap: function(e) {
		var index = e.index;
		if (index === 0) {
			uni.navigateTo({
				url: '/pages/driver/driverexplain'
			});
		}
	},
	components: {
		uniPopup
	},
	data() {
		return {
			show: false,
			type: '',
			loadingText: '',
			empty: false,
			page: 1,
			reload: true,
			has_next: true,
			lists: [],
			driver_phone: '',
			height:''
		};
	},
	onLoad() {
		this.height="height:"+uni.getSystemInfoSync().windowHeight+'px';
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
		let _self = this;
		let timer = null;
		if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			_self.getList();
		}, 1000);
	},
	methods: {
		togglePopup(type, open) {
			this.type = type;
			this.$refs[open].open();
		},
		deleteDriver: function(id,index) {
			let that=this;
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除该条信息吗',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						const data = {
							user_driver_favorites_id: id
						};
						this.$uniFly
							.post({
								url: '/api/user_driver_favorites/deluserdriverfavorites',
								params: data
							})
							.then(function(res) {
								uni.hideNavigationBarLoading();
								if (res.code === 0) {
									uni.showToast({
										title: '已删除',
										icon: 'success',
										mask: true,
										duration: 3000
									});
									that.lists.splice(index,1);
									that.$set(that,"lists",that.lists);
								} else {
									uni.showModal({
										content: res.msg,
										showCancel: false
									});
								}
							})
							.catch(function(error) {
								uni.hideNavigationBarLoading();
								uni.showToast({
									content:JSON.stringify(error),
									showCancel: false
								});
							});
					}
				}
			});
		},
		getList: function() {
			let _self = this;
			if (_self.has_next) {
				uni.showNavigationBarLoading();
				_self.loadingText = '加载中...';
				const data = {
					page: this.page
				};
				this.$uniFly
					.post({
						url: '/api/user_driver_favorites/getuserdriverfavoriteslist',
						params: data
					})
					.then(function(res) {
						uni.hideNavigationBarLoading();
						if (res.code === 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list;
								_self.empty = false;
								// let list=_self.parseOrderList(res.data);
								_self.lists = _self.reload ? list : _self.lists.concat(list);
								_self.page=_self.page+1;
								_self.reload = false;
								_self.has_next = res.data.has_next;
								if (res.data.has_next) {
									_self.loadingText = '加载更多';
								} else {
									_self.loadingText = '已加载全部';
								}
							} else {
								_self.empty = true;
								_self.loadingText = '';
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
							content:JSON.stringify(error),
							showCancel: false
						});
					});
			}
		},
		addDriver: function() {
			let that = this;
			const data = {
				driver_phone: this.driver_phone
			};
			this.$uniFly
				.post({
					url: '/api/user_driver_favorites/adduserdriverfavorites',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					// console.log(error);
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
.dui-notyet-wrapper image {
	width: 170upx;
	height: 200upx;
}

.dui-notyet-wrapper text {
	margin: 86upx 0 70upx 0;
	color: #8d8d8d;
}

.dui-notyet-btn {
	width: 290upx;
	height: 85upx;
	line-height: 85upx;
	background-color: #fff2de;
	color: #ff5723;
	text-align: center;
	border-radius: 10upx;
}
.dui-collection-wrapper {
	width: 570upx;
	height: 560upx;
	padding: 50upx;
	background-color: #fff;
	border-radius: 10upx;
}
.ui-list-title {
	font-size: 14px;
	color: #212121;
}
.ui-list-subtext {
	color: #9e9e9e;
	font-size: 12px;
}
.ui-list-item {
	padding: 20upx 30upx;
	background: #fff;
}
.input-row input {
	padding: 12px 0;
}
</style>
