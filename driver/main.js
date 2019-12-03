import Vue from 'vue'
import App from '@/App'
import store from '@/store';
import drmking from '@/common/drmking.js';
import uniFly from 'unifly';
import OnFire from 'onfire.js';
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
	if (!drmking.isEmpty(userinfo)) {
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
	// if (request.params.retry_number == 1) {
	// 	uni.showLoading();
	// }
	return request
}
// 自定义响应成功拦截
uniFly.responseInterceptors.success = function(response) {
	// uni.hideLoading()
	let result = drmking.isJsonString(response.data);
	if (result === true) {
		response.data = JSON.parse(response.data);
	} else if (typeof result === 'object') {
		response.data = result;
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
		// uni.hideLoading();
		return response;
	} else {
		return uniFly[method]({
			url: url,
			params: params
		});
	}
}
Date.prototype.Format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$drmking = drmking
Vue.prototype.$uniFly = uniFly
Vue.prototype.$fire = new OnFire();
App.mpType = 'app'
let app = new Vue({
	store,
	...App
}).$mount();

import socket from 'plus-websocket'
// #ifdef APP-PLUS
Object.assign(uni, socket);
// #endif

//避免ws重复连接
let ws_lock_reconnect = false;
let ws_url = 'wss://www.lh5256.com:9501/';
// 创建连接
function createWs() {
	let url = ws_url;
	let userinfo = drmking.cacheData('USER');
	if (!drmking.isEmpty(userinfo)) {
		url += '?user_id=' + userinfo.user_id + '&token=' + userinfo.token;
		uni.connectSocket({
			url: url,
			success: function() {
				console.log('webscoket 创建成功!');
				initEventHandle(url, userinfo.user_id);
			},
			fail: function(err) {
				console.log(err);
				reconnectWs(url);
			}
		});
	} else {
		setTimeout(function() {
			console.log('用户未登录!');
			createWs();
		}, 2000);
	}
}
// 断线重连
function reconnectWs(url) {
	if (ws_lock_reconnect) {
		return;
	}
	ws_lock_reconnect = true;
	setTimeout(function() {
		//没连接上会一直重连，设置延迟避免请求过多
		createWs(url);
		ws_lock_reconnect = false;
	}, 2000);
}
//心跳检测
let heartCheck = {
	timeout: 59000, //59秒钟发一次心跳
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function() {
		let self = this;
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			uni.sendSocketMessage({
				data: 'ping'
			});
			self.serverTimeoutObj = setTimeout(function() {
				//如果超过一定时间还没重置，说明后端主动断开了
				//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
				uni.closeSocket();
			}, self.timeout);
		}, this.timeout)
	}
}
let amap = require('@/common/amap.js');
//心跳检测
let sendDriveLocation = {
	timeout: 180000, //180秒钟发一次心跳
	timeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		return this;
	},
	start: function(user_id) {
		let self = this;
		this.timeoutObj = setTimeout(function() {
			// 发送司机位置
			amap.getRegeo().then(res => {
					let info = res[0];
					let msg = JSON.stringify({
						task_type: 'redis',
						task_data: {
							event_type: 'addDriverLoction',
							user_id: user_id,
							lon: info.longitude,
							lat: info.latitude,
						}
					});
					uni.sendSocketMessage({
						data: msg
					});
					setTimeout(function() {
						self.start(user_id);
					}, self.timeout);
				})
				.catch(err => {
					setTimeout(function() {
						self.start(user_id);
					}, self.timeout);
				});
		}, this.timeout)
	}
}
// 初始化操作
function initEventHandle(url, user_id) {
	// 监听WebSocket连接打开事件
	uni.onSocketOpen(function(res) {
		//心跳检测重置
		heartCheck.reset().start();
		// 发送司机位置
		sendDriveLocation.reset().start(user_id);
		console.log( 'ws连接成功!' + new Date().toUTCString());
	});
	// 监听WebSocket错误
	uni.onSocketError(function(res) {
		reconnectWs(url);
		console.log(res, 'ws连接错误!' + new Date().toUTCString());
	});
	// 监听WebSocket关闭
	uni.onSocketClose(function(res) {
		console.log(res, 'ws已关闭！');
		reconnectWs(url);
	});
	// 监听WebSocket接受到服务器的消息事件
	uni.onSocketMessage(function(res) {
		// console.log('ws收到消息啦：' + res.data);
		//如果获取到消息，心跳检测重置
		heartCheck.reset().start();
		//拿到任何消息都说明当前连接是正常的
		parseData(res.data);
	});
}
// 解析服务器返回数据
function parseData(data) {
	if (data == 'pong') {

	} else {
		if (drmking.isJsonString(data)) {
			data = JSON.parse(data);
			switch (data.type) {
				case 'event':
					{
						if (data.event_name == 'pushNotice') {
							drmking.creatPushMessage(parseInt(data.data.msg_type) == 0 ? '系统通知' : '订单通知', data.data.msg, 'msgcenter');
						} else {
							app.$fire.fire(data.event_name, data.data);
						}
						break;
					}
				case 'msg':
					{
						console.log(data.msg);
						break;
					}
			}
		}
	}
}
createWs();

// #ifdef APP-PLUS  
plus.push.addEventListener('click', function(msg) {
	if (msg.payload == 'msgcenter') {
		uni.navigateTo({
			url: '/pages/msgcenter/msgcenter'
		});
	}
});
plus.push.addEventListener('receive', function(e) {
	// console.log(e);
});
// #endif
