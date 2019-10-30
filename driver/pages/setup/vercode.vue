<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-resetpwd-wrapper">
			<view class="dui-resetpwd-title">请您输入验证码</view>
			<view>验证码已发送至188****8888</view>
			<view class="dui-resetpwd-btn">
				<wakary-input type="box"></wakary-input>
			</view>
			<view>59s可重新获取</view>
		</view>
	</view>
</template>
<script>
	import wakaryInput from '../../components/wakary-input.vue'
	export default {
		components: {
			wakaryInput
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>
<style>
	.content {
		background-color: #fff;
	}

	.dui-resetpwd-title+view {
		padding: 30upx 0 40upx 0;
		font-size: 25upx;
		color: #a8a8a8;
	}

	.dui-resetpwd-btn+view {
		padding-top: 40upx;
		font-size: 25upx;
		color: #a8a8a8;
		text-align: center;
	}
</style>
