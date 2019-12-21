<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-container">
				<view class="dui-photoupload" v-for="(image, index) in imageList" :key="index"><image :src="image" :data-src="image" @tap="previewImage" /></view>
				<view class="dui-photoupload" @tap="chooseImageSource"></view>
				<view class="dui-photoupload-tips">请拍照上传您送达时的货物场景照片,来确定您配送完成，最多上传6张</view>
			</view>
			<view class="dui-confirm-btn-box"><button type="primary" class="dui-photoupload-btn" @tap="save">确认提交</button></view>
		</scroll-view>
	</view>
</template>

<script>
import permision from '@/common/permission.js';
export default {
	data() {
		return {
			imageList: [],
			sourceType: 'camera',
			countIndex: 6,
			max_num: parseInt(this.$store.state.sysconfig.sure_order_photo_num)
		};
	},
	// async onBackPress(e) {
	// 	await this.save();
	// },
	methods: {
		async save() {
			let that = this;
			let res_images = [];
			await that.uploadimg(that.imageList, res_images);
			this.$fire.fire('SUREIMAGES', res_images);
			uni.navigateBack({
				delta:1
			});
		},		
		removeImg: function(e) {
			let that = this;
			that.imageList.splice(e.currentTarget.dataset.index, 1);
			that.$set(that, 'imageList', that.imageList);
		},
		uploadimg: async function(images, res_images, image_index = 0, request_index = 0) {
			if (image_index < images.length) {
				let that = this;
				let upload_result = await new Promise((resolve, reject) => {
					uni.uploadFile({
						url: that.$uniFly.baseUrl + '/api/file/upload',
						filePath: that.imageList[image_index],
						fileType: 'image',
						name: 'uploadimage',
						complete(res) {
							if (res.statusCode == 200) {
								let res_data = JSON.parse(res.data);
								if (res_data.code == 0) {
									resolve(res_data.data);
								} else {
									resolve(false);
								}
							} else {
								resolve(false);
							}
						}
					});
				});
				if (upload_result !== false) {
					res_images[image_index] = upload_result;
					image_index = image_index + 1;
					if (image_index < images.length) {
						return that.uploadimg(images, res_images, image_index, 0);
					} else {
						return;
					}
				} else {
					request_index = request_index + 1;
					if (request_index < 3) {
						return that.uploadimg(images, res_images, image_index, request_index);
					} else {
						res_images[image_index] = upload_result;
						image_index = image_index + 1;
						if (image_index < images.length) {
							return that.uploadimg(images, res_images, image_index, 0);
						} else {
							return;
						}
					}
				}
			} else {
				return;
			}
		},
		chooseImageSource() {
			let that = this;
			uni.showActionSheet({
				itemList: ['从相册中选择', '拍照'],
				itemColor: '#490',
				success: function(res) {
					if (res.tapIndex == 0) {
						that.sourceType = 'album';
					} else if (res.tapIndex == 1) {
						that.sourceType = 'camera';
					} else {
						// console.log('cancel');
					}
					that.chooseImage();
				}
			});
		},
		chooseImage: async function() {
			let that = this;
			// #ifdef APP-PLUS
			let status = await that.checkPermission();
			if (status !== 1) {
				return;
			}
			// #endif
			if (that.imageList.length == that.max_num) {
				let isContinue = await that.isFullImg();
				// console.log('是否继续?', isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: [that.sourceType],
				sizeType: ['original', 'compressed'],
				count: that.max_num - that.imageList.length,
				success: res => {
					that.imageList =that.imageList.concat(res.tempFilePaths);
				},
				fail: err => {
					// console.log(err);
					// #ifdef APP-PLUS
					that.checkPermission();
					// #endif
					// #ifdef MP-WEIXIN
					uni.getSetting({
						success: res => {
							let authStatus = false;
							switch (that.sourceType) {
								case 'camera': {
									authStatus = res.authSetting['scope.camera'];
									break;
								}
								case 'album': {
									authStatus = res.authSetting['scope.album'];
									break;
								}
								default: {
									break;
								}
							}
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: '需要从您的相机或相册获取图片，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
					// #endif
				}
			});
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '已经有6张图片了,是否清空现有图片？',
					success: e => {
						if (e.confirm) {
							that.imageList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		previewImage: function(e) {
			let current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		async checkPermission() {
			let that = this;
			let status = permision.isIOS
				? await permision.requestIOS(that.sourceType)
				: await permision.requestAndroid(that.sourceType == 'camera' ? 'android.permission.CAMERA' : 'android.permission.READ_EXTERNAL_STORAGE');
			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: '没有开启权限',
					confirmText: '设置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				});
			}
			return status;
		}
	}
};
</script>

<style>
.dui-photoupload {
	width: 100%;
	height: 350upx;
	margin-top: 30upx;
	border-radius: 10upx;
	background-color: #e2e2e2;
	background-image: url('../../static/img/photoupload.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: 15%;
	overflow: hidden;
}

.dui-photoupload > image {
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
	background-color: #dd524d;
	border-radius: 0;
}
</style>
