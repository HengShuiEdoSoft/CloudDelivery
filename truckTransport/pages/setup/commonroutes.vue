<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-notyet-wrapper">
			<image src="../../static/img/map.jpg" mode=""></image>
			<text>暂无可用路线</text>
			<navigator url="">
				<view class="dui-routes-btn">添加常用路线 </view>
			</navigator>
		</view>
	</view>
</template>
<script>
</script>
<style>
	.content {
		background-color: #fff;
	}

	.dui-notyet-wrapper image {
		width: 170upx;
		height: 200upx;
	}

	.dui-notyet-wrapper text {
		margin: 86upx 0 70upx 0;
		color: #8d8d8d;
	}

	.dui-routes-btn {
		width: 290upx;
		height: 85upx;
		line-height: 85upx;
		background-color: #fff2de;
		color: #FF5723;
		text-align: center;
		border-radius: 10upx;
	}
</style>
