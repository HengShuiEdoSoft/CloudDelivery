(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setup/setup"],{"1b39":function(t,e,i){"use strict";i.r(e);var n=i("9285"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},7924:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},9232:function(t,e,i){"use strict";var n=i("a840"),o=i.n(n);o.a},9285:function(t,e,i){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i("2f62");function s(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){a(t,e,i[e])})}return t}function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var r="https://www.baidu.com",c="云配送下载",u="好，很好，非常好，越来越好，耶!",l="../../static/img/logo.png",f=plus.screen.resolutionWidth,p=25,g=55,h=5,d=12,m=p/360*f,w=(f-2*m-4*g)/3;w<=5&&(p=15,g=40,m=p/360*f,w=(f-2*m-4*g)/3);var b=m+g+w,v=m+2*(g+w),x=m+3*(g+w),y=m,O=y+g+h+d+m,k=new plus.nativeObj.View("nvMask",{top:"0px",left:"0px",height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.2)"});k.addEventListener("click",function(){k.hide(),S.hide()});var S=new plus.nativeObj.View("nvImageMenu",{bottom:"0px",left:"0px",height:"180px",width:"100%",backgroundColor:"rgb(255,255,255)"});S.draw([{tag:"rect",color:"#e7e7e7",position:{top:"0px",height:"1px"}},{tag:"font",id:"sharecancel",text:"取消分享",textStyles:{size:"14px"},position:{bottom:"0px",height:"50px"}},{tag:"rect",color:"#e7e7e7",position:{bottom:"51px",height:"1px"}},{tag:"img",id:"imgwechatmoments",src:"/static/img/wx-share.png",position:{top:y,left:b,width:g,height:g}},{tag:"img",id:"imgwechatfriend",src:"/static/img/pyq-share.png",position:{top:y,left:m,width:g,height:g}},{tag:"font",id:"fontwechatfriend",text:"朋友圈",textStyles:{size:d},position:{top:y+g+h,left:m,width:g,height:d}},{tag:"font",id:"fontwechatmoments",text:"微信好友",textStyles:{size:d},position:{top:y+g+h,left:b-2.5,width:g+5,height:d}},{tag:"img",id:"imgqq",src:"/static/img/qq-share.png",position:{top:y,left:v,width:g,height:g}},{tag:"font",id:"fontqq",text:"QQ",textStyles:{size:d},position:{top:y+g+h,left:v,width:g,height:d}},{tag:"img",id:"imgmore",src:"/static/img/more.png",position:{top:y,left:x,width:g,height:g}},{tag:"font",id:"fontmore",text:"更多",textStyles:{size:d},position:{top:y+g+h,left:x,width:g,height:d}}]),S.addEventListener("click",function(e){if(e.screenY>plus.screen.resolutionHeight-50)k.hide(),S.hide();else if(e.clientX<4||e.clientX>f-4||e.clientY<4);else{var i=-1,o=e.clientY<O-m/2?0:1,s=-1;if(s=e.clientX<b-w/2?0:e.clientX<v-w/2?1:e.clientX<x-w/2?2:3,0==o&&(i=s),console.log(t("点击按钮的序号: "+i," at pages/setup/setup.vue:372")),i>=0&&i<=4){var a="",p="";switch(i){case 0:a="weixin",p="WXSenceTimeline";break;case 1:a="weixin",p="WXSceneSession";break;case 2:a="qq";break;case 3:plus.share.sendWithSystem({content:r});break}""!=a&&n.share({provider:a,scene:p,type:0,href:r,title:c,summary:u,imageUrl:l,success:function(e){console.log(t("success:"+JSON.stringify(e)," at pages/setup/setup.vue:404"))},fail:function(e){console.log(t("fail:"+JSON.stringify(e)," at pages/setup/setup.vue:407"))}})}}});var j={onBackPress:function(){if(S.isVisible())return S.hide(),k.hide(),!0},data:function(){return{show:!1,type:""}},methods:s({},(0,o.mapMutations)(["logout"]),{switchChange:function(e){console.log(t("switch 发生 change 事件，携带值为",e.target.value," at pages/setup/setup.vue:436"))},togglePopup:function(t){k.show(),S.show()},logOut:function(){var t=this;t.logout(),n.showToast({title:"退出登录",mask:!0,duration:3e3}),n.navigateTo({url:"/pages/index/index"})}})};e.default=j}).call(this,i("0de9")["default"],i("6e42")["default"])},"9ca0":function(t,e,i){"use strict";(function(t){i("1f00"),i("921b");n(i("66fd"));var e=n(i("c9ff"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},a840:function(t,e,i){},c9ff:function(t,e,i){"use strict";i.r(e);var n=i("7924"),o=i("1b39");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("9232");var a=i("2877"),r=Object(a["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports}},[["9ca0","common/runtime","common/vendor"]]]);