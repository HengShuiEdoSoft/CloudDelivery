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
					<view v-if="empty[0]">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有账单信息</text>
						</view>
					</view>
					<view class="dui-basic-list" v-if="!empty[0]">
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
					<view v-if="empty[1]">
						<view class="dui-notyet-wrapper">
							<image src="../../static/img/NoOrder.jpg" mode=""></image>
							<text>您还没有账单信息</text>
						</view>
					</view>
					<view class="dui-basic-list" v-if="!empty[1]">
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
	export default {
		data() {
			return {
				current: 0,
				empty:[false,false,false],
				loadingText:['','',''],
				page:[1,1,1],
				has_next: [true, true, true],
				reload: [true, true, true],
				tab: [{
					name: "流水明细",
				}, {
					name: "充值明细",
				}],
				source_type:['0,1,2','0'],
				lists: [[],[]]
			}
		},
		onShow:function(){
			this.getList();
		 	
		},
		onPullDownRefresh:function(){
		   this.$set(this.has_next, this.current, true);
		   this.$set(this.reload, this.current, true);
		   this.$set(this.page, this.current, 1);
		   this.getList();
		},
		onReachBottom:function(){
			this.getList();
		 },
		methods: {
			tabChange: function(e) {
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index;
				this.$set(this.has_next, this.current, true);
				this.$set(this.reload, this.current, true);
				this.$set(this.page, this.current, 1);
				this.getList();	
			},
			swiperChange: function(e) {
				var index = e.target.current || e.detail.current;
				this.current = index;
			},
			getList:function(){
				let _self = this;
				let current = _self.current;
				if (_self.has_next[current]) {
					uni.showNavigationBarLoading();
					_self.$set(_self.loadingText, current, '加载中...');
					const data={
						page:this.page[current],
						source_type:this.source_type[current]
					}
					this.$uniFly
					.post({
						url: "/api/wallet_log/getwalletloglist",
						params: data
					})	
					.then(function(res){
						uni.hideNavigationBarLoading();
						if (res.code === 0 ) {
							if(res.data.list.length > 0){						
								let list = res.data.list;
								_self.$set(_self.empty,current,false);
								// let list=_self.parseOrderList(res.data);
								_self.lists[current] = _self.reload[current] ? list : _self.lists[current].concat(list);
								_self.$set(_self.lists, current, _self.lists[current]);
								_self.$set(_self.page, current, _self.page[current]++);
								_self.$set(_self.reload, current, false);
								_self.$set(_self.has_next, current, res.has_next);
								if(res.has_next){
									_self.$set(_self.loadingText, current, '加载更多');
								}
								else{
									_self.$set(_self.loadingText, current, '已加载全部');
								}
							}else{
								_self.$set(_self.empty,current,true);
								_self.$set(_self.loadingText, current, '');
							}							
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
				}	
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
