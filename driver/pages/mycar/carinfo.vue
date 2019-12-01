<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">车型</text>
				<m-input type="text" focus clearable v-model="business_title" placeholder="请选择车型"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">银行卡号</text>
				<m-input type="text" focus clearable v-model="business_title" placeholder="请输入银行卡号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">银行卡照片</text>
				<view class="dui-bosiness-photos"><image :src="photos[0]" @click="clk(0)"></image></view>
			</view>
			<view class="input-row border">
				<text class="title">车牌号</text>
				<m-input type="text" focus clearable v-model="business_title" placeholder="请输入车牌号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">车辆照片</text>
				<view class="dui-bosiness-photos"><image :src="photos[1]" @click="clk(1)"></image></view>
			</view>
			<view class="input-row border">
				<text class="title">身份证照片</text>
				<view class="dui-bosiness-photos"><image :src="photos[2]" @click="clk(2)"></image></view>
			</view>
			<view class="input-row border">
				<text class="title">驾驶证照片</text>
				<view class="dui-bosiness-photos"><image :src="photos[3]" @click="clk(3)"></image></view>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="submitRealInfo()">保存</button></view>
		<photos @upload="doUpload" @avtinit="doBefore" quality="0.8" ref="photos"></photos>
	</view>
</template>
<script>
import mInput from '@/components/m-input.vue';
import photos from '@/components/yq-avatar/yq-avatar.vue';
export default {
	components: {
		mInput,
		photos
	},
	data() {
		return {
			car_id: '',
			bank_card_num: '',
			car_number:'',
			countdown: 60,
			bank_card_photo: '',
			car_photos:'',
			driver_photos:'',
			driving_photos:'',
			driverphotos: ['../../static/img/addimg.png','../../static/img/addimg.png','../../static/img/addimg.png','../../static/img/addimg.png']
		};
	},
	methods: {
		submitRealInfo() {
			let that = this;
			const data = {
				car_id: that.car_id,
				bank_card_num: that.bank_card_num,
				bank_card_photo: that.business_number,
				car_number:this.car_number,
				car_photos:this.car_photos,
				driver_photos:this.driver_photos,
				driving_photos:this.driving_photos
			};
			if (that.$drmking.isEmpty(data.bank_card_num)) {
				uni.showToast({
					icon: 'none',
					title: '银行卡号不能为空!'
				});
				return;
			}
			if (that.$drmking.isEmpty(data.bank_card_photo)) {
				uni.showToast({
					icon: 'none',
					title: '银行卡图片不能为空!'
				});
				return;
			}
			if (that.$drmking.isEmpty(data.car_number)) {
				uni.showToast({
					icon: 'none',
					title: '车牌号不能为空!'
				});
				return;
			}
			if (that.$drmking.isEmpty(data.car_photos)) {
				uni.showToast({
					icon: 'none',
					title: '车辆图片不能为空!'
				});
				return;
			}
			if (that.$drmking.isEmpty(data.driver_photos)) {
				uni.showToast({
					icon: 'none',
					title: '驾驶证图片不能为空!'
				});
				return;
			}
			if (that.$drmking.isEmpty(data.driving_photos)) {
				uni.showToast({
					icon: 'none',
					title: '行驶证图片不能为空!'
				});
				return;
			}
			that.$uniFly
				.post({
					url: '/api/user/addbusinessinfo',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						that.$store.commit('login', res.data);
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
							});
						},3000);
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content: error,
						showCancel: false
					});
				});
		},
		clk(index) {
			this.$refs.photos.fChooseImg(index, {
				selWidth: '360upx',
				selHeight: '360upx',
				expWidth: '280upx',
				expHeight: '280upx',
				inner: index ? 'true' : 'false'
			});
		},
		doBefore() {},
		doUpload(rsp) {
			let that = this;
			that.$set(that.driverphotos, rsp.index, rsp.path);
			uni.uploadFile({
				url: that.$uniFly.baseUrl + '/api/file/upload',
				filePath: rsp.path,
				name: 'uploadimage',
				success: res => {
					if (res.statusCode == 200) {
						let data = JSON.parse(res.data);
						if (data.code == 0) {
							that.business_number=data.data[0];
							that.car_photos=data.data[1];
							that.driver_photos=data.data[2];
							that.driving_photos=data.data[3];
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.errMsg
						});
					}
				},
				complete(res) {
					console.log(res);
				}
			});
		}
	}
};
</script>
<style>
.input-row .title {
	width: 30%;
	font-size: 16px;
}

.dui-bosiness-photos {
	width: 250upx;
	height: 250upx;
	padding: 24upx 0;
}

.dui-bosiness-photos image {
	width: 100%;
	height: 100%;
}
</style>
