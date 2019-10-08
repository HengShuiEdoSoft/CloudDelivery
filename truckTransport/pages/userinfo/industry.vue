<template>
	<view class="content">
		<view class="ui-divide-bar"></view>
		<view class="ui-list">
			<view class="ui-list-item" v-for="(item,index) in lists" :key="index" @tap="selectIndustry(index)" :class="{active:current==index}">
				<view class="ui-list-item-container">
					<view class="ui-list-text">{{item.name}}</view>
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
				lists:[{name:"生产加工"},{name:"批发零售"},{name:"电商"}]
			}
		},
		methods:{
			selectIndustry:function(index){
				this.current=index;
				//向后台发送
				uni.navigateTo({					
					url:"/pages/userinfo/userinfo?id="+index
				})
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
