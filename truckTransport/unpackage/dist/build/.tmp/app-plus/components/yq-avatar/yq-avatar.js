<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/yq-avatar/yq-avatar"],{"4c0f":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=h(e("a34a"));function h(t){return t&&t.__esModule?t:{default:t}}function a(t,i,e,s,h,a,n){try{var r=t[a](n),o=r.value}catch(l){return void e(l)}r.done?i(o):Promise.resolve(o).then(s,h)}function n(t){return function(){var i=this,e=arguments;return new Promise(function(s,h){var n=t.apply(i,e);function r(t){a(n,s,h,r,o,"next",t)}function o(t){a(n,s,h,r,o,"throw",t)}r(void 0)})}}var r=50,o={name:"yq-avatar",data:function(){return{cvsStyleHeight:"0px",styleDisplay:"none",styleTop:"-10000px",prvTop:"-10000px",imgStyle:{},selStyle:{},showOper:!0,imgSrc:{imgSrc:""},btnWidth:"19%",btnDsp:"flex"}},watch:{avatarSrc:function(){this.imgSrc.imgSrc=this.avatarSrc}},props:{avatarSrc:"",avatarStyle:"",selWidth:"",selHeight:"",expWidth:"",expHeight:"",minScale:"",maxScale:"",canScale:"",canRotate:"",lockWidth:"",lockHeight:"",stretch:"",lock:"",noTab:"",inner:"",quality:"",index:""},created:function(){var i=this;this.ctxCanvas=t.createCanvasContext("avatar-canvas",this),this.ctxCanvasOper=t.createCanvasContext("oper-canvas",this),this.ctxCanvasPrv=t.createCanvasContext("prv-canvas",this),this.qlty=parseInt(this.quality)||.9,this.imgSrc.imgSrc=this.avatarSrc,this.letRotate="false"===this.canRotate||"true"===this.inner?0:1,this.letScale="false"===this.canScale?0:1,this.isin="true"===this.inner?1:0,this.indx=this.index||void 0,this.mnScale=this.minScale||.3,this.mxScale=this.maxScale||4,this.noBar="true"===this.noTab?1:0,this.stc=this.stretch,this.lck=this.lock,this.isin?(this.btnWidth="24%",this.btnDsp="none"):(this.btnWidth="19%",this.btnDsp="flex"),this.noBar?(this.moreHeight=0,this.fWindowResize()):t.showTabBar({complete:function(t){i.moreHeight="showTabBar:ok"===t.errMsg?50:0,i.fWindowResize()}})},methods:{fWindowResize:function(){var i=t.getSystemInfoSync();this.platform=i.platform,this.pixelRatio=i.pixelRatio,this.windowWidth=i.windowWidth,"android"===this.platform?(this.windowHeight=i.screenHeight+i.statusBarHeight,this.cvsStyleHeight=this.windowHeight-r+"px"):(this.windowHeight=i.windowHeight+this.moreHeight,this.cvsStyleHeight=this.windowHeight-r+6+"px"),this.pxRatio=this.windowWidth/750;var e=this.avatarStyle;if(e&&!0!==e&&(e=e.trim())){e=e.split(";");var s={},h=!0,a=!1,n=void 0;try{for(var o,l=e[Symbol.iterator]();!(h=(o=l.next()).done);h=!0){var c=o.value;if(c){if(c=c.trim().split(":"),c[1].indexOf("upx")>=0){var p=c[1].trim().split(" ");for(var d in p)p[d]&&p[d].indexOf("upx")>=0&&(p[d]=parseFloat(p[d])*this.pxRatio+"px");c[1]=p.join(" ")}s[c[0].trim()]=c[1].trim()}}}catch(f){a=!0,n=f}finally{try{h||null==l.return||l.return()}finally{if(a)throw n}}this.imgStyle=s}this.expWidth&&(this.exportWidth=this.expWidth.indexOf("upx")>=0?parseInt(this.expWidth)*this.pxRatio:parseInt(this.expWidth)),this.expHeight&&(this.exportHeight=this.expHeight.indexOf("upx")>=0?parseInt(this.expHeight)*this.pxRatio:parseInt(this.expHeight)),"flex"===this.styleDisplay&&this.fDrawInit(!0),this.fHideImg()},fSelect:function(){var i=this;this.fSelecting||(this.fSelecting=!0,setTimeout(function(){i.fSelecting=!1},500),t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){t.showLoading({mask:!0});var s=i.imgPath=e.tempFilePaths[0];t.getImageInfo({src:s,success:function(e){if(i.imgWidth=e.width,i.imgHeight=e.height,i.path=s,!i.hasSel){var h=i.selStyle||{};if(!i.selWidth||!i.selHeight)return void t.showModal({title:"裁剪框的宽或高没有设置",showCancel:!1});var a=i.selWidth.indexOf("upx")>=0?parseInt(i.selWidth)*i.pxRatio:parseInt(i.selWidth),n=i.selHeight.indexOf("upx")>=0?parseInt(i.selHeight)*i.pxRatio:parseInt(i.selHeight);h.width=a+"px",h.height=n+"px",h.top=(i.windowHeight-n-r)/2+"px",h.left=(i.windowWidth-a)/2+"px",i.selStyle=h}i.noBar?i.fDrawInit(!0):t.hideTabBar({complete:function(){i.fDrawInit(!0)}})},fail:function(){t.showToast({title:"error3",duration:2e3})},complete:function(){t.hideLoading()}})}}))},fUpload:function(){var i=this;if(!this.fUploading){this.fUploading=!0,setTimeout(function(){i.fUploading=!1},1e3);var e=this.selStyle,s=parseInt(e.left),h=parseInt(e.top),a=parseInt(e.width),n=parseInt(e.height),r=this.exportWidth||a,o=this.exportHeight||n;t.showLoading({mask:!0}),this.styleDisplay="none",this.styleTop="-10000px",this.hasSel=!1,this.fHideImg(),t.canvasToTempFilePath({x:s,y:h,width:a,height:n,destWidth:r,destHeight:o,canvasId:"avatar-canvas",fileType:"png",quality:this.qlty,success:function(t){t=t.tempFilePath,i.$emit("upload",{avatar:i.imgSrc,path:t,index:i.indx,data:i.rtn})},fail:function(i){t.showToast({title:"error1",duration:2e3})},complete:function(){t.hideLoading(),i.noBar||t.showTabBar()}},this)}},fPrvUpload:function(){var i=this;if(!this.fPrvUploading){this.fPrvUploading=!0,setTimeout(function(){i.fPrvUploading=!1},1e3);var e=this.selStyle,s=(parseInt(e.width),parseInt(e.height),this.prvX),h=this.prvY,a=this.prvWidth,n=this.prvHeight,r=this.exportWidth||a,o=this.exportHeight||n;t.showLoading({mask:!0}),this.styleDisplay="none",this.styleTop="-10000px",this.hasSel=!1,this.fHideImg(),t.canvasToTempFilePath({x:s,y:h,width:a,height:n,destWidth:r,destHeight:o,canvasId:"prv-canvas",fileType:"png",quality:this.qlty,success:function(t){t=t.tempFilePath,i.$emit("upload",{avatar:i.imgSrc,path:t,index:i.indx,data:i.rtn})},fail:function(){t.showToast({title:"error_prv",duration:2e3})},complete:function(){t.hideLoading(),i.noBar||t.showTabBar()}},this)}},fDrawInit:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.windowWidth,s=this.windowHeight,h=this.imgWidth,a=this.imgHeight,n=h/a,o=e-40,l=s-r-80,c=(this.pixelRatio,parseInt(this.selStyle.width)),p=parseInt(this.selStyle.height);switch(this.fixWidth=0,this.fixHeight=0,this.lckWidth=0,this.lckHeight=0,this.stc){case"x":this.fixWidth=1;break;case"y":this.fixHeight=1;break;case"long":n>1?this.fixWidth=1:this.fixHeight=1;break;case"short":n>1?this.fixHeight=1:this.fixWidth=1;break;case"longSel":c>p?this.fixWidth=1:this.fixHeight=1;break;case"shortSel":c>p?this.fixHeight=1:this.fixWidth=1;break}switch(this.lck){case"x":this.lckWidth=1;break;case"y":this.lckHeight=1;break;case"long":n>1?this.lckWidth=1:this.lckHeight=1;break;case"short":n>1?this.lckHeight=1:this.lckWidth=1;break;case"longSel":c>p?this.lckWidth=1:this.lckHeight=1;break;case"shortSel":c>p?this.lckHeight=1:this.lckWidth=1;break}this.fixWidth?(o=c,l=o/n):this.fixHeight?(l=p,o=l*n):n<1?a<l?(o=h,l=a):(l=l,o=l*n):h<o?(o=h,l=a):(o=o,l=o/n),this.isin&&(this.scaleWidth=0,this.scaleHeight=0,o<c&&(o=c,l=o/n,this.lckHeight=0),l<p&&(l=p,o=l*n,this.lckWidth=0)),this.scaleSize=1,this.rotateDeg=0,this.posWidth=(e-o)/2,this.posHeight=(s-l-r)/2,this.useWidth=o,this.useHeight=l;var d=this.selStyle,f=parseInt(d.left),u=parseInt(d.top),g=parseInt(d.width),v=parseInt(d.height),x=(this.canvas,this.canvasOper,this.ctxCanvas),w=this.ctxCanvasOper;w.setLineWidth(3),w.setStrokeStyle("grey"),w.setGlobalAlpha(.4),w.setFillStyle("black"),w.strokeRect(f,u,g,v),w.fillRect(0,0,this.windowWidth,u),w.fillRect(0,u,f,v),w.fillRect(0,u+v,this.windowWidth,this.windowHeight-v-u-r),w.fillRect(f+g,u,this.windowWidth-g-f,v),w.setStrokeStyle("red"),w.moveTo(f+20,u),w.lineTo(f,u),w.lineTo(f,u+20),w.moveTo(f+g-20,u),w.lineTo(f+g,u),w.lineTo(f+g,u+20),w.moveTo(f+20,u+v),w.lineTo(f,u+v),w.lineTo(f,u+v-20),w.moveTo(f+g-20,u+v),w.lineTo(f+g,u+v),w.lineTo(f+g,u+v-20),w.stroke(),w.draw(!1,function(){i&&(t.styleDisplay="flex",t.styleTop="0",x.setFillStyle("black"),t.fDrawImage())}),this.$emit("avtinit")},fDrawImage:function(){var t=Date.now();if(!(t-this.drawTm<20)){this.drawTm=t;var i=this.ctxCanvas;i.fillRect(0,0,this.windowWidth,this.windowHeight-r),i.translate(this.posWidth+this.useWidth/2,this.posHeight+this.useHeight/2),i.scale(this.scaleSize,this.scaleSize),i.rotate(this.rotateDeg*Math.PI/180),i.drawImage(this.imgPath,-this.useWidth/2,-this.useHeight/2,this.useWidth,this.useHeight),i.draw(!1)}},fHideImg:function(){this.prvImg="",this.prvTop="-10000px",this.showOper=!0,this.prvImgData=null,this.target=null},fClose:function(){this.styleDisplay="none",this.styleTop="-10000px",this.hasSel=!1,this.fHideImg(),this.noBar||t.showTabBar()},fPreview:function(){var i=this;if(!this.fPreviewing){this.fPreviewing=!0,setTimeout(function(){i.fPreviewing=!1},1e3);var e=this.selStyle,s=parseInt(e.left),h=parseInt(e.top),a=parseInt(e.width),n=parseInt(e.height);t.showLoading({mask:!0}),t.canvasToTempFilePath({x:s,y:h,width:a,height:n,canvasId:"avatar-canvas",fileType:"png",quality:this.qlty,success:function(t){i.prvImgTmp=t=t.tempFilePath;var e=i.ctxCanvasPrv,s=i.windowWidth,h=parseInt(i.cvsStyleHeight),a=parseInt(i.selStyle.width),n=parseInt(i.selStyle.height),r=s-40,o=h-80,l=r/a,c=n*l;c<o?(a=r,n=c):(l=o/n,a*=l,n=o),e.setFillStyle("black"),e.fillRect(0,0,s,h),i.prvX=s=(s-a)/2,i.prvY=h=(h-n)/2,i.prvWidth=a,i.prvHeight=n,e.drawImage(t,s,h,a,n),e.draw(!1),"android"!=i.platform&&(i.showOper=!1),i.prvTop="0"},fail:function(){t.showToast({title:"error2",duration:2e3})},complete:function(){t.hideLoading()}},this)}},fChooseImg:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if(i){var s=i.selWidth,h=i.selHeight,a=i.expWidth,n=i.expHeight,o=i.quality,l=i.canRotate,c=i.canScale,p=i.minScale,d=i.maxScale,f=i.stretch,u=i.inner,g=i.lock;a&&(this.exportWidth=a.indexOf("upx")>=0?parseInt(a)*this.pxRatio:parseInt(a)),n&&(this.exportHeight=n.indexOf("upx")>=0?parseInt(n)*this.pxRatio:parseInt(n)),this.letRotate="false"===l?0:1,this.letScale="false"===c?0:1,this.qlty=parseInt(o)||.9,this.mnScale=p||.3,this.mxScale=d||4,this.stc=f,this.isin="true"===u?1:0,this.lck=g,this.isin?(this.btnWidth="24%",this.btnDsp="none"):(this.btnWidth="19%",this.btnDsp="flex"),s&&h&&(s=s.indexOf("upx")>=0?parseInt(s)*this.pxRatio:parseInt(s),h=h.indexOf("upx")>=0?parseInt(h)*this.pxRatio:parseInt(h),this.selStyle.width=s+"px",this.selStyle.height=h+"px",this.selStyle.top=(this.windowHeight-h-r)/2+"px",this.selStyle.left=(this.windowWidth-s)/2+"px",this.hasSel=!0)}this.rtn=e,this.indx=t,this.fSelect()},fRotate:function(){var t=this;if("android"===this.platform){if(this.fRotateing)return;this.fRotateing=!0,setTimeout(function(){t.fRotateing=!1},500)}this.rotateDeg+=90-this.rotateDeg%90,this.fDrawImage()},fStart:function(t){var i=t.touches,e=i[0],s=i[1];if(this.touch0=e,this.touch1=s,s){var h=s.x-e.x,a=s.y-e.y;this.fgDistance=Math.sqrt(h*h+a*a)}},fMove:function(t){var i=t.touches,e=i[0],s=i[1];if(s){var h=s.x-e.x,a=s.y-e.y,n=Math.sqrt(h*h+a*a),r=.005*(n-this.fgDistance),o=this.scaleSize+r;do{if(!this.letScale)break;if(o<this.mnScale)break;if(o>this.mxScale)break;if(this.isin){var l=this.useWidth*o,c=this.useHeight*o,p=this.posWidth+this.useWidth/2,d=this.posHeight+this.useHeight/2,f=p-l/2,u=d-c/2,g=f+l,v=u+c,x=parseInt(this.selStyle.left),w=parseInt(this.selStyle.top),m=parseInt(this.selStyle.width),y=parseInt(this.selStyle.height);if(x<f||x+m>g||w<u||w+y>v)break;this.scaleWidth=(this.useWidth-l)/2,this.scaleHeight=(this.useHeight-c)/2}this.scaleSize=o}while(0);this.fgDistance=n,s.x!==e.x&&this.letRotate&&(h=(this.touch1.y-this.touch0.y)/(this.touch1.x-this.touch0.x),a=(s.y-e.y)/(s.x-e.x),this.rotateDeg+=180*Math.atan((a-h)/(1+h*a))/Math.PI,this.touch0=e,this.touch1=s),this.fDrawImage()}else if(this.touch0){var S=e.x-this.touch0.x,H=e.y-this.touch0.y,I=this.posWidth+S,W=this.posHeight+H;if(this.isin){var b=this.useWidth*this.scaleSize,k=this.useHeight*this.scaleSize,T=I+this.useWidth/2,R=W+this.useHeight/2,D=T-b/2,P=R-k/2,C=D+b,M=P+k,O=parseInt(this.selStyle.left),q=parseInt(this.selStyle.top),B=parseInt(this.selStyle.width),L=parseInt(this.selStyle.height);!this.lckWidth&&Math.abs(S)<100&&(O>=D&&O+B<=C?this.posWidth=I:O<D?this.posWidth=O-this.scaleWidth:O+B>C&&(this.posWidth=O-(b-B)-this.scaleWidth)),!this.lckHeight&&Math.abs(H)<100&&(q>=P&&q+L<=M?this.posHeight=W:q<P?this.posHeight=q-this.scaleHeight:q+L>M&&(this.posHeight=q-(k-L)-this.scaleHeight))}else Math.abs(S)<100&&!this.lckWidth&&(this.posWidth=I),Math.abs(H)<100&&!this.lckHeight&&(this.posHeight=W);this.touch0=e,this.fDrawImage()}},fEnd:function(t){var i=t.touches,e=i&&i[0];i&&i[1];e?this.touch0=e:(this.touch0=null,this.touch1=null)},fGetImgData:function(){var i=this;return new Promise(function(e,s){var h=i.prvX,a=i.prvY,n=i.prvWidth,r=i.prvHeight;h*=i.pixelRatio,a*=i.pixelRatio,n*=i.pixelRatio,r*=i.pixelRatio,t.canvasGetImageData({canvasId:"prv-canvas",x:h,y:a,width:n,height:r,success:function(t){e(t.data)},fail:function(t){s(t)}},i)})},fColorChange:function(){var i=n(s.default.mark(function i(e){var h,a,n,r,o,l,c,p,d,f,u,g,v,x,w,m,y,S,H,I,W,b,k,T,R,D,P;return s.default.wrap(function(i){while(1)switch(i.prev=i.next){case 0:if(h=Date.now(),!(h-this.prvTm<100)){i.next=3;break}return i.abrupt("return");case 3:if(this.prvTm=h,t.showLoading({mask:!0}),this.prvImgData){i.next=11;break}return i.next=8,this.fGetImgData().catch(function(i){t.showToast({title:"error_read",duration:2e3})});case 8:if(this.prvImgData=i.sent){i.next=10;break}return i.abrupt("return");case 10:this.target=new Uint8ClampedArray(this.prvImgData.length);case 11:if(a=this.prvImgData,n=this.target,r=e.detail.value,0===r)n=a;else for(r=(r+100)/200,r<.005&&(r=0),r>.995&&(r=1),W=a.length-1;W>=0;W-=4)o=a[W-3]/255,l=a[W-2]/255,c=a[W-1]/255,m=Math.max(o,l,c),w=Math.min(o,l,c),g=m-w,m===w?d=0:m===o&&l>=c?d=(l-c)/g*60:m===o&&l<c?d=(l-c)/g*60+360:m===l?d=(c-o)/g*60+120:m===c&&(d=(o-l)/g*60+240),u=(m+w)/2,0===u||m===w?f=0:0<u&&u<=.5?f=g/(2*u):u>.5&&(f=g/(2-2*u)),a[W]&&(p=a[W]),r<.5?f=f*r/.5:r>.5&&(f=2*f+2*r-f*r/.5-1),0===f?o=l=c=Math.round(255*u):(u<.5?x=u*(1+f):u>=.5&&(x=u+f-u*f),v=2*u-x,y=d/360,S=y+1/3,H=y,I=y-1/3,b=function(t){return t<0?t+1:t>1?t-1:t},k=function(t){return t<1/6?v+6*(x-v)*t:t>=1/6&&t<.5?x:t>=.5&&t<2/3?v+6*(x-v)*(2/3-t):v},o=S=Math.round(255*k(b(S))),l=H=Math.round(255*k(b(H))),c=I=Math.round(255*k(b(I)))),p&&(n[W]=p),n[W-3]=o,n[W-2]=l,n[W-1]=c;T=this.prvX,R=this.prvY,D=this.prvWidth,P=this.prvHeight,this.ctxCanvasPrv.setFillStyle("black"),this.ctxCanvasPrv.fillRect(T,R,D,P),this.ctxCanvasPrv.draw(!0),T*=this.pixelRatio,R*=this.pixelRatio,D*=this.pixelRatio,P*=this.pixelRatio,t.canvasPutImageData({canvasId:"prv-canvas",x:T,y:R,width:D,height:P,data:n,fail:function(){t.showToast({title:"error_put",duration:2e3})},complete:function(){t.hideLoading()}},this);case 22:case"end":return i.stop()}},i,this)}));function e(t){return i.apply(this,arguments)}return e}(),btop:function(t){return new Promise(function(i,e){var s=t.split(","),h=s[0].match(/:(.*?);/)[1],a=atob(s[1]),n=a.length,r=new Uint8Array(n);while(n--)r[n]=a.charCodeAt(n);return i((window.URL||window.webkitURL).createObjectURL(new Blob([r],{type:h})))})}}};i.default=o}).call(this,e("6e42")["default"])},5961:function(t,i,e){"use strict";e.r(i);var s=e("4c0f"),h=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);i["default"]=h.a},"5bdc":function(t,i,e){"use strict";e.r(i);var s=e("e0bd"),h=e("5961");for(var a in h)"default"!==a&&function(t){e.d(i,t,function(){return h[t]})}(a);e("d21e");var n=e("2877"),r=Object(n["a"])(h["default"],s["a"],s["b"],!1,null,null,null);i["default"]=r.exports},"82e0":function(t,i,e){},d21e:function(t,i,e){"use strict";var s=e("82e0"),h=e.n(s);h.a},e0bd:function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=(t._self._c,t.__get_style([t.imgStyle]));t.$mp.data=Object.assign({},{$root:{s0:e}})},h=[];e.d(i,"a",function(){return s}),e.d(i,"b",function(){return h})}}]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/yq-avatar/yq-avatar"],{"23c5":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=h(e("a34a"));function h(t){return t&&t.__esModule?t:{default:t}}function a(t,i,e,s,h,a,n){try{var r=t[a](n),o=r.value}catch(l){return void e(l)}r.done?i(o):Promise.resolve(o).then(s,h)}function n(t){return function(){var i=this,e=arguments;return new Promise(function(s,h){var n=t.apply(i,e);function r(t){a(n,s,h,r,o,"next",t)}function o(t){a(n,s,h,r,o,"throw",t)}r(void 0)})}}var r=50,o={name:"yq-avatar",data:function(){return{cvsStyleHeight:"0px",styleDisplay:"none",styleTop:"-10000px",prvTop:"-10000px",imgStyle:{},selStyle:{},showOper:!0,imgSrc:{imgSrc:""},btnWidth:"19%",btnDsp:"flex"}},watch:{avatarSrc:function(){this.imgSrc.imgSrc=this.avatarSrc}},props:{avatarSrc:"",avatarStyle:"",selWidth:"",selHeight:"",expWidth:"",expHeight:"",minScale:"",maxScale:"",canScale:"",canRotate:"",lockWidth:"",lockHeight:"",stretch:"",lock:"",noTab:"",inner:"",quality:"",index:""},created:function(){var i=this;this.ctxCanvas=t.createCanvasContext("avatar-canvas",this),this.ctxCanvasOper=t.createCanvasContext("oper-canvas",this),this.ctxCanvasPrv=t.createCanvasContext("prv-canvas",this),this.qlty=parseInt(this.quality)||.9,this.imgSrc.imgSrc=this.avatarSrc,this.letRotate="false"===this.canRotate||"true"===this.inner?0:1,this.letScale="false"===this.canScale?0:1,this.isin="true"===this.inner?1:0,this.indx=this.index||void 0,this.mnScale=this.minScale||.3,this.mxScale=this.maxScale||4,this.noBar="true"===this.noTab?1:0,this.stc=this.stretch,this.lck=this.lock,this.isin?(this.btnWidth="24%",this.btnDsp="none"):(this.btnWidth="19%",this.btnDsp="flex"),this.noBar?(this.moreHeight=0,this.fWindowResize()):t.showTabBar({complete:function(t){i.moreHeight="showTabBar:ok"===t.errMsg?50:0,i.fWindowResize()}})},methods:{fWindowResize:function(){var i=t.getSystemInfoSync();this.platform=i.platform,this.pixelRatio=i.pixelRatio,this.windowWidth=i.windowWidth,"android"===this.platform?(this.windowHeight=i.screenHeight+i.statusBarHeight,this.cvsStyleHeight=this.windowHeight-r+"px"):(this.windowHeight=i.windowHeight+this.moreHeight,this.cvsStyleHeight=this.windowHeight-r+6+"px"),this.pxRatio=this.windowWidth/750;var e=this.avatarStyle;if(e&&!0!==e&&(e=e.trim())){e=e.split(";");var s={},h=!0,a=!1,n=void 0;try{for(var o,l=e[Symbol.iterator]();!(h=(o=l.next()).done);h=!0){var c=o.value;if(c){if(c=c.trim().split(":"),c[1].indexOf("upx")>=0){var p=c[1].trim().split(" ");for(var d in p)p[d]&&p[d].indexOf("upx")>=0&&(p[d]=parseFloat(p[d])*this.pxRatio+"px");c[1]=p.join(" ")}s[c[0].trim()]=c[1].trim()}}}catch(f){a=!0,n=f}finally{try{h||null==l.return||l.return()}finally{if(a)throw n}}this.imgStyle=s}this.expWidth&&(this.exportWidth=this.expWidth.indexOf("upx")>=0?parseInt(this.expWidth)*this.pxRatio:parseInt(this.expWidth)),this.expHeight&&(this.exportHeight=this.expHeight.indexOf("upx")>=0?parseInt(this.expHeight)*this.pxRatio:parseInt(this.expHeight)),"flex"===this.styleDisplay&&this.fDrawInit(!0),this.fHideImg()},fSelect:function(){var i=this;this.fSelecting||(this.fSelecting=!0,setTimeout(function(){i.fSelecting=!1},500),t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){t.showLoading({mask:!0});var s=i.imgPath=e.tempFilePaths[0];t.getImageInfo({src:s,success:function(e){if(i.imgWidth=e.width,i.imgHeight=e.height,i.path=s,!i.hasSel){var h=i.selStyle||{};if(!i.selWidth||!i.selHeight)return void t.showModal({title:"裁剪框的宽或高没有设置",showCancel:!1});var a=i.selWidth.indexOf("upx")>=0?parseInt(i.selWidth)*i.pxRatio:parseInt(i.selWidth),n=i.selHeight.indexOf("upx")>=0?parseInt(i.selHeight)*i.pxRatio:parseInt(i.selHeight);h.width=a+"px",h.height=n+"px",h.top=(i.windowHeight-n-r)/2+"px",h.left=(i.windowWidth-a)/2+"px",i.selStyle=h}i.noBar?i.fDrawInit(!0):t.hideTabBar({complete:function(){i.fDrawInit(!0)}})},fail:function(){t.showToast({title:"error3",duration:2e3})},complete:function(){t.hideLoading()}})}}))},fUpload:function(){var i=this;if(!this.fUploading){this.fUploading=!0,setTimeout(function(){i.fUploading=!1},1e3);var e=this.selStyle,s=parseInt(e.left),h=parseInt(e.top),a=parseInt(e.width),n=parseInt(e.height),r=this.exportWidth||a,o=this.exportHeight||n;t.showLoading({mask:!0}),this.styleDisplay="none",this.styleTop="-10000px",this.hasSel=!1,this.fHideImg(),t.canvasToTempFilePath({x:s,y:h,width:a,height:n,destWidth:r,destHeight:o,canvasId:"avatar-canvas",fileType:"png",quality:this.qlty,success:function(t){t=t.tempFilePath,i.$emit("upload",{avatar:i.imgSrc,path:t,index:i.indx,data:i.rtn})},fail:function(i){t.showToast({title:"error1",duration:2e3})},complete:function(){t.hideLoading(),i.noBar||t.showTabBar()}},this)}},fPrvUpload:function(){var i=this;if(!this.fPrvUploading){this.fPrvUploading=!0,setTimeout(function(){i.fPrvUploading=!1},1e3);var e=this.selStyle,s=(parseInt(e.width),parseInt(e.height),this.prvX),h=this.prvY,a=this.prvWidth,n=this.prvHeight,r=this.exportWidth||a,o=this.exportHeight||n;t.showLoading({mask:!0}),this.styleDisplay="none",this.styleTop="-10000px",this.hasSel=!1,this.fHideImg(),t.canvasToTempFilePath({x:s,y:h,width:a,height:n,destWidth:r,destHeight:o,canvasId:"prv-canvas",fileType:"png",quality:this.qlty,success:function(t){t=t.tempFilePath,i.$emit("upload",{avatar:i.imgSrc,path:t,index:i.indx,data:i.rtn})},fail:function(){t.showToast({title:"error_prv",duration:2e3})},complete:function(){t.hideLoading(),i.noBar||t.showTabBar()}},this)}},fDrawInit:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.windowWidth,s=this.windowHeight,h=this.imgWidth,a=this.imgHeight,n=h/a,o=e-40,l=s-r-80,c=(this.pixelRatio,parseInt(this.selStyle.width)),p=parseInt(this.selStyle.height);switch(this.fixWidth=0,this.fixHeight=0,this.lckWidth=0,this.lckHeight=0,this.stc){case"x":this.fixWidth=1;break;case"y":this.fixHeight=1;break;case"long":n>1?this.fixWidth=1:this.fixHeight=1;break;case"short":n>1?this.fixHeight=1:this.fixWidth=1;break;case"longSel":c>p?this.fixWidth=1:this.fixHeight=1;break;case"shortSel":c>p?this.fixHeight=1:this.fixWidth=1;break}switch(this.lck){case"x":this.lckWidth=1;break;case"y":this.lckHeight=1;break;case"long":n>1?this.lckWidth=1:this.lckHeight=1;break;case"short":n>1?this.lckHeight=1:this.lckWidth=1;break;case"longSel":c>p?this.lckWidth=1:this.lckHeight=1;break;case"shortSel":c>p?this.lckHeight=1:this.lckWidth=1;break}this.fixWidth?(o=c,l=o/n):this.fixHeight?(l=p,o=l*n):n<1?a<l?(o=h,l=a):(l=l,o=l*n):h<o?(o=h,l=a):(o=o,l=o/n),this.isin&&(this.scaleWidth=0,this.scaleHeight=0,o<c&&(o=c,l=o/n,this.lckHeight=0),l<p&&(l=p,o=l*n,this.lckWidth=0)),this.scaleSize=1,this.rotateDeg=0,this.posWidth=(e-o)/2,this.posHeight=(s-l-r)/2,this.useWidth=o,this.useHeight=l;var d=this.selStyle,f=parseInt(d.left),u=parseInt(d.top),g=parseInt(d.width),v=parseInt(d.height),x=(this.canvas,this.canvasOper,this.ctxCanvas),w=this.ctxCanvasOper;w.setLineWidth(3),w.setStrokeStyle("grey"),w.setGlobalAlpha(.4),w.setFillStyle("black"),w.strokeRect(f,u,g,v),w.fillRect(0,0,this.windowWidth,u),w.fillRect(0,u,f,v),w.fillRect(0,u+v,this.windowWidth,this.windowHeight-v-u-r),w.fillRect(f+g,u,this.windowWidth-g-f,v),w.setStrokeStyle("red"),w.moveTo(f+20,u),w.lineTo(f,u),w.lineTo(f,u+20),w.moveTo(f+g-20,u),w.lineTo(f+g,u),w.lineTo(f+g,u+20),w.moveTo(f+20,u+v),w.lineTo(f,u+v),w.lineTo(f,u+v-20),w.moveTo(f+g-20,u+v),w.lineTo(f+g,u+v),w.lineTo(f+g,u+v-20),w.stroke(),w.draw(!1,function(){i&&(t.styleDisplay="flex",t.styleTop="0",x.setFillStyle("black"),t.fDrawImage())}),this.$emit("avtinit")},fDrawImage:function(){var t=Date.now();if(!(t-this.drawTm<20)){this.drawTm=t;var i=this.ctxCanvas;i.fillRect(0,0,this.windowWidth,this.windowHeight-r),i.translate(this.posWidth+this.useWidth/2,this.posHeight+this.useHeight/2),i.scale(this.scaleSize,this.scaleSize),i.rotate(this.rotateDeg*Math.PI/180),i.drawImage(this.imgPath,-this.useWidth/2,-this.useHeight/2,this.useWidth,this.useHeight),i.draw(!1)}},fHideImg:function(){this.prvImg="",this.prvTop="-10000px",this.showOper=!0,this.prvImgData=null,this.target=null},fClose:function(){this.styleDisplay="none",this.styleTop="-10000px",this.hasSel=!1,this.fHideImg(),this.noBar||t.showTabBar()},fPreview:function(){var i=this;if(!this.fPreviewing){this.fPreviewing=!0,setTimeout(function(){i.fPreviewing=!1},1e3);var e=this.selStyle,s=parseInt(e.left),h=parseInt(e.top),a=parseInt(e.width),n=parseInt(e.height);t.showLoading({mask:!0}),t.canvasToTempFilePath({x:s,y:h,width:a,height:n,canvasId:"avatar-canvas",fileType:"png",quality:this.qlty,success:function(t){i.prvImgTmp=t=t.tempFilePath;var e=i.ctxCanvasPrv,s=i.windowWidth,h=parseInt(i.cvsStyleHeight),a=parseInt(i.selStyle.width),n=parseInt(i.selStyle.height),r=s-40,o=h-80,l=r/a,c=n*l;c<o?(a=r,n=c):(l=o/n,a*=l,n=o),e.setFillStyle("black"),e.fillRect(0,0,s,h),i.prvX=s=(s-a)/2,i.prvY=h=(h-n)/2,i.prvWidth=a,i.prvHeight=n,e.drawImage(t,s,h,a,n),e.draw(!1),"android"!=i.platform&&(i.showOper=!1),i.prvTop="0"},fail:function(){t.showToast({title:"error2",duration:2e3})},complete:function(){t.hideLoading()}},this)}},fChooseImg:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if(i){var s=i.selWidth,h=i.selHeight,a=i.expWidth,n=i.expHeight,o=i.quality,l=i.canRotate,c=i.canScale,p=i.minScale,d=i.maxScale,f=i.stretch,u=i.inner,g=i.lock;a&&(this.exportWidth=a.indexOf("upx")>=0?parseInt(a)*this.pxRatio:parseInt(a)),n&&(this.exportHeight=n.indexOf("upx")>=0?parseInt(n)*this.pxRatio:parseInt(n)),this.letRotate="false"===l?0:1,this.letScale="false"===c?0:1,this.qlty=parseInt(o)||.9,this.mnScale=p||.3,this.mxScale=d||4,this.stc=f,this.isin="true"===u?1:0,this.lck=g,this.isin?(this.btnWidth="24%",this.btnDsp="none"):(this.btnWidth="19%",this.btnDsp="flex"),s&&h&&(s=s.indexOf("upx")>=0?parseInt(s)*this.pxRatio:parseInt(s),h=h.indexOf("upx")>=0?parseInt(h)*this.pxRatio:parseInt(h),this.selStyle.width=s+"px",this.selStyle.height=h+"px",this.selStyle.top=(this.windowHeight-h-r)/2+"px",this.selStyle.left=(this.windowWidth-s)/2+"px",this.hasSel=!0)}this.rtn=e,this.indx=t,this.fSelect()},fRotate:function(){var t=this;if("android"===this.platform){if(this.fRotateing)return;this.fRotateing=!0,setTimeout(function(){t.fRotateing=!1},500)}this.rotateDeg+=90-this.rotateDeg%90,this.fDrawImage()},fStart:function(t){var i=t.touches,e=i[0],s=i[1];if(this.touch0=e,this.touch1=s,s){var h=s.x-e.x,a=s.y-e.y;this.fgDistance=Math.sqrt(h*h+a*a)}},fMove:function(t){var i=t.touches,e=i[0],s=i[1];if(s){var h=s.x-e.x,a=s.y-e.y,n=Math.sqrt(h*h+a*a),r=.005*(n-this.fgDistance),o=this.scaleSize+r;do{if(!this.letScale)break;if(o<this.mnScale)break;if(o>this.mxScale)break;if(this.isin){var l=this.useWidth*o,c=this.useHeight*o,p=this.posWidth+this.useWidth/2,d=this.posHeight+this.useHeight/2,f=p-l/2,u=d-c/2,g=f+l,v=u+c,x=parseInt(this.selStyle.left),w=parseInt(this.selStyle.top),m=parseInt(this.selStyle.width),y=parseInt(this.selStyle.height);if(x<f||x+m>g||w<u||w+y>v)break;this.scaleWidth=(this.useWidth-l)/2,this.scaleHeight=(this.useHeight-c)/2}this.scaleSize=o}while(0);this.fgDistance=n,s.x!==e.x&&this.letRotate&&(h=(this.touch1.y-this.touch0.y)/(this.touch1.x-this.touch0.x),a=(s.y-e.y)/(s.x-e.x),this.rotateDeg+=180*Math.atan((a-h)/(1+h*a))/Math.PI,this.touch0=e,this.touch1=s),this.fDrawImage()}else if(this.touch0){var S=e.x-this.touch0.x,H=e.y-this.touch0.y,I=this.posWidth+S,W=this.posHeight+H;if(this.isin){var b=this.useWidth*this.scaleSize,k=this.useHeight*this.scaleSize,T=I+this.useWidth/2,R=W+this.useHeight/2,D=T-b/2,P=R-k/2,C=D+b,M=P+k,O=parseInt(this.selStyle.left),q=parseInt(this.selStyle.top),B=parseInt(this.selStyle.width),L=parseInt(this.selStyle.height);!this.lckWidth&&Math.abs(S)<100&&(O>=D&&O+B<=C?this.posWidth=I:O<D?this.posWidth=O-this.scaleWidth:O+B>C&&(this.posWidth=O-(b-B)-this.scaleWidth)),!this.lckHeight&&Math.abs(H)<100&&(q>=P&&q+L<=M?this.posHeight=W:q<P?this.posHeight=q-this.scaleHeight:q+L>M&&(this.posHeight=q-(k-L)-this.scaleHeight))}else Math.abs(S)<100&&!this.lckWidth&&(this.posWidth=I),Math.abs(H)<100&&!this.lckHeight&&(this.posHeight=W);this.touch0=e,this.fDrawImage()}},fEnd:function(t){var i=t.touches,e=i&&i[0];i&&i[1];e?this.touch0=e:(this.touch0=null,this.touch1=null)},fGetImgData:function(){var i=this;return new Promise(function(e,s){var h=i.prvX,a=i.prvY,n=i.prvWidth,r=i.prvHeight;h*=i.pixelRatio,a*=i.pixelRatio,n*=i.pixelRatio,r*=i.pixelRatio,t.canvasGetImageData({canvasId:"prv-canvas",x:h,y:a,width:n,height:r,success:function(t){e(t.data)},fail:function(t){s(t)}},i)})},fColorChange:function(){var i=n(s.default.mark(function i(e){var h,a,n,r,o,l,c,p,d,f,u,g,v,x,w,m,y,S,H,I,W,b,k,T,R,D,P;return s.default.wrap(function(i){while(1)switch(i.prev=i.next){case 0:if(h=Date.now(),!(h-this.prvTm<100)){i.next=3;break}return i.abrupt("return");case 3:if(this.prvTm=h,t.showLoading({mask:!0}),this.prvImgData){i.next=11;break}return i.next=8,this.fGetImgData().catch(function(i){t.showToast({title:"error_read",duration:2e3})});case 8:if(this.prvImgData=i.sent){i.next=10;break}return i.abrupt("return");case 10:this.target=new Uint8ClampedArray(this.prvImgData.length);case 11:if(a=this.prvImgData,n=this.target,r=e.detail.value,0===r)n=a;else for(r=(r+100)/200,r<.005&&(r=0),r>.995&&(r=1),W=a.length-1;W>=0;W-=4)o=a[W-3]/255,l=a[W-2]/255,c=a[W-1]/255,m=Math.max(o,l,c),w=Math.min(o,l,c),g=m-w,m===w?d=0:m===o&&l>=c?d=(l-c)/g*60:m===o&&l<c?d=(l-c)/g*60+360:m===l?d=(c-o)/g*60+120:m===c&&(d=(o-l)/g*60+240),u=(m+w)/2,0===u||m===w?f=0:0<u&&u<=.5?f=g/(2*u):u>.5&&(f=g/(2-2*u)),a[W]&&(p=a[W]),r<.5?f=f*r/.5:r>.5&&(f=2*f+2*r-f*r/.5-1),0===f?o=l=c=Math.round(255*u):(u<.5?x=u*(1+f):u>=.5&&(x=u+f-u*f),v=2*u-x,y=d/360,S=y+1/3,H=y,I=y-1/3,b=function(t){return t<0?t+1:t>1?t-1:t},k=function(t){return t<1/6?v+6*(x-v)*t:t>=1/6&&t<.5?x:t>=.5&&t<2/3?v+6*(x-v)*(2/3-t):v},o=S=Math.round(255*k(b(S))),l=H=Math.round(255*k(b(H))),c=I=Math.round(255*k(b(I)))),p&&(n[W]=p),n[W-3]=o,n[W-2]=l,n[W-1]=c;T=this.prvX,R=this.prvY,D=this.prvWidth,P=this.prvHeight,this.ctxCanvasPrv.setFillStyle("black"),this.ctxCanvasPrv.fillRect(T,R,D,P),this.ctxCanvasPrv.draw(!0),T*=this.pixelRatio,R*=this.pixelRatio,D*=this.pixelRatio,P*=this.pixelRatio,t.canvasPutImageData({canvasId:"prv-canvas",x:T,y:R,width:D,height:P,data:n,fail:function(){t.showToast({title:"error_put",duration:2e3})},complete:function(){t.hideLoading()}},this);case 22:case"end":return i.stop()}},i,this)}));function e(t){return i.apply(this,arguments)}return e}(),btop:function(t){return new Promise(function(i,e){var s=t.split(","),h=s[0].match(/:(.*?);/)[1],a=atob(s[1]),n=a.length,r=new Uint8Array(n);while(n--)r[n]=a.charCodeAt(n);return i((window.URL||window.webkitURL).createObjectURL(new Blob([r],{type:h})))})}}};i.default=o}).call(this,e("6e42")["default"])},"50a8":function(t,i,e){"use strict";e.r(i);var s=e("23c5"),h=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);i["default"]=h.a},"8bf3":function(t,i,e){"use strict";e.r(i);var s=e("e19a"),h=e("50a8");for(var a in h)"default"!==a&&function(t){e.d(i,t,function(){return h[t]})}(a);e("945e");var n=e("2877"),r=Object(n["a"])(h["default"],s["a"],s["b"],!1,null,null,null);i["default"]=r.exports},"945e":function(t,i,e){"use strict";var s=e("de99"),h=e.n(s);h.a},de99:function(t,i,e){},e19a:function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=(t._self._c,t.__get_style([t.imgStyle]));t.$mp.data=Object.assign({},{$root:{s0:e}})},h=[];e.d(i,"a",function(){return s}),e.d(i,"b",function(){return h})}}]);
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/yq-avatar/yq-avatar-create-component',
    {
        'components/yq-avatar/yq-avatar-create-component':(function(module, exports, __webpack_require__){
<<<<<<< HEAD
            __webpack_require__('6e42')['createComponent'](__webpack_require__("5bdc"))
=======
            __webpack_require__('6e42')['createComponent'](__webpack_require__("8bf3"))
>>>>>>> 358e1bff63c2fbf2795bdac6cbf7b831891ffd39
        })
    },
    [['components/yq-avatar/yq-avatar-create-component']]
]);                
