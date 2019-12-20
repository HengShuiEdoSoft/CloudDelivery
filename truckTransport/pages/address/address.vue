<template>
	<view class="content ">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y :style="height">
			<view v-if="lists.length==0">
				<view class="dui-notyet-wrapper">
					<image src="../../static/img/NoOrder.jpg" mode=""></image>
					<text>您还没有常用地址</text>
				</view>
			</view>
			<view  v-if="lists.length!=0" v-for="(item,index) in lists" :key="item.address_id" @longpress="deleteAddress(item.address_id,index)">
				<view class="dui-basic-list">
					<navigator :url="'editaddress?data=' + JSON.stringify(item)">
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
			</view>
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
	export default {
		data() {
			return {
				loadingText:'',
				empty:false,
				page:1,
				id:0,
				reload:true,
				has_next:true,
				lists: [],
				height:''
			}
		},
		onLoad() {
			let height=uni.getSystemInfoSync().windowHeight-44;
			this.height="height:"+height+'px';
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
			deleteAddress:function(id,index){
				let that=this;
				uni.showModal({
					title: '温馨提示',
					content: '您确定要删除该条信息吗',
					showCancel: true,
					success: res => {
						if (res.confirm) {
							const data={
								address_id:id
							}
							this.$uniFly
							.post({
								url: '/api/address/deladdress',
								params: data
							})
							.then(function(res) {
								uni.hideNavigationBarLoading();
								if (res.code === 0 ) {
									uni.showToast({
										title: '已删除',
										icon: 'success',
										mask: true,
										duration: 3000
									});
									that.lists.splice(index,1);
									that.$set(that,"lists",that.lists);
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
				});
			},
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
						url: '/api/address/getaddresslist',
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
		margin-bottom: 140upx;
	}

	.icon-weizhi {
		margin: 0 10upx;
		font-size: 36upx;
	}
</style>
