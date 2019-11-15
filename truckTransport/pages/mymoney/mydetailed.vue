<template>
	<view class="content">
		<view class="dui-car-name-list">
			<view class="ui-car-name-item" v-for="(item,index) in tab" :class="{active:current==index}" :key="index"
			 :data-current="index" @tap="tabChange">{{item.name}}</view>
		</view>
		<view class="ui-divide-line"></view>
		<swiper @change="swiperChange" :current="current" class="ui-order-cont">
			<swiper-item>
				<scroll-view class="scroll-container" scroll-y>
					<view class="dui-basic-list">
						<block v-for="(item,index) in lists[0].list" :key="item.wallet_log_id">
							<navigator url="">
								<view class="dui-basic-list-item">
									<view class="dui-basic-list-item__container">
										<view class="dui-basic-list-item__content">
											<view class="dui-basic-list-item__content-title">
												{{item.msg}}
											</view>
											<view class="dui-basic-list-item__content-note">
												余额:{{item.new_money}}元
											</view>
										</view>
										<view class="dui-basic-list-item__content" style="text-align: right;">
											<view class="dui-basic-list-item__content-note">
												{{item.create_time}}
											</view>
											<view class="dui-basic-list-item__content-title">
												<text v-if="item.action_type===0">-</text><text v-if="item.action_type===1">+</text>{{item.money}}.00
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</block>
					</view>
					<view class="loading">{{loadingText[0]}}</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container" scroll-y>
					<view class="dui-basic-list">
						<block v-for="(item,index) in lists[1].list" :key="item.wallet_log_id">
							<navigator url="">
								<view class="dui-basic-list-item">
									<view class="dui-basic-list-item__container">
										<view class="dui-basic-list-item__content">
											<view class="dui-basic-list-item__content-title">
												{{item.msg}}
											</view>
											<view class="dui-basic-list-item__content-note">
												余额:{{item.new_money}}元
											</view>
										</view>
										<view class="dui-basic-list-item__content" style="text-align: right;">
											<view class="dui-basic-list-item__content-note">
												{{item.create_time}}
											</view>
											<view class="dui-basic-list-item__content-title">
												<text v-if="item.action_type===0">-</text><text v-if="item.action_type===1">+</text>{{item.money}}.00
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</block>
					</view>
					<view class="loading">{{loadingText[1]}}</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var _self,timer = null;
	export default {
		data() {
			return {
				current: 0,
				loadingText:['',''],
				page1:1,
				page2:1,
				tab: [{
					name: "流水明细",
				}, {
					name: "充值明细",
				}],
				source_type:['0,1,2','0'],
				lists: []
			}
		},
		onShow:function(){
		    _self = this;
			_self.getList(_self.page1,_self.source_type[0]);
		 	
		},
		onPullDownRefresh:function(){
		   _self = this;
		   switch (_self.current){
		   	case 0:
		   		_self.getList(_self.page1,_self.source_type[0]);
		   		break;
		   	case 1:
				_self.getList(_self.page2,that.source_type[1]);
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
			   		_self.getmore(_self.page1,_self.source_type[0]);
			   		break;
			   	case 1:
			   		_self.getmore(_self.page2,_self.source_type[1]);
			   		break;
			   	
			   }
			}, 1000);
		 },
		methods: {
			tabChange: function(e) {
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index;
				_self = this;
				switch (_self.current){
					case 0:
						_self.getList(_self.page1,_self.source_type[0]);
						break;
					case 1:
								_self.getList(_self.page2,that.source_type[1]);
						break;
							}	
			},
			swiperChange: function(e) {
				var index = e.target.current || e.detail.current;
				this.current = index;
			},
			getmore : function(page,source_type){
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
					 source_type:source_type
				 }
			    this.$uniFly
				.post({
					url: "/api/wallet_log/getwalletloglist",
					params: data
				})	
				.then(function(res){
					if(res.code===0){
						_self.loadingText[_self.current] = '';
						if(!res.data.has_next){
							uni.hideNavigationBarLoading();
							_self.loadingText[_self.current] = '已加载全部';
							return false;
						}
						page++;
						//console.log(res);
						_self.list[_self.current]= _self.list[_self.current].concat(res.data);
						_self.loadingText[_self.current] = '加载更多';
						uni.hideNavigationBarLoading();
					}else{
						uni.showToast({
						    content: res.msg,
						    showCancel: false
						});
					}
				})
				.catch(function(error) {
				    uni.showToast({
				  	    content: error,
				  	    showCancel: false
				    });
				});
			},
			getList:function(page,source_type){
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
					source_type:source_type
				}
				this.$uniFly
				.post({
					url: "/api/wallet_log/getwalletloglist",
					params: data
				})	
				.then(function(res){
					if(res.code===0){
						_self.loadingText[_self.current] = '';
						if(!res.data.has_next){
							uni.hideNavigationBarLoading();
							_self.loadingText[_self.current] = '已加载全部';
							return false;
						}
						page++;
						//console.log(res);
						_self.list = _self.list.concat(res.data);
						_self.loadingText[_self.current] = '加载更多';
						uni.hideNavigationBarLoading();
					}else{
						uni.showToast({
						    content: res.msg,
						    showCancel: false
						});
					}
				})
				.catch(function(error) {
				    uni.showToast({
				  	    content: error,
				  	    showCancel: false
				    });
				});
			}
		}
	}
</script>

<style>
	.scroll-container {
		height: 100%;
	}

	.ui-order-cont {
		flex: 1;
	}

	.dui-basic-list-item__content-title {
		font-size: 28upx;
	}

	.dui-basic-list-item__content-note {
		font-size: 24upx;
	}
</style>
