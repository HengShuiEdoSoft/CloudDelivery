<script>
import { mapMutations } from 'vuex';
export default {
	methods: {
		...mapMutations(['login'])
	},
	onLaunch: function() {
		let user = this.$drmking.cacheData('USER');
		if (user) {
			this.login(user);
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
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
.uni-page-head__title {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
}
.uni-page-head__title_image {
	height: 36px !important;
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
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}

.input-group {
	background-color: #ffffff;
	margin-top: 40upx;
	position: relative;
}
.scroll-container {
	height: 100%;
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
