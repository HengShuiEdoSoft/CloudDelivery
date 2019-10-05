<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index" :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<swiper @change="swiperChange" :current="current">
			<swiper-item>
				<scroll-view>
					<view>1</view>
				</scroll-view>
			</swiper-item>
			<swiper-item><scroll-view>2</scroll-view></swiper-item>
			<swiper-item><scroll-view>3</scroll-view></swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				current:0,
				tab:[{
						name:"进行中",
					},{
						name:"已完成",
					},{
						name:"已取消",
				}]
			}
		},
		methods:{
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current=index;
			},
			swiperChange:function(e) {			
				var index=e.target.current || e.detail.current;
				this.current = index;
			}
		}
	}
</script>

<style>
</style>
