<template>
	<view class="content">
		<view class="dui-mycar-img">
			<image :src="user.car_photos ? user.car_photos : '/static/img/mycar.png'" />
			<view class="dui-confirm-btn">{{user.status==1?'已认证':'未认证'}}</view>
		</view>
		<view class="dui-gap"></view>
		<view class="dui-msgcenter-list">
			<view class="dui-msgcenter-item">
				<view class="dui-mycar-title">车牌号</view>
				<view class="dui-maycar-extra">
					<text>{{ user.car_number }}</text>
				</view>
			</view>
		</view>
		<view class="dui-gap"></view>
		<view class="dui-msgcenter-list">
			<view class="dui-msgcenter-item-box">
				<view class="dui-msgcenter-item">
					<view class="dui-mycar-title">车辆照片</view>
					<view class="dui-maycar-extra">
						<view class="dui-certified">
							<text class="iconfont icon-renzheng1"></text>
							<text>{{user.status==1?'已认证':'未认证'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="dui-msgcenter-item-box">
				<view class="dui-msgcenter-item">
					<view class="dui-mycar-title">身份证照片</view>
					<view class="dui-maycar-extra">
						<view class="dui-certified">
							<text class="iconfont icon-renzheng1"></text>
							<text>{{user.status==1?'已认证':'未认证'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="dui-msgcenter-item-box">
				<view class="dui-msgcenter-item">
					<view class="dui-mycar-title">驾驶证照片</view>
					<view class="dui-maycar-extra">
						<view class="dui-certified">
							<text class="iconfont icon-renzheng1"></text>
							<text>{{user.status==1?'已认证':'未认证'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="dui-msgcenter-item-box">
				<view class="dui-msgcenter-item">
					<view class="dui-mycar-title">行驶证照片</view>
					<view class="dui-maycar-extra">
						<view class="dui-certified">
							<text class="iconfont icon-renzheng1"></text>
							<text>{{user.status==1?'已认证':'未认证'}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['user']),
	data() {
		return {};
	}
};
</script>
<style>
.dui-mycar-img {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 40upx 0;
	background-color: #fff;
}

.dui-mycar-img > image {
	width: 350upx;
	height: 200upx;
}

.dui-confirm-btn {
	margin-top: 40upx;
	padding: 10upx 30upx;
	text-align: center;
	border: 1px solid #ff5723;
	border-radius: 10upx;
	font-size: 28upx;
	color: #ff5723;
}

.dui-msgcenter-item {
	padding: 35upx 30upx;
}

.dui-mycar-title {
	font-size: 30upx;
}

.dui-maycar-extra {
	font-size: 26upx;
	color: #797979;
}

.dui-certified {
	color: #ff5723;
}

.dui-certified text {
	margin-right: 10upx;
}
</style>
