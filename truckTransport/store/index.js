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
		token: "",
		userid: "",
		sysconfig:{
			
		},
		order: {
			city_id: 19,
			city_title: '衡水市',
			car_id: 1,
			car_title: '小面包车',
			is_now: true,
			user_driver_favorites: false,
			car_time: '',
			contact: '',
			phone: '',
			user_coupon_id: 0,
			coupon_price: 0,
			order_price: 0,
			pay_order_price: 0,
			distance: 0,
			remark: '订单备注',
			attach: [{
					attach_id: 1,
					attach_title: '返程费用',
					attach_type: 1,
					attach_price: 50,
					attach_price_rate: 0.01,
					attach_remark: '免费'
				},
				{
					attach_id: 2,
					attach_title: '装卸费用',
					attach_type: 0,
					attach_price: 100,
					attach_price_rate: 0,
					attach_remark: '免费'
				}
			],
			trip: {
				departure: {
					lat: '',
					lon: '',
					localtion: '',
					address: '',
					contact: '',
					phone: ''
				},
				transfer: [{
						lat: '',
						lon: '',
						localtion: '',
						address: '',
						contact: '',
						phone: ''
					}
				],
				destination: {
					lat: '',
					lon: '',
					localtion: '',
					address: '',
					contact: '',
					phone: ''
				}
			}
		}
	},
	mutations: {
		set_sysconfig: function(state, sysconfig) {
			// state.sysconfig = sysconfig;
			Vue.set(state,'sysconfig',sysconfig);
		},
		set_order: function(state, order) {
			// state.order = order;
			Vue.set(state,'order',order);
		},
		login(state, user) {
			state.phone = user.phone || '新用户';
			state.token = user.token || '';
			state.userid = user.user_id || '';
			state.hasLogin = true;
			uni.setStorage({
				key: 'userLogin',
				data: user
			})
		},
		logout(state) {
			state.phone = '新用户';
			state.token = '';
			state.userid = '';
			state.hasLogin = false;
			uni.removeStorage({
				key: 'userLogin'
			})
		}
	}
})

export default store
