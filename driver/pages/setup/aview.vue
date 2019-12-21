<template>
	<view class="content">
		<view class="dui-basic-tips"><parser :html="data ? data.content : ''"></parser></view>
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
			data: null,
			scode: null,
			title: null
		};
	},
	onLoad(options) {
		let that = this;
		if (options) {
			that.scode = options.scode;
			that.title = options.title;
		}
		uni.setNavigationBarTitle({
			title: that.title
		});
		that.getData();
	},
	methods: {
		getData() {
			let _self = this;
			const data = {
				scode: _self.scode
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
<style></style>