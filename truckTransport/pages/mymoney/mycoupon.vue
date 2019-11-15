<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view>
		<view class="dui-coupon-input">
			<input type="text" value="" focus="true" placeholder="按此输入兑换码" />		
		</view>
		<view v-if="list.length===0">
			<view class="dui-notyet-wrapper">
				<image src="../../static/img/NoCoupon.jpg" mode=""></image>
				<text>您的优惠券为空</text>
			</view>
		</view>
		<view class="ui-coupon-list">
			<view class="ui-coupon-item" v-for="(item,index) in list" :key="item.coupon_type_id">
				<view class="ui-coupon-item-body">
					<view>
						<view class="ui-coupon-price"><text>￥</text><text class="ui-coupon-price-num">{{item.coupon_price}}</text></view>
						<view class="ui-coupon-subtext">{{item.coupon_title}}</view>
					</view>
					<view class="ui-coupon-center">
						<view>拉货就找云配送</view>
						<view class="ui-coupon-time">满{{item.sill}}使用</view>
						<view @tap="isShow" class="ui-coupon-detail-btn">更多详情<text class="iconfont icon-gengduo-hengxiang"></text></view>
					</view>
					<view v-if="item.status===1"><navigator class="ui-coupon-use" :url="'/pages/index/index'+item.coupon_type_id">立即使用</navigator></view>
					<view v-if="item.status===0"><view class="ui-coupon-use-b">不可用</view></view>
				</view>
				<view :class="{active:show}" class="ui-coupon-detail">
					<view>1.适用车型：{{item.car_title}}</view>
					<view>2.适用城市（区域）：全国</view>
					<view>3.使用限制：满{{item.sill}}使用</view>
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				list:[]
			}
		},
		onLoad() {
			let that=this;
			this.$uniFly
			  .get({
			    url: "/api/coupon_type/getcoupontypelist",
			    params: {}
			  })
			  .then(function(res) {
				console.log("success")
			    if(res.code===0){	
			    	that.list=res.data;
					console.log(res.data)
				}
			  })
			  .catch(function(error) {
			    uni.showToast({
			    	content: error,
			    	showCancel: false
			    });
			  })
		},
		methods: {
			isShow:function(){
				this.show = !this.show
			}
		}
	}
</script>

<style>
	.dui-coupon-input {
		background-color: #fff;
		padding: 35upx;
	}
	.ui-coupon-detail{
		padding:28upx;
		display:none;
		color:#999;
		background: #fff;
	}
	.ui-coupon-detail.active{
		display:block;
	}
	.ui-coupon-item{
		margin:30upx 16upx;
		font-size:14px;
	}
	.ui-coupon-subtext{
		font-size:12px;
		color:#999;
	}
	.ui-coupon-item-body{
		display:flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 8upx;
		padding:28upx;
		border-bottom: 4upx solid #FF5723;
		background: #fff;
		border-radius: 8upx;
	}
	.ui-coupon-price{
		padding-right:20upx;
		margin-right:20upx;
		color:#FF5723;
		border-right:1px dashed #eee;
	}
	.ui-coupon-price-num{
		font-size:36px;
	}
	.ui-coupon-center{
		flex:1;
		font-size: 16px;
	}
	.ui-coupon-time{
		padding-top:8upx;
		font-size:12px;
	}
	.ui-coupon-detail-btn{
		padding-top:12upx;
		font-size: 12px;
		color:#999;
	}
	.ui-coupon-use{
		display:inline-block;
		padding:8upx 24upx;
		border-radius: 54upx;
		color:#FF5723;
		border:1px solid #FF5723;
	}
	.ui-coupon-use-b{
		display:inline-block;
		padding:8upx 24upx;
		border-radius: 54upx;
		color:#999;
		border:1px solid #ccc;
	}
</style>
