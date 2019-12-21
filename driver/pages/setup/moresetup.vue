<template>
	<view class="content">
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<view class="dui-basic-list-item">
					<view class="dui-basic-list-item__container dui-reduce">
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								音效提示
							</view>
							<view class="dui-basic-list-item__content-note">
								打开后将以予语音为你播报订单状态
							</view>
						</view>
						<view class="dui-basic-list-item__extra">
							<switch checked color="#FF5723" style="transform:scale(0.7)" @change="switchChange" />
						</view>
					</view>
				</view>
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<navigator url="/pages/pwd/pwd">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container dui-reduce">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									设置密码
								</view>
								<view class="dui-basic-list-item__content-note">
									若你已经设置过密码，点击此处也可修改密码
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<navigator url="clause">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									服务条款
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator :url="'/pages/setup/aview?title=司机使用协议&scode=' + $drmking.md5('司机使用协议')">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									司机使用协议
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator :url="'/pages/setup/aview?title=软件使用协议&scode=' + $drmking.md5('软件使用协议')">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									软件使用协议
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator :url="'/pages/setup/aview?title=货物托运居间协议&scode=' + $drmking.md5('货物托运居间协议')">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									货物托运居间协议
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator :url="'/pages/setup/aview?title=个人隐私条款&scode=' + $drmking.md5('个人隐私条款')">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									个人隐私条款
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator url="transportstandard">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									货运业务收费标准
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="btn-row">
				<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
				<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
			</view>
	</view>
</template>
<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			switchChange: function(e) {
				this.$store.commit('soundStatus', e.target.value);
			},
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>
<style>
	.scroll-container {
		height: 100%;
		padding-bottom: 20%;
	}

	.dui-basic-list-item__container {
		padding: 32upx 30upx;
	}

	.dui-reduce {
		padding-top: 16upx;
		padding-bottom: 16upx;
	}

	.dui-basic-list-item__content-note {
		font-size: 24upx;
		margin-top: 0;
	}

	.dui-basic-list-item__extra {
		width: auto;
	}
</style>
