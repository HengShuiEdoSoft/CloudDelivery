<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"0945":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{loadingText:"",empty:!1,page:1,reload:!0,has_next:!0,lists:[]}},onShow:function(){this.getList()},onPullDownRefresh:function(){this.has_next=!0,this.reload=!0,this.page=1,this.getList()},onReachBottom:function(){var t=this,e=null;null!=e&&clearTimeout(e),e=setTimeout(function(){t.getList()},1e3)},methods:{getList:function(){var e=this;if(e.has_next){t.showNavigationBarLoading(),e.loadingText="加载中...";var a={page:this.page};this.$uniFly.post({url:"/api/address/getaddresslist",params:a}).then(function(a){if(t.hideNavigationBarLoading(),0===a.code)if(a.data.list.length>0){var i=a.data.list;e.empty=!1,e.lists=e.reload?i:e.lists.concat(i),e.page++,e.reload=!1,e.has_next=a.has_next,console.log(n(a.has_next," at pages\\address\\address.vue:99")),a.has_next?e.loadingText="加载更多":e.loadingText="已加载全部"}else e.empty=!0,e.loadingText="";else t.showToast({content:a.msg,showCancel:!1})}).catch(function(e){t.hideNavigationBarLoading(),t.showToast({content:e,showCancel:!1})})}}}};e.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},"13c5":function(t,e,n){"use strict";n.r(e);var a=n("6d8e"),i=n("8892");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("b0d2");var s=n("2877"),u=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},"581e":function(t,e,n){"use strict";(function(t){n("1780"),n("921b");a(n("66fd"));var e=a(n("13c5"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"6d8e":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},8892:function(t,e,n){"use strict";n.r(e);var a=n("0945"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},b0d2:function(t,e,n){"use strict";var a=n("ed8a"),i=n.n(a);i.a},ed8a:function(t,e,n){}},[["581e","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"0a79":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.lists,function(e,n){var a=JSON.stringify(e);return{$orig:t.__get_orig(e),g0:a}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"2ab6":function(t,e,n){"use strict";var a=n("3cfe"),i=n.n(a);i.a},"3cfe":function(t,e,n){},"425a":function(t,e,n){"use strict";n.r(e);var a=n("0a79"),i=n("d9d5");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("2ab6");var s=n("2877"),r=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},d9d5:function(t,e,n){"use strict";n.r(e);var a=n("e9c6"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},e9c6:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{loadingText:"",empty:!1,page:1,reload:!0,has_next:!0,lists:[]}},onShow:function(){this.getList()},onPullDownRefresh:function(){this.has_next=!0,this.reload=!0,this.page=1,this.getList()},onReachBottom:function(){var t=this,e=null;null!=e&&clearTimeout(e),e=setTimeout(function(){t.getList()},1e3)},methods:{getList:function(){var e=this;if(e.has_next){t.showNavigationBarLoading(),e.loadingText="加载中...";var a={page:this.page};this.$uniFly.post({url:"/api/address/getaddresslist",params:a}).then(function(a){if(t.hideNavigationBarLoading(),0===a.code)if(a.data.list.length>0){var i=a.data.list;e.empty=!1,e.lists=e.reload?i:e.lists.concat(i),e.page++,e.reload=!1,e.has_next=a.has_next,console.log(n(a.has_next," at pages/address/address.vue:99")),a.has_next?e.loadingText="加载更多":e.loadingText="已加载全部"}else e.empty=!0,e.loadingText="";else t.showToast({content:a.msg,showCancel:!1})}).catch(function(e){t.hideNavigationBarLoading(),t.showToast({content:e,showCancel:!1})})}}}};e.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},ee08:function(t,e,n){"use strict";(function(t){n("1f00"),n("921b");a(n("66fd"));var e=a(n("425a"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["ee08","common/runtime","common/vendor"]]]);
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39
