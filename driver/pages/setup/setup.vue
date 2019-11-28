<template>
	<view class="content">
		<view class="ui-info-list">
			<view class="ui-info-list-item">
				<view class="ui-info-list-left">头像</view>
				<view class="ui-info-list-center" v-if="items.avatar"><image :src="items.avatar" @click="clk(0)"></image></view>
				<view class="ui-info-list-center" v-if="!items.avatar"><image :src="imgurl[0]" @click="clk(0)"></image></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</view>
			<view class="ui-divide-line"></view>
			<!--<navigator class="ui-info-list-item" url="/pages/setup/nichengchange">
				<view class="ui-info-list-left">昵称</view>
				<view class="ui-info-list-center"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</navigator>-->
			<view class="ui-divide-line"></view>
			<view class="ui-info-list-item" @tap="togglePopup('center', 'sexchose')">
				<view class="ui-info-list-left">性别</view>
				<view class="ui-info-list-center" v-if="items.sex===0"><input placeholder="去设置" value="男" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-center" v-if="items.sex===1"><input placeholder="去设置" value="女" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</view>
			<view class="ui-divide-line"></view>
			<navigator class="ui-info-list-item" :url="'/pages/userinfo/phonenum?num='+items.phone">
				<view class="ui-info-list-left">手机号</view>
				<view class="ui-info-list-center" v-if="!items.phone"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-center" v-if="items.phone"><input placeholder="去设置" :value="items.phone" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</navigator>
			<view class="ui-divide-line"></view>
			<navigator class="ui-info-list-item" url="/pages/setup/moresetup">
				<view class="ui-info-list-left">更多设置</view>
				<view class="ui-info-list-center"><input  value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</navigator>
		</view>
		<avatar @upload="doUpload" @avtinit="doBefore" quality="0.8" ref="avatar"></avatar>
		<uni-popup ref="sexchose" :type="type" :custom="true" :mask-click="true">
			<view class="ui-tip">
				<view class="ui-tip-title">性别</view>
				<view class="ui-tip-group-button">
					<radio-group @change="radioChange" @click="sexchange('sexchose')">
						<label class="ui-list-cell ui-list-cell-pd" v-for="(item, index) in sex" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === current" color="#FF5723" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import service from '../../service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			uniPopup,
			avatar
		},
		data() {
			return {
				current: 0,
				imgurl: ["../../static/img/HeadImg.jpg"],
				show: false,
				type: "",
				sex: [{
					value: "1",
					name: "男"
				}, {
					value: "2",
					name: "女"
				}],
				items: []
			}
		},
		onShow() {
			//data，每次返回会刷新

		},
		methods: {
			setData(){
				let userinfo=service.getUsers();
				this.items=userinfo[0];	
				if(this.items.avatar){
					this.imgurl[0]=this.items.avatar	
				}								
			},
			radioChange: function(e) {
			    for (let i = 0; i < this.sexList.length; i++) {
			        if (this.sexList[i].value === e.target.value) {
			            this.current = i;
						this.sex=parseInt(this.sexList[i].value);
			            break;
			        }
			    }
			},
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open();
			},
			cancel(type) {
				this.$refs[type].close()
			},
			doBefore() {
				console.log('doBefore');
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index, {
					selWidth: '360upx',
					selHeight: '360upx',
					expWidth: '280upx',
					expHeight: '280upx',
					inner: index ? 'true' : 'false'
				});
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.imgurl, rsp.index, rsp.path);
				return;
				uni.uploadFile({
					url: 'https://hll.hda365.com/api/file/upload', //仅为示例，非真实的接口地址
					filePath: rsp.path,
					name: 'avatar',
					formData: {
						'avatar': rsp.path
					},
					success: (res) => {
						if(res.code===0){
							that.$set(that.items,'avatar',res.data);
							service.addUser(that.items);
						}
					},
					complete(res) {
						console.log(res)
					}
				});
			},
			sexchange(){
				this.cancel("sexchose");
				let that=this;
				let change=setTimeout(function(){
					const data = {sex:that.sex};
				that.$uniFly
				  .post({
				    url: "/api/user/edituserinfo",
				    params: data
				  })
				  .then(function(res) {
				    if(res.code===0){
				    	uni.showToast({
				    	    title: '变更成功',
							icon: 'success',
							mask: true,
							duration: 3000
				    	});
						that.$set(that.items,'sex',that.sex);
						service.addUser(that.items);
					}
				  }).catch(function(error) {
				    uni.showToast({
				    	content: error,
				    	showCancel: false
				    });
				  });
				},100)		  
			}
		}
	}
</script>

<style>
	.ui-tip {
		padding: 30upx;
		width: 480upx;
		font-size: 14px;
		background: #fff;
	}

	.ui-tip-title {
		font-size: 16px;
		line-height: 92upx;
	}

	.ui-list-cell {
		line-height: 92upx;
		display: flex;
		align-items: center;
	}

	radio {
		transform: scale(0.7)
	}

	.ui-portrait-cropper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
