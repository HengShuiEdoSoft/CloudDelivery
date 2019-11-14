import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin:false,
        phone: "",
		token:"",
		userid:""
		
    },
    mutations: {
        login(state, user) {
            state.phone = user.phone || '新用户';
			state.token = user.token||'';
			state.userid=user.user_id||'';
            state.hasLogin = true;
			uni.setStorage({
				key:'userLogin',
				data:user
			})
        },
        logout(state) {
            state.phone = '新用户';
            state.token ='';
			state.userid='';
            state.hasLogin = false;
			uni.removeStorage({
				key:'userLogin'
			})
        }
    }
})

export default store
