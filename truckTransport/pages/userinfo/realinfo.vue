<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">真实姓名</text>
				<m-input type="text" focus clearable v-model="realname" placeholder="请输入真实姓名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">身份证号</text>
				<m-input type="text" focus clearable v-model="idcard_number" placeholder="请输入身份证号码"></m-input>
			</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="submitRealInfo()">保存</button></view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
export default {
	components: {
		mInput
	},
	data() {
		return {
			realname: '',
			idcard_number: '',
			idcard_photos: ''
		};
	},
	methods: {
		submitRealInfo() {
			let that=this;
			const data = {
				realname: that.realname,
				idcard_number: that.idcard_number,
				idcard_photos: that.idcard_photos
			};
			that.$uniFly
				.post({
					url: '/api/user/edituserinfo',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						uni.showToast({
							icon: 'none',
							title: '成功保存'
						});
						service.addUser(res.data);
						that.$store.commit('login', res.data);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content: error,
						showCancel: false
					});
				});
		}
	}
};
</script>

<style>
.content {
	background: #fff;
}
.input-row .title {
	width: 24%;
	font-size: 16px;
}
</style>
