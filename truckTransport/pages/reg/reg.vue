<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="input-group dui-input-group-mg">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input type="text" focus clearable v-model="phone" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-Raidobox-xuanzhong"></text>
				<view class="dui-input">
					<input type="text" clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></input>
				</view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst(requestUrl)" :disabled="countdown < 60 && countdown >= 1">{{countdown < 60 && countdown >= 1?`${countdown}秒`:'获取验证码'}}</button>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="pwd" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="register(regurl)">注 册</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';
    export default {
        components: {
            mInput			
        },
        data() {
            return {
                phone: '',
                pwd: '',
                vercode: '',
				requestUrl:'/api/common/sendcode',
				regurl:'/api/user/register',
				countdown:60
            }
        },
        methods: {
			numberst(requestUrl){
						//其他代码....
						this.countDown();
						const data={
							phone:this.phone
						}
						this.$uniFly
						  .post({
						    url: requestUrl,
						    params: data
						  })
						  .then(function(res) {
						    this.res =JSON.stringify(res);
						    if(res.data.code===0){
						    	uni.showToast({
									title: '成功获取验证码',
									icon: 'success',
									mask: true,
									duration: 3000
						    	});
							}
						  })
						  .catch(function(error) {
						    uni.showToast({
						    	content: error,
						    	showCancel: false
						    });
						  })
					},
					// 倒计时
					countDown(){
						let self = this;
						self.countdown = 60;
						self.countdown -= 1;
						if(self.clear){
							clearInterval(self.clear)
						}
						self.clear = null;
						self.clear = setInterval(_ => {
							if(self.countdown > 0){
								self.countdown -= 1;
							}else{
								clearInterval(self.clear)
							}
						},1000)
					},	
            register(regurl) {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                
                const data = {
                    phone: this.phone,
                    pwd: this.pwd,
                    vercode: this.vercode,
					usertype:"0"
                }
				this.$uniFly
				  .post({
				    url: regurl,
				    params: data
				  })
				  .then(function(res) {
					  console.log(res)
				    this.res =res;
				    if(res.data.code===0){
				    	uni.showToast({
							title: '注册成功',
							icon: 'success',
							mask: true,
							duration: 3000
				    	});
				    	uni.navigateTo({
				    		url:'/pages/login/login'
				    	})
					}
				  })
				  .catch(function(error) {
				    uni.showToast({
				    	content: error,
				    	showCancel: false
				    });
				  })
            }
        }
    }
</script>

<style>
	.content {
		background-color: #fff;		
	}
	.btn-row {
		margin-left: 60upx;
		margin-right: 60upx;
	}
	.dui-varcode-btn{
		background-color: transparent;
		color:#FF5723 ;
		font-size: 28upx;
		display: flex;
		align-items: center;
		text-decoration: underline;
	}
	.dui-varcode-btn:after{
		border: none;
	}
	.dui-varcode-btn[disabled][type=primary] {
	    background-color: transparent;
	}
</style>
