<template>
	<view class="content">
		<view class="ui-info-list">
			<view class="ui-info-list-item">
				<view class="ui-info-list-left">手机号</view>
				<view class="ui-info-list-center"><input placeholder="去设置" :value="num" disabled="true" placeholder-style="color:#999"></view>
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
				num:""
			}
		},
		onLoad(options){
			this.num=options.num;
		},
		methods:{
			tochangenum(){
				uni.navigateTo({
					url:"/pages/userinfo/phoneverify?num=136****9999"
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
