<template>
	<view class="content">
		<map class="map" id="map1" ref="map1" :longitude="location.longitude" :latitude="location.latitude"
            :show-location="true" type="gcj02"></map>
		<uni-popup ref="selectcity" mode="fixed">
		    <view class="popup-view">
		        <uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
		    </view>
		</uni-popup>
		<uni-popup ref="permission" mode="fixed">
		    <view class="popup-view">
		        <text class="popup-title">需要用户授权位置权限</text>
		        <view class="uni-flex popup-buttons">
		            <button class="uni-flex-item" type="primary" open-type="openSetting" @tap="openSetting">设置</button>
		            <button class="uni-flex-item" @tap="close('permission')">取消</button>
		        </view>
		    </view>
		</uni-popup>
	</view>
</template>

<script>
	import city from '@/common/city.data.js'
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	var util = require('@/common/util.js');
	var formatLocation = util.formatLocation;
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	export default {
		components: {
			uniIndexedList,
			uniPopup
		},
		data() {
			return {
				hasLocation: false,
				location: {},
				locationAddress: '',
				type: '',
				list: city.list
			}
		},
		onLoad() {
			this.getLocation();
		},
		onReady () {
		    this.map = uni.createMapContext("map1", this);
		},
		methods: {
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			},
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open();
			},
			cancel(type){
				this.$refs[type].close()
			},
			async getLocation() {
			    // #ifdef APP-PLUS
			    let status = await this.checkPermission();
			    if (status !== 1) {
			        return;
			    }
			    // #endif
			    // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
			    let status = await this.getSetting();
			    if (status === 2) {
			        this.togglePopup("bottom", "permission");
			        return;
			    }
			    // #endif
			
			    this.doGetLocation();
			},
			doGetLocation() {
			    uni.getLocation({
					type:' gcj02',
			        success: (res) => {
			            this.hasLocation = true;
			            this.location = formatLocation(res.longitude, res.latitude);
			        },
			        fail: (err) => {
			            // #ifdef MP-BAIDU
			            if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
			                this.togglePopup("bottom", "permission");
			            }
			            // #endif
			            // #ifndef MP-BAIDU
			            if (err.errMsg.indexOf("auth deny") >= 0) {
			                uni.showToast({
			                    title: "访问位置被拒绝"
			                })
			            } else {
			                uni.showToast({
			                    title: err.errMsg
			                })
			            }
			            // #endif
			        }
			    })
			},
			getSetting: function() {
			    return new Promise((resolve, reject) => {
			        uni.getSetting({
			            success: (res) => {
			                if (res.authSetting['scope.userLocation'] === undefined) {
			                    resolve(0);
			                    return;
			                }
			                if (res.authSetting['scope.userLocation']) {
			                    resolve(1);
			                } else {
			                    resolve(2);
			                }
			            }
			        });
			    });
			},
			openSetting: function() {
			    this.hideConfirm();
			    uni.openSetting({
			        success: (res) => {
			            if (res.authSetting && res.authSetting['scope.userLocation']) {
			                this.doGetLocation();
			            }
			        },
			        fail: (err) => {}
			    })
			},
			async checkPermission() {
			    let status = permision.isIOS ? await permision.requestIOS('location') :
			        await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');
			
			    if (status === null || status === 1) {
			        status = 1;
			    } else if (status === 2) {
			        uni.showModal({
			            content: "系统定位已关闭",
			            confirmText: "设置",
			            success: function(res) {
			                if (res.confirm) {
			                    permision.gotoiOSSetting();
			                }
			            }
			        })
			    } else if (status.code) {
			        uni.showModal({
			            content: status.message
			        })
			    } else {
			        uni.showModal({
			            content: "需要定位权限",
			            confirmText: "设置",
			            success: function(res) {
			                if (res.confirm) {
			                    permision.gotoAppSetting();
			                }
			            }
			        })
			    }
			
			    return status;
			},
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			clear: function() {
			    this.hasLocation = false
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}
	map{
		width:750upx;
		height:1334upx;
	}
</style>
