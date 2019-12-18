<!-- 
展示屏幕文字滚动效果
 
使用方法：

 -->
<!-- 
展示屏幕文字滚动效果

usage:
 list:数组数据
 @getCurrentIndex  获取当前swiper的下标
 <textscroll :list="list" @getCurrentIndex="getIndex"/>

 -->

<template>
	<view class="_notice">
		<swiper class="_swiper tc" @change="slideChange" indicator-dots="false" autoplay="true" :interval="interval" circular="true"
		 display-multiple-items="1" :duration="duration" :current="current">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item uni-bg-red">{{item}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			//显示数据
			list: {
				type: Array,
				defual:function(){
					return [];
				}
			},
		},
		data() {
			return {
				interval:10000,
				duration:1000,
				current:0
			};
		},
		methods:{
			slideChange(e){
				let index = e.target.current || e.detail.current;
				this.current=index;
				this.$emit('getCurrentIndex',e.detail.current); 	
			}
		}

	};
</script>

<style lang="scss">
	._notice {
		padding:20upx 0;
		font-size: 20upx;
		height: 136upx;
		line-height: 48upx;
		color: #111;
		background: rgba(#FF9801,.1);
		border:1px solid #FF9801;
		overflow: hidden;
		box-sizing: border-box;

	}
	.swiper-item{padding:0 20upx;}
	._swiper {
		line-height: 48upx;
	}
</style>
