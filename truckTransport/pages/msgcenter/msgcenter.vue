<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-msgcenter-list">
				<block v-for="(item,index) in lists" :key="item.notice_id">
					<view class="dui-msgcenter-item-box">
						<view class="dui-msgcenter-item">
							<view v-if="item.msg_type===0" class="dui-msgcenter-logo">
								<image src="../../static/img/setup.png"></image>
							</view>
							<view v-if="item.msg_type===1" class="dui-msgcenter-logo">
								<image src="../../static/img/file.png"></image>
							</view>
							<view class="dui-msgcenter-flex-column">
								<view class="dui-msgcenter-title">
									<text v-if="item.msg_type===0">系统通知</text>
									<text v-if="item.msg_type===1">订单通知</text>
									<text class="dui-msgcenter-date">{{item.create_time}}</text>
								</view>
								<view class="dui-msgcenter-content">
									{{item.msg}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="loading">{{loadingText}}</view>
		</scroll-view>
	</view>
</template>

<script>
	var _self,timer = null;
	export default {
		data() {
			return {
				loadingText:'',
				page:1,
				lists: []
			}
		},
		onShow:function(){
		   _self = this;
		   _self.getList();
		},
		onPullDownRefresh:function(){
		   _self = this;
		   _self.getList();
		},
		onReachBottom:function(){
			if(timer != null){
			   clearTimeout(timer);
			}
			timer = setTimeout(function(){
			   _self.getmore();
			}, 1000);
		 },
		methods: {
			getmore : function(){
				if(_self.loadingText != '' && _self.loadingText != '加载更多'){
					return false;
			    }
			    _self.loadingText = '加载中...';
			    uni.showNavigationBarLoading(); 
				 const data={
					 page:_self.page
				 }
			    this.$uniFly
				.post({
					url: "/api/notice/getnoticelist",
					params: data
				})	
				.then(function(res){
					if(res.code===0){
						_self.loadingText = '';
						if(!res.data.has_next){
							uni.hideNavigationBarLoading();
							_self.loadingText = '已加载全部';
							return false;
						}
						_self.page++;
						//console.log(res);
						_self.lists = _self.lists.concat(res.data);
						_self.loadingText = '加载更多';
						uni.hideNavigationBarLoading();
					}else{
						uni.showModal({
						    content: res.msg,
						    showCancel: false
						});
					}
				})
				.catch(function(error) {
				    uni.showModal({
				  	    content: error,
				  	    showCancel: false
				    });
				});
			},
			getList : function(){
			    _self.page = 1;
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
					 page:_self.page
				 }
			    this.$uniFly
				.post({
					url: '/api/notice/getnoticelist',
					param: data
				})
				.then(function(res){
					console.log(res.data)
					if(res.code===0){
						_self.page++;
						_self.lists = res.data;
						
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						_self.loadingText = '加载更多';
					}else{
						uni.showModal({
						    content: res.msg,
						    showCancel: false
						});
					}
			    })
				.catch(function(error) {
				    uni.showModal({
				  	    content: error,
				  	    showCancel: false
				    });
				})
			}
		}
	}
</script>

<style>

</style>
