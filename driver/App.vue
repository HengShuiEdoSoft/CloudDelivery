<script>
import { mapMutations } from 'vuex';
export default {
	methods: {
		...mapMutations(['login'])
	},
	onLaunch: function() {
		// #ifdef MP-WEIXIN
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			console.log(res.hasUpdate);
		});
		updateManager.onUpdateReady(function() {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
		updateManager.onUpdateFailed(function() {
			// 新的版本下载失败
		});
		// #endif
		// #ifdef APP-PLUS
		this.$uniFly
			.post({
				url: 'index/index/checkupdate',
				params: {
					appid: 'hd.lahuoerwang.driver',
					os: plus.os.name,
					version: plus.runtime.version
				}
			})
			.then(res => {
				if (res.code == 0) {
					if (res.data.status > 0) {
						uni.showModal({
							title: '更新提示',
							content: res.data.remark,
							success: r => {
								if (r.confirm) {
									plus.runtime.openURL(res.data.url);
								}
							}
						});
					}
				}
			})
			.catch(err => {
				console.log(err);
			});
		// #endif
		let user = this.$drmking.cacheData('USER');
		if (this.$drmking.isEmpty(user)) {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		} else {
			this.login(user);
		}
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style>
@import url('common/common.css');
@import url('common/iconfont.css');
/*每个页面公共css */
page {
	min-height: 100%;
	display: flex;
	-webkit-font-smoothing: antialiased;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	min-height: 100%;
	display: flex;
}

.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #f3f4f5;
	padding: 0;
}

.input-group {
	background-color: #ffffff;
	margin-top: 40upx;
	position: relative;
}

/* 	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	} */

/* 	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	} */

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
}

.input-row .title {
	width: 12%;
	height: 50upx;
	min-height: 50upx;
	padding: 25upx 0;
	padding-left: 30upx;
	line-height: 50upx;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 15upx;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 24upx;
	padding: 40upx;
}

button.primary {
	background-color: #ff5723;
}
</style>
