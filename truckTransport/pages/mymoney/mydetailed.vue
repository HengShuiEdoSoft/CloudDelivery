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
					<view class="dui-basic-list">
						<block v-for="(item,index) in lists" :key="index">
							<navigator url="">
								<view class="dui-basic-list-item">
									<view class="dui-basic-list-item__container">
										<view class="dui-basic-list-item__content">
											<view class="dui-basic-list-item__content-title">
												充值到余额
											</view>
											<view class="dui-basic-list-item__content-note">
												余额:10元
											</view>
										</view>
										<view class="dui-basic-list-item__content" style="text-align: right;">
											<view class="dui-basic-list-item__content-note">
												2019-10-07
											</view>
											<view class="dui-basic-list-item__content-title">
												+10.00
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-container" scroll-y>
					<view class="dui-basic-list">
						<block v-for="(item,index) in lists" :key="index">
							<navigator url="">
								<view class="dui-basic-list-item">
									<view class="dui-basic-list-item__container">
										<view class="dui-basic-list-item__content">
											<view class="dui-basic-list-item__content-title">
												充值到余额
											</view>
											<view class="dui-basic-list-item__content-note">
												余额:10元
											</view>
										</view>
										<view class="dui-basic-list-item__content" style="text-align:right;">
											<view class="dui-basic-list-item__content-note">
												2019-10-07
											</view>
											<view class="dui-basic-list-item__content-title">
												+10.00
											</view>
										</view>
									</view>
								</view>
							</navigator>
						</block>
					</view>
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
				tab: [{
					name: "流水明细",
				}, {
					name: "充值明细",
				}],
				lists: []
			}
		},
		methods: {
			tabChange: function(e) {
				var index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index;
			},
			swiperChange: function(e) {
				var index = e.target.current || e.detail.current;
				this.current = index;
			}
		},
		onLoad() {
			let list = [];
			for (let i = 0; i < 20; i++) {
				list.push(i)
			}
			this.lists = list;
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
