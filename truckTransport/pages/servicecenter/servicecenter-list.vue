<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y :style="height">
			<view class="dui-service-wrapper">
				<view class="dui-gap"></view>
				<view class="dui-gap"></view>
				<view class="dui-basic-list">
					<block v-for="(item,index) in lists" :key="index">
						<navigator :url="'servicecenter-detail?scode=' + item.scode">
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
			<image src="../../static/img/call.jpg" @tap="call"></image>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['sysconfig']),
		onNavigationBarButtonTap: function(e) {
			let index = e.index;
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
				sname:'',
				reload:true,
				has_next:true,
				lists: [],
				height:''
			}
		},
		onLoad(options) {
			this.height="height:"+uni.getSystemInfoSync().windowHeight+'px';
			this.sname=options.sname;
			this.getList();
			uni.setNavigationBarTitle({
				title:options.title
			});
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
			call: function(e) {
				uni.makePhoneCall({
					phoneNumber: this.sysconfig.service_tel
				});
			},
			getList : function(){
				let _self=this;
				if (_self.has_next) {
					uni.showNavigationBarLoading();
					_self.loadingText='加载中...';
					const data = {
						sname: this.sname
					};
					this.$uniFly
					.post({
						url: '/api/article/getarticlelist',
						params: data
					})
					.then(function(res) {
						uni.hideNavigationBarLoading();
						if (res.code == 0 ) {
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
							content:JSON.stringify(error),
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
