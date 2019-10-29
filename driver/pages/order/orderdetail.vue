<template>
	<view class="content">
		<scroll-view class="scroll-container">
			<view class="ui-order-list-item">
				<view class="ui-order-list-item-top"><text class="ui-orderno-color">20191010101012341456</text></view>
				<view class="ui-order-list-item-top"><text class="ui-cartype-color">09月20日 10:22</text></view>
				<view class="ui-divide-line"></view>
				<view class="ui-order-timeline-container">
					<view class="ui-order-timeline uni-timeline">
						<view class="uni-timeline-item uni-timeline-first-item">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">衡水人民政府</text>
								<text class="ui-subtext">河北省衡水市和平路</text>
							</view>
						</view>
						<view class="uni-timeline-item uni-timeline-last-item">
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<text class="ui-address">怡然城</text>
								<text class="ui-subtext">河北省衡水市和平路</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ui-orderdetail-cont">
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">货物类型</view>
					<view class="ui-od-info-right">家电</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">重量</view>
					<view class="ui-od-info-right">1.00KG</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">规格</view>
					<view class="ui-od-info-right">1.00米*1.00米*1.00米</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">额外需求</view>
					<view class="ui-od-info-right">从门口超市买包烟,谢谢!</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">保险</view>
					<view class="ui-od-info-right">10倍保险</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">联系人</view>
					<view class="ui-od-info-right"><text class="iconfont icon-dianhua"></text>小小</view>
				</view>
			</view>
			<view class="ui-orderdetail-cont">
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">向客户收取</view>
					<view class="ui-od-price-pay">￥100.00</view>
				</view>
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">总里程费</view>
					<view class="ui-od-price-pay">￥90.00</view>
				</view>
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">保险费</view>
					<view class="ui-od-price-pay">￥10.00</view>
				</view>
				<view class="ui-od-price-list-b">
					<view class="ui-od-price-type">总计100.00元</view>
					<view class="ui-od-price-right">价格明细</view>
				</view>
				<view class="ui-divide-line"></view>
				<view class="ui-tips">说明: 若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按<navigator>标准费用</navigator>结算。</view>
			</view>
			<button type="primary" class="dui-orderdetail-confirm-btn">确认到达发货地</button>
			<button type="primary" class="dui-orderdetail-confirm-btn1">
				确认完成
				<text>*请确认完成,结束本单服务</text>
			</button>
		</scroll-view>
	</view>
</template>
<script>
</script>
<style>
	.icon-dianhua {
		margin-right: 10upx;
	}

	.ui-tips {
		padding: 20upx 0;
		font-size: 12px;
		color: #999;
	}

	.ui-tips navigator {
		display: inline;
	}

	.dui-orderdetail-confirm-btn {
		margin: 40upx 16upx;
		background-color: #FF9801;
	}

	.dui-orderdetail-confirm-btn1 {
		margin: 40upx 16upx;
		background-color: #DD524D;
	}

	.dui-orderdetail-confirm-btn1 text {
		display: block;
		font-size: 24upx;
	}
</style>
