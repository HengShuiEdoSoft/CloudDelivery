import Vue from 'vue'
import Vuex from 'vuex'
import drmking from '@/common/drmking.js';
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		isCompany:false,
		// phone: "",
		// token: "",
		// userid: "",
		sysconfig: {

		},
		order: {
			city_id: 0,
			city_title: '',
			car_id: 0,
			car_title: '',
			car_base_price_json: [],
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
			distance_price: 0,
			attach_price: 0,
			remark: '',
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
			let distance_price = parseInt(state.order.distance_price);
			let attach_price = 0;
			// 计价方式 0=>'价格',1=>'单价%比'			    
			for (let i = 0; i < attach.length; i++) {
				let order_price = 0;
				let attach_row = attach[i];
				if (attach_row.status == 1) {
					if (attach_row.attach_type === 0) {
						order_price += parseFloat(attach_row.attach_price);
					} else {
						order_price += distance_price * parseFloat(attach_row.attach_price_rate);
					}
					attach_row.order_price = order_price;
					attach_price = attach_price + attach_price;
				}
			}
			Vue.set(state.order, 'attach', attach);
			Vue.set(state.order, 'attach_price', attach_price);
		},
		set_order_remark: function(state, remark) {
			Vue.set(state.order, 'remark', remark);
		},
		set_order_city: function(state, locattion_city) {
			Vue.set(state.order, 'city_id', locattion_city.city.city_id);
			Vue.set(state.order, 'city_title', locattion_city.city.city_title);
			if (locattion_city.cars_list.length > 0) {
				Vue.set(state.order, 'car_id', locattion_city.cars_list[0].car_id);
				Vue.set(state.order, 'car_title', locattion_city.cars_list[0].car_title);
				Vue.set(state.order, 'car_base_price_json', locattion_city.cars_list[0].base_price_json);
			}
		},
		set_order: function(state, order) {
			Vue.set(state, 'order', order);
		},
		sun_order: function(state, order) {

		},
		becompany(isCompany){
			state.isCompany=isCompany
		},
		login(state, user) {			
			state.hasLogin = true;
			state.user=user;
			drmking.cacheData('USER',user,2592000);
		},
		logout(state) {
			state.hasLogin = false;
			drmking.cacheData('USER',{},0);
		},
	}
})

export default store
