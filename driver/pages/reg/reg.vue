<template>
	<view class="content">
		<view class="ui-divide-line"></view>
		<view class="input-group dui-input-group-mg">
			<view class="input-row border">
				<text class="title iconfont icon-dianhua"></text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-Raidobox-xuanzhong"></text>
				<view class="dui-input">
					<input type="text" clearable v-model="vercode" placeholder="请输入验证码" maxlength="6"></input>
				</view>
				<button class="dui-varcode-btn" type="primary" @tap="numberst" :disabled="countdown < 60 && countdown >= 1">{{countdown < 60 && countdown >= 1?`${countdown}秒`:'获取验证码'}}</button>
			</view>
			<view class="input-row border">
				<text class="title iconfont icon-suoding"></text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button class="primary" type="primary" @tap="register()">注 册</button>
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
                account: '',
                password: '',
                vercode: '',
				countdown:60
            }
        },
        methods: {
			numberst(e){
						//其他代码....
						this.countDown();
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
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }           
		        if (this.vercode.length != 6) {
				    uni.showToast({
				        icon: 'none',						
				        title: '验证码不正确'
				    });
				    return;
				}
                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                });
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
	.dui-input-group-mg {
	  margin-top: 66upx;
	  margin-left: 84upx;
	  margin-right: 100upx; }
	
	.dui-input {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  flex: 1;
	  width: 100%;
	  padding: 0 5px; }
</style>
