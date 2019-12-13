<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y :style="height">
			<view v-if="empty">
				<view class="dui-notyet-wrapper">
					<image src="../../static/img/NoOrder.jpg" mode=""></image>
					<text>您还没有发票记录</text>
				</view>
			</view>
			<view class="ui-invioce-list" v-if="!empty">
				<view class="ui-invioce-item" v-for="(item,index) in lists" :key="item.invoice_id">
					<view class="ui-invioce-cont">
						<view>快递单号{{item.waybill_num}}</view>
						<view v-if='item.status===0' class="ui-invioce-status">未处理</view>
						<view v-if='item.status===1' class="ui-invioce-status">已处理</view>
					</view>
					<view class="ui-invioce-cont">
						<view class="ui-invioce-time">{{item.create_time}}</view>
						<view>{{item.price}}</view>
					</view>
				</view>
			</view>
		</scroll-view>	
	</view>
</template>
<script>
	export default {

		data() {
			return {
				loadingText:'',
				empty:true,
				page:1,
				id:0,
				reload:true,
				has_next:true,
				lists: [{
					waybill_num:"827352953912",
					status:0,
					create_time:"2019-10-24",
					price:"50.00"
				}],
				height:''
			}
		},
		onLoad() {
			this.height=uni.getSystemInfoSync().windowHeight+'px';
		},
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.redirectTo({
					url: "/pages/mymoney/mymoney"
				});
			}
		},
		onShow:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.has_next=true;
			this.reload=true;
			this.page=1;
			this.getList();
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
						page: this.page
					};
					this.$uniFly
					.post({
						url: '/api/invoice/getinvoicelist',
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
								_self.page++;
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
	.scroll-container {
		height: 100%;
	}
	.ui-invioce-list{
		background: #fff;
	}
	.ui-invioce-item{
		padding:30upx;
	}
	.ui-invioce-cont{
		display:flex;
		line-height:48upx;
		font-size:14px;
	}
	.ui-invioce-cont>view:first-child{
		flex:1;
	}
	.ui-invioce-status{
		color:#FF5723;
		font-size:12px;
	}
	.ui-invioce-time{
		color:#9E9E9E;
		font-size:12px;
	}
</style>
