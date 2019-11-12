import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        phone: "",
		userState:"",
		token:"",
		usertype:"0"
		
    },
    mutations: {
        login(state, user) {
            state.phone = user.phone || '新用户';
			state.status=user.status||'';
			state.token = user.token||'';
            state.hasLogin = true;
			state.usertype = user.user_type||'0'
			uni.setStorage({
				key:'userLogin',
				data:user
			})
        },
        logout(state) {
            state.phone = '新用户';
            state.status='';
            state.token ='';
            state.hasLogin = false;
			uni.removeStorage({
				key:'userLogin'
			})
        }
    }
})

export default store
