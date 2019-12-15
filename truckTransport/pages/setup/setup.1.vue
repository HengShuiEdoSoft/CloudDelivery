<template>
	<!-- 这个页面的分享是 Popup底部弹出分享  可以弹出但功能不会实现-->
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<view class="dui-basic-list-item">
					<view class="dui-basic-list-item__container dui-reduce">
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								音效提示
							</view>
							<view class="dui-basic-list-item__content-note">
								打开后将以予语音为你播报订单状态
							</view>
						</view>
						<view class="dui-basic-list-item__extra">
							<switch checked color="#FF5723" style="transform:scale(0.7)" @change="switchChange" />
						</view>
					</view>
				</view>
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<navigator url="resetpwd">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container dui-reduce">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									设置密码
								</view>
								<view class="dui-basic-list-item__content-note">
									若你已经设置过密码，点击此处也可修改密码
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<navigator url="commonroutes">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									常用路线
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<navigator url="userprotocol">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									用户协议
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator url="privacypolicy">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									隐私政策
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator url="transportstandard">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									货运业务收费标准
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									搬家业务收费标准
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<view class="dui-basic-list-item" @tap="togglePopup('bottom', 'share')">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								分享
							</view>
						</view>
						<view class="dui-basic-list-item__extra">
							<text class="iconfont icon-gengduo-shuxiang"></text>
						</view>
					</view>
				</view>
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									给我们评分
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator url="about">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									关于
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-gengduo-shuxiang"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
		<view class="dui-fixed-bottom-btn">
			<text>退出登录</text>
		</view>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="share" :type="type" :custom="true">
			<view class="uni-share">
				<view class="uni-share-content">
					<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box">
						<view class="uni-share-content-image">
							<image :src="item.icon" class="image" />
						</view>
						<view class="uni-share-content-text">{{ item.text }}</view>
					</view>
				</view>
				<view class="uni-share-btn" @click="cancel('share')">取消</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				show: false,
				type: '',
				bottomData: [{
						text: '朋友圈',
						icon: '../../static/img/pyq-share.png'
					},
					{
						text: '微信好友',
						icon: '../../static/img/wx-share.png'
					},
					{
						text: 'QQ',
						icon: '../../static/img/qq-share.png'
					},
					{
						text: 'QQ空间',
						icon: '../../static/img/qqkj-share.png'
					}
				]
			}
		},
		methods: {
			switchChange: function(e) {
				console.log('switch 发生 change 事件，携带值为', e.target.value)
			},
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open()
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},

		}
	}
</script>
<style>
	.scroll-container {
		height: 100%;
		padding-bottom: 20%;
	}

	.dui-fixed-bottom-btn {
		background-color: #fff;
		color: #FF5723;
		font-size: 32upx;
		text-align: center;
	}

	.dui-fixed-bottom-btn text {
		display: block;
		margin-top: 15upx;
		margin-bottom: 15upx;
	}

	.dui-basic-list-item__container {
		padding: 26upx 30upx;
	}

	.dui-reduce {
		padding-top: 8upx;
		padding-bottom: 8upx;
	}

	.dui-basic-list-item__content-note {
		font-size: 24upx;
		margin-top: 0;
	}

	.dui-basic-list-item__extra {
		width: auto;
	}

	/* 底部分享 */
	.uni-share {
		background: #fff;
	}

	.uni-share-content {
		display: flex;
		flex-wrap: wrap;
		padding: 50upx;
	}

	.uni-share-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		box-sizing: border-box;
	}

	.uni-share-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120upx;
		height: 120upx;
		overflow: hidden;
		border-radius: 10upx;
	}

	.uni-share-content-image .image {
		width: 100%;
		height: 100%;
	}

	.uni-share-content-text {
		font-size: 26upx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}

	.uni-share-btn {
		height: 100upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
		text-align: center;
		color: #090909;
		font-size: 30upx;
	}
</style>
