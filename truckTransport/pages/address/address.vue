<template>
	<view class="content ">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<block v-for="(item,index) in lists" :key="index">
				<view class="dui-basic-list">
					<navigator :url="'editaddress?id=' + index">
						<view class="dui-basic-list-item">
							<view class="dui-basic-list-item__container">
								<view class="dui-basic-list-item__content">
									<view class="dui-basic-list-item__content-title">
										<text><text class="iconfont icon-weizhi"></text>衡水CBD</text>
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

			}
		},
		onShow() {
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
		height: 100%;
		margin-bottom: 140upx;
	}

	.primary {
		margin: 25upx 20upx;
	}

	.icon-weizhi {
		margin: 0 10upx;
		font-size: 36upx;
	}
</style>
