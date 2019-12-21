<template>
	<view class="content">
		<scroll-view  scroll-y :style="height">
			<view class="dui-basic-list">
				<block v-for="(item,index) in lists" :key="index">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									申请提现：{{item.price}}元
								</view>
								<view class="dui-basic-list-item__content-note">
									<text v-if="item.status===1">打款流水号：{{item.serial_number}}</text> 
								</view>
							</view>
							<view class="dui-basic-list-item__content" style="text-align: right;">
								<view class="dui-basic-list-item__content-note">
									{{item.create_time}}
								</view>
								<view class="dui-basic-list-item__content-title">
									<text v-if="item.status===0" style="color:#FF5723;">待处理</text>
									<text v-if="item.status===1" style="color:#4CD964;">已处理</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>
<script>
		export default {
			data() {
				return {
					loadingText:'',
					empty:false,
					page:1,
					height:"",
					id:0,
					reload:true,
					has_next:true,
					lists: []
				}
			},
			onLoad() {
				this.height="height:"+uni.getSystemInfoSync().windowHeight+'px';
			},
			onShow:function(){
				this.getList();
			},
			onPullDownRefresh:function(){			
				this.has_next=true;
				this.reload=true;
				this.page=1;
				this.getList();
				uni.stopPullDownRefresh();
			},
			onReachBottom:function(){
				let _self=this;
				let timer=null;
				if(timer != null){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					_self.getList();
				}, 1000);
			},
			methods: {
				getList : function(){
					let _self=this;
					if (_self.has_next) {
						uni.showNavigationBarLoading();
						_self.loadingText='加载中...';
						const data = {
							page: this.page,
							source_type:'0,1,2'
						};
						this.$uniFly
						.post({
							url: '/api/withdraw/getwithdrawlist',
							params: data
						})
						.then(function(res) {
							uni.hideNavigationBarLoading();
							if (res.code === 0 ) {
								if(res.data.list.length > 0){
									let list = res.data.list;
									_self.empty=false;
									// let list=_self.parseOrderList(res.data);
									_self.lists = _self.reload ? list : _self.lists.concat(list);
									_self.page=_self.page+1;
									_self.reload=false;
									_self.has_next=res.data.has_next;
									if(res.data.has_next){
										_self.loadingText='加载更多';
									}
									else{
										_self.loadingText='已加载全部';
									}
								}else{
									_self.empty=true;
									_self.loadingText='';
								}							
							} else {
								uni.showModal({
									content: res.msg,
									showCancel: false
								});
							}
						})
						.catch(function(error) {
							uni.hideNavigationBarLoading();
							uni.showModal({
								content: JSON.stringify(error),
								showCancel: false
							});
						});
					}
				}
		}
	}
</script>

<style>
	scroll-view {
		height: 100vh;
	}

	.dui-maincolor {
		color: #FF5723;
	}
	.dui-basic-list-item__container{align-items: flex-start;}
	.dui-basic-list-item__container>view{line-height: 48upx;padding:0;margin:0;}
	.dui-basic-list-item__content-title{font-size:28upx;line-height: 48upx;}
	.dui-basic-list-item__content-note{margin:0;}
</style>
