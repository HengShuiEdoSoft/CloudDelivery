<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-flex-row">
			<text>当前可提现</text>
			<text class="dui-maincolor">0.00</text>
		</view>
		<view class="ui-divide-line"></view>
		<view class="dui-flex-row">
			<text>金额</text>
		</view>
		<view class="dui-flex-row">
			<view class="dui-pickup-write-money">￥<input type="text" placeholder="请填写金额" /></view>
			<view class="dui-pickup-all">全部提现</view>
		</view>
		<view class="dui-flex-row">
			<text>提现到</text>
			<text>54652154512456465</text>
			<text class="iconfont icon-gengduo-shuxiang"></text>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.content {
		background-color: #fff;
	}

	.dui-maincolor {
		color: #FF5723;
		font-size: 32upx;
		font-weight: 500;
	}

	.dui-flex-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		padding: 20upx 30upx;
	}

	.dui-pickup-write-money {
		display: flex;
		align-items: center;
		font-size: 60upx;
	}

	.dui-pickup-write-money input {
		font-size: 60upx;
	}
	.dui-pickup-all{
		width: 25%;
		color: #FF5723;
		text-align: right;
	}
</style>
