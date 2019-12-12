<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">企业名称</text>
				<m-input type="text" focus clearable v-model="business_title" placeholder="请输入企业名称"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">营业执照照片</text>
				<view class="dui-bosiness-photos"><image :src="photos[0]" @click="clk(0)"></image></view>
			</view>
			<view class="input-row border">
				<text class="title">营业执照编号</text>
				<m-input type="text" clearable v-model="business_number" placeholder="请输入营业执照编号"></m-input>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="submitRealInfo()">保存</button></view>
		<photos @upload="doUpload" @avtinit="doBefore" quality="0.8" ref="photos"></photos>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
import mInput from '@/components/m-input.vue';
import photos from '@/components/yq-avatar/yq-avatar.vue';
export default {
	components: {
		mInput,
		photos
	},
	data() {
		return {
			business_title: '',
			business_number: '',
			countdown: 60,
			business_photos: '',
			photos: ['../../static/img/addimg.png']
		};
	},
	methods: {
		...mapMutations(['becompany']),
		submitRealInfo() {
			let that = this;
			const data = {
				business_title: that.business_title,
				business_photos: that.business_photos,
				business_number: that.business_number
			};
			if (that.$drmking.isEmpty(data.business_title)) {
				uni.showToast({
					icon: 'none',
					title: '企业名称不能为空!'
				});
				return;
			}
			if (that.$drmking.isEmpty(data.business_number)) {
				uni.showToast({
					icon: 'none',
					title: '营业执照编号不能为空!'
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
						that.becompany(true);
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
			that.$set(that.photos, rsp.index, rsp.path);
			uni.uploadFile({
				url: that.$uniFly.baseUrl + '/api/file/upload',
				filePath: rsp.path,
				name: 'uploadimage',
				success: res => {
					if (res.statusCode == 200) {
						let data = JSON.parse(res.data);
						if (data.code == 0) {
							that.business_photos = data.data;
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
