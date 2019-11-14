<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index" :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view class="scroll-container">
					<view v-if="newsList[0].length===0">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator class="ui-order-list-item ui-hujiao" v-for="(item,index) in newsList[0]" :url="'/pages/orderdetail/orderdetail?id='+item.order_id" :key="item.order_id">
						<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">{{item.car}}</text><text>{{item.sure_time}}</text></view>
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
						<view class="ui-order-price">{{"￥"+item.order_price}}</view>
					</navigator>
					<view class="loading">{{loadingText[0]}}</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container">
					<view v-if="newsList[1].length===0">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator class="ui-order-list-item ui-daizhifu" v-for="(item,index) in newsList[1]" :url="'/pages/orderdetail/orderdetail?id='+item.order_id" :key="item.order_id">
						<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">{{item.car}}</text><text>{{item.sure_time}}</text></view>
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
						<view class="ui-order-price">{{"￥"+item.order_price}}</view>						
					</navigator><view class="loading">{{loadingText[1]}}</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view>
					<view v-if="newsList[2].length===0">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator class="ui-order-list-item ui-daizhifu" v-for="(item,index) in newsList[2]" :url="'/pages/orderdetail/orderdetail?id='+item.ocode" :key="item.order_id">
						<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">{{item.car}}</text><text>{{item.sure_time}}</text></view>
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
						<view class="ui-order-price">{{"￥"+item.order_price}}</view>	
					</navigator>
					<view class="loading">{{loadingText[2]}}</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script> 
	export default {
		data(){
			return{
				current:0,
				loadingText:['','',''],
				page:[1,1,1],
				tab:[{
						name:"进行中",
					},{
						name:"已完成",
					},{
						name:"已取消",
				}],
				newsList:[{},{},{}],
				status:["0,1,2,3","4,5","11,12,13"]
			}
		},
		onShow(){
			let that=this;
		    this.getnewsList(that.current);
		},
		/*onPullDownRefresh:function(){
			let that=this;
		   this.getnewsList(that.current);		   	
		   }
		},
		onReachBottom:function(){
			let that=this;
			if(timer != null){
			   clearTimeout(timer);
			}
			timer = setTimeout(function(){
			   this.getmorenews(that.current);   
			}, 1000);
		 },*/
		methods:{
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current=index;
				this.getnewsList(that.current);
			},
			swiperChange:function(e) {			
				var index=e.target.current || e.detail.current;
				this.current = index;
			},
			getmorenews : function(current){
				let _self = this;
				if(_self.loadingText[current] != '' && _self.loadingText[current] != '加载更多'){
					return false;
			    }
			    _self.loadingText[current] = '加载中...';
			    uni.showNavigationBarLoading(); 
				 const data={
					page:this.page[current],
					status:this.status[current]
				 }
			    this.$uniFly
				.post({
					url:"/api/order/getorderlist",
					params: data
				})	
				.then({function(res){
					if(res.code===0){
						_self.loadingText[_self.current] = '';
						if(!res.data.has_next){
							uni.hideNavigationBarLoading();
							_self.loadingText[current] = '已加载全部';
							return false;
						}
						_self.page[current]++;
						//console.log(res);
						_self.newsList[current] = _self.newsList[current].concat(res.data);
						_self.loadingText[current] = '加载更多';
						uni.hideNavigationBarLoading();
					}else{
						uni.showToast({
						    content: res.msg,
						    showCancel: false
						});
					}
					}
				})
				.catch(function(error) {
				    uni.showToast({
				  	    content: error,
				  	    showCancel: false
				    });
				});
			},
			getnewsList: function(current){
				let _self = this;
			    _self.page[current] = 1;
			    //uni.showNavigationBarLoading();
				 const data={
					 page:this.page[current],
					 status:this.status[current]
				 }
			    this.$uniFly
				.post({
					url:"/api/order/getorderlist",
					params: data
				})
				.then({function(res){
					console.log(res.data)
					if(res.code===0){
						_self.page[current]++;
						_self.newsList[current] = res.data;						
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						_self.loadingText[current] = '加载更多';
					}else{
						uni.showToast({
						    content: res.msg,
						    showCancel: false
						});
					}
					}
			    })
				.catch(function(error) {
				    uni.showToast({
				  	    content: error,
				  	    showCancel: false
				    });
				})
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
