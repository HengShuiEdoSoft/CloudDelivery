<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
		<view v-if="empty">
			<view class="dui-notyet-wrapper">
				<image src="../../static/img/NoOrder.jpg" mode=""></image>
				<text>您还没有可开发票</text>
			</view>
		</view>
		<view class="ui-order-list" v-if="!empty">
			<checkbox-group class="ui-order-list-item" v-for="(item,index) in lists" :key="index" @change="checkboxChange" v-if="invoice_status===0">
				<view class="ui-order-list-item-top">
					<text class="ui-order-list-cartype">{{ item.car }}</text>
					<text>{{ item.sure_time }}</text>
				</view>
				<view class="ui-divide-line"></view>
				<view class="ui-list-line">
					<view class="ui-order-content">
						<view class="ui-ocode">订单号：{{item.ocode}}</view>
						<view>行程：{{item.order_details_json.trip.address}} - {{item.order_details_json.destination.address}}</view>
					</view>
					<view><checkbox :value="item.order_id" :checked="item.status" color="#FF5723" /></view>
				</view>
				<view class="ui-order-price">￥{{item.order_price}}</view>	
			</checkbox-group>
			<view class="loading">{{loadingText}}</view>
		</view>
		<view class="dui-fixed-bottom-btn" @tap="goInvoice">
			<view>
				<button class="primary" type="primary">开发票</button>
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
				empty:false,
				page:1,
				reload:true,
				has_next:true,
				lists: [],
				values:'',
				price:0
			}
		},
		onNavigationBarButtonTap: function(e) {
			var index=e.index
			if(index===0){
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
			checkboxChange: function (e) {
			    var items = this.lists;
			    this.values = e.detail.value;
			    for (var i = 0, lenI = items.length; i < lenI; ++i) {
			        const item = items[i]
					
			        if(this.values.includes(item.order_id)){
			            this.$set(item,'checked',true);
						this.price+=items[i].order_price;
			        }else{
			            this.$set(item,'checked',false);
						this.price-=items[i].order_price;
			        }
			    }
			},
			getList:function(){
				let _self=this;
				if (_self.has_next) {
					uni.showNavigationBarLoading();
					_self.loadingText='加载中...';
					const data = {
						page: this.page,
						status:"4,5"
					};
					this.$uniFly
						.post({
							url: '/api/order/getorderlist',
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
									}else{
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
							content: error,
							showCancel: false
						});
					});
				}
			},
			goInvoice:function(){
				let that=this;
				const data={
					order_ids:this.values,
					price:this.price
				};
				this.$uniFly
					.post({
						url: '/api/invoice/addinvoice',
						params: data
					})
					.then(function(res) {
						if (res.code === 0 ) {
							uni.showToast({
								title: '已提交发票申请',
								icon: 'success',
								mask: true,
								duration: 3000
							});							
					} else {
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
			}
		}	
	}
</script>
<style>
	.ui-order-price {
		line-height: 80upx;
		font-weight: 600;
		text-align: right;
	}
	.ui-ocode{
		color:#FF5723;
	}
	.ui-order-content{
		flex:1;
		line-height: 64upx;
	}
	.ui-list-line{
		padding:20upx 0;
		display:flex;
		align-items:center;
	}
</style>
