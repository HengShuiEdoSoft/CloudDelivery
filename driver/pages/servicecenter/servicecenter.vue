<template>
	<view class="content">
		<view class="dui-wrapper">
			<view class="dui-gap"></view>
			<view class="dui-gap"></view>
			<view class="dui-scrvice-custom-wrapper" style="background-color: #fff;">
				<text>常见问题</text>
			</view>
			<view class="dui-basic-list">
				<block v-for="(item,index) in lists" :key="index">
					<navigator :url="'servicecenter-detail?id=' + index">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										{{item.name}}
									</view>
								</view>
								<view class="dui-basic-list-item__extra">
									<text class="iconfont icon-gengduo-shuxiang"></text>
								</view>
							</view>
						</view>
					</navigator>
				</block>
			</view>
			<view class="dui-scrvice-tel" @tap="call">
				<text class="iconfont icon-dianhua"></text>
				<text>客服热线 {{tel}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tel: "010-8888",
				lists: [{
					"name": "售后问题"
				}, {
					"name": "续费问题"
				}]
			}
		},
		methods: {
			call: function(e) {
				uni.makePhoneCall({
					phoneNumber: '010-8888' //仅为示例
				});
			}
		}
	}
</script>
<style>
	.dui-scrvice-custom-wrapper {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40upx 30upx;
		font-size: 32upx;
	}

	.dui-scrvice-custom-wrapper navigator {
		font-size: 28upx;
	}

	.dui-basic-list-item__content,
	.dui-basic-list-item__extra {
		font-size: 26upx;
		color: #797979;
	}
</style>
