<template>
    <view class="content">
		<view>
			<uni-drawer :visible="visible" mode="left" @close="visible=false">
				<view class="ui-drawer-top">
					<image src="../../static/img/HeadImg.jpg" class="ui-portrait"></image>
				</view>
				<view class="ui-divide-line"></view>
				<view style="padding:30upx;">
					<view class="ui-list">
						<view hover-class="ui-list-item-hover"><navigator url=""><text class="iconfont icon-huoche"></text><text>订单列表</text></navigator></view>
						<view hover-class="ui-list-item-hover"><navigator url=""><text class="iconfont icon-weizhi"></text><text>常用地址</text></navigator></view>
						<view hover-class="ui-list-item-hover"><navigator url=""><text class="iconfont icon-qianbao-kuai"></text><text>我的钱包</text></navigator></view>
						<view hover-class="ui-list-item-hover"><navigator url=""><text class="iconfont icon-siji-"></text><text>我的司机</text></navigator></view>
						<view hover-class="ui-list-item-hover"><navigator url=""><text class="iconfont icon--kefu"></text><text>客服中心</text></navigator></view>
						<view hover-class="ui-list-item-hover"><navigator url=""><text class="iconfont icon-shezhi"></text><text>更多设置</text></navigator></view>
					</view>
				</view>
			</uni-drawer>
		</view>
        <view v-if="hasLogin" class="hello">
            <view class="title">
                您好 {{userName}}，您已成功登录。
            </view>
            <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
            </view>
        </view>
        <view v-if="!hasLogin" class="hello">
            <view class="title">
                您好 游客。
            </view>
            <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'

	import uniDrawer from "@/components/drawer/drawer.vue"
	
    export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				visible: false
			}
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
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
		method:{
			show() {
				this.visible=true
			},
			hide() {
				this.visible = false
			}
		},
		onNavigationBarButtonTap(e){
			var index=e.index;
			if(index===0){
				this.visible = !this.visible
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
	.ui-list .iconfont{
		margin-right:20px;
		color:#424456;
	}
	.ui-list{
		font-size:14px;
	}
	.ui-list>view{
		line-height:46px;
	}
	.ui-list-item-hover{
		background: #f5f7f9;
	}
	.ui-drawer-top{
		display:flex;
		padding:16px 12px;
	}
	.ui-portrait{
		width:64px;
		height:64px;
		border-radius: 32px;
	}
</style>
