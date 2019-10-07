<template>
	<view class="content ">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<block v-for="(item,index) in lists" :key="index">
				<view class="dui-basic-list">
					<navigator url="">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										衡水CBD
									</view>
									<view class="dui-basic-list-item__content-note">
										河北省衡水市桃城区站前西路 30楼3030
									</view>
									<view class="dui-basic-list-item__content-note">
										小花 18888888888
									</view>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view class="dui-gap"></view>
			</block>
		</scroll-view>
		<view style="position: absolute;bottom: 0;width: 100%;height: calc(100vh-85vh-50upx); background-color: #efeff4;z-index: 99;">
			<button class="primary" type="primary">添加常用地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			let list = [];
			for (let i = 0; i < 10; i++) {
				list.push(i)
			}
			this.lists = list;
		}
	}
</script>

<style>
	.scroll-container {
		height: 85vh;
	}

	.primary {
		margin: 25upx 20upx;
	}
</style>
