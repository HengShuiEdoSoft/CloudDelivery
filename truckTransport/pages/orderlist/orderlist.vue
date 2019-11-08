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
					<view class="loading">{{loadingText[0]}}</view>
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
						<view class="loading">{{loadingText[1]}}</view>
					</navigator>
				</scroll-view>
			</swiper-item>
			<swiper-item><scroll-view>3</scroll-view></swiper-item>
		</swiper>
	</view>
</template>

<script>
	var _self,timer = null;
	import {
	       mapMutations  
	   } from 'vuex';  
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
				newsList:[],
				status:["0,1,2,3","4,5","11,12,13"]
			}
		},
		onLoad:function(){
		   _self = this;
		   switch (_self.current){
		   	case 0:
				this.getnewsList(this.page1,this.status[0]);
		   		break;
			case 1:
				this.getnewsList(this.page2,this.status[1]);
				break;
			case 2:
				this.getnewsList(this.page3,this.status[2]);
				break;
		   	
		   }
		},
		onPullDownRefresh:function(){
		   this.getnewsList();
		},
		onReachBottom:function(){
			if(timer != null){
			   clearTimeout(timer);
			}
			timer = setTimeout(function(){
			   that.getmorenews();
			}, 1000);
		 },
		methods:{
			...mapMutations(['login']),
			tabChange:function(e){
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current=index;
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
				uni.getStorage({//获得保存在本地的用户信息
				    key: 'userLogin',  
				    success:(res) => {  
				        _self.userinfo=res.data  	                    
				    }  
				}); 
				 const data={
					 phone:_self.userinfo.phone,
					 token:_self.userinfo.token,
					 page:page,
					 pagesize:10,
					 status:status
				 }
				 console.log(data)
			    this.$uniFly
				.post({
					url: "/api/order/getorderlist",
					param: data
				})	
				.then({function(res){
						_self.loadingText[_self.current] = '';
						if(res.data == null){
							uni.hideNavigationBarLoading();
							_self.loadingText[_self.current] = '已加载全部';
							return false;
						}
						page++;
						console.log(res);
						_self.newsList[_self.current] = _self.newsList[_self.current].concat(res.data);
						_self.loadingText[_self.current] = '加载更多';
						uni.hideNavigationBarLoading();
					}
				})
				.catch(function(error) {
				    uni.showToast({
				  	    content: error,
				  	    showCancel: false
				    });
				});
			},
			getnewsList : function(page,status){
			    page = 1;
			    uni.showNavigationBarLoading();
				uni.getStorage({//获得保存在本地的用户信息
				    key: 'userLogin',  
				    success:(res) => {  
				        _self.userinfo=res.data 	                    
				    }  
				}); 
				 const data={
					 phone:_self.userinfo.phone,
					 token:_self.userinfo.token,
					 page:page,
					 pagesize:10,
					 status:status
				 }
			    this.$uniFly
				.post({
					url: '/api/order/getorderlist',
					param: data
				})
				.then({function(res){
						page++;
						_self.newsList[_self.current] = res.data;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						_self.loadingText[_self.current] = '加载更多';
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
