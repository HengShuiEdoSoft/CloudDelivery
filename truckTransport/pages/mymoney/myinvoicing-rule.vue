<template>
	<view class="content">
		<view class="dui-basic-tips">
			<parser :html="data ? data.content : ''"></parser>
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
	onNavigationBarButtonTap: function(e) {
		let index = e.index;
		if (index === 0) {
			uni.redirectTo({
				url: '/pages/mymoney/mymoney'
			});
		}
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData() {
			let _self = this;
			const data = {
				scode: _self.$drmking.md5('开票规则')
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
