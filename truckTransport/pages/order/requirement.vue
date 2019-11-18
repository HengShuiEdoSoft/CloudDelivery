<template>
	<view class="content">
		<view class="ui-divide-bar"></view>
		<checkbox-group class="ui-list" @change="checkboxChange">
			<label class="ui-list-item" v-for="(item,key) in lists" :key="key">
				<view class="ui-list-item-container">
					<view class="ui-list-text" v-if="item.attach_type===0">{{item.attach_title+"("+item.attach_remark+")"}}</view>
					<view class="ui-list-text" v-if="item.attach_type===1">{{item.attach_title+"("+item.attach_remark+")"}}</view>
					<view class="ui-select-icon"><checkbox :value="item.value" :checked="item.checked" color="#FF5723"/></view>			
				</view>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0,
				lists:[{name:"返程（附加40%路费）"},{name:"小推车（免费）"},{name:"纸质回单（商议价格）"},{name:"拍照回单"},{name:"代收货款（免费；货款上限一万元）"}]
			}
		},
		onLoad() {
			this.getList();
		},
		methods:{
			checkboxChange: function (e) {
			    var lists = this.lists,
			    values = e.detail.value;
			    for (var i = 0, lenI = lists.length; i < lenI; ++i) {
			        const item = lists[i]
			        if(values.includes(item.value)){
			            this.$set(item,'checked',true)
			        }else{
			            this.$set(item,'checked',false)
			        }
			    }
			},
			getList:function(){
				let that=this;
				this.$uniFly
				.get({
					url: '/api/attach/getattachlist',
					params:{}
				})
				.then(function(res) {
					uni.hideNavigationBarLoading();
					if (res.code === 0 ) {
						that.lists=res.data;
						console.log(res.data)
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
	.content{
		background: #fff;
	}
	.ui-list{
		margin-top:20upx;
		padding:0 30upx;
	}
	.ui-list-item-container{
		display:flex;
		line-height: 92upx;
		font-size:14px;
	}
	.ui-list-text{
		flex:1;
	}
	.ui-list-item:after{
		content:"";
		display:block;
		height:1px;
		transform: scaleY(.5);
		background: #ddd;
	}
	.ui-list-item.active .ui-select-icon{
		display:inline-block;
	}
</style>
