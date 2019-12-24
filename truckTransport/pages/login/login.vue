<template>
	<view class="content">
		<view class="dui-header"><image :src="loginImg"></image></view>
		<view class="input-group dui-input-group-mg">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input class="m-input" type="text" clearable focus v-model="phone" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="pwd" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="bindLogin">登 录</button></view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{ top: positionTop + 'px' }">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<!-- #ifdef MP-WEIXIN -->
				<image :src="provider.image" @tap="moauth(provider.value)"></image>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
import service from '@/service.js';
import { mapState, mapMutations } from 'vuex';
import mInput from '@/components/m-input.vue';
export default {
	components: {
		mInput
	},
	data() {
		return {
			loginImg:'/static/img/loginimg.jpg',
			providerList: [],
			hasProvider: true,
			phone: '',
			pwd: '',
			positionTop: 0
		};
	},
	computed: mapState(['forcedLogin']),
	methods: {
		...mapMutations(['login']),
		initProvider() {
			const filters = ['weixin'];
			uni.getProvider({
				service: 'oauth',
				success: res => {
					if (res.provider && res.provider.length) {
						for (let i = 0; i < res.provider.length; i++) {
							if (~filters.indexOf(res.provider[i])) {
								this.providerList.push({
									value: res.provider[i],
									image: '../../static/img/' + res.provider[i] + '.png'
								});
							}
						}
						this.hasProvider = true;
					}
				},
				fail: err => {
					console.error('获取服务供应商失败：' + JSON.stringify(err));
				}
			});
		},
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
			var that = this;
			if (!this.$drmking.isPhone(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确！',
					showCancel: false
				});
				return false;
			}
			if (this.pwd.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最少为6位！',
					showCancel: false
				});
				return false;
			}
			const data = {
				phone: this.phone,
				pwd: this.pwd
			};
			this.$uniFly
				.post({
					url: '/api/user/login',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						if (res.data.user_type == 2) {
							uni.showModal({
								content: '司机端账号不能登录用户端',
								showCancel: false
							});
							return;
						}
						uni.showToast({
							title: '登录成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						service.addUser(res.data);
						that.toMain(res.data);
					} else if (res.code == 1) {
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
		},
		moauth(value) {
			uni.navigateTo({
				url: '/pages/login/wxminlogin'
			});
		},
		oauth(value) {
			let that = this;
			uni.login({
				provider: value,
				success: res => {
					uni.getUserInfo({
						provider: value,
						success: function(infoRes) {
							const data = {
								openId: infoRes.userInfo.openId,
								unionId: infoRes.userInfo.unionId,
								nickName: infoRes.userInfo.nickName,
								gender: infoRes.userInfo.gender,
								avatarUrl: infoRes.userInfo.avatarUrl,
								usertype: 0
							};
							that.$uniFly
								.post({
									url: '/api/user/wxlogin',
									params: data
								})
								.then(function(res) {
									uni.hideNavigationBarLoading();
									if (res.code == 0) {
										if (res.data.user_type == 2) {
											uni.showModal({
												content: '司机端账号不能登录用户端',
												showCancel: false
											});
											return;
										}
										service.addUser(res.data);
										that.toMain(res.data);
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
										content: JSON.stringify(error),
										showCancel: false
									});
								});
						},
						fail: function(err) {
							console.error(JSON.stringify(err));
						}
					});
				},
				fail: err => {
					console.error('授权登录失败：' + JSON.stringify(err));
				}
			});
		},
		toMain(userInfo) {
			this.login(userInfo);
			if (!this.$drmking.isEmpty(userInfo.phone)) {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}

			// if (this.forcedLogin) {
			// 	uni.reLaunch({
			// 		url: '../index/index'
			// 	});
			// } else {
			// 	uni.navigateTo({
			// 		url: '../index/index'
			// 	});
			// }
		}
	},
	onLoad() {
		this.initPosition();
		this.initProvider();
	}
};
</script>

<style>
.content {
	background-color: #fff;
}

.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	font-size: 28upx;
}

.action-row navigator {
	color: #676566;
	padding: 0 20upx;
}

.oauth-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}

.oauth-image {
	width: 100upx;
	height: 100upx;
	border: 1upx solid #dddddd;
	border-radius: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
}

.oauth-image image {
	width: 60upx;
	height: 60upx;
	margin: 20upx;
}

.btn-row {
	margin-left: 60upx;
	margin-right: 60upx;
}

.dui-header image {
	width: 100%;
	height: 400upx;
}
</style>
