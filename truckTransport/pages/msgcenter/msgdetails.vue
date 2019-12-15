<template>
	<view class="content">
		<view class="dui-msgdetail-title">
			{{list.title}}
		</view>
		<view class="dui-msgdetail-date">
			2019年10月10日 10:00
		</view>
		<view class="ui-divide-line"></view>
		<view class="dui-msgdetail-body">
			{{list.msg}}
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:"",
				list:{}
			}
		},
		onLoad(options) {
			this.id=options.id;
		},
		methods:{
			getCont:function(){
				let that=this;
				uni.getStorage({//获得保存在本地的用户信息
				    key: 'userLogin',  
				    success:(res) => {  
				        that.userinfo=res.data  	                    
				    }  
				}); 
				 const data={
					 phone:this.userinfo.phone,
					 token:this.userinfo.token,
					 notice_id:this.id
				 }
				 this.$uniFly
				 .post({
				 	url: "/api/notice/getnoticelist",
				 	param: data
				 })	
				 .then({function(res){
				 	if(res.code===0){
				 		that.list=res.data;
				 	}else{
				 		uni.showModal({
				 		    content: res.msg,
				 		    showCancel: false
				 		});
				 	}
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

	.dui-msgdetail-title {
		padding: 20upx 80upx;
		font-size: 40upx;
		font-weight: bold;
		text-align: center;
	}

	.dui-msgdetail-date {
		padding: 5upx 80upx 20upx 80upx;
		font-size: 28upx;
		color: #797979;
		text-align: center;
	}

	.dui-msgdetail-body {
		padding: 30upx;
		font-size: 28upx;
		line-height: 50upx;
		color: #797979;
	}
</style>
