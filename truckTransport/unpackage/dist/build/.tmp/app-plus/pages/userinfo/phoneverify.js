<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userinfo/phoneverify"],{"0551":function(n,t,e){"use strict";(function(n){e("1780"),e("921b");o(e("66fd"));var t=o(e("493c"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},2107:function(n,t,e){"use strict";e.r(t);var o=e("9538"),c=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=c.a},"493c":function(n,t,e){"use strict";e.r(t);var o=e("c45a"),c=e("2107");for(var u in c)"default"!==u&&function(n){e.d(t,n,function(){return c[n]})}(u);e("e568");var a=e("2877"),r=Object(a["a"])(c["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},9538:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return e.e("components/m-input").then(e.bind(null,"8171"))},c={components:{mInput:o},data:function(){return{phone:"",vercode:"",countdown:60}},onLoad:function(n){this.num=n.num},methods:{numberst:function(t){var e={phone:this.phone};this.$uniFly.post({url:"/api/common/sendcode",params:e}).then(function(t){0===t.code&&n.showToast({title:"成功获取验证码",icon:"success",mask:!0,duration:3e3})}).catch(function(t){n.showToast({content:t,showCancel:!1})}),this.countDown()},countDown:function(){var n=this;n.countdown=60,n.countdown-=1,n.clear&&clearInterval(n.clear),n.clear=null,n.clear=setInterval(function(t){n.countdown>0?n.countdown-=1:clearInterval(n.clear)},1e3)},vertifynum:function(){var t={cphone:this.phone,vercode:this.vercode};this.$uniFly.post({url:"/api/common/checkcode",params:t}).then(function(t){0===t.code&&(n.showToast({title:"验证成功",icon:"success",mask:!0,duration:3e3}),n.navigateTo({url:"'/pages/userinfo/changephone?phone='+that.phone"}))}).catch(function(t){n.showToast({content:t,showCancel:!1})})}}};t.default=c}).call(this,e("6e42")["default"])},c45a:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},c=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return c})},d61a:function(n,t,e){},e568:function(n,t,e){"use strict";var o=e("d61a"),c=e.n(o);c.a}},[["0551","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userinfo/phoneverify"],{"54e0":function(n,t,e){"use strict";e.r(t);var o=e("86c1"),c=e("95d4");for(var u in c)"default"!==u&&function(n){e.d(t,n,function(){return c[n]})}(u);e("efde");var a=e("2877"),r=Object(a["a"])(c["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},"86c1":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},c=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return c})},"95d4":function(n,t,e){"use strict";e.r(t);var o=e("bd84"),c=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=c.a},b2e2:function(n,t,e){"use strict";(function(n){e("1f00"),e("921b");o(e("66fd"));var t=o(e("54e0"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},bd84:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return e.e("components/m-input").then(e.bind(null,"610d"))},c={components:{mInput:o},data:function(){return{phone:"",vercode:"",countdown:60}},onLoad:function(n){this.num=n.num},methods:{numberst:function(t){var e={phone:this.phone};this.$uniFly.post({url:"/api/common/sendcode",params:e}).then(function(t){0===t.code&&n.showToast({title:"成功获取验证码",icon:"success",mask:!0,duration:3e3})}).catch(function(t){n.showToast({content:t,showCancel:!1})}),this.countDown()},countDown:function(){var n=this;n.countdown=60,n.countdown-=1,n.clear&&clearInterval(n.clear),n.clear=null,n.clear=setInterval(function(t){n.countdown>0?n.countdown-=1:clearInterval(n.clear)},1e3)},vertifynum:function(){var t={cphone:this.phone,vercode:this.vercode};this.$uniFly.post({url:"/api/common/checkcode",params:t}).then(function(t){0===t.code&&(n.showToast({title:"验证成功",icon:"success",mask:!0,duration:3e3}),n.navigateTo({url:"'/pages/userinfo/changephone?phone='+that.phone"}))}).catch(function(t){n.showToast({content:t,showCancel:!1})})}}};t.default=c}).call(this,e("6e42")["default"])},edd8:function(n,t,e){},efde:function(n,t,e){"use strict";var o=e("edd8"),c=e.n(o);c.a}},[["b2e2","common/runtime","common/vendor"]]]);
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39