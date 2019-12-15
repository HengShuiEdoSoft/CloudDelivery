<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			此处应为 rich-text ...
			<view class="dui-protocol-tips">
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
					tip: "欢迎阁下使用云配送提供的有关服务!"
				}, {
					tip: "为使用云配送软件（定义如下）及云配送（定义如下）提供的服务，阁下应当认真阅读并严格遵守本《云配送用户信息服务协议》中的全部条款及条件（包括其不时的更新和修改）和云配送软件上已发布的以及此后不时更改或发布的各项规则、政策、通知及公告。以下凡提及“本协议”，均应视为同时包含本《云配送用户信息服务协议》（及其不时的更新和修改）以及云配送软件上已发布的以及此后不时更改或发布的各项规则、政策、通知及公告。"
				}, {
					tip: "..."
				}]
			}
		},
		methods: {

		}
	}
</script>

</script>
<style>
	.content {
		background-color: #fff;
	}

	.scroll-container {
		height: 100%;
	}

	.dui-protocol-tips {
		padding: 50upx 20upx;
		font-size: 28upx;
		line-height: 40upx;
	}
</style>
