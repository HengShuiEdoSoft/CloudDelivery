<template>
	<view class="content">
		<view class="input-group dui-input-group-mg">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input type="text" :disabled="true" clearable v-model="phone" placeholder="请输入手机号码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-Raidobox-xuanzhong"></text>
				<view class="dui-input">
					<m-input type="text" focus clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></m-input>					
				</view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst" :disabled="countdown < 60 && countdown >= 1">
					{{ countdown < 60 && countdown >= 1 ? `${countdown}秒` : '获取验证码' }}
				</button>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="vertifynum()">立即验证</button></view>
		<view class="ui-tip"><text>变更后账户信息不变，当前号码作废，下次需使用新手机号登录</text></view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
export default {
	components: {
		mInput
	},
	data() {
		return {
			phone: '',
			vercode: '',
			countdown: 60
		};
	},
	onLoad(options) {
		if (options.num && !this.$drmking.isEmpty(options.num)) {
			this.phone = options.num;
		}
	},
	methods: {
		numberst(e) {
			if (!this.$drmking.isPhone(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确！',
					showCancel: false
				});
				return false;
			}
			const data = {
				codephone: this.phone
			};
			this.$uniFly
				.post({
					url: '/api/common/sendcode',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							title: '成功获取验证码',
							icon: 'none',
							mask: true,
							duration: 3000
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content: JSON.stringify(error),
						showCancel: false
					});
				});
			this.countDown();
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
		vertifynum() {
			var that = this;
			if (!this.$drmking.isPhone(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确！',
					showCancel: false
				});
				return false;
			}
			const data = {
				cphone: this.phone,
				vercode: this.vercode
			};
			this.$uniFly
				.post({
					url: '/api/common/checkcode',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							title: '验证成功',
							icon: 'none',
							mask: true,
							duration: 3000
						});
						uni.navigateTo({
							url: '/pages/userinfo/changephone?phone=' + that.phone
						});
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
							mask: true,
							duration: 3000
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
.content {
	background-color: #fff;
}
.btn-row {
	margin-left: 60upx;
	margin-right: 60upx;
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
.ui-tip {
	padding: 20upx 40upx;
}
</style>
