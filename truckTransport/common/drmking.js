var drmking = {
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