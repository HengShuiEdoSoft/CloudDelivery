<template>
	<view class="content">
		<view>下单人资料</view>
		<view>
			<view></view>
			<view></view>
		</view>
		<view>
			<view></view>
			<view>
				<view></view>
				<view></view>
			</view>
		</view>
		<view></view>
		<view>提示</view>
		<view>协议</view>
		<view class="ui-home-bottom">
			<view class="ui-home-price-container">
				<view class="ui-cost-price">
					<text>￥</text><text class="ui-price-now">20</text><text class="ui-origin-price">￥35</text>
					<view class="ui-home-discount">优惠券已折扣<text>8元</text></view>
				</view>
				<navigator class="ui-price-detail" url="/pages/pricedetail/pricedetail">价格明细</navigator>
			</view>
			<view class="ui-home-btns">
				<view class="ui-use-now">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.ui-home-btns{
		display:flex;
		color:#fff;
		text-align: center;
	}
	.ui-use-now{
		flex:1;
		padding:20upx 0;
		font-size:20px;
		background:#FF5723;
	}
</style>
