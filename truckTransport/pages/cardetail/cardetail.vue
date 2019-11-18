<template>
	<view class="content cardetail-content">
		<swiper>
			<swiper-item v-for="item in carsInfos[id].images" :key="item.car_id" class="ui-cardetail-item">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<view class="ui-cardetail-container">
			<view class="ui-cardetail-title">载货空间及重量</view>
			<view class="ui-cardetail-body"><text class="ui-dot"></text><text>{{"载货空间"+carsInfos[id].car_cargo_volume+"方，载重"+carsInfos[id].car_load+"公斤"}}</text></view>
		</view>
		<view class="ui-cardetail-container">
			<view class="ui-cardetail-title">用车参考</view>
			<view class="ui-cardetail-body" v-for="item in carsInfos[id].car_refererances" :key="item.car_id"><text class="ui-dot"></text><text>{{item.car_refer}}</text></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				id:0,
				carlistUrl:'/api/car/getcarlist',
				carsInfos:[]
			}
		},
		onLoad(options) {
			this.id=parseInt(options.id);
			let carlistUrl=this.carlistUrl;
			let that=this;
			if(this.$drmking.cacheData("carInfos")){
				that.carsInfos=this.$drmking.cacheData("carInfos");
				let title=that.carsInfos.id.title+"详情页";
				uni.setNavigationBarTitle({title:title});
				return;
			}
			this.$uniFly
			  .get({
			    url: carlistUrl,
			    params: {}
			  })
			  .then(function(res) {
				  //console.log(res);
			    if(res.code==0){	
			    	that.carsInfos=res.data;
					var title=that.carsInfos.id.title+"详情页";
					uni.setNavigationBarTitle({title:title});
				}
			  })
			  .catch(function(error) {
			    uni.showToast({
			    	content: error,
			    	showCancel: false
			    });
			  })						
		},
		methods:{
			
		}
	}
</script>

<style>
	.content.cardetail-content{
		background:#fff;
	}
	.ui-cardetail-container{
		padding:30upx 60upx;
	}
	.ui-cardetail-title{
		margin:15px 0;
		padding-left:12px;
		font-size:18px;
		font-weight:600;
		line-height:1;
		border-left:3px solid #FF5723;
	}
	.ui-cardetail-body{
		padding-left:15px;
		font-size:14px;
		line-height:34px;
		color:#666;
	}
	.ui-dot{
		display:inline-block;
		margin-right:10px;
		vertical-align: middle;
		width:4px;
		height:4px;
		background: #ddd;
	}
	swiper{
		height: 527upx;
	}
	.ui-cardetail-item{
		width:100%;
	} 
	.ui-cardetail-item image{
		width:100%;
		height: 527upx;
	}
</style>
