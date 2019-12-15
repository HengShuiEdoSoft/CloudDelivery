<template>
	<view class="content">
		<view class="ui-divide-bar"></view>
		<view class="ui-remark-container">
			<view><textarea placeholder="输入备注(如货物类别)" maxlength="200" @blur="setText" :value="text" /></view>
			<view><button class="primary" type="primary" @tap="sure">确定</button></view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['order']),
	data() {
		return {
			text: ''
		};
	},
	onLoad() {
		this.text = this.order.remark;
	},
	onBackPress(e) {
		this.$fire.fire('order_remark', this.text);
	},
	methods: {
		setText(e) {
			this.text = e.detail.value;
		},
		sure: function() {
			setTimeout(function() {
				//传参
				uni.navigateBack({
					delta: 1
				});
			}, 10);
		}
	}
};
</script>

<style>
.ui-remark-container {
	padding: 0 30upx;
}
textarea {
	width: 100%;
	padding: 20upx;
	font-size: 14px;
	line-height: 48upx;
	background: #fff;
	box-sizing: border-box;
}
</style>
