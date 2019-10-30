<template>
	<view class="content">
		<scroll-view  scroll-y>
			<view class="dui-basic-list">
				<block v-for="(item,index) in lists" :key="index">
					<view class="dui-basic-list-item">
						<view class="dui-basic-list-item__container">
							<view class="dui-basic-list-item__content">
								<view class="dui-basic-list-item__content-title">
									流水号00123456789
								</view>
								<view class="dui-basic-list-item__content-note">
									2019-10-10 18:00
								</view>
							</view>
							<view class="dui-basic-list-item__content" style="text-align:right;">
								<view class="dui-basic-list-item__content-title dui-maincolor">
									￥120.00
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				lists: []
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
	scroll-view {
		height: 100%;
	}

	.dui-maincolor {
		color: #FF5723;
	}
</style>
