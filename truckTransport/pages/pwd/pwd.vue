<template>
    <view class="content">
        <view class="input-group" style="padding-left: 30upx;padding-right:40upx ;">
            <view class="input-row border">
                <text class="title iconfont icon-suoding"></text>
                <m-input type="text" focus clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
        </view>

        <view class="btn-row">            
			<button text="提 交"  @click.native="findPassword()"></button>
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
                email: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
            }
        }
    }
</script>

<style>
	.content {
		background-color: #fff;
		border-top: 1upx solid #e0e0e0;
	}
</style>
