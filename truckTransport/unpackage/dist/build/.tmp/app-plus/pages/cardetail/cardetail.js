<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cardetail/cardetail"],{"19e9":function(t,a,n){"use strict";(function(t){n("1780"),n("921b");e(n("66fd"));var a=e(n("95a7"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("6e42")["createPage"])},"26c4":function(t,a,n){},3962:function(t,a,n){"use strict";var e=n("26c4"),i=n.n(e);i.a},"95a7":function(t,a,n){"use strict";n.r(a);var e=n("b778"),i=n("ee25");for(var r in i)"default"!==r&&function(t){n.d(a,t,function(){return i[t]})}(r);n("3962");var c=n("2877"),o=Object(c["a"])(i["default"],e["a"],e["b"],!1,null,null,null);a["default"]=o.exports},b778:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},i=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return i})},e6a4:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{id:0,carlistUrl:"/api/car/getcarlist",carsInfos:[]}},onLoad:function(a){this.id=parseInt(a.id)-1;var n=this.carlistUrl,e=this;if(this.$drmking.cacheData("carInfos")){e.carsInfos=this.$drmking.cacheData("carInfos");var i=e.carsInfos.id.title+"详情页";t.setNavigationBarTitle({title:i})}else this.$uniFly.get({url:n,params:{}}).then(function(a){if(0==a.code){e.carsInfos=a.data;var n=e.carsInfos.id.title+"详情页";t.setNavigationBarTitle({title:n})}}).catch(function(a){t.showToast({content:a,showCancel:!1})})},methods:{}};a.default=n}).call(this,n("6e42")["default"])},ee25:function(t,a,n){"use strict";n.r(a);var e=n("e6a4"),i=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(a,t,function(){return e[t]})}(r);a["default"]=i.a}},[["19e9","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cardetail/cardetail"],{"004a":function(t,a,n){"use strict";n.r(a);var e=n("3c92"),i=n.n(e);for(var c in e)"default"!==c&&function(t){n.d(a,t,function(){return e[t]})}(c);a["default"]=i.a},2072:function(t,a,n){"use strict";n.r(a);var e=n("af0a"),i=n("004a");for(var c in i)"default"!==c&&function(t){n.d(a,t,function(){return i[t]})}(c);n("e3ce");var r=n("2877"),o=Object(r["a"])(i["default"],e["a"],e["b"],!1,null,null,null);a["default"]=o.exports},"2e25":function(t,a,n){"use strict";(function(t){n("1f00"),n("921b");e(n("66fd"));var a=e(n("2072"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("6e42")["createPage"])},"3c92":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{id:0,carlistUrl:"/api/car/getcarlist",carsInfos:[]}},onLoad:function(a){this.id=parseInt(a.id)-1;var n=this.carlistUrl,e=this;if(this.$drmking.cacheData("carInfos")){e.carsInfos=this.$drmking.cacheData("carInfos");var i=e.carsInfos.id.title+"详情页";t.setNavigationBarTitle({title:i})}else this.$uniFly.get({url:n,params:{}}).then(function(a){if(0==a.code){e.carsInfos=a.data;var n=e.carsInfos.id.title+"详情页";t.setNavigationBarTitle({title:n})}}).catch(function(a){t.showToast({content:a,showCancel:!1})})},methods:{}};a.default=n}).call(this,n("6e42")["default"])},af0a:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},i=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return i})},c97e:function(t,a,n){},e3ce:function(t,a,n){"use strict";var e=n("c97e"),i=n.n(e);i.a}},[["2e25","common/runtime","common/vendor"]]]);
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39