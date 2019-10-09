<template>
	<view class="content">
		<view class="ui-pli-container">
			<text>￥</text>
			<text class="ui-total-price">12</text>
			<text>（总共2公里）</text>
		</view>
		
		<view class="ui-tip">若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按标准费用结算。</view>
		<view class="ui-divide-line"></view>
		<view>
			<view class="ui-price-list-item">
				<view class="ui-pli-name">起步价（小面包车）</view>
				<view>￥20</view>
			</view>
			<view class="ui-price-list-item">
				<view class="ui-pli-name">优惠券</view>
				<view>-￥8</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			
		},
		onNavigationBarButtonTap:function(e){
			var index=e.index
			if(index===0){
				uni.navigateTo({
					url:"/pages/setup/transportstandard"
				})
			}
		}
	}
</script>

<style>
	.content{
		background: #fff;
	}
	.content>view{
		padding:40upx 80upx;
	}
	.content .ui-divide-line{
		padding:0;
		margin:0 80upx;
	}
	.ui-price-list-item{
		display:flex;
		font-size:14px;
		line-height:64upx;
	}
	.ui-pli-name{
		flex:1;
	}
	.ui-total-price{
		font-size:28px;
		font-weight:600;
	}
	.ui-pli-container{
		text-align: center;
		font-size: 14px;
	}
</style>
