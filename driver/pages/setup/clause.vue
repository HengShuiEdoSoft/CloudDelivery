<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>			
			<view class="dui-privacy-tips">
				<parser :html="data?data.content:''"></parser>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import parser from '@/components/jyf-Parser/index';
export default {
	components: {
		parser
	},
	onLoad() {
		this.getData();
	},
	data() {
		return {
			data: null
		};
	},
	methods: {
		getData() {
			let _self = this;
			const data = {
				scode: _self.$drmking.md5('服务条款')
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
	background-color: #fff;
}

.scroll-container {
	height: 100%;
}

.dui-privacy-tips {
	padding: 50upx;
	font-size: 28upx;
	line-height: 40upx;
}
</style>
