<template>
    <view class="content">
		<uni-drawer :visible="visible" mode="right" @close="visible=false">
			<view class="ui-drawer-container">
				<view class="ui-options-title">筛选</view>
				<view class="ui-options-item">
					<view class="ui-option-title">价格区间</view>
					<view class="ui-option-body">
						<radio-group @change="radioChange">
							<label class="" v-for="(item, index) in items.type" :key="item.value">
							    <radio :value="item.value" :checked="index === current" color="#FF5723"/>
								<text class="ui-option-text">{{item.name}}</text>
							</label>	
						</radio-group>
					</view>
				</view>	
				<view class="ui-options-item">
					<view class="ui-option-title">是否加急</view>
					<view class="ui-option-body">
						<radio-group @change="radioChange">
							<label class="" v-for="(item, index) in items.isjiaji" :key="item.value">
								    <radio :value="item.value" :checked="index === current" color="#FF5723"/>
									<text class="ui-option-text">{{item.name}}</text>
							</label>	
						</radio-group>
					</view>
				</view>	
				<view class="ui-options-item">
					<view class="ui-option-title">价格区间</view>
					<view class="ui-option-body">
						<view class="ui-option-price-body"><input type="text" class="ui-option-price" maxlength="5"/></view>						
						<text> - </text>
						<view class="ui-option-price-body"><input type="text" class="ui-option-price" maxlength="5"/></view>
					</view>		
				</view>
				<view class="ui-options-item">
					<view class="ui-option-title">日期</view>
					<view class="ui-option-body">
						<radio-group @change="radioChange">
							<label class="" v-for="(item, index) in items.date" :key="item.value">
								    <radio :value="item.value" :checked="index === current" color="#FF5723"/>
									<text class="ui-option-text">{{item.name}}</text>
							</label>	
						</radio-group>
					</view>
				</view>
				<view class="ui-options-btns">
					<view class="ui-options-reset" @tap="optionsReset">重置</view>
					<view class="ui-options-sure" @tap="optionsYes">确定</view>
				</view>
			</view>
		</uni-drawer>
		<view class="ui-top-nav">
			<view class="ui-top-isworing"><switch checked color="#FF5723" @change="switchChange" />工作状态</view>
			<view>
				<text class="iconfont icon-shaixuan" @tap="showDrawer"></text>
				<navigator class="iconfont icon-xiaoxi-xianxing" url="/pages/msgcenter/msgcenter"></navigator>
			</view>
		</view>
		<view>
			<scroll-view class="scroll-container">
				<view class="ui-order-list-item">
					<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">整车</text><text>09月20日 10:22</text><text class="ui-order-first">急</text></view>
					<view class="ui-divide-line"></view>
					<view class="ui-order-timeline-container">
						<view class="ui-order-timeline uni-timeline">
							<view class="uni-timeline-item uni-timeline-first-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">衡水人民政府</text>
								</view>
							</view>
							<view class="uni-timeline-item uni-timeline-last-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">怡然城</text>
								</view>
							</view>
						</view>
						<view class="ui-order-accept">接单</view>
					</view>
					<view class="ui-order-price">￥20.8</view>
				</view>
				<view class="ui-order-list-item">
					<view class="ui-order-list-item-top"><text class="ui-order-list-cartype">整车</text><text>09月20日 10:22</text><text class="ui-order-first">急</text></view>
					<view class="ui-divide-line"></view>
					<view class="ui-order-timeline-container">
						<view class="ui-order-timeline uni-timeline">
							<view class="uni-timeline-item uni-timeline-first-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">衡水人民政府</text>
								</view>
							</view>
							<view class="uni-timeline-item uni-timeline-last-item">
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<text class="ui-address">怡然城</text>
								</view>
							</view>
						</view>
						<view class="ui-order-accept">接单</view>
					</view>
					<view class="ui-order-price">￥20.8</view>
				</view>
			</scroll-view>
		</view>
    </view>
