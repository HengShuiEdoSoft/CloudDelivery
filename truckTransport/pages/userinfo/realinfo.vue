<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">真实姓名</text>
				<m-input type="text" focus clearable v-model="realname" placeholder="请输入真实姓名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">身份证号</text>
				<m-input type="text" focus clearable v-model="idcardnum" placeholder="请输入身份证号码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="submitRealInfo()">保存</button>
		</view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	export default{
		components: {
		    mInput			
		},
		data() {
		    return {
		        realname: '',
		        idcardnum: '',
				countdown:60
		    }
		},
		methods:{
			submitRealInfo() {
			    
			}
		}
	}
	
</script>

<style>
	.content{
		background: #fff;
	}
	.input-row .title{
		width:24%;
		font-size:16px;
	}
</style>
