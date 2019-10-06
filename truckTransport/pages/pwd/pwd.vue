<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="input-group" style="padding-left: 30upx;padding-right:40upx ;">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-Raidobox-xuanzhong"></text>
				<view class="dui-input">
					<input type="text" clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></input>
				</view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst" :disabled="countdown < 60 && countdown >= 1">{{countdown < 60 && countdown >= 1?`${countdown}秒`:'获取验证码'}}</button>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<view class="dui-input">
					<input type="password" class="" displayable v-model="confirmpassword" placeholder="请再次输入密码"></input>
				</view>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="findPassword()">重 置 密 码</button>
		</view>
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
				account: '',
				vercode: '',
				password: '',
				confirmpassword: '',
				countdown: 60
			}
		},
		methods: {
			numberst(e) {
				//其他代码....
				this.countDown();
			},
			// 倒计时
			countDown() {
				let self = this;
				self.countdown = 60;
				self.countdown -= 1;
				if (self.clear) {
					clearInterval(self.clear)
				}
				self.clear = null;
				self.clear = setInterval(_ => {
					if (self.countdown > 0) {
						self.countdown -= 1;
					} else {
						clearInterval(self.clear)
					}
				}, 1000)
			},
			findPassword() {
				/**
				 * 仅做示例
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.vercode.length != 6) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.confirmpassword != this.password) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致'
					});
					return;
				}
				uni.showToast({
					icon: 'none',
					title: '重置密码成功',
					duration: 3000
				});
			}
		}
	}
</script>

<style>
	.content {
		background-color: #fff;
	}

	.dui-varcode-btn {
		background-color: transparent;
		color: #FF5723;
		font-size: 28upx;
		display: flex;
		align-items: center;
		text-decoration: underline;
	}

	.dui-varcode-btn:after {
		border: none;
	}

	.dui-varcode-btn[disabled][type=primary] {
		background-color: transparent;
	}
</style>
