<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-container" v-for="(image,index) in imageList" :key="index">
				<view class="dui-photoupload">
					<image :src="image" :data-src="image" @tap="previewImage">
				</view>
				<view class="dui-photoupload-tips">
					请拍照上传您送达时的货物场景照片,来确定您配送完成，最多上传6张
				</view>
			</view>
			<view class="dui-confirm-btn-box">
				<button type="primary" class="dui-photoupload-btn" @tap="upload">确认提交</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册'],
				countIndex: 6,
				count: [1, 2, 3, 4, 5, 6]
			}
		},
		methods: {
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
			
				if (this.imageList.length === 6){
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue){
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: ['original', 'compressed'], 
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],			
					success: (res) => {
						that.imageList = that.imageList.concat(res.tempFilePaths);
						//this.$set();这里不会写
						
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有6张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			upload:function(){
				let that=this;
				uni.uploadFile({
					url: that.$uniFly.baseUrl + '/api/file/upload',
					filePath: that.imageList,
					fileType: 'image',
					name: 'uploadimage',
					success: (res) => {
						console.log('uploadImage success, res is:', res)
						uni.showToast({
							title: '上传成功',
							icon: 'success',
							duration: 1000
						})
					},
					fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					}
				});
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
			
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
			
				return status;
			}
		}
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
