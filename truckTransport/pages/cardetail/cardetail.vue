<template>
	<view>
		<swiper>
			<swiper-item v-for="item in carsInfos[id].images" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<view class="ui-cardetail-container">
			<view class="ui-cardetail-title">载货空间及重量</view>
			<view class="ui-cardetail-body"><text class="ui-dot"></text><text>{{carsInfos[id].space}}</text></view>
		</view>
		<view class="ui-cardetail-container">
			<view class="ui-cardetail-title">用车参考</view>
			<view class="ui-cardetail-body" v-for="item in carsInfos[id].refers" :key="item.id"><text class="ui-dot"></text><text>{{item.refer}}</text></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				id:0,
				carsInfos:[{
					id:1,
					images:[{
						img:""
						},{
							img:""
						},{
							img:""
					}],
					space:"载货空间2.6方，载重500斤",
					refers:[{
						refer:"适合单间租户搬家，行李与少量家电家具"
					},{
						refer:"可装载单个洗衣机或空调等"
					},{
						refer:"不可装超过1.5米床垫以及双门以上家电"
					}]
				},{
					id:2,
					images:[{
						img:""
						},{
							img:""
						},{
							img:""
					}],
					space:"载货空间2.6方，载重1吨",
					refers:[{
						refer:"适合单间租户搬家，行李与少量家电家具"
					},{
						refer:"可装载单个洗衣机或空调等"
					},{
						refer:"不可装超过1.5米床垫以及双门以上家电"
					}]
				},{
					id:3,
					images:[{
						img:""
						},{
							img:""
						},{
							img:""
					}],
					space:"载货空间2.6方，载重1.5吨",
					refers:[{
						refer:"适合单间租户搬家，行李与少量家电家具"
					},{
						refer:"可装载单个洗衣机或空调等"
					},{
						refer:"不可装超过1.5米床垫以及双门以上家电"
					}]
				},{
					id:4,
					images:[{
						img:""
						},{
							img:""
						},{
							img:""
					}],
					space:"载货空间2.6方，载重1.8吨",
					refers:[{
						refer:"适合单间租户搬家，行李与少量家电家具"
					},{
						refer:"可装载单个洗衣机或空调等"
					},{
						refer:"不可装超过1.5米床垫以及双门以上家电"
					}]
				}]
			}
		},
		onLoad(options) {
			this.id=parseInt(options.id)-1;
			switch (this.id)
			{
				case 0:
						uni.setNavigationBarTitle({title:"小面包车详情页"});					
						break;
				case 1:
						uni.setNavigationBarTitle({title:"中面包车详情页"});
						break;
				case 2:
						uni.setNavigationBarTitle({title:"小货车详情页"});
						break;
				case 3:
						uni.setNavigationBarTitle({title:"中货车详情页"});
						break;		
				default:
						break;	
				}					
		},
		methods:{
			
		}
	}
</script>

<style>
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
</style>
