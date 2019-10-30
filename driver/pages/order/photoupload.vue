<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-container">
				<view class="dui-photoupload">
					<image src="" >
				</view>
				<view class="dui-photoupload-tips">
					请拍照上传您送达时的货物场景照片,来确定您配送完成，最多上传6张
				</view>
			</view>
			<button type="primary" class="dui-photoupload-btn">确认提交</button>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgurl: []
			}
		},
		methods:{}
	}
</script>

<style>
	.dui-photoupload {
		width: 100%;
		height: 350upx;
		margin-top: 30upx;
		border-radius: 10upx;
		background-color: #e2e2e2;
		background-image: url("../../static/img/photoupload.png");
		background-position: center;
		background-repeat: no-repeat;
		background-size: 15%;
		overflow: hidden;
	}

	.dui-photoupload>image {
		width: 100%;
		height: 100%;
	}

	.dui-photoupload-tips {
		text-align: justify;
		padding-top: 30upx;
		font-size: 28upx;
		color: #797979;
	}

	.dui-photoupload-btn {
		margin: 60upx 20upx;
		background-color: #DD524D;
		border-radius: 0;
	}
</style>
