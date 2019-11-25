<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<scroll-view class="scroll-container" scroll-y>
			<view class="dui-about-icon">
				<image src="../../static/img/logo.png" mode=""></image>
				<text>{{list.site_name}}</text>
			</view>

			<view class="dui-about-wrapper">
				<view class="dui-about-text">
					拉活儿网成立于2019年。是一款免费的货运O2O软件，为客户提供同城、即时、整车的拉货服务。在拉活儿网，司机须通过审核，专业的培训，保障优质服务才能通过认证。一键下单叫车拉货，云配送立即为你配对附近优质专业的司机，一经配对，你不但可以浏览司机资料和评价，还能掌握司机位置，让拉货变得更省时、省钱、省心！还可以提供定制化服务哦！
				</view>
				<view class="ui-divide-line"></view>
				<view class="dui-about-text">
					电话：<text>{{list.service_tel}}</text><br>
					邮箱：<text>{{email}}</text><br>
					网址：<text>{{url}}</text><br>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"edition":"拉活网用户版v 1.1.1",
				"phone": "010-1111",
				"email": "123@456.com",
				"url": "www.xxx.cn"
			}
		},
		methods: {

		}
	}
</script>

</script>
<style>
	.scroll-container {
		height: 100%;
	}

	.dui-about-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50upx 0;
		font-size: 28upx;
	}

	.dui-about-icon image {
		width: 150upx;
		height: 150upx;
		margin-bottom: 30upx;
	}

	.dui-about-wrapper {
		padding: 0 36upx;
		background-color: #fff;
	}

	.dui-about-text {
		padding: 36upx 0;
		font-size: 30upx;
		color: #212121;
		line-height: 50upx;
	}

	text {
		color: #FF5723;
	}
</style>
