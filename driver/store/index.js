import Vue from 'vue'
import Vuex from 'vuex'
import drmking from '@/common/drmking.js';
import uniFly from 'unifly';
// 设置基础url
uniFly.baseUrl = 'https://www.lh5256.com';
// 设置请求超时
uniFly.timeOut = 20000
// 错误自动尝试次数
uniFly['retry_number'] = 3;
//uniFly.headers={'Access-Control-Allow-Origin':'*'};
//自定义请求拦截
uniFly.requestInterceptors.success = function(request) {
	let userinfo = drmking.cacheData('USER');
	if (userinfo) {
		request.body['phone'] = userinfo.phone;
		request.body['token'] = userinfo.token;
	}
	request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	if (request.params.retry_number) {
		request.body['retry_number'] = request.params.retry_number;
	} else {
		if (request.body.retry_number) {
			request.params['retry_number'] = request.body.retry_number;
		} else {
			request.body['retry_number'] = request.params['retry_number'] = 1;
		}
	}
	return request
}
// 自定义响应成功拦截
uniFly.responseInterceptors.success = function(response) {
	if (drmking.isJsonString(response.data)) {
		response.data = JSON.parse(response.data);
	}
	return Promise.resolve(response.data)
}
// 自定义响应失败拦截
uniFly.responseInterceptors.error = function(response) {
	let method = response.request.method.toLowerCase();
	let url = response.request.url;
	let body = response.request.body;
	let params = response.request.params;
	params = body = Object.assign(params, body);
	if (params.retry_number) {

	} else {
		params['retry_number'] = 1;
	}
	params.retry_number++;
	if (params.retry_number > uniFly.retry_number) {
		return response;
	} else {
		return uniFly[method]({
			url: url,
			params: params
		});
	}
}
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		isComfirm: false,
		// phone: "",
		// token: "",
		// userid: "",
		user: {

		},
		sysconfig: {

		},
		is_sound: true,
		is_work: true,
		scramble_orders: [],
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
			coupon_title: '',
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
		// 切换语音播报状态
		soundStatus: function(state, status) {
			state.is_sound = status;
		},
		// 切换工作状态
		workStatus: function(state, status) {
			state.is_work = status;
		},
		// 添加新订单
		addPushToDriverOrderNotice: function(state, item) {
			state.scramble_orders.unshift(item)
			Vue.set(state, 'scramble_orders', state.scramble_orders);
		},
		delPushToDriverOrderNotice: function(state, order_id) {
			for (let i = 0; i < state.scramble_orders.length; i++) {
				if (state.scramble_orders[i].order_id == order_id) {
					state.scramble_orders.splice(i, 1);
				}
			}
			Vue.set(state, 'scramble_orders', state.scramble_orders);
		},
		set_sysconfig: function(state, sysconfig) {
			Vue.set(state, 'sysconfig', sysconfig);
		},
		// 切换车型,更新价格
		set_order_car: function(state, car) {
			Vue.set(state.order, 'car_id', car.car_id);
			Vue.set(state.order, 'car_title', car.car_title);
			Vue.set(state.order, 'car_base_price_json', car.base_price_json);
			this.commit('set_order_trip');
		},
		// 选择附加服务更新价格
		set_order_attach: function(state, attach) {
			let distance_price = parseFloat(state.order.distance_price);
			let attach_price = 0;
			// 计价方式 0=>'价格',1=>'单价%比'
			for (let i = 0; i < attach.length; i++) {
				let order_price = 0;
				let attach_row = attach[i];
				if (attach_row.status == true) {
					attach_row.attach_type = parseInt(attach_row.attach_type);
					if (attach_row.attach_type == 0) {
						order_price = parseFloat(attach_row.attach_price);
					} else {
						order_price += distance_price * parseFloat(attach_row.attach_price_rate);
					}
					attach_row.order_price = order_price;
					attach_price = order_price + attach_price;
				}
			}
			Vue.set(state.order, 'attach', attach);
			Vue.set(state.order, 'attach_price', attach_price);
			this.commit('set_order_coupon');
		},
		set_order_remark: function(state, remark) {
			Vue.set(state.order, 'remark', remark);
		},
		// 切换城市,更新价格
		set_order_city: function(state, locattion_city) {
			Vue.set(state.order, 'city_id', locattion_city.city.city_id);
			Vue.set(state.order, 'city_title', locattion_city.city.city_title);
			if (locattion_city.cars_list.length > 0) {
				Vue.set(state.order, 'car_id', locattion_city.cars_list[0].car_id);
				Vue.set(state.order, 'car_title', locattion_city.cars_list[0].car_title);
				Vue.set(state.order, 'car_base_price_json', locattion_city.cars_list[0].base_price_json);
			}
			this.commit('set_order_trip');
		},
		// 切换线路,更新价格
		set_order_trip: function(state, trip_distance) {
			if (trip_distance) {
				Vue.set(state.order, 'trip', trip_distance.trip);
				trip_distance.distance = Math.ceil(parseInt(trip_distance.distance) / 1000);
			} else {
				trip_distance = {
					trip: state.order.trip,
					distance: state.order.distance
				};
			}
			Vue.set(state.order, 'distance', trip_distance.distance);
			let distance_price = drmking.distancePrice(state.order.car_base_price_json, trip_distance.distance);
			Vue.set(state.order, 'distance_price', distance_price);
			this.commit('set_order_attach', state.order.attach);
		},
		sure_order_trip: function(state, trip) {
			Vue.set(state.order, 'trip', trip);
		},
		// 订单变更,更新价格
		set_order: function(state, order) {
			Vue.set(state, 'order', order);
			this.commit('set_order_coupon');
		},
		// 计算价格
		sure_order: function(state, coupon) {
			if (coupon !== undefined && state.order.order_price > 0) {
				let pay_order_price = (state.order.order_price - parseFloat(coupon.coupon_price)).toFixed(2);
				Vue.set(state.order, 'coupon_price', coupon.coupon_price);
				Vue.set(state.order, 'user_coupon_id', coupon.user_coupon_id);
				Vue.set(state.order, 'coupon_title', coupon.coupon_title);
				Vue.set(state.order, 'pay_order_price', pay_order_price);
			}
		},
		// 获取优惠券
		set_order_coupon: function(state) {
			if (state.order.distance == 0) {
				Vue.set(state.order, 'order_price', 0);
				Vue.set(state.order, 'pay_order_price', 0);
				Vue.set(state.order, 'user_coupon_id', 0);
				Vue.set(state.order, 'coupon_title', '');
				Vue.set(state.order, 'coupon_price', 0);
				Vue.set(state.order, 'distance', 0);
				Vue.set(state.order, 'distance_price', 0);
				Vue.set(state.order, 'attach_price', 0);
			} else {
				let order_price = (parseFloat(state.order.distance_price) + parseFloat(state.order.attach_price)).toFixed(2);
				Vue.set(state.order, 'order_price', order_price);
				let pay_order_price = order_price;
				if (state.order.user_coupon_id > 0) {
					pay_order_price = (order_price - parseFloat(state.order.coupon_price)).toFixed(2);
				}
				Vue.set(state.order, 'pay_order_price', pay_order_price);
				this.dispatch('set_order_coupon');
			}
		},
		beconfirm(state, isConfirm) {
			state.isConfirm = isConfirm
		},
		login(state, user) {
			if (drmking.isEmpty(user)) {
				state.forcedLogin = false;
				state.hasLogin = false;
				state.isCompany = false;
			} else {
				state.hasLogin = true;
				state.user = user;
				drmking.cacheData('USER', user, 2592000);
				drmking.bindphone(user);
			}
		},
		logout(state) {
			state.hasLogin = false;
			drmking.cacheData('USER', {}, 0);
		},
	},
	actions: {
		set_order_coupon(context) {
			if (context.state.order.order_price > 0 && context.state.order.user_coupon_id == 0) {
				uniFly.post({
					url: '/api/user_coupon/getusercouponlist',
					params: {
						car_id: context.state.order.car_id,
						sill: context.state.order.order_price,
						status: 1,
						pagesize: 1,
						exp_time: 1,
					}
				}).then((res) => {
					if (res.code == 0) {
						if (res.data.list.length > 0) {
							context.commit('sure_order', {
								coupon_price: parseFloat(res.data.list[0].coupon_price),
								user_coupon_id: parseInt(res.data.list[0].user_coupon_id),
								coupon_title: res.data.list[0].coupon_title
							});
						}
					}
				}).catch(err => {

				});
			}
		}
	}
})

export default store
