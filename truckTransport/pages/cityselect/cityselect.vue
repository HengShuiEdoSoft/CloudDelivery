<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="ui-city-container">
			<view class="ui-tip">当前城市</view>
			<text class="ui-city">{{ currentCity }}</text>
		</view>
		<view class="ui-city-list"><SortPickerList ref="sortPickerList" @clickData="getSelect"></SortPickerList></view>
	</view>
</template>
<script>
import SortPickerList from '@/components/nickro-sortPickerList/nickro-sortPickerList.vue';
export default {
	components: { SortPickerList },
	data() {
		return {
			currentCity: '',
			status: 1,
			channel: '',
			citydata: {}
		};
	},
	async onLoad(options) {
		let that = this;
		this.currentCity = options.city;
		this.status = parseInt(options.status);
		this.channel = options.channel;
		that.citydata = await that.$drmking.getCityList(that);
		let list = [];
		for (let i in that.citydata) {
			if (parseInt(that.citydata[i].status) == that.status) {
				list.push({
					name: that.citydata[i].city_title,
					value: that.citydata[i].city_id
				});
			}
		}
		that.$refs['sortPickerList'].initPage(list);
	},
	methods: {
		getSelect(data) {
			this.currentCity = data.name;
			if (!this.$drmking.isEmpty(this.channel)) {
				this.$fire.fire(this.channel, this.citydata[data.value]);
			}
			setTimeout(function() {
				uni.navigateBack();
			}, 100);
		}
	}
};
</script>

<style>
.content {
	background: #fff;
}
.ui-tip {
	margin-top: 30upx;
}
.ui-city-container {
	padding: 0 30upx;
	height: 16vh;
}
.ui-city-list{
	height: 83vh;
	overflow: hidden;
}
.ui-city {
	margin: 20upx 0 40upx;
	padding: 10upx 20upx;
	display: inline-block;
	background: #f3f4f5;
}

view {
	font-size: 14px;
	line-height: inherit;
}

.example {
	padding: 0 30upx 30upx;
}

.example-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	color: #464e52;
	padding: 30upx 30upx 30upx 50upx;
	margin-top: 20upx;
	position: relative;
	background-color: #fdfdfd;
	border-bottom: 1px #f5f5f5 solid;
}

.example-title__after {
	position: relative;
	color: #031e3c;
}

.example-title:after {
	content: '';
	position: absolute;
	left: 30upx;
	margin: auto;
	top: 0;
	bottom: 0;
	width: 6upx;
	height: 36upx;
	background-color: #ccc;
}

.example .example-title {
	margin: 40upx 0;
}

.example-body {
	padding: 30upx;
	background: #fff;
}

.example-info {
	padding: 30upx;
	color: #3b4144;
	background: #fff;
}
.ui-city-item {
	line-height: 88upx;
	padding: 0 30upx;
}
.ui-city-item.active {
	color: #ff5723;
}
.ui-city-item:after {
	content: '';
	display: block;
	height: 1px;
	background: #eee;
}
</style>
