<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="ui-city-container">
			<view class="ui-tip">当前城市</view>
			<text class="ui-city">{{currentCity}}</text>
		</view>		
		<view class="ui-city-list">
			<view class="ui-tip" style="padding:20upx 30upx">可选城市</view>
			<view v-for="(item,index) in list" class="ui-city-item" :key="item.city_id" :class="{active:index==current}" :data-current="index" @tap="getSelect(index)">{{item.city_title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCity:"",
				currentId:"",
				current:1,
				list: []
			}
		},
		onLoad(options) {
			this.currentCity=options.city;
			let that=this;
			if(that.$drmking.cacheData("CITY_SELECT")){
				that.list=that.$drmking.cacheData("CITY_SELECT");
				return;
			}
			this.$uniFly
			  .get({
			    url: "/api/city/getcitylist",
			    params: {}
			  })
			  .then(function(res) {
			    if(res.code===0){
			    	that.list=res.data;
					that.$drmking.cacheData("CITY_SELECT",res.data,2596000);
					that.currentCity=that.list[0].city_title;
					that.currentId=that.list[0].city_id;
					console.log(res.data);
				}
			  })
			  .catch(function(error) {
			    uni.showToast({
			    	content: error,
			    	showCancel: false
			    });
			  })
		},
		methods: {
			getSelect:function(index){
				this.current=index;
				this.currentCity=this.list[index].city_title;
				this.currentId=this.list[index].city_id;
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
	.ui-city-item{
		line-height: 88upx;
		padding:0 30upx;
	}
	.ui-city-item.active{
		color:#FF5723;
	}
	.ui-city-item:after{
		content:"";
		display:block;
		height:1px;
		background: #eee;
	}
</style>
