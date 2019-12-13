<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="input-group" style="padding-left: 30upx;padding-right:40upx ;">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input class="m-input" type="text" clearable focus v-model="phone" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-Raidobox-xuanzhong"></text>
				<view class="dui-input"><m-input class="m-input" type="text" clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></m-input></view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst" :disabled="countdown < 60 && countdown >= 1">
					{{ countdown < 60 && countdown >= 1 ? `${countdown}秒` : '获取验证码' }}
				</button>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="pwd" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="confirmpassword" placeholder="请再次输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="findPassword(reseturl)">重 置 密 码</button></view>
	</view>
</template>

<script>
import service from '../../service.js';
import mInput from '../../components/m-input.vue';
export default {
	components: {
		mInput
	},
	data() {
		return {
			phone: '',
			vercode: '',
			pwd: '',
			confirmpassword: '',
			requestUrl: '/api/common/sendcode',
			reseturl: '/api/user/resetpwd',
			countdown: 60
		};
	},
	methods: {
		numberst() {
			let that=this;
			if (!this.$drmking.isPhone(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确！',
					showCancel: false
				});
				return false;
			}
			this.countDown();
			const data = {
				codephone: this.phone
			};
			this.$uniFly
				.post({
					url: that.requestUrl,
					params: data
				})
				.then(function(res) {
					if (res.code === 0) {
						uni.showToast({
							title: '成功获取验证码',
							icon: 'success',
							mask: true,
							duration: 3000
						});
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content:JSON.stringify(error),
						showCancel: false
					});
				});
		},
		// 倒计时
		countDown() {
			let self = this;
			self.countdown = 60;
			self.countdown -= 1;
			if (self.clear) {
				clearInterval(self.clear);
			}
			self.clear = null;
			self.clear = setInterval(_ => {
				if (self.countdown > 0) {
					self.countdown -= 1;
				} else {
					clearInterval(self.clear);
				}
			}, 1000);
		},
		findPassword(reseturl) {
			let that = this;
			if (!that.$drmking.isPhone(that.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确！',
					showCancel: false
				});
				return false;
			}
			if (that.vercode.length != 6) {
				uni.showToast({
					icon: 'none',
					title: '验证码不正确'
				});
				return;
			}
			if (that.pwd.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 6 个字符'
				});
				return;
			}
			if (that.confirmpassword != that.pwd) {
				uni.showToast({
					icon: 'none',
					title: '两次密码不一致'
				});
				return;
			}
			const data = {
				phone: that.phone,
				pwd: that.pwd,
				vercode: that.vercode
			};
			that.$uniFly
				.post({
					url: reseturl,
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showModal({
							title: '重置密码成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						that.$store.commit('login', {});
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/index/index'
							});
						},1000);
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content:JSON.stringify(error),
						showCancel: false
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

.dui-varcode-btn {
	background-color: transparent !important;
	color: #ff5723 !important;
	font-size: 28upx;
	display: flex;
	align-items: center;
	text-decoration: underline;
}

.dui-varcode-btn:after {
	border: none;
}

.dui-varcode-btn[disabled][type='primary'] {
	background-color: transparent;
}
</style>