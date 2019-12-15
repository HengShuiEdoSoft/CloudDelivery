<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			此处应为 rich-text ...
			<view class="dui-privacy-tips">
				<view v-for="(item,index) in tips" :key="index">{{item.tip}}</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tips: [{
					tip: "更新日期：2019 年 8 月 5日"
				}, {
					tip: "生效日期：2019 年 8 月 5日"
				}, {
					tip: "本隐私政策将帮助你了解："
				}, {
					tip: "..."
				}]
			}
		}
	}
</script>
<style>
	.content {
		background-color: #fff;
	}

	.scroll-container {
		height: 100%;
	}

	.dui-privacy-tips {
		padding: 50upx;
		font-size: 28upx;
		line-height: 40upx;
	}
</style>
