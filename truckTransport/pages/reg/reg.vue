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
						if (this.phone.length != 11) {
						    uni.showToast({
						        icon: 'none',
						        title: '请输入正确格式的手机号码'
						    });
						    return;
						}
						requestUrl= this.url + requestUrl;
						uni.request({					
							url: requestUrl,
							method:'POST',
							data:{
								phone:this.phone,
							},
							header: {
							    'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
							},
							success: (res) => {
								this.res =JSON.stringify(res);
								console.log(res.data)
								if(res.data.code===0){
									console.log("success")
								}else if(res.data.code===1){
									uni.showToast({
										content: res.msg,
										showCancel: false
									});
								}	
								
							},
							complete: () => {
								this.loading = false;
							}
						});
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
                if (this.phone.length != 11) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入正确格式的手机号码'
                    });
                    return;
                }
                if (this.pwd.length < 6) {
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
                    phone: this.phone,
                    pwd: this.pwd,
                    vercode: this.vercode,
					usertype:0
                }
				regurl= this.url + regurl;
				uni.request({					
					url: regurl,
					method:'POST',
					data:data,
					header: {
					    'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						this.res =JSON.stringify(res);
						console.log(res.data)
						if(res.data.code===0){
							console.log("success")
							service.addUser(data);
							uni.showToast({
							    title: '注册成功'
							});
							uni.navigateTo({
								url:"/pages/index/index"
							})({
							    delta: 2
							});
						}else if(res.data.code===1){
							uni.showToast({
								content: res.msg,
								showCancel: false
							});
						}			
					},
					complete: () => {
						this.loading = false;
					}
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
</style>
