<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index" :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view class="scroll-container">
					<navigator class="ui-order-list-item ui-hujiao" url="/pages/orderdetail/orderdetail">
						<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">中面包车</text><text>09月20日 10:22</text></view>
						<view class="ui-divide-line"></view>
						<view class="ui-order-timeline-container">
							<view class="ui-order-timeline uni-timeline">
								<view class="uni-timeline-item uni-timeline-first-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">衡水人民政府</text>
									</view>
								</view>
								<view class="uni-timeline-item uni-timeline-last-item">
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">
										<text class="ui-address">怡然城</text>
									</view>
								</view>
							</view>
							<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
						<view class="ui-order-price">￥20.8</view>
					</navigator>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container">
					<navigator class="ui-order-list-item ui-daizhifu" url="/pages/orderdetail/orderdetail">
						<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">中面包车</text><text>09月20日 10:22</text></view>
						<view class="ui-divide-line"></view>
						<view class="ui-order-timeline-container">
						<view class="ui-order-timeline uni-timeline">
							<view class="uni-timeline-item uni-timeline-first-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">衡水人民政府</text>
								</view>
							</view>
							<view class="uni-timeline-item uni-timeline-last-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">怡然城</text>
								</view>
							</view>
						</view>
						<view class="ui-order-item-more"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
						<view class="ui-order-price">￥20.8</view>
					</navigator>
				</scroll-view>
			</swiper-item>
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
	.scroll-container{
		height:100%;
	}
	.ui-order-cont{
		flex:1;
	}
	.ui-order-price{
		font-weight: 600;
		text-align: right;
	}
	.ui-order-timeline-container{
		display:flex;
		flex-direction: row;
		align-items:center;
	}
	.ui-order-timeline{
		flex:1;
	}
	.ui-order-item-more{
		color:#ccc;
	}
</style>
