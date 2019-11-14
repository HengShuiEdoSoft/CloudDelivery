import Vue from 'vue'
import App from './App'

import store from './store';
import drmking from './common/drmking.js';
import uniFly from 'unifly';
import OnFire from 'onfire.js';


// 设置基础url
uniFly.baseUrl = 'https://hll.hda365.com';
// 设置请求超时
uniFly.timeOut = 20000
// 错误自动尝试次数
uniFly['retry_number'] = 3;
//uniFly.headers={'Access-Control-Allow-Origin':'*'};
//自定义请求拦截
uniFly.requestInterceptors.success = function(request) {
	let userinfo=drmking.cacheData("USER");
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
	if (request.params.retry_number == 1) {
		uni.showLoading();
	}
	return request
}
// 自定义响应成功拦截
uniFly.responseInterceptors.success = function(response) {
	uni.hideLoading()
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
		uni.hideLoading();
		return response;
	} else {
		return uniFly[method]({
			url: url,
			params: params
		});
	}
}
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$drmking = drmking
Vue.prototype.$uniFly = uniFly
Vue.prototype.$fire = new OnFire();


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
