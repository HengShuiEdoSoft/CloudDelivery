<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-coupon-input">
			<input type="text" value="" focus="true" placeholder="输入昵称" />		
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
			
		},
		onNavigationBarButtonTap(e){
			var index=e.index;
			if(index===0){
				//保存
			}
		    
		}
	}
</script>

<style>
	.dui-coupon-input {
		margin-top:20upx;
		background-color: #fff;
		padding: 35upx;
	}
</style>
