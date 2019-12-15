<template>
	<view class="content">
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-gap"></view>
			<!--<view class="dui-basic-list">
				<view class="dui-basic-list-item">
					<view class="dui-basic-list-item__container dui-reduce">
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								音效提示
							</view>
							<view class="dui-basic-list-item__content-note">
								打开后将以予语音为你播报订单状态
							</view>
						</view>
						<view class="dui-basic-list-item__extra">
							<switch checked color="#FF5723" style="transform:scale(0.7)" @change="switchChange" />
						</view>
					</view>
				</view>
			</view>
			<view class="dui-gap"></view>-->
			<view class="dui-basic-list">
				<navigator url="/pages/pwd/pwd">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container dui-reduce">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">设置密码</view>
								<view class="dui-basic-list-item__content-note">若你已经设置过密码，点击此处也可修改密码</view>
							</view>
							<view class="dui-basic-list-item__extra"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="dui-gap"></view>
			<!--<view class="dui-basic-list">
				<navigator url="commonroutes">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									常用路线
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="dui-gap"></view>-->
			<view class="dui-basic-list">
				<!--<navigator url="userprotocol">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									用户协议
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
							</view>
						</view>
					</view>
				</navigator>
				<navigator url="privacypolicy">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									隐私政策
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
							</view>
						</view>
					</view>
				</navigator>
				-->
				<navigator url="transportstandard">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content"><view class="dui-basic-list-item__content-title">货运业务收费标准</view></view>
							<view class="dui-basic-list-item__extra"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
					</view>
				</navigator>
				<!--<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									搬家业务收费标准
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
							</view>
						</view>
					</view>
				</navigator>-->
			</view>
			<view class="dui-gap"></view>
			<view class="dui-basic-list">
				<!--<view class="dui-basic-list-item" @tap="togglePopup()">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								分享
							</view>
						</view>
						<view class="dui-basic-list-item__extra">
							<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
						</view>
					</view>
				</view>
				<navigator url="">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									给我们评分
								</view>
							</view>
							<view class="dui-basic-list-item__extra">
								<text class="iconfont icon-xiayiyeqianjinchakangengduo"></text>
							</view>
						</view>
					</view>
				</navigator>-->
				<navigator url="about">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content"><view class="dui-basic-list-item__content-title">关于</view></view>
							<view class="dui-basic-list-item__extra"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
		<view class="dui-fixed-bottom-btn" @click="logOut"><text>退出登录</text></view>
	</view>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
	onBackPress() {
		// #ifdef APP-PLUS
		//监听back键，关闭弹出菜单
		if (nvImageMenu.isVisible()) {
			nvImageMenu.hide();
			nvMask.hide();
			return true;
		}
		// #endif
	},
	data() {
		return {
			show: false,
			type: ''
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		// 如下为分享内容定义，可根据业务需求自行定义
		var strShareUrl = 'https://' + this.$store.sysconfig.main_host;
		var strShareTitle = this.$store.sysconfig.site_name;
		var strShareSummary = '好，很好，非常好，越来越好，耶!';
		var strShareImageUrl = '../../static/img/logo.png';

		//以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
		var screenWidth = plus.screen.resolutionWidth;
		//以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
		//图标下的按钮文字距离图标5像素，文字大小12像素
		//底部取消按钮高度固定为44px
		//TODO 未处理横屏和pad，这些情况6个图标应该一排即可
		var margin = 25,
			iconWidth = 55,
			icontextSpace = 5,
			textHeight = 12;
		var left1 = (margin / 360) * screenWidth;
		var iconSpace = (screenWidth - left1 * 2 - iconWidth * 4) / 3; //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
		if (iconSpace <= 5) {
			//屏幕过窄时，缩小边距和图标大小，再算一次
			margin = 15;
			iconWidth = 40;
			left1 = (margin / 360) * screenWidth;
			iconSpace = (screenWidth - left1 * 2 - iconWidth * 4) / 3; //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
		}
		var left2 = left1 + iconWidth + iconSpace;
		var left3 = left1 + (iconWidth + iconSpace) * 2;
		var left4 = left1 + (iconWidth + iconSpace) * 3;
		var top1 = left1;
		var top2 = top1 + iconWidth + icontextSpace + textHeight + left1;
		var nvMask = new plus.nativeObj.View('nvMask', {
			//先创建遮罩层
			top: '0px',
			left: '0px',
			height: '100%',
			width: '100%',
			backgroundColor: 'rgba(0,0,0,0.2)'
		});
		nvMask.addEventListener('click', function() {
			//处理遮罩层点击
			nvMask.hide();
			nvImageMenu.hide();
		});
		var nvImageMenu = new plus.nativeObj.View('nvImageMenu', {
			//创建底部图标菜单
			bottom: '0px',
			left: '0px',
			height: '180px',
			width: '100%',
			backgroundColor: 'rgb(255,255,255)'
		});
		//绘制底部图标菜单的内容
		nvImageMenu.draw([
			{
				tag: 'rect', //菜单顶部的分割灰线
				color: '#e7e7e7',
				position: {
					top: '0px',
					height: '1px'
				}
			},
			{
				tag: 'font',
				id: 'sharecancel', //底部取消按钮的文字
				text: '取消分享',
				textStyles: {
					size: '14px'
				},
				position: {
					bottom: '0px',
					height: '50px'
				}
			},
			{
				tag: 'rect', //底部取消按钮的顶部边线
				color: '#e7e7e7',
				position: {
					bottom: '51px',
					height: '1px'
				}
			},
			{
				tag: 'img',
				id: 'imgwechatmoments',
				src: '/static/img/wx-share.png',
				position: {
					top: top1,
					left: left2,
					width: iconWidth,
					height: iconWidth
				}
			},
			{
				tag: 'img',
				id: 'imgwechatfriend',
				src: '/static/img/pyq-share.png',
				position: {
					top: top1,
					left: left1,
					width: iconWidth,
					height: iconWidth
				}
			},
			{
				tag: 'font',
				id: 'fontwechatfriend',
				text: '朋友圈',
				textStyles: {
					size: textHeight
				},
				position: {
					top: top1 + iconWidth + icontextSpace,
					left: left1,
					width: iconWidth,
					height: textHeight
				}
			},
			{
				tag: 'font',
				id: 'fontwechatmoments',
				text: '微信好友',
				textStyles: {
					size: textHeight
				},
				position: {
					top: top1 + iconWidth + icontextSpace,
					left: left2 - 2.5,
					width: iconWidth + 5,
					height: textHeight
				}
			},
			{
				tag: 'img',
				id: 'imgqq',
				src: '/static/img/qq-share.png',
				position: {
					top: top1,
					left: left3,
					width: iconWidth,
					height: iconWidth
				}
			},
			{
				tag: 'font',
				id: 'fontqq',
				text: 'QQ',
				textStyles: {
					size: textHeight
				},
				position: {
					top: top1 + iconWidth + icontextSpace,
					left: left3,
					width: iconWidth,
					height: textHeight
				}
			},
			{
				tag: 'img',
				id: 'imgmore',
				src: '/static/img/more.png',
				position: {
					top: top1,
					left: left4,
					width: iconWidth,
					height: iconWidth
				}
			},
			{
				tag: 'font',
				id: 'fontmore',
				text: '更多',
				textStyles: {
					size: textHeight
				},
				position: {
					top: top1 + iconWidth + icontextSpace,
					left: left4,
					width: iconWidth,
					height: textHeight
				}
			}
			//如果想要增加更多按钮，请在这里继续添加，第二列还有2个空位
		]);
		nvImageMenu.addEventListener('click', function(e) {
			//处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
			// console.log("click menu"+JSON.stringify(e));
			if (e.screenY > plus.screen.resolutionHeight - 50) {
				//点击了底部取消按钮
				nvMask.hide();
				nvImageMenu.hide();
			} else if (e.clientX < 4 || e.clientX > screenWidth - 4 || e.clientY < 4) {
				//屏幕左右边缘5像素及菜单顶部5像素不处理点击
			} else {
				//点击了图标按钮
				var iClickIndex = -1; //点击的图标按钮序号，第一个图标按钮的index为0
				var iRow = e.clientY < top2 - left1 / 2 ? 0 : 1;
				var iCol = -1;
				if (e.clientX < left2 - iconSpace / 2) {
					iCol = 0;
				} else if (e.clientX < left3 - iconSpace / 2) {
					iCol = 1;
				} else if (e.clientX < left4 - iconSpace / 2) {
					iCol = 2;
				} else {
					iCol = 3;
				}
				if (iRow == 0) {
					iClickIndex = iCol;
				}
				console.log('点击按钮的序号: ' + iClickIndex);
				if (iClickIndex >= 0 && iClickIndex <= 4) {
					//处理具体的点击逻辑，此处也可以自行定义逻辑。如果增减了按钮，此处也需要跟着修改
					var strProvider = '',
						strScene = '';
					switch (iClickIndex) {
						case 0:
							strProvider = 'weixin';
							strScene = 'WXSenceTimeline';
							break;
						case 1:
							strProvider = 'weixin';
							strScene = 'WXSceneSession';
							break;
						case 2:
							strProvider = 'qq';
							break;
						case 3:
							plus.share.sendWithSystem({
								content: strShareUrl
							});
							break;
					}
					if (strProvider != '') {
						//点击了0-3序号的这4个按钮
						uni.share({
							provider: strProvider,
							scene: strScene,
							type: 0,
							href: strShareUrl,
							title: strShareTitle,
							summary: strShareSummary,
							imageUrl: strShareImageUrl,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				}
			}
		});
		// #endif
	},
	methods: {
		...mapMutations(['logout']),
		switchChange: function(e) {
			console.log('switch 发生 change 事件，携带值为', e.target.value);
		},
		togglePopup: function(e) {
			//TODO 未处理h5，h5应调用qq浏览器等自带的share api，如果浏览器不自带share，那么分享图标不应该显示。或者从简的话，h5整个就不显示分享按钮
			// #ifdef APP-PLUS
			nvMask.show();
			nvImageMenu.show(); //5+应支持从底部向上弹出的动画
			// #endif
		},
		logOut: function() {
			var that = this;
			that.logout();
			uni.showToast({
				title: '退出登录',
				//icon: 'success',
				mask: true,
				duration: 3000
			});
			uni.navigateTo({
				url: '/pages/index/index'
			});
		}
	}
};
</script>
<style>
.scroll-container {
	height: 100%;
	padding-bottom: 20%;
}

.dui-fixed-bottom-btn {
	background-color: #fff;
	color: #ff5723;
	font-size: 32upx;
	text-align: center;
}

.dui-fixed-bottom-btn text {
	display: block;
	margin-top: 15upx;
	margin-bottom: 15upx;
}

.dui-basic-list-item__container {
	padding: 26upx 30upx;
}

.dui-reduce {
	padding-top: 8upx;
	padding-bottom: 8upx;
}

.dui-basic-list-item__content-note {
	font-size: 24upx;
	margin-top: 0;
}

.dui-basic-list-item__extra {
	width: auto;
}
</style>
