<template>
	<view class="content">
		<view class="ui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index" :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view class="scroll-container">
					<view v-if="newsList[0].list.length===0">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator class="ui-order-list-item ui-hujiao" v-for="(item,index) in newsList[0].list" :url="'/pages/orderdetail/orderdetail?id='+item.order_id" :key="item.order_id">
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
					<view v-if="newsList[1].list.length===0">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator class="ui-order-list-item ui-daizhifu" v-for="(item,index) in newsList[1].list" :url="'/pages/orderdetail/orderdetail?id='+item.order_id" :key="item.order_id">
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
					<view v-if="newsList[2].list.length===0">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有订单信息</text>
						</view>
					</view>
					<navigator class="ui-order-list-item ui-daizhifu" v-for="(item,index) in newsList[2].list" :url="'/pages/orderdetail/orderdetail?id='+item.ocode" :key="item.order_id">
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
	var _self,timer = null; 
	export default {
		data(){
			return{
				current:0,
				loadingText:['','',''],
				userinfo:{},
				page1:1,
				page2:1,
				page3:1,
				tab:[{
						name:"进行中",
					},{
						name:"已完成",
					},{
						name:"已取消",
				}],
				newsList:[{
						has_next:false,
						list:[{
							order_id:1,
							order_price:20,
							car:"小面包车"
						}]
					},{
						has_next:false,
						list:[{
							order_id:1,
							order_price:20,
							car:"小面包车"
						}]
					},{
						has_next:false,
						list:[{
							order_id:1,
							order_price:20,
							car:"小面包车"
						}]
					}],
				status:["0,1,2,3","4,5","11,12,13"]
			}
		},
		onShow:function(){
		    _self = this;
		    _self.getnewsList(_self.page1,_self.status[0]);
		},
		onPullDownRefresh:function(){
		   _self = this;
		   switch (_self.current){
		   	case 0:
		   		_self.getnewsList(_self.page1,_self.status[0]);
		   		break;
		   	case 1:
				_self.getnewsList(_self.page2,_self.status[1]);
		   		break;
		   	case 2:
		   		_self.getnewsList(_self.page3,_self.status[2]);
		   		break;		   	
		   }
		},
		onReachBottom:function(){
			if(timer != null){
			   clearTimeout(timer);
			}
			timer = setTimeout(function(){
			   switch (_self.current){
			   	case 0:
			   		_self.getmorenews(_self.page1,_self.status[0]);
			   		break;
			   	case 1:
			   		_self.getmorenews(_self.page2,_self.status[1]);
			   		break;
			   	case 2:
			   		_self.getmorenews(_self.page3,_self.status[2]);
			   		break;
			   	
			   }
			}, 1000);
		 },
		methods:{
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current=index;
				_self = this;
				switch (_self.current){
					case 0:
						_self.getnewsList(_self.page1,_self.status[0]);
						break;
					case 1:
						_self.getnewsList(_self.page2,_self.status[1]);
						break;
					case 2:
						_self.getnewsList(_self.page3,_self.status[2]);
						break;		   	
				}
			},
			swiperChange:function(e) {			
				var index=e.target.current || e.detail.current;
				this.current = index;
			},
			getmorenews : function(page,status){
				if(_self.loadingText[_self.current] != '' && _self.loadingText[_self.current] != '加载更多'){
					return false;
			    }
			    _self.loadingText[_self.current] = '加载中...';
			    uni.showNavigationBarLoading(); 
				 const data={
					 page:page,
					 pagesize:10,
					 status:status
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
							_self.loadingText[_self.current] = '已加载全部';
							return false;
						}
						page++;
						//console.log(res);
						_self.newsList[_self.current] = _self.newsList[_self.current].concat(res.data);
						_self.loadingText[_self.current] = '加载更多';
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
			getnewsList: function(page,status){
			    page = 1;
			    uni.showNavigationBarLoading(); 
				 const data={
					 page:page,
					 pagesize:10,
					 status:status
				 }
			    this.$uniFly
				.post({
					url:"/api/order/getorderlist",
					params: data
				})
				.then({function(res){
					console.log(res.data)
					if(res.code===0){
						
						page++;
						_self.newsList[_self.current] = res.data;						
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						_self.loadingText[_self.current] = '加载更多';
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
