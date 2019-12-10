<template>
	<view class="content">
		<view class="ui-divide-bar"></view>
		<view class="ui-list">
			<view class="ui-list-item" v-for="(item,index) in lists" :key="index" @tap="selectCar(index)" :class="{active:current==index}">
				<view class="ui-list-item-container">
					<view class="ui-list-text">{{item.car_title}}</view>
					<view class="ui-select-icon"><text class="iconfont icon-xiaoxi-chenggong"></text></view>			
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0,
				carinfo:{},
				lists:[]
			}
		},
		async onLoad(){
			let carInfos= await this.$drmking.getCarInfos(this);
			console.log(carInfos)
			let that=this;
			if(!that.$drmking.isEmpty(carInfos)){
				let lists=[]
				for(var key in carInfos){
					lists.push(carInfos[key]);
				}
				that.lists=lists;
			}	
		},
		onBackPress() {
			this.$fire.fire('CARTYPE', this.carinfo);
		},
		methods:{
			selectCar:function(index){
				this.current=index;
				this.carinfo=this.lists[index];
			}
		}
	}
</script>

<style>
	.content{
		background: #fff;
	}
	.ui-list{
		margin-top:20upx;
		padding:0 30upx;
	}
	.ui-list-item-container{
		display:flex;
		line-height: 92upx;
		font-size:14px;
	}
	.ui-list-text{
		flex:1;
	}
	.ui-list-item:after{
		content:"";
		display:block;
		height:1px;
		transform: scaleY(.5);
		background: #ddd;
	}
	.ui-select-icon{
		display:none;
	}
	.ui-list-item.active{
		color:#FF5723;
	}
	.ui-list-item.active .ui-select-icon{
		display:inline-block;
	}
</style>
