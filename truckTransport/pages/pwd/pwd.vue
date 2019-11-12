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
				<view class="dui-input">
					<input type="text" clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></input>
				</view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst" :disabled="countdown < 60 && countdown >= 1">{{countdown < 60 && countdown >= 1?`${countdown}秒`:'获取验证码'}}</button>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="pwd" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<view class="dui-input">
					<input type="password" class="" displayable v-model="confirmpassword" placeholder="请再次输入密码"></input>
				</view>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="findPassword(reseturl)">重 置 密 码</button>
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
				phone: '',
				vercode: '',
				pwd: '',
				confirmpassword: '',
				requestUrl:'/api/common/sendcode',
				reseturl:'/api/user/resetpwd',
				countdown: 60
			}
		},
		methods: {
			numberst(requestUrl){
						if(!this.$drmking.isPhone(this.phone)){
							uni.showToast({
								'icon':'none',
								title: '手机号码格式不正确！',
								showCancel: false
							});
							return false;
						}
						this.countDown();
						const data={
							phone:this.phone
						}
						this.$uniFly
						  .post({
						    url: requestUrl,
						    params: data
						  })
						  .then(function(res) {
						    if(res.code===0){
						    	uni.showToast({
									title: '成功获取验证码',
									icon: 'success',
									mask: true,
									duration: 3000
						    	});
							}else{
								uni.showToast({
									content: res.msg,
									showCancel: false
								});
							}
						  })
						  .catch(function(error) {
						    uni.showToast({
						    	content: error,
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
			findPassword(reseturl) {
				/**
				 * 
				 */
				if(!this.$drmking.isPhone(this.phone)){
					uni.showToast({
						'icon':'none',
						title: '手机号码格式不正确！',
						showCancel: false
					});
					return false;
				}
				if (this.vercode.length != 6) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				if (this.pwd.length < 6) {
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
				const data = {
				        phone: this.phone,
				        pwd: this.pwd,
				        vercode: this.vercode,
						usertype:0
				    }
				this.$uniFly
				  .post({
				    url: reseturl,
				    params: data
				  })
				  .then(function(res) {
				    if(res.code===0){
				    	uni.showToast({
							title: '重置密码成功',
							icon: 'success',
							mask: true,
							duration: 3000
				    	});
				    	uni.navigateTo({
				    		url:'/pages/index/index'
				    	})
					}else{
							uni.showToast({
								content: res.msg,
								showCancel: false
							});
						}
				  }).catch(function(error) {
				    uni.showToast({
				    	content: error,
				    	showCancel: false
				    });
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
