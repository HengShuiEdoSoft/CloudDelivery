<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderlist/orderlist"],{"4c6e":function(t,e,n){"use strict";n.r(e);var s=n("b055"),a=n("b2d0");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("ab6d");var r=n("2877"),o=Object(r["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},"6da1":function(t,e,n){},"8edb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{current:0,empty:[!1,!1,!1],loadingText:["","",""],page:[1,1,1],has_next:[!0,!0,!0],reload:[!0,!0,!0],newsList:[[],[],[]],tab:[{name:"进行中"},{name:"已完成"},{name:"已取消"}],status:["0,1,2,3","4,5","11,12,13"]}},onShow:function(){this.getnewsList()},onPullDownRefresh:function(){this.$set(this.has_next,this.current,!0),this.$set(this.reload,this.current,!0),this.$set(this.page,this.current,1),this.getnewsList()},onReachBottom:function(){this.getnewsList()},methods:{tabChange:function(t){var e=t.target.dataset.current||t.currentTarget.dataset.current;this.current=e,this.$set(this.has_next,this.current,!0),this.$set(this.reload,this.current,!0),this.$set(this.page,this.current,1),this.getnewsList()},swiperChange:function(t){var e=t.target.current||t.detail.current;this.current=e},getnewsList:function(){var e=this,n=e.current;if(e.has_next[n]){t.showNavigationBarLoading(),e.$set(e.loadingText,n,"加载中...");var s={page:this.page[n],status:this.status[n]};this.$uniFly.post({url:"/api/order/getorderlist",params:s}).then(function(s){if(t.hideNavigationBarLoading(),0===s.code)if(s.data.list.length>0){var a=s.data.list;e.$set(e.empty,n,!1),e.newsList[n]=e.reload[n]?a:e.newsList[n].concat(a),e.$set(e.newsList,n,e.newsList[n]),e.$set(e.page,n,e.page[n]++),e.$set(e.reload,n,!1),e.$set(e.has_next,n,s.has_next),s.has_next?e.$set(e.loadingText,n,"加载更多"):e.$set(e.loadingText,n,"已加载全部")}else e.$set(e.empty,n,!0),e.$set(e.loadingText,n,"");else t.showToast({content:s.msg,showCancel:!1})}).catch(function(e){t.hideNavigationBarLoading(),t.showToast({content:e,showCancel:!1})})}}}};e.default=n}).call(this,n("6e42")["default"])},ab6d:function(t,e,n){"use strict";var s=n("6da1"),a=n.n(s);a.a},b055:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return a})},b2d0:function(t,e,n){"use strict";n.r(e);var s=n("8edb"),a=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);e["default"]=a.a},ee41:function(t,e,n){"use strict";(function(t){n("1780"),n("921b");s(n("66fd"));var e=s(n("4c6e"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["ee41","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderlist/orderlist"],{"16a4":function(t,e,n){},1792:function(t,e,n){"use strict";(function(t){n("1f00"),n("921b");s(n("66fd"));var e=s(n("2e07"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},2836:function(t,e,n){"use strict";var s=n("16a4"),a=n.n(s);a.a},"2e07":function(t,e,n){"use strict";n.r(e);var s=n("e242"),a=n("61e9");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("2836");var r=n("2877"),o=Object(r["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},5119:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{current:0,empty:[!1,!1,!1],loadingText:["","",""],page:[1,1,1],has_next:[!0,!0,!0],reload:[!0,!0,!0],newsList:[[],[],[]],tab:[{name:"进行中"},{name:"已完成"},{name:"已取消"}],status:["0,1,2,3","4,5","11,12,13"]}},onShow:function(){this.getnewsList()},onPullDownRefresh:function(){this.$set(this.has_next,this.current,!0),this.$set(this.reload,this.current,!0),this.$set(this.page,this.current,1),this.getnewsList()},onReachBottom:function(){this.getnewsList()},methods:{tabChange:function(t){var e=t.target.dataset.current||t.currentTarget.dataset.current;this.current=e,this.$set(this.has_next,this.current,!0),this.$set(this.reload,this.current,!0),this.$set(this.page,this.current,1),this.getnewsList()},swiperChange:function(t){var e=t.target.current||t.detail.current;this.current=e},getnewsList:function(){var e=this,n=e.current;if(e.has_next[n]){t.showNavigationBarLoading(),e.$set(e.loadingText,n,"加载中...");var s={page:this.page[n],status:this.status[n]};this.$uniFly.post({url:"/api/order/getorderlist",params:s}).then(function(s){if(t.hideNavigationBarLoading(),0===s.code)if(s.data.list.length>0){var a=s.data.list;e.$set(e.empty,n,!1),e.newsList[n]=e.reload[n]?a:e.newsList[n].concat(a),e.$set(e.newsList,n,e.newsList[n]),e.$set(e.page,n,e.page[n]++),e.$set(e.reload,n,!1),e.$set(e.has_next,n,s.has_next),s.has_next?e.$set(e.loadingText,n,"加载更多"):e.$set(e.loadingText,n,"已加载全部")}else e.$set(e.empty,n,!0),e.$set(e.loadingText,n,"");else t.showToast({content:s.msg,showCancel:!1})}).catch(function(e){t.hideNavigationBarLoading(),t.showToast({content:e,showCancel:!1})})}}}};e.default=n}).call(this,n("6e42")["default"])},"61e9":function(t,e,n){"use strict";n.r(e);var s=n("5119"),a=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);e["default"]=a.a},e242:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return a})}},[["1792","common/runtime","common/vendor"]]]);
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39