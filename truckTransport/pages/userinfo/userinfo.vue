<template>
	<view class="content">
		<view class="ui-info-list">
			<view class="ui-info-list-item">
				<view class="ui-info-list-left">头像</view>
				<view class="ui-info-list-center"><image :src="imgurl[0]" @click="clk(0)"></image></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</view>
			<view class="ui-divide-line"></view>
			<navigator class="ui-info-list-item" url="/pages/userinfo/nichengchange">
				<view class="ui-info-list-left">昵称</view>
				<view class="ui-info-list-center"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</navigator>
			<view class="ui-divide-line"></view>
			<view class="ui-info-list-item" @tap="togglePopup('center', 'sexchose')">
				<view class="ui-info-list-left">性别</view>
				<view class="ui-info-list-center"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</view>
			<view class="ui-divide-line"></view>
			<navigator class="ui-info-list-item" url="/pages/userinfo/phonenum?num=136****9999">
				<view class="ui-info-list-left">手机号</view>
				<view class="ui-info-list-center"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</navigator>
			<view class="ui-divide-line"></view>
			<navigator class="ui-info-list-item" url="/pages/userinfo/industry">
				<view class="ui-info-list-left">行业</view>
				<view class="ui-info-list-center"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
				<view class="ui-info-list-right"><text class="iconfont icon-xiayiyeqianjinchakangengduo"></text></view>
			</navigator>
			<view class="ui-divide-line"></view>
			<navigator class="ui-info-list-item" url="/pages/userinfo/realinfo">
				<view class="ui-info-list-left">实名信息</view>
				<view class="ui-info-list-center"><input placeholder="去设置" value="" disabled="true" placeholder-style="color:#999"></view>
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
					                <radio :value="item.value" :checked="index === current" color="#FF5723"/>
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
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default{
		components: {
			uniPopup,
			 avatar
		},
		data(){
			return{
				current:0,
				imgurl:["../../static/img/HeadImg.jpg"],
				show: false,
				type:"",
				sex:[{
					value:"1",
					name:"男"
				},{
					value:"2",
					name:"女"
				}],
				items:[]
			}
		},
		onShow() {
			//data，每次返回会刷新
			
		},
		methods:{
			setData(){
				console.log("重新请求，渲染页面")
			},
			radioChange: function(e) {
			    for (let i = 0; i < this.sex.length; i++) {
			        if (this.sex[i].value === e.target.value) {
			            this.current = i;
			            break;
			        }
			    }
			},
			togglePopup(type, open) {
				this.type = type;
				this.$refs[open].open();
			},
			cancel(type){
				this.$refs[type].close()
			},
			doBefore() {
				console.log('doBefore');
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '360upx', selHeight: '360upx', 
					expWidth: '280upx', expHeight: '280upx',
					inner: index ? 'true' : 'false'
				});
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.imgurl, rsp.index, rsp.path);
				return;
				uni.uploadFile({
					url: '', //仅为示例，非真实的接口地址
					filePath: rsp.path,
					name: 'avatar',
					formData: {
						'avatar': rsp.path
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					},
					complete(res) {
						console.log(res)
					}
				});
			},
			sexchange(type){
				this.cancel(type);
				//向后台发送数据
				this.setData();
				
			}
		}
	}
</script>

<style>
	.ui-tip{
		padding:30upx;
		width:480upx;
		font-size:14px;
		background: #fff;
	}
	.ui-tip-title{
		font-size:16px;
		line-height: 92upx;
	}
	.ui-list-cell{
		line-height: 92upx;
		display: flex;
		align-items: center;
	}
	radio{
		transform:scale(0.7)
	}
	.ui-portrait-cropper{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
