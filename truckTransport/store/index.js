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
		order: {
			city_id: 19,
			city_title: '衡水市',
			car_id: 1,
			car_title: '小面包车',
			is_now: true,
			user_driver_favorites: false,
			car_time: '2019-10-26 13:09',
			contact: '王先生',
			phone: '13333333333',
			user_coupon_id: 1,
			coupon_price: 50,
			order_price: 786.8,
			pay_order_price: 736.8,
			distance: 134,
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
						lat: 37.712368,
						lon: 115.702935,
						localtion: '河北省衡水桃城区',
						address: '河北省衡水桃城区',
						contact: '王先生',
						phone: '13333333333'
					},
					{
						lat: 100,
						lon: 100,
						localtion: '河北省衡水桃城区',
						address: '河北省衡水桃城区',
						contact: '王先生',
						phone: '13333333333'
					}
				],
				destination: {
					lat: 100,
					lon: 100,
					localtion: '河北省衡水桃城区',
					address: '河北省衡水桃城区',
					contact: '王先生',
					phone: '13333333333'
				}
			}
		}
	},
	mutations: {
		set_order:function(state,order){
			state.order=order;
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
