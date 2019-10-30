<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="dui-msgcenter-list">
				<block v-for="(item,index) in lists" :key="index">
					<navigator :url="'msgdetails?id='+index" class="dui-msgcenter-item-box">
						<view class="dui-msgcenter-item">
							<view class="dui-msgcenter-logo">
								<image :src="item.img"></image>
							</view>
							<view class="dui-msgcenter-flex-column">
								<view class="dui-msgcenter-title">
									<text>{{item.msgtype}}</text>
									<text class="dui-msgcenter-date">{{item.date}}</text>
								</view>
								<view class="dui-msgcenter-content">
									{{item.msgcontent}}
								</view>
							</view>
						</view>
					</navigator>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
					"img": "../../static/img/setup.png",
					"msgtype": "通知",
					"date": "2019-10-10",
					"msgcontent": "系统维护通知"
				}, {
					"img": "../../static/img/file.png",
					"msgtype": "订单超时预警",
					"date": "2019-10-11",
					"msgcontent": "您有订单,未及时运送,请尽快前往"
				}, {
					"img": "../../static/img/setup.png",
					"msgtype": "通知",
					"date": "2019-10-10",
					"msgcontent": "系统维护通知"
				}, {
					"img": "../../static/img/file.png",
					"msgtype": "订单超时预警",
					"date": "2019-10-11",
					"msgcontent": "您有订单,未及时运送,请尽快前往"
				}]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
