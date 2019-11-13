<script>
	 import { 
	        mapMutations  
	    } from 'vuex';  
	    export default { 
			methods: {
			    ...mapMutations(['login']),
			} ,
	        onLaunch: function () {
				let user=uni.getStorageInfoSync("userLogin")||'';
				if(user.userid){
					var that=this;
					uni.getStorage({//获得保存在本地的用户信息  
					    key: 'userLogin',  
					    success:(res) => { 
							if(that.hasLogin){
								that.login(res.data)
							}	                    
					    }  
					});
				}  
	        },
			  onShow: function() {
			  	console.log('App Show');
			  },
			  onHide: function() {
			  	console.log('App Hide');
			  } 
	    }  
</script>

<style>
	@import url("common/common.css");
	@import url("common/iconfont.css");
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		-webkit-font-smoothing: antialiased; 
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #F3F4F5;
		padding: 0;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

/* 	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	} */

/* 	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	} */

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		
	}

	.input-row .title {
		width: 12%;
		height: 50upx;
		min-height: 50upx;
		padding: 25upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 24upx;
		padding: 40upx;
	}

	button.primary {
		background-color: #FF5723;
	}	
</style>
