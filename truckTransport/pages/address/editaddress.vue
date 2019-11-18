<template>
	<view class="content ">
		<view class="dui-basic-list">
			<view class="dui-basic-list-item">
				<view class="dui-basic-list-item__container">
					<view class="dui-basic-list-item__icon"><text class="iconfont icon-weizhi"></text></view>
					<view class="dui-basic-list-item__content">
						<view class="dui-basic-list-item__content-title">
							<input type="text" value="list.address" v-model="address" placeholder="请输入地址(必填)"/>
						</view>
					</view>
					<view class="dui-basic-list-item__extra"><text class="iconfont icon-gengduo-shuxiang"></text></view>
				</view>
			</view>
			<view class="dui-basic-list-item">
				<view class="dui-basic-list-item__container">
					<view class="dui-basic-list-item__icon"><text class="iconfont icon-weizhi"></text></view>
					<view class="dui-basic-list-item__content">
						<view class="dui-basic-list-item__content-title">
							<input type="text" value="list.house" v-model="house" maxlength="20" placeholder="楼层及门牌号(选填)" />
						</view>
					</view>
				</view>
			</view>
			<view class="dui-basic-list-item" style="flex-direction: row;">
				<view class="dui-basic-list-item__content">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__icon"><text class="iconfont  icon--kefu"></text></view>
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								<input type="text" value="list.name" v-model="name" maxlength="10" placeholder="联系人(选填)" />
							</view>
						</view>
					</view>
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__icon"><text class="iconfont icon-dianhua"></text></view>
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								<input type="text" value="list.address_phone" v-model="address_phone" maxlength="11" placeholder="联系电话(选填)" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="dui-fixed-bottom-btn">
			<button class="primary" type="primary" @tap="addAddress">保存</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				address: '',
				house: '',
				name: "",
				address_phone: "",
				list:{}
			}
		},
		onLoad(options){
			let list=JSON.parse(options.data)
			this.list=list
			//请求数据
		},
		methods: {
			addAddress(){
				const data={
					name:this.name,
					address_phone:this.address_phone,
					address:this.address,
					house:this.house	
				}
				this.$uniFly
				.post({
					url:'/api/address/addAddress',
					params: data
				})
				.then(function(res) {
					uni.hideNavigationBarLoading();
					if (res.code === 0) {
						uni.showToast({
							title: '添加成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});	
						uni.navigateBack({
							delta:1
						})				
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
</script>
<style>
	.scroll-container {
		height: 100%;
		margin-bottom: 140upx;
	}

	input {
		font-size: 30upx;
	}

	.dui-maillist {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 56upx 42upx;
		border-left: 1upx solid #e5e5e5;
		color: #424456;
	}
</style>
