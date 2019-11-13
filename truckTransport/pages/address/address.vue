<template>
	<view class="content ">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<block v-for="(item,index) in lists" :key="item.address_id">
				<view class="dui-basic-list">
					<navigator :url="'editaddress?id=' + item.address_id">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										<text><text class="iconfont icon-weizhi"></text>{{item.house}}</text>
									</view>
									<view class="dui-basic-list-item__content-note">
										{{item.address}}
									</view>
									<view class="dui-basic-list-item__content-note">
										{{item.name +item.address_phone}}
									</view>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view class="dui-gap"></view>
			</block>
			<view class="loading">{{loadingText}}</view>
		</scroll-view>
		<view class="dui-fixed-bottom-btn">
			<navigator url="addaddress">
				<button class="primary" type="primary">添加常用地址</button>
			</navigator>
		</view>
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
			this.getList();
		},
		onPullDownRefresh:function(){
			   _self = this;
			   this.getList();
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
					let _self=this;
					if(_self.loadingText != '' && _self.loadingText != '加载更多'){
						return false;
				    }
				    _self.loadingText = '加载中...';
				    uni.showNavigationBarLoading(); 
					 const data={
						 page:this.page
					 }
					 console.log(data);
				    this.$uniFly
					.post({
						url: "/api/address/getaddresslist",
						params: data
					})	
					.then({function(res){
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
			getList : function(){
					let _self=this;
				    _self.page = 1;
				    uni.showNavigationBarLoading();
					 const data={
						 page:_self.page
					 }
				    this.$uniFly
					.post({
						url: '/api/address/getaddresslist',
						params: data
					})
					.then({function(res){
						console.log(res.data)
						if(res.code===0){
							_self.page++;
							_self.lists = res.data;							
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();
							_self.loadingText = '加载更多';
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
	.scroll-container {
		height: 100%;
		margin-bottom: 140upx;
	}

	.icon-weizhi {
		margin: 0 10upx;
		font-size: 36upx;
	}
</style>
