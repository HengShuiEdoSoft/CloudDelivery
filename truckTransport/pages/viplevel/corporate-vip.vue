<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">企业姓名</text>
				<m-input type="text" focus clearable v-model="realname" placeholder="请输入企业名称"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">营业执照照片</text>
				<view class="dui-bosiness-photos">
					<image :src="imgurl[0]" @click="clk(0)"></image>
				</view>
			</view>
			<view class="input-row border">
				<text class="title">营业执照编号</text>
				<m-input type="text" clearable v-model="idcardnum" placeholder="请输入营业执照编号"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="submitRealInfo()">保存</button>
		</view>
		<avatar @upload="doUpload" @avtinit="doBefore" quality="0.8" ref="avatar"></avatar>
	</view>
</template>

<script>
	import mInput from '@/components/m-input.vue';
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			mInput,
			avatar
		},
		data() {
			return {
				realname: '',
				idcardnum: '',
				countdown: 60,
				imgurl: ["../../static/img/addimg.png"]
			}
		},
		methods: {
			submitRealInfo() {

			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index, {
					selWidth: '360upx',
					selHeight: '360upx',
					expWidth: '280upx',
					expHeight: '280upx',
					inner: index ? 'true' : 'false'
				});
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.imgurl, rsp.index, rsp.path);
				return;
				uni.uploadFile({
					url: '',
					filePath: rsp.path,
					name: 'avatar',
					formData: {
						'avatar': rsp.path
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					},
					complete(res) {
						console.log(res)
					}
				});
			}
		}
	}
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