</template>
<script>
    import {
        mapState
    } from 'vuex'
	import uniDrawer from "@/components/drawer/drawer.vue"
    export default {
		components: {uniDrawer},
		data(){
			return{
				visible: false,
				current:0,
				items:{type:[{
					value:"1",
					name:"整车"
				},{
					value:"2",
					name:"非整车"
				}
				],
				isjiaji:[{
					value:"1",
					name:"是"
				},{
					value:"0",
					name:"否"
				}],
				date:[{
					value:"1",
					name:"今天"
				},{
					value:"2",
					name:"明天"
				}]
				}
			}
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'user']),
        onLoad() {
            if (!this.hasLogin) {
                uni.showModal({
                    title: '未登录',
                    content: '您未登录，需要登录后才能继续',
                    /**
                     * 如果需要强制登录，不显示取消按钮
                     */
                    showCancel: !this.forcedLogin,
                    success: (res) => {
                        if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
                            if (this.forcedLogin) {
                                uni.reLaunch({
                                    url: '../login/login'
                                });
                            } else {
                                uni.navigateTo({
                                    url: '../login/login'
                                });
                            }
                        }
                    }
                });
            }
        },
		methods:{
			switchChange: function (e) {
			    console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			showDrawer:function(){
				this.visible=!this.visible
			},
			radioChange: function(evt) {
			    for (let i = 0; i < this.items.length; i++) {
			        if (this.items[i].value === evt.target.value) {
			            this.current = i;
			                break;
			        }
			    }
			},
			optionsReset:function(){
				this.visible=!this.visible
				//重渲染
			},
			optionsYes:function(){
				this.visible=!this.visible
				//请求数据
			},
			getList:function(){
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
    .hello {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .title {
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul {
        font-size: 30upx;
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul>view {
        line-height: 50upx;
    }
	.ui-top-nav{
		display:flex;
		padding:0 30upx;
		line-height: 88upx;
		color:#fff;
		background: #424456;
	}
	.ui-top-nav .iconfont{
		display:inline-block;
		width:88upx;
		font-size:24px;
		text-align: right;
	}
	.ui-top-isworing{
		flex:1;
		font-size:14px;
	}
	.ui-top-isworing switch{
		transform: scale(.7,.7);
	}
	.ui-options-title{
		padding:30upx;
		font-size:16px;
		line-height: 80upx;
	}
	.ui-options-item{
		display:flex;
	}
	.ui-option-title{
		padding:0 30upx;
		font-size:14px;
		color:#666;
		line-height: 88upx;
	}
	.ui-option-body radio{
		transform: scale(.7,.7);
	}
	.ui-option-body{
		line-height: 88upx;
		font-size:14px;
	}
	.ui-option-text{
		padding-right:10px;
	}
	.ui-option-price-body{
		vertical-align: middle;
		display:inline-block;
		width:70px;
		background: #f3f4f5;
		border-radius: 8upx;
	}
	.ui-option-price{
		padding:0 10px;
		margin:8upx 0;
		font-size: 14px;		
	}
	.ui-options-btns{
		position:fixed;
		bottom: 0;
		display:flex;
		width:100%;
		text-align: center;
		line-height: 88upx;
		color:#fff;
	}
	.ui-options-reset{
		flex-grow:2;
		background-color: #FF9801;
	}
	.ui-options-sure{
		flex-grow:3;
		background-color: #FF5723;
	}
	.scroll-container{
		height:100%;
	}
	.ui-order-cont{
		flex:1;
	}
	.ui-order-price{
		font-weight: 600;
		text-align: right;
	}
	.ui-order-timeline-container{
		display:flex;
		flex-direction: row;
		align-items:center;
	}
	.ui-order-timeline{
		flex:1;
	}
	.ui-order-item-more{
		color:#ccc;
	}
	.ui-order-first{
		margin-left:40upx;
		padding:2upx 8upx;
		font-size: 12px;
		color:#FF5723;
		border:1px dashed #FF5723;
		border-radius: 48upx;
	}
	.ui-order-accept{
		padding:8upx 30upx;
		font-size:14px;
		color:#fff;
		border-radius: 40upx;
		background: linear-gradient(45deg,#FF9801,#FF5723);
	}
</style>
