<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="dui-flex-row">
			<text>当前可提现</text>
			<text class="dui-maincolor">{{user.wallet}}</text>
		</view>
		<view class="ui-divide-line"></view>
		<view class="dui-flex-row">
			<text>金额</text>
		</view>
		<view class="dui-flex-row">
			<view class="dui-pickup-write-money">￥<input type="text" focus="true" v-model="price" placeholder="请填写金额" /></view>
			<view class="dui-pickup-all" @tap="pickall">全部提现</view>
		</view>
		<view class="btn-row"><button class="primary" type="primary" @tap="submitPick">确认提现</button></view>
		<!--<view class="dui-flex-row">
			<text>提现到</text>
			<view class="dui-pickup-cardno">
				<text>54652154512456465</text>
				<text class="iconfont icon-gengduo-shuxiang"></text>
			</view>
		</view>-->
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	export default{
		data(){
			return {
				price:0
			}
		},
		computed: mapState(['user']),
		methods:{
			pickall:function(){
				this.price=this.user.wallet;
			},
			submitPick:function(){
				let that=this
				const data={
					price:this.price
				}
				if(this.price===0){
					uni.showToast({
						icon: 'none',
						title: '提现金额不能为0'
					});
					return;
				}
				if(this.price>=this.user.wallet){
					uni.showToast({
						icon: 'none',
						title: '最多提现'+this.user.wallet+'元'
					});
					return;
				}
				this.$uniFly
				.post({
					url: '/api/withdraw/addwithdraw',
					params:data
				})
				.then(function(res) {
					if (res.code === 0 ) {
						uni.showToast({
							title: '已成功申请',
							icon: 'success',
							mask: true,
							duration: 3000
						});
										
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
					}
				})
				.catch(function(error) {
					uni.showModal({
						content: JSON.stringify(error),
						showCancel: false
					});
				});
			}
		}
	}
</script>
<style>
	.content {
		background-color: #fff;
	}

	.dui-maincolor {
		color: #FF5723;
		font-size: 32upx;
		font-weight: 500;
	}

	.dui-flex-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		padding: 20upx 30upx;
	}

	.dui-pickup-write-money {
		display: flex;
		align-items: center;
		font-size: 60upx;
	}

	.dui-pickup-write-money input {
		font-size: 60upx;
	}

	.dui-pickup-all {
		width: 25%;
		color: #FF5723;
		text-align: right;
	}
	.dui-pickup-cardno{
		margin-top: 40upx;
	}
</style>
