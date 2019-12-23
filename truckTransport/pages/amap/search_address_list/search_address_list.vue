<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="search_input">
			<view class="navigateback" @tap="navigateback"><uni-icons type="arrowleft" size="26"></uni-icons></view>
			<view class="search_input_input_box"><input class="uni-input" @input="search" :focus="true" @focus="search" :placeholder="placeholder" /></view>
		</view>
		<view class="search_tips" v-show="search_tips">
			<view class="search_tips_item" v-for="(item, index) in tips" :key="index" @tap="choice_tip(item)">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
let amap = require('@/common/amap.js');
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
	components: { uniIcons },
	data() {
		return {
			city: '',
			placeholder: '请输入地址',
			icon: '',
			search_tips: false,
			tips: [],
			map: null
		};
	},
	onLoad(options) {
		let that = this;
		that.city = options.city;
		if (options.icon) {
			that.icon = options.icon;
			if (that.icon == 'fa') {
				that.placeholder = '请输入发货地址';
			}
			if (that.icon == 'shou') {
				that.placeholder = '请输入收货地址';
			}
		}
		if (options.placeholder) {
			that.placeholder = options.placeholder;
		}
		that.map = uni.createMapContext('amap', that);
	},
	methods: {
		navigateback() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 搜索地区
		search(e) {
			let that = this;
			let keyword = e.detail.value;
			if (!this.$drmking.isEmpty(keyword)) {
				amap.getInputtips(that.city, keyword)
					.then(res => {
						if (res.tips.length > 0) {
							that.search_tips = true;
							let list = [];
							for (let i = 0; i < res.tips.length; i++) {
								if (res.tips[i].location.length > 0) {
									list.push(res.tips[i]);
								}
							}
							that.tips = list;
						}
					})
					.catch(e => {
						that.search_tips = false;
					});
			} else {
				that.tips = [];
				that.search_tips = false;
			}
		},
		// 选择地区
		choice_tip(item) {
			try {
				this.search_tips = false;
				this.$fire.fire('setAmapLocation', item);
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 500);
			} catch (e) {
				// console.log(e);
			}
		}
	}
};
</script>

<style>
view {
	font-size: 28upx;
}
.search_input {
	width: 100vw;
	display: flex;
	flex-direction: row;
	z-index: 999;
	height: 96rpx;
	overflow: hidden;
	background-color: #fff;
	align-items: center;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.search_tips {
	padding: 0 30upx;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 999;
	height: calc(100vh - 96upx);
	box-sizing: border-box;
	overflow: hidden;
	background-color: #fff;
}

.search_tips_item {
	border-bottom: 1px solid #cccccc;
	height: 96upx;
	width: 100%;
	padding: 0 5px;
	line-height: 96upx;
	box-sizing: border-box;
}
</style>
