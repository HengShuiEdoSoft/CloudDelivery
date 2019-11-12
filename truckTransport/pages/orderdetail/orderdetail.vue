<template>
	<view class="content">
		<scroll-view>
			<view class="ui-orderdetail-cont ui-orderdetail-top">
				<image src="../../static/img/HeadImg.jpg" class="ui-od-portrait"></image>
				<view>{{list.dname}}（135****0986）</view>
			</view>
			<view class="ui-orderdetail-cont">
				<view class="ui-orderdetail-date">
					<view class="ui-od-date">{{list.sure_time}}</view>
					<view class="ui-od-ordernumber">订单号 {{list.ocode}}</view>
				</view>
				<view class="ui-divide-line"></view>
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
			<view class="ui-orderdetail-cont">
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">订单车型</view>
					<view class="ui-od-info-right">{{list.car}}</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">额外需求</view>
					<view class="ui-od-info-right">搬运、小推车</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">备注</view>
					<view class="ui-od-info-right">有很多行李袋，还有几个大箱子，以及两个小柜子</view>
				</view>
				<view class="ui-od-info-item">
					<view class="ui-od-info-left">联系人</view>
					<view class="ui-od-info-right">{{list.uname}}</view>
				</view>
			</view>
			<view class="ui-orderdetail-cont">
				<view class="ui-od-price-list">
					<view class="ui-od-price-type">实付金额</view>
					<view class="ui-od-price-pay">￥{{list.order_price}}</view>
				</view>
				<view class="ui-od-price-list-b">
					<view class="ui-od-price-type">订单价格</view>
					<view class="ui-od-price-right">￥{{list.pay_order_price}}</view>
				</view>
				<view class="ui-od-price-list-b">
					<view class="ui-od-price-type">优惠券</view>
					<view class="ui-od-price-right">-￥{{list.coupon_price}}</view>
				</view>
				<view class="ui-divide-line"></view>
				<view class="ui-tips">若产生高速费、停车费、搬运费，需用户按实际支付。若涉及逾时等候费请按<navigator>标准费用</navigator>结算。</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ocode:"",
				list:{}
			}
		},
		onLoad(options) {
			this.ocode=options.ocode;
			this.getDetail();
		},
		methods:{
			getDetail:function(){
				var that=this;
				uni.getStorage({//获得保存在本地的用户信息
				    key: 'userLogin',  
				    success:(res) => {  
				        that.userinfo=res.data  	                    
				    }  
				}); 
				 const data={
					 phone:this.userinfo.phone,
					 token:this.userinfo.token,
					 ocode:this.ocode
				 }
				 this.$uniFly
				 .post({
				 	url: "/api/order/getorder",
				 	param: data
				 })	
				 .then({function(res){
				 	if(res.code===0){
						console.log(res.data)
				 		that.list=res.data
				 	}else{
				 		uni.showToast({
				 		    content: res.msg,
				 		    showCancel: false
				 		});
				 	}
				 	}
				 })
				 .catch(function(error) {
				     uni.showToast({
				   	    content: error,
				   	    showCancel: false
				     });
				 });
			}
		}
	}
</script>

<style>
	.ui-od-info-left{
		width:64px;
	}
	.ui-tips{
		padding:20upx 0;
		font-size:12px;
		color:#999;
	}
	.ui-tips navigator{
		display:inline;
	}
	.ui-od-price-list{
		display:flex;
		line-height: 64upx;
	}
</style>
