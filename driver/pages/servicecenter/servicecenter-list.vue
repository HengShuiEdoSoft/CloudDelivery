<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-service-wrapper">
				<view class="dui-gap"></view>
				<view class="dui-gap"></view>
				<view class="dui-basic-list">
					<block v-for="(item,index) in lists" :key="index">
						<navigator :url="'servicecenter-detail?id=' + item.scode">
							<view class="dui-basic-list-item">
								<view class="dui-basic-list-item__container">
									<view class="dui-basic-list-item__content">
										<view class="dui-basic-list-item__content-title">
											{{item.title}}
										</view>
									</view>
									<view class="dui-basic-list-item__extra">
										<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
									</view>
								</view>
							</view>
						</navigator>
					</block>
					<view class="loading">{{loadingText}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="dui-online-service">
			<image src="../../static/img/call.jpg" mode=""></image>
		</view>
	</view>
</template>
<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.reLaunch({
					url: "/pages/index/index"
				});
			}
		},
		data() {
			return {
				loadingText:'',
				empty:false,
				page:1,
				sname:0,
				reload:true,
				has_next:true,
				lists: [{
					"name": "哪里可以下单叫车"
				}, {
					"name": "如何下单用车?"
				}, {
					"name": "如何叫例如尾板,开顶等特殊规格的车辆?"
				}, {
					"name": "..."
				}]
			}
		},
		onLoad(options) {
			this.sname=options.id;
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
						smame: this.sanme
					};
					this.$uniFly
					.post({
						url: '/api/article/getarticlelist',
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
							uni.showToast({
								content: res.msg,
								showCancel: false
							});
						}
					})
					.catch(function(error) {
						uni.hideNavigationBarLoading();
						uni.showToast({
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
		padding-bottom: 80upx;
	}
</style>
