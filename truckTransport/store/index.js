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
		sysconfig: {

		},
		order: {
			city_id: 0,
			city_title: '',
			car_id: 0,
			car_title: '',
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
			attach: [],
			trip: {
				departure: {
					lat: '',
					lon: '',
					localtion: '',
					address: '',
					contact: '',
					phone: ''
				},
				transfer: [],
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
			Vue.set(state, 'sysconfig', sysconfig);
		},
		set_order_car: function(state, car) {
			Vue.set(state.order, 'car_id', car.car_id);
			Vue.set(state.order, 'car_title', car.car_title);
		},
		set_order_attach: function(state, attach) {
			Vue.set(state.order, 'attach', attach);
		},
		up_order_attach_status: function(state, index, status) {
			Vue.set(state.order.attach[index], 'status', status);
		},
		set_order_city: function(state, locattion_city) {
			Vue.set(state.order, 'city_id', locattion_city.city.city_id);
			Vue.set(state.order, 'city_title', locattion_city.city.city_title);
			if (locattion_city.cars.length > 1) {
				Vue.set(state.order, 'car_id', locattion_city.cars[0].car_id);
				Vue.set(state.order, 'car_title', locattion_city.cars[0].car_title);
			}
		},
		set_order: function(state, order) {
			Vue.set(state, 'order', order);
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
