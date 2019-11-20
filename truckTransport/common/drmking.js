import permision from "@/common/permission.js"
let drmking = {
	isJsonString: function(str) {
		if (typeof str == 'string') {
			try {
				let obj = JSON.parse(str);
				if (typeof obj == 'object' && obj) {
					return true;
				} else {
					return false;
				}
			} catch (e) {
				console.log('error：' + str + '!!!' + e);
				return false;
			}
		}
		return false;
	},
	// 判断是否为空
	isEmpty: function(str) {
		if (typeof str == "undefined" || str == null || str == "") {
			return true;
		} else {
			return false;
		}
	},
	// 是否手机号
	isPhone: function(phone) {
		if ((/^1[3456789]\d{9}$/.test(phone))) {
			return true;
		} else {
			return false;
		}
	},
	//是否邮箱
	isEmail: function(email) {
		if ((/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email))) {
			return true;
		} else {
			return false;
		}
	},
	//用于生成uuid
	S4: function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	guid: function() {
		var that = this;
		return (that.S4() + that.S4() + that.S4() + that.S4() + that.S4() + that.S4() + that.S4() + that.S4());
	},
	// 补全图片链接
	fullimg: function(str, host) {
		str = str.replace(/src="(\/upload\/.*?)"/g, 'src="' + host + '$1"');
		return str.replace(/src='(\/upload\/.*?)'/g, "src='" + host + "$1'");
	},
	// 缓存
	cacheData: function(key = '', data = undefined, time = 200) {
		if (key == '' || key == null) {
			return null;
		}
		if (data === undefined) {
			var _data = uni.getStorageSync(key);
			if (_data.exptime == 0) {
				return _data.data;
			} else if (new Date().getTime() < _data.exptime) {
				return _data.data;
			} else {
				return null;
			}
		} else {
			var _data = {
				data: data,
				exptime: time == 0 ? 0 : (new Date().getTime() + time * 1000)
			};
			uni.setStorageSync(key, _data);
			return true;
		}
	},
	distancePrice: function(price_json = [], distance = 0) {
		distance = parseInt(distance);
		if (price_json.length == 0 || distance == 0) {
			return 0;
		}
		let run = 0;
		let price = 0;
		let count = price_json.length - 1;
		for (let i = 0; i < price_json.length; i++) {
			let row = price_json[i];
			row.num = parseInt(row.num);
			row.price = parseFloat(row.price);
			if (distance <= row.num) {
				switch (row.type) {
					case 's':
						{
							price = row.price;
							run = distance;
							break;
						}
					case 'e':
						{
							let _distance = distance - run;
							run = distance;
							price += parseFloat(_distance * row.price);
							break;
						}
					default:
						{
							let _distance = distance - run;
							run = distance;
							price += parseFloat(_distance * row.price);
							break;
						}
				}
				if (i <= count) {
					break;
				}
			} else {
				switch (row.type) {
					case 's':
						{
							price = row.price;
							run = row.num;
							break;
						}
					case 'e':
						{
							let _distance = distance - run;
							price += parseFloat(_distance * row.price);
							break;
						}
					default:
						{
							let _distance = row.num - run;
							run = row.num;
							price += parseFloat(_distance * row.price);
							break;
						}
				}
				if (i == count) {
					break;
				}
			}
		}
		return price;
	},
	// 初始化
	init: async function(vue) {
		// 获取运行配置
		let config = await this.getSystemConfig(vue);
		// 更新store状态
		vue.$store.commit('set_sysconfig', config);
		// 获取车辆信息
		await this.getCarInfos(vue);
		// 获取城市列表
		await this.getCityList(vue);
		// 获取附加服务列表
		let attach_list = await this.getAttachList(vue);
		let attach = [];
		for (let i in attach_list) {
			attach_list[i]['status'] = false;
			attach_list[i]['order_price'] = 0;
			attach.push(attach_list[i]);
		}
		// 将附加服务加入order
		vue.$store.commit('set_order_attach', attach);
		// 获取默认城市
		let city = this.getDefaultCity();
		// 设置默认城市显示
		await this.setLocationCity(vue, city);
		// 更新订单城市信息
		let locattion_city = await this.getLocationCity();
		vue.$store.commit('set_order_city', locattion_city);
	},
	// 获取系统运行配置
	getSystemConfig: async function(vue) {
		let that = this;
		let cache_key = 'SystemConfig';
		let system_config = this.cacheData(cache_key);
		if (that.isEmpty(system_config)) {
			let data = await vue.$uniFly.get({
				url: '/api/common/config',
			}).then(function(res) {
				if (res.code == 0) {
					that.cacheData(cache_key, res.data, 3600);
					return res.data;
				} else {
					return null;
				}
			}).catch(function(error) {
				return null;
			});
			return data;
		} else {
			return system_config;
		}
	},
	// 获取车型数据
	getCarInfos: async function(vue) {
		let that = this;
		let cache_key = 'carInfos';
		let carInfos = this.cacheData(cache_key);
		if (that.isEmpty(carInfos)) {
			let data = await vue.$uniFly.get({
				url: '/api/car/getcarlist',
			}).then(function(res) {
				if (res.code == 0) {
					for (let key in res.data) {
						res.data[key]['car_images'] = res.data[key]['car_images'].split(',');
					}
					that.cacheData(cache_key, res.data, 300);
					return res.data;
				} else {
					return null;
				}
			}).catch(function(error) {
				return null;
			});
			return data;
		} else {
			return carInfos;
		}
	},
	// 设置定位城市
	setLocationCity: async function(vue, city) {
		let location_city_key = 'location_city';
		let car_infos = await this.getCarInfos(vue);
		let city_price = await this.getCityPriceList(vue, city.city_id);
		let city_data;
		if (this.isEmpty(city_price)) {
			city_data = {
				city: city,
				cars: {}
			}
		} else {
			let cars = {};
			let cars_list = [];
			for (let car_id in city_price) {
				let car = car_infos[car_id];
				car['base_price_json'] = city_price[car_id]['base_price_json'];
				cars[car_id] = car;
				cars_list.push(car);
			}
			city_data = {
				city: city,
				cars: cars,
				cars_list: cars_list,
			}
		}
		this.cacheData(location_city_key, city_data, 0);
	},
	// 获取定位城市
	getLocationCity: function() {
		let location_city_key = 'location_city';
		return this.cacheData(location_city_key);
	},
	// 设置默认城市
	setDefaultCity: function(city) {
		let default_city_key = 'default_city';
		this.cacheData(default_city_key, city, 0);
	},
	// 获取默认城市
	getDefaultCity: function() {
		let default_city_key = 'default_city';
		return this.cacheData(default_city_key);
	},

	// 经纬度转城市
	getCityBylonlat: async function(vue, lon, lat) {
		let data = {
			lon: lon,
			lat: lat,
		};
		let city = await vue.$uniFly.post({
			url: '/api/city/getaddress',
			params: data
		}).then(function(res) {
			if (res.code == 0) {
				return res.data;
			} else {
				return null;
			}
		}).catch(function(error) {
			return null;
		});
		return city;
	},
	// 获取附加服务类目
	getAttachList: async function(vue) {
		let that = this;
		let cache_key = 'attachlist';
		let attachlist = that.cacheData(cache_key);
		if (that.isEmpty(attachlist)) {
			attachlist = await vue.$uniFly.get({
				url: '/api/attach/getattachlist'
			}).then(function(res) {
				if (res.code == 0) {
					that.cacheData(cache_key, res.data, 300);
					return res.data;
				} else {
					return null;
				}
			}).catch(function(error) {
				return null;
			});
		}
		return attachlist;
	},
	// 获取城市列表
	getCityList: async function(vue) {
		let that = this;
		let cache_key = 'citylist';
		let citylist = that.cacheData(cache_key);
		if (that.isEmpty(citylist)) {
			citylist = await vue.$uniFly.get({
				url: '/api/city/getcitylist'
			}).then(function(res) {
				if (res.code == 0) {
					let default_city_key = 'default_city';
					for (let key in res.data) {
						if (parseInt(res.data[key]['is_default']) == 1) {
							that.setDefaultCity(res.data[key]);
							break;
						}
					}
					that.cacheData(cache_key, res.data, 300);
					return res.data;
				} else {
					return null;
				}
			}).catch(function(error) {
				return null;
			});
		}
		return citylist;
	},
	// 检查app定位权限
	checkPermission: async function() {
		let status = permision.isIOS ? await permision.requestIOS('location') :
			await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');
		if (status === null || status === 1) {
			status = 1;
		} else if (status === 2) {
			uni.showModal({
				content: "系统定位已关闭",
				confirmText: "设置",
				success: function(res) {
					if (res.confirm) {
						permision.gotoiOSSetting();
					}
				}
			})
		} else if (status.code) {
			uni.showModal({
				content: status.message
			})
		} else {
			uni.showModal({
				content: "需要定位权限",
				confirmText: "设置",
				success: function(res) {
					if (res.confirm) {
						permision.gotoAppSetting();
					}
				}
			})
		}
		return status;
	},
	// 检查小程序定位权限
	getLocationSetting: function() {
		return new Promise((resolve, reject) => {
			uni.getSetting({
				success: (res) => {
					if (res.authSetting['scope.userLocation'] === undefined) {
						resolve(0);
						return;
					}
					if (res.authSetting['scope.userLocation']) {
						resolve(1);
					} else {
						resolve(2);
					}
				}
			});
		});
	},
	// 获取城市资费列表
	getCityPriceList: async function(vue, city_id) {
		let that = this;
		let cache_key = 'citypricelist_' + city_id;
		let citylist = that.cacheData(cache_key);
		if (that.isEmpty(citylist)) {
			citylist = await vue.$uniFly.get({
				url: '/api/city_price/getcitypricebycityid',
				params: {
					city_id: city_id
				}
			}).then(function(res) {
				if (res.code == 0) {
					that.cacheData(cache_key, res.data, 300);
					return res.data;
				} else {
					return null;
				}
			}).catch(function(error) {
				return null;
			});
		}
		return citylist;
	},
	// 获取用户定位城市
	changeLocationCity: async function(vue) {
		let that = this;
		let status;
		let flag = true;
		// #ifdef APP-PLUS
		status = await that.checkPermission();
		if (status !== 1) {
			uni.showConfirm();
			flag = false;
		}
		// #endif
		// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
		status = await that.getLocationSetting();
		if (status === 2) {
			uni.showConfirm();
			flag = false;
		}
		// #endif
		if (flag) {
			let city = await new Promise((resolve, reject) => {
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						let response = that.getCityBylonlat(vue, res.longitude, res.latitude);
						if (response == null) {
							if (that.isEmpty(that.getDefaultCity())) {
								that.getCityList(vue);
							}
							let default_city = that.getDefaultCity();
							resolve(default_city);
						} else {
							resolve(response);
						}
					},
					fail: (err) => {
						console.log(err);
						// #ifdef MP-BAIDU
						if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
							this.showConfirm();
						}
						// #endif
						// #ifndef MP-BAIDU
						if (err.errMsg.indexOf("auth deny") >= 0) {
							uni.showToast({
								title: "访问位置被拒绝"
							})
						} else {
							uni.showToast({
								title: err.errMsg
							})
						}
						// #endif
						if (that.isEmpty(that.getDefaultCity())) {
							that.getCityList(vue);
						}
						let default_city = that.getDefaultCity();
						resolve(default_city);
					}
				});
			});
			await that.setLocationCity(vue, city);
		} else {
			if (that.isEmpty(that.getDefaultCity())) {
				await that.getCityList(vue);
			}
			let default_city = that.getDefaultCity();
			await that.setLocationCity(vue, default_city);
		}
	},
	// login: function(vue) {
	// 	let user = this.cacheData('user');
	// 	if (user) {
	// 		if (vue.$store.state.is_user == false) {
	// 			vue.$store.commit('switch_login');
	// 		}
	// 		if (user.status == 1 && user.is_user_ok == true && vue.$store.state.is_user_ok == false) {
	// 			vue.$store.commit('switch_use');
	// 		}
	// 	} else {
	// 		if (vue.$store.state.is_user == true) {
	// 			vue.$store.commit('switch_login');
	// 		}
	// 		if (vue.$store.state.is_user_ok == true) {
	// 			vue.$store.commit('switch_use');
	// 		}
	// 	}
	// },
	// logout: function(vue) {
	// 	if (vue.$store.state.is_user == true) {
	// 		vue.$store.commit('switch_login');
	// 	}
	// 	if (vue.$store.state.is_user_ok == true) {
	// 		vue.$store.commit('switch_use');
	// 	}
	// 	this.cacheData('user', null, 0);
	// }
};
module.exports = drmking
