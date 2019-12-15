<template>
	<view class="content">
		<view class="ui-info-list">
			<view class="ui-info-list-item">
				<view class="ui-info-list-left">手机号</view>
				<view class="ui-info-list-center"><input placeholder="去设置" :value="phone" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="tochangenum()">更换手机号</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone:"",
			}
		},
		onLoad(options){
			if(options.num &&!this.$drmking.isEmpty(options.num)){
				this.phone=options.num;
			}			
		},
		methods:{
			tochangenum(){	
				var url='/pages/userinfo/phoneverify?num='+this.phone;
				uni.navigateTo({
				    url:url
				})
			}
		}
	}
</script>

<style>
	.ui-info-list-item:first-child {
		line-height: 80upx;
	}
	.ui-info-list-item:first-child .ui-info-list-center{
		height:80upx;
	}
</style>
