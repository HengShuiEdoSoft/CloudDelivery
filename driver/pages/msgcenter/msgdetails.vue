<template>
	<view class="content">
		<view class="dui-msgdetail-title">
			订单超时预警
		</view>
		<view class="dui-msgdetail-date">
			2019年10月10日 10:00
		</view>
		<view class="ui-divide-line"></view>
		<view class="dui-msgdetail-body">
			您有订单:2019101021564646,预约时间:2019年10月10日 10:00,您还未到达发货地，请您尽快前往!
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style>
	.content {
		background-color: #fff;
	}

	.dui-msgdetail-title {
		padding: 20upx 80upx;
		font-size: 40upx;
		font-weight: bold;
		text-align: center;
	}

	.dui-msgdetail-date {
		padding: 5upx 80upx 20upx 80upx;
		font-size: 28upx;
		color: #797979;
		text-align: center;
	}

	.dui-msgdetail-body {
		padding: 30upx;
		font-size: 28upx;
		line-height: 50upx;
		color: #797979;
	}
</style>
