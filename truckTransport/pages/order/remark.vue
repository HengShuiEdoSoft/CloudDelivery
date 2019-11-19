<template>
	<view class="content">
		<view class="ui-divide-bar"></view>
		<view class="ui-remark-container">
			<view>
				<textarea placeholder="输入备注(如货物类别)" maxlength="200" focus/>
			</view>
			<view>
				<button class="primary" type="primary" @tap="sure">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:""
			}
		},
		methods:{
			bindTextAreaBlur: function (e) {
			    this.value=e.detail.value
			},
			sure:function(){
				//传参
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.ui-remark-container{
		padding:0 30upx;
	}
	textarea{
		width:100%;
		padding:20upx;
		font-size:14px;
		line-height: 48upx;
		background: #fff;
		box-sizing: border-box;
	}

	
</style>
