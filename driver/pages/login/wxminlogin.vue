<template>
	<view v-if="user == null" class="wx-login tc">
		<view class="cr-888 fs-12">确认登录授权，为您提供更优质的服务</view>
		<button type="primary" size="mini" open-type="getUserInfo" withCredentials="true" @getuserinfo="get_user_info_event">授权登录</button>
	</view>
</template>

<script>
import service from '@/service.js';
import mInput from '@/components/m-input.vue';
export default {
	components: {
		mInput
	},
	onLoad() {
		if (!this.$drmking.isEmpty(this.$store.state.user)) {
			this.user = this.$store.state.user;
		}
	},
	data() {
		return {
			user: null
		};
	},
	methods: {
		get_user_info_event(e) {
			let that = this;
			uni.getSetting({
				success(res) {
					if (res.authSetting['scope.userInfo']) {
						let iv = e.detail.iv;
						let encryptedData = e.detail.encryptedData;
						that.$drmking
							.getWxOpenId(that, iv, encryptedData)
							.then(infoRes => {
								const data = {
									openId: infoRes.openId,
									unionId: infoRes.unionId,
									nickName: infoRes.nickName,
									gender: infoRes.gender,
									avatarUrl: infoRes.avatarUrl,
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
											if(res.data.user_type==2){
												uni.showModal({
													content: '司机端账号不能登录用户端',
													showCancel: false
												});
												return;
											}
											service.addUser(res.data);
											that.$store.commit('login', res.data);
										} else {
											uni.showModal({
												content: res.msg,
												showCancel: false
											});
										}
									})
									.catch(function(error) {
										console.error(JSON.stringify(error));
										uni.hideNavigationBarLoading();
										uni.showModal({
											content: error,
											showCancel: false
										});
									});
							})
							.catch(err => {
								uni.showToast({
									title: 'openid获取失败',
									icon: 'none'
								});
							});
					} else {
						uni.showToast({
							title: '请允许获取用户信息',
							icon: 'none'
						});
					}
				},
				fail: e => {
					uni.showToast({
						title: '授权校验失败',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
.a-input {
	padding: 0;
}
page {
	background: #fff;
	position: relative;
	height: 100vh;
}
.content {
	padding: 30% 40rpx 0 40rpx;
}
.content .mobile {
	width: 100%;
	margin: 20rpx 0;
	border-bottom: solid 1px #eee;
}
.content input {
	font-size: 28rpx;
	color: #4e4e4e;
	height: 40px;
	line-height: 40px;
}
.content .code {
	margin: 20rpx 0;
	border-bottom: solid 1px #eee;
	position: relative;
}
.content .code .verify {
	width: 63%;
}
.content .code .verify-sub {
	border: solid 1px #ff6482;
	color: #ff6482;
	width: 35%;
	height: 35px;
	line-height: 35px;
	border-radius: 10rpx;
	position: absolute;
	top: 0;
	right: 0;
}
.content .code .verify-sub.sub-disabled {
	border: solid 1px #eee;
	color: #a6a6a6;
}
.content .submit {
	position: absolute;
	left: 20rpx;
	right: 20rpx;
	bottom: 34rpx;
	height: 90rpx;
	line-height: 90rpx;
}

/**
	  授权登录
	*/
.wx-login {
	padding-top: 30%;
}
.wx-login button {
	margin-top: 30rpx;
}
</style>
