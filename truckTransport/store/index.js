import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: true,
        phone: "",
		userState:"",
		token:""
		
    },
    mutations: {
        login(state, user) {
            state.phone = user.phone || '新用户';
			state.status=user.status||'';
			state.token = user.token||'';
            state.hasLogin = true;
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
			uni.getStorage({
				key:'userLogin'
			})
        }
    }
})

export default store
