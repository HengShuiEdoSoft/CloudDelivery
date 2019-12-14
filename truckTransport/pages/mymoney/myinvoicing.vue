<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-gap"></view>
		<view class="dui-basic-list">
			<navigator url="myinvoicing-trip">
				<view class="dui-basic-list-item">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__content"><view class="dui-basic-list-item__content-title">开发票</view></view>
						<view class="dui-basic-list-item__extra"><text class="iconfont icon-gengduo-shuxiang"></text></view>
					</view>
				</view>
			</navigator>
			<navigator url="myinvoicing-history">
				<view class="dui-basic-list-item">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__content"><view class="dui-basic-list-item__content-title">开票历史</view></view>
						<view class="dui-basic-list-item__extra"><text class="iconfont icon-gengduo-shuxiang"></text></view>
					</view>
				</view>
			</navigator>
		</view>
		<view class="dui-gap"></view>
		<view class="dui-basic-list">
			<navigator url="myinvoicing-rule">
				<view class="dui-basic-list-item">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__content"><view class="dui-basic-list-item__content-title">开票规则</view></view>
						<view class="dui-basic-list-item__extra"><text class="iconfont icon-gengduo-shuxiang"></text></view>
					</view>
				</view>
			</navigator>
		</view>
		<view class="dui-gap"></view>
		<view class="dui-basic-tips">
			<view class="dui-basic-tips-title">温馨提示</view>
			<view><parser :html="data ? data.content : ''"></parser></view>
		</view>
	</view>
</template>
<script>
import parser from '@/components/jyf-Parser/index';
export default {
	components: {
		parser
	},
	data() {
		return {
			data: null
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData() {
			let _self = this;
			const data = {
				scode: _self.$drmking.md5('温馨提示')
			};
			this.$uniFly
				.get({
					url: '/api/article/getarticledetail',
					params: data
				})
				.then(function(res) {
					if (res.code == 0) {
						_self.data = res.data;
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content: JSON.stringify(error),
						showCancel: false
					});
				});
		}
	}
};
</script>
<style>
	
</style>