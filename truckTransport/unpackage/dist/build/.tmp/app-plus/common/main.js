(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"8c47":function(e,t,r){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r("2f62");function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){a(e,t,r[t])})}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c={methods:u({},(0,o.mapMutations)(["login"])),onLaunch:function(){if(this.$drmking.cacheData("USER")){var t=this;e.getStorage({key:"userLogin",success:function(e){t.login(e.data)}})}},onShow:function(){console.log(n("App Show"," at App.vue:44"))},onHide:function(){console.log(n("App Hide"," at App.vue:47"))}};t.default=c}).call(this,r("6e42")["default"],r("0de9")["default"])},"99b5":function(e,t,r){"use strict";(function(e,t){var n=f(r("a34a"));r("1f00"),r("921b");var o=f(r("66fd")),u=f(r("ec80")),a=f(r("b03c")),c=f(r("315c")),i=f(r("39b2")),s=f(r("151f"));function f(e){return e&&e.__esModule?e:{default:e}}function l(e,t,r,n,o,u,a){try{var c=e[u](a),i=c.value}catch(s){return void r(s)}c.done?t(i):Promise.resolve(i).then(n,o)}function d(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var u=e.apply(t,r);function a(e){l(u,n,o,a,c,"next",e)}function c(e){l(u,n,o,a,c,"throw",e)}a(void 0)})}}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){b(e,t,r[t])})}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}i.default.baseUrl="https://hll.hda365.com",i.default.timeOut=2e4,i.default["retry_number"]=3,i.default.requestInterceptors.success=function(t){var r=c.default.cacheData("USER");return r&&(t.body["phone"]=r.phone,t.body["token"]=r.token),t.headers["Content-Type"]="application/x-www-form-urlencoded",t.params.retry_number?t.body["retry_number"]=t.params.retry_number:t.body.retry_number?t.params["retry_number"]=t.body.retry_number:t.body["retry_number"]=t.params["retry_number"]=1,1==t.params.retry_number&&e.showLoading(),t},i.default.responseInterceptors.success=function(t){return e.hideLoading(),c.default.isJsonString(t.data)&&(t.data=JSON.parse(t.data)),Promise.resolve(t.data)},i.default.responseInterceptors.error=function(t){var r=t.request.method.toLowerCase(),n=t.request.url,o=t.request.body,u=t.request.params;return u=o=Object.assign(u,o),u.retry_number||(u["retry_number"]=1),u.retry_number++,u.retry_number>i.default.retry_number?(e.hideLoading(),t):i.default[r]({url:n,params:u})},o.default.config.productionTip=!1,o.default.prototype.$store=a.default,o.default.prototype.$drmking=c.default,o.default.prototype.$uniFly=i.default,o.default.prototype.$fire=new s.default,u.default.mpType="app";var m=new o.default(p({store:a.default},u.default));new Promise(function(){var e=d(n.default.mark(function e(t,r){var o,u,a,i,s,f;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.default.getSystemConfig(m);case 2:return o=e.sent,m.$store.commit("set_sysconfig",o),e.next=6,c.default.getCarInfos(m);case 6:return e.next=8,c.default.getCityList(m);case 8:return e.next=10,c.default.getAttachList(m);case 10:for(i in u=e.sent,a=[],u)u[i]["status"]=!1,a.push(u[i]);return m.$store.commit("set_order_attach",a),s=m.$drmking.getDefaultCity(),e.next=17,c.default.setLocationCity(m,s);case 17:return e.next=19,c.default.getLocationCity();case 19:f=e.sent,m.$store.commit("set_order_city",f),t(!0);case 22:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}()).then(function(e){t(m).$mount()})}).call(this,r("6e42")["default"],r("6e42")["createApp"])},b65d:function(e,t,r){},d8e2:function(e,t,r){"use strict";var n=r("b65d"),o=r.n(n);o.a},db98:function(e,t,r){"use strict";r.r(t);var n=r("8c47"),o=r.n(n);for(var u in n)"default"!==u&&function(e){r.d(t,e,function(){return n[e]})}(u);t["default"]=o.a},ec80:function(e,t,r){"use strict";r.r(t);var n=r("db98");for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);r("d8e2");var u,a,c=r("2877"),i=Object(c["a"])(n["default"],u,a,!1,null,null,null);t["default"]=i.exports}},[["99b5","common/runtime","common/vendor"]]]);