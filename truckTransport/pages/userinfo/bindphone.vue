<template>
	<view class="content">
		<view class="input-group dui-input-group-mg">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input type="text" focus clearable v-model="phone" placeholder="请输入要绑定的手机号码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-Raidobox-xuanzhong"></text>
				<view class="dui-input"><m-input type="text" focus clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></m-input></view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst" :disabled="countdown < 60 && countdown >= 1">
					{{ countdown < 60 && countdown >= 1 ? `${countdown}秒` : '获取验证码' }}
				</button>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="bindphone()">确认</button></view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
import service from '../../service.js';
import { mapMutations, mapState } from 'vuex';
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
	methods: {
		...mapMutations(['login']),
		computed: mapState(['user']),
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
				phone: this.phone
			};

			this.$uniFly
				.post({
					url: '/api/common/sendcode',
					params: data
				})
				.then(function(res) {
					if (res.code === 0) {
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
						content: error,
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
		bindphone() {
			let that = this;
			if (!this.$drmking.isPhone(that.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确！',
					showCancel: false
				});
				return false;
			}
			const data = {
				phone: that.phone,
				vercode: that.vercode,
				user_id: that.user.user_id,
				unionId: that.user.unionId
			};
			that.$uniFly
				.post({
					url: '/api/user/bindphone',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							title: '绑定成功',
							icon: 'none',
							mask: true,
							duration: 3000
						});

						that.login(res.data);
						service.addUser(res.data);
						setTimeout(function() {
							uni.navigateBack({
								delta: 3
							});
						}, 3000);
					} else {
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
						content: error,
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
