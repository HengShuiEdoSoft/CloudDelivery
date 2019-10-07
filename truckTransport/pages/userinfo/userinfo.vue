<template>
	<view class="content">
		<view class="ui-info-list">
			<view class="ui-info-list-item" @tap="togglePopup('center', 'portrait')">
				<view class="ui-info-list-left">头像</view>
				<view class="ui-info-list-center"><image src="../../static/img/HeadImg.jpg"></image></view>
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
		<uni-popup ref="portrait" :type="type" :custom="true" :mask-click="false">
			<view class="ui-tip">
				<view class="uni-tip-group-button">
					<view class="ui-list-cell" @click="gallery('portrait')">相册上传</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="sexchose" :type="type" :custom="true" :mask-click="false">
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
	export default{
		components: {
			uniPopup
		},
		data(){
			return{
				current:0,
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
				this.$refs[open].open()
			},
			cancel(type){
				this.$refs[type].close()
			},
			gallery(type){
				this.cancel(type);
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
				//向后台发送数据
				this.setData();
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
</style>
