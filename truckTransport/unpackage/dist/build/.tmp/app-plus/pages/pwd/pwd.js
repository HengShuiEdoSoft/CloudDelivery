<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pwd/pwd"],{"24a6":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;o(e("c220"));function o(n){return n&&n.__esModule?n:{default:n}}var s=function(){return e.e("components/m-input").then(e.bind(null,"8171"))},c={components:{mInput:s},data:function(){return{phone:"",vercode:"",pwd:"",confirmpassword:"",requestUrl:"/api/common/sendcode",reseturl:"/api/user/resetpwd",countdown:60}},methods:{numberst:function(t){if(!this.$drmking.isPhone(this.phone))return n.showToast({icon:"none",title:"手机号码格式不正确！",showCancel:!1}),!1;this.countDown();var e={phone:this.phone};this.$uniFly.post({url:t,params:e}).then(function(t){0===t.code?n.showToast({title:"成功获取验证码",icon:"success",mask:!0,duration:3e3}):n.showToast({content:t.msg,showCancel:!1})}).catch(function(t){n.showToast({content:t,showCancel:!1})})},countDown:function(){var n=this;n.countdown=60,n.countdown-=1,n.clear&&clearInterval(n.clear),n.clear=null,n.clear=setInterval(function(t){n.countdown>0?n.countdown-=1:clearInterval(n.clear)},1e3)},findPassword:function(t){if(!this.$drmking.isPhone(this.phone))return n.showToast({icon:"none",title:"手机号码格式不正确！",showCancel:!1}),!1;if(6==this.vercode.length)if(this.pwd.length<6)n.showToast({icon:"none",title:"密码最短为 6 个字符"});else if(this.confirmpassword==this.password){var e={phone:this.phone,pwd:this.pwd,vercode:this.vercode,usertype:0};this.$uniFly.post({url:t,params:e}).then(function(t){0===t.code?(n.showToast({title:"重置密码成功",icon:"success",mask:!0,duration:3e3}),n.navigateTo({url:"/pages/index/index"})):n.showToast({content:t.msg,showCancel:!1})}).catch(function(t){n.showToast({content:t,showCancel:!1})})}else n.showToast({icon:"none",title:"两次密码不一致"});else n.showToast({icon:"none",title:"验证码不正确"})}}};t.default=c}).call(this,e("6e42")["default"])},"4bd2":function(n,t,e){},"688b":function(n,t,e){"use strict";e.r(t);var o=e("24a6"),s=e.n(o);for(var c in o)"default"!==c&&function(n){e.d(t,n,function(){return o[n]})}(c);t["default"]=s.a},"6ef2":function(n,t,e){"use strict";(function(n){e("1780"),e("921b");o(e("66fd"));var t=o(e("9edf"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},"8aff":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},s=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return s})},"9edf":function(n,t,e){"use strict";e.r(t);var o=e("8aff"),s=e("688b");for(var c in s)"default"!==c&&function(n){e.d(t,n,function(){return s[n]})}(c);e("c5e9");var i=e("2877"),a=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,null,null);t["default"]=a.exports},c5e9:function(n,t,e){"use strict";var o=e("4bd2"),s=e.n(o);s.a}},[["6ef2","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pwd/pwd"],{"0f6b":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},s=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return s})},"2f37":function(n,t,e){"use strict";(function(n){e("1f00"),e("921b");o(e("66fd"));var t=o(e("5409"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},3073:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;o(e("8c77"));function o(n){return n&&n.__esModule?n:{default:n}}var s=function(){return e.e("components/m-input").then(e.bind(null,"610d"))},c={components:{mInput:s},data:function(){return{phone:"",vercode:"",pwd:"",confirmpassword:"",requestUrl:"/api/common/sendcode",reseturl:"/api/user/resetpwd",countdown:60}},methods:{numberst:function(t){if(!this.$drmking.isPhone(this.phone))return n.showToast({icon:"none",title:"手机号码格式不正确！",showCancel:!1}),!1;this.countDown();var e={phone:this.phone};this.$uniFly.post({url:t,params:e}).then(function(t){0===t.code?n.showToast({title:"成功获取验证码",icon:"success",mask:!0,duration:3e3}):n.showToast({content:t.msg,showCancel:!1})}).catch(function(t){n.showToast({content:t,showCancel:!1})})},countDown:function(){var n=this;n.countdown=60,n.countdown-=1,n.clear&&clearInterval(n.clear),n.clear=null,n.clear=setInterval(function(t){n.countdown>0?n.countdown-=1:clearInterval(n.clear)},1e3)},findPassword:function(t){if(!this.$drmking.isPhone(this.phone))return n.showToast({icon:"none",title:"手机号码格式不正确！",showCancel:!1}),!1;if(6==this.vercode.length)if(this.pwd.length<6)n.showToast({icon:"none",title:"密码最短为 6 个字符"});else if(this.confirmpassword==this.password){var e={phone:this.phone,pwd:this.pwd,vercode:this.vercode,usertype:0};this.$uniFly.post({url:t,params:e}).then(function(t){0===t.code?(n.showToast({title:"重置密码成功",icon:"success",mask:!0,duration:3e3}),n.navigateTo({url:"/pages/index/index"})):n.showToast({content:t.msg,showCancel:!1})}).catch(function(t){n.showToast({content:t,showCancel:!1})})}else n.showToast({icon:"none",title:"两次密码不一致"});else n.showToast({icon:"none",title:"验证码不正确"})}}};t.default=c}).call(this,e("6e42")["default"])},5409:function(n,t,e){"use strict";e.r(t);var o=e("0f6b"),s=e("fbd5");for(var c in s)"default"!==c&&function(n){e.d(t,n,function(){return s[n]})}(c);e("dd97");var i=e("2877"),u=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,null,null);t["default"]=u.exports},dd19:function(n,t,e){},dd97:function(n,t,e){"use strict";var o=e("dd19"),s=e.n(o);s.a},fbd5:function(n,t,e){"use strict";e.r(t);var o=e("3073"),s=e.n(o);for(var c in o)"default"!==c&&function(n){e.d(t,n,function(){return o[n]})}(c);t["default"]=s.a}},[["2f37","common/runtime","common/vendor"]]]);
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39