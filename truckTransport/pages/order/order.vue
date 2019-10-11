<template>
	<view class="content">
		<view class="ui-tip1">下单人资料</view>
		<view class="ui-order-container">
			<view class="ui-list-item">
				<text class="iconfont icon-rili"></text>
				<text>10月09日 23:14</text>
			</view>
			<view class="ui-list-item">
				<text class="iconfont icon-dianhua"></text>
				<input placeholder="18709886268" value="18709886268"/>
			</view>
		</view>
		<view class="ui-order-container">
			<view class="ui-list-item">
				<view class="ui-li-title">额外需求</view>
				<view class="ui-li-right">是否需要搬运、返程等服务<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</view>
			<view>
				<view class="ui-list-item">
					<view class="ui-li-title">订单备注</view>
					<view class="ui-li-right">如货物类别等<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
				</view>
				<view class="ui-list-item">
					<view>1人跟车</view>
					<view>2人跟车</view>
				</view>
			</view>
		</view>
		<view class="ui-order-container ui-list-item">
			<view class="ui-li-title">优先发送订单给我的司机</view>
			<view><switch @change="switchChange" /></view>
		</view>
		<view class="ui-tip">若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按<navigator>标准费用</navigator>结算。</view>
		<view class="ui-tip"><text></text>我已阅读并同意<navigator>《货物托运居间协议》</navigator></view>
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
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			switchChange: function (e) {
			            console.log('switch1 发生 change 事件，携带值为', e.target.value)
			        }
		}
	}
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
	.ui-order-container{
		margin:16upx;
		padding:0 20upx;
		font-size:14px;
		line-height: 92upx;
		background: #fff;
	}
	.ui-tip1{
		padding:16upx 30upx 0;
		color:#999;
		font-size:14px;
	}
	.ui-tip{
		padding:16upx 30upx 0;
		font-size:12px;
	}
	.ui-tip navigator{
		display:inline;
		color:#FF5723;
	}
	.ui-list-item{
		display:flex;
	}
	.iconfont{
		padding-right:28upx;
	}
	input{
		font-size:14px;
		height: 92upx;
		line-height: 92upx;
	}
	.ui-li-title{
		flex:1;
		color:#333;
	}
	.ui-li-right{
		color:#999;
	}
</style>
