<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="ui-city-container">
			<view class="ui-tip">当前城市</view>
			<text class="ui-city">{{currentCity}}</text>
		</view>
		<uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
	</view>
</template>

<script>
	import city from '@/common/city.data.js'
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				currentCity:"",
				list: city.list
			}
		},
		onLoad(options) {
			this.currentCity=options.city
		},
		methods: {
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			}
		}
	}
</script>

<style>
	.content{
		background: #fff;
	}
	.ui-tip{
		margin-top:30upx;
	}
	.ui-city-container{
		padding:0 30upx;
	}
	.ui-city{
		margin:20upx 0 40upx;
		padding:10upx 20upx;
		display:inline-block;
		background: #f3f4f5;
	}

	view {
		font-size: 14px;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
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
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
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
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}
</style>
