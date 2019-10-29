<template>
	<view class="content">
		<view>
			<uni-drawer :visible="visible" mode="right" @close="visible=false">
				<form @submit="formSubmit" @reset="formReset">
					<scroll-view scroll-y="true">
						<view class="dui-msgcenter-list">
							<view class="dui-msgcenter-item-box">
								<view class="dui-msgcenter-item">
									<view class="dui-drawer-title">
										筛选
									</view>
								</view>
							</view>
							<view class="dui-msgcenter-item">
								<view class="dui-drawer-title">
									货物类型
								</view>
								<view class="dui-drawer-content dui-drawer-hw-type" @tap="toggle()">
									<input type="text" name="hwtype" value='全部' disabled />
									<text :class="[isRotate?'iconfont icon-35_xiangxiajiantou dui-down':'iconfont icon-35_xiangxiajiantou dui-up']"></text>
								</view>
							</view>
							<view class="dui-hw-type-content" v-show="isShow">
								<text v-for="(item,index) in typenames" :key="index">{{item.typename}}</text>
							</view>
							<view class="ui-divide-line"></view>
							<view class="dui-msgcenter-item">
								<view class="dui-drawer-title">
									是否加急
								</view>
								<view class="dui-drawer-content">
									<checkbox-group name="urgent">
										<label class="dui-checkbox-box">
											<checkbox class="dui-checkbox" value="是" checked="true" color="#FF5723" />是</label>
										<label>
											<checkbox class="dui-checkbox" value="否" color="#FF5723" />否</label>
									</checkbox-group>
								</view>
							</view>
							<view class="ui-divide-line"></view>
							<view class="dui-msgcenter-item">
								<view class="dui-drawer-title">
									价格区间(元)
								</view>
								<view class="dui-drawer-content">
									<input type="text" name="min" value="" placeholder="最低价" />
									<input type="text" name="max" value="" placeholder="最高价" />
								</view>
							</view>
							<view class="ui-divide-line"></view>
							<view class="dui-msgcenter-item">
								<view class="dui-drawer-title">
									日期
								</view>
								<view class="dui-drawer-content">
									<checkbox-group name="date">
										<label class="dui-checkbox-box">
											<checkbox class="dui-checkbox" value="今天" checked="true" color="#FF5723" />今天</label>
										<label>
											<checkbox class="dui-checkbox" value="明天" color="#FF5723" />明天</label>
									</checkbox-group>
								</view>
							</view>
							<view class="ui-divide-line"></view>
						</view>
					</scroll-view>
					<view class="dui-drawer-btn-box">
						<button class="dui-drawer-btn-l" type="default" form-type="reset">重置</button>
						<button class="dui-drawer-btn-r" form-type="submit">确定</button>
					</view>
				</form>
			</uni-drawer>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'

	import uniDrawer from "@/components/drawer/drawer.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
			uniDrawer,
			uniPopup
		},
		data() {
			return {
				value: "",
				visible: false,
				isShow: false,
				isRotate: false,
				typenames: [{
					"typename": "全部"
				}, {
					"typename": "家电"
				}, {
					"typename": "家具"
				}, {
					"typename": "厨卫"
				}]
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onNavigationBarButtonTap: function(e) {
			var index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: "/pages/msgcenter/msgcenter"
				});
			} else if (index === 1) {
				this.visible = !this.visible
			}
		},
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
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			toggle: function() {
				this.isShow = !this.isShow;
				this.isRotate = !this.isRotate;
			}
		}
	}
</script>
<style>
	.dui-up {
		transition: all 0.3s;
	}

	.dui-down {
		transform: rotate(180deg);
		transform-origin: center;
		transition: all 0.3s;
	}

	scroll-view {
		height: 90%;
	}

	.ui-divide-line {
		margin: 0 20upx;
	}

	.dui-msgcenter-item {
		line-height: 60upx;
	}

	.dui-drawer-title {
		width: 40%;
		font-size: 30upx;
	}

	.dui-drawer-content {
		flex: 1;
		font-size: 30upx;
		color: #797979;
	}

	.dui-drawer-content input {
		width: 40%;
		border: 1px solid #e2e2e2;
		border-radius: 10upx;
		float: left;
		margin-right: 25upx;
		font-size: 24upx;
		text-align: center;
		padding: 10upx 0;
	}

	.dui-drawer-hw-type {
		display: flex;
		align-items: center;

	}

	.dui-hw-type-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 20upx 20upx 20upx;
	}

	.dui-hw-type-content text {
		display: inline-block;
		width: 25%;
		margin: 10upx;
		padding: 10upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
		font-size: 24upx;
		line-height: 40upx;
		background-color: #F8F8F8;
	}

	.dui-drawer-hw-type input {
		float: left;
		width: 50%;
		text-align: center;
		border: none;
	}

	.dui-checkbox-box {
		margin-right: 40upx;
	}

	.dui-checkbox {
		transform: scale(0.8);
	}

	.dui-drawer-btn-box {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.dui-drawer-btn-l,
	.dui-drawer-btn-r {
		flex: 1;
		line-height: 120upx;
		color: #fff;
		text-align: center;
		font-size: 32upx;
		border-radius: 0;
	}

	.dui-drawer-btn-l:after,
	.dui-drawer-btn-r:after {
		content: '';
		border: none;
	}

	.dui-drawer-btn-l {
		background-color: #F0AD4E;
	}

	.dui-drawer-btn-r {
		background-color: #DD524D;
	}
</style>
