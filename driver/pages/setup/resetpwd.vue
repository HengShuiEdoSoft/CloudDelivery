<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-resetpwd-wrapper">
			<view class="dui-resetpwd-title">设置登录密码</view>
			<view class="dui-resetpwd-phone">188****8888</view>
			<view class="dui-resetpwd-btn">
				<button class="primary" type="primary" @tap="nextstep()">下一步</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {
			nextstep() {
				uni.navigateTo({
					url: "/pages/setup/vercode"
				})
			}
		}
	}
</script>

</script>
<style>
	.content {
		background-color: #fff;
	}
</style>
