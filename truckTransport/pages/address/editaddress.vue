<template>
	<view class="content ">
		<view class="dui-basic-list">
			<view class="dui-basic-list-item">
				<view class="dui-basic-list-item__container" @tap="amap_choice">
					<view class="dui-basic-list-item__icon"><text class="iconfont icon-weizhi"></text></view>
					<view class="dui-basic-list-item__content">
						<view class="dui-basic-list-item__content-title"><input type="text" @input="setAddress" :value="address" :disabled="true" placeholder="请输入地址" /></view>
					</view>
					<view class="dui-basic-list-item__extra"><text class="iconfont icon-gengduo-shuxiang"></text></view>
				</view>
			</view>
			<view class="dui-basic-list-item">
				<view class="dui-basic-list-item__container">
					<view class="dui-basic-list-item__icon"><text class="iconfont icon-weizhi"></text></view>
					<view class="dui-basic-list-item__content">
						<view class="dui-basic-list-item__content-title"><input type="text" @input="setHouse" :value="house" maxlength="20" placeholder="楼层及门牌号" /></view>
					</view>
				</view>
			</view>
			<view class="dui-basic-list-item" style="flex-direction: row;">
				<view class="dui-basic-list-item__content">
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__icon"><text class="iconfont  icon--kefu"></text></view>
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title"><input type="text" @input="setName" :value="name" maxlength="10" placeholder="联系人" /></view>
						</view>
					</view>
					<view class="dui-basic-list-item__container">
						<view class="dui-basic-list-item__icon"><text class="iconfont icon-dianhua"></text></view>
						<view class="dui-basic-list-item__content">
							<view class="dui-basic-list-item__content-title">
								<input type="text" @input="setPhone" :value="address_phone" maxlength="11" placeholder="手机号" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="dui-fixed-bottom-btn"><button class="primary" type="primary" @tap="addAddress">确定</button></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			address_id:0,
			address: '',
			house: '',
			name: '',
			lon: '',
			lat: '',
			address_phone: ''
		};
	},
	onLoad(options) {
		let that = this;
		if (options.data) {
			let data = JSON.parse(options.data);			
			that.address_id = data.address_id;
			that.address = data.address;
			that.house = data.house;
			that.lon = data.lon;
			that.lat = data.lat;
			that.name = data.name;
			that.address_phone = data.address_phone;
		}
		this.$fire.on('setAddress', function(data) {
			that.address = data.city + data.localtion;
			that.house = data.address;
			that.lon = data.longitude;
			that.lat = data.latitude;
			that.name = data.contact;
			that.address_phone = data.phone;
		});
	},
	methods: {
		amap_choice() {
			let url = '/pages/amap/amap_choice/amap_choice?status=0&channel=setAddress';
			uni.navigateTo({
				url: url
			});
		},
		setName(e) {
			this.name = e.detail.value;
		},
		setAddress(e) {
			this.address = e.detail.value;
		},
		setHouse(e) {
			this.house = e.detail.value;
		},
		setPhone(e) {
			this.address_phone = e.detail.value;
		},
		addAddress() {
			const data = {
				address_id: this.address_id,
				name: this.name,
				address_phone: this.address_phone,
				address: this.address,
				house: this.house,
				lon: this.lon,
				lat: this.lat
			};
			if (this.$drmking.isEmpty(data.house)) {
				uni.showToast({
					icon: 'none',
					title: '门牌楼层号不能为空！'
				});
				return;
			}
			if (this.$drmking.isEmpty(data.name)) {
				uni.showToast({
					icon: 'none',
					title: '收货人不能为空！'
				});
				return;
			}
			if (!this.$drmking.isPhone(data.address_phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号不能为空！'
				});
				return;
			}
			this.$uniFly
				.post({
					url: '/api/address/addAddress',
					params: data
				})
				.then(function(res) {
					uni.hideNavigationBarLoading();
					if (res.code == 0) {
						uni.showToast({
							title: '修改成功',
							icon: 'success',
							mask: true,
							duration: 3000
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.hideNavigationBarLoading();
					uni.showModal({
						content: error,
						showCancel: false
					});
				});
		}
	}
};
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
