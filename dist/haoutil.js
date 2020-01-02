/* 
  版权所有 木遥 for 火星科技 http://marsgis.cn
  github地址：https://github.com/muyao1987/haoutil
  更新时间 2020-1-2 21:14:40 
*/
 var haoutil=haoutil||{};haoutil.version="2.4",haoutil.name="木遥 通用常用JS方法类库",haoutil.author="木遥（QQ：346819890） https://github.com/muyao1987/haoutil",haoutil.update="2020-1-2",haoutil.msg=function(e){window.toastr?toastr.info(e):window.layer?layer.msg(e):alert(e)},haoutil.tip=haoutil.msg,haoutil.oneMsg=function(e,t){haoutil.storage.get(t)||(haoutil.msg(e),haoutil.storage.add(t,!0))},haoutil.alert=function(e,t){window.layer?layer.alert(e,{title:t||"提示",skin:"layui-layer-lan layer-mars-dialog",closeBtn:0,anim:0}):alert(e)},haoutil.loading={index:-1,show:function(e){this.close(),window.NProgress?(e=e||{},e.color?e.template='<div class="bar '+(e.className||"")+'" style="background-color:'+e.color+';" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>':e.template='<div class="bar '+(e.className||"")+'" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',NProgress.configure(e),NProgress.start()):window.layer&&(this.index=layer.load(2,{shade:[.3,"#000000"]}))},hide:function(){this.close()},close:function(){window.NProgress?NProgress.done(!0):window.layer&&(this.index!=-1&&layer.close(this.index),this.index=-1)}},window.noArrayPrototype||(Array.prototype.indexOf=Array.prototype.indexOf||function(e){for(var t=0;t<this.length;t++)if(this[t]==e)return t;return-1},Array.prototype.remove=Array.prototype.remove||function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}},Array.prototype.insert=Array.prototype.insert||function(e,t){null==t&&(t=0),this.splice(t,0,e)}),String.prototype.startsWith=String.prototype.startsWith||function(e){return this.slice(0,e.length)==e},String.prototype.endsWith=String.prototype.endsWith||function(e){return this.slice(-e.length)==e},String.prototype.replaceAll=String.prototype.replaceAll||function(e,t){return this.replace(new RegExp(e,"gm"),t)},Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours()%12==0?12:this.getHours()%12,"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()},n={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),/(E+)/.test(e)&&(e=e.replace(RegExp.$1,(RegExp.$1.length>1?RegExp.$1.length>2?"星期":"周":"")+n[this.getDay()+""]));for(var r in t)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[r]:("00"+t[r]).substr((""+t[r]).length)));return e},haoutil.color=function(){function e(){return"#"+function(e){return(e+="0123456789abcdef"[Math.floor(16*Math.random())])&&6==e.length?e:arguments.callee(e)}("")}return{random:e}}(),haoutil.cookie=function(){function e(e){o=e}function t(e,t,n){var r;n>0?(r=new Date,r.setTime(r.getTime+24*n*60*60*1e3)):r=new Date(2147483647e3);var i=e+"="+escape(t)+"; expires="+r.toGMTString();o&&null!=window.plus?plus.navigator.setCookie(e,i):document.cookie=i}function n(e){var t;if(o&&null!=window.plus){if(t=plus.navigator.getCookie(e),null==t)return null}else t=document.cookie;for(var n=t.split("; "),r=0;r<n.length;r++){var i=n[r].split("=");if(i[0]==e)return unescape(i[1])}return null}function r(e){if(o&&null!=window.plus)plus.navigator.removeCookie(e);else{var t=new Date;t.setTime(t.getTime()-1e4),document.cookie=e+"=v; expires="+t.toGMTString()}}var o;return{isH5Mobile:e,add:t,get:n,del:r}}(),haoutil.file=function(){function e(e,t){var n=document.createElement("a");n.download=e,n.href=URL.createObjectURL(t),document.body.appendChild(n),n.click(),document.body.removeChild(n)}function t(t,n){var r=new Blob([n]);e(t,r)}function n(t,n){var r=n.toDataURL("image/png"),i=o(r);e(t+".png",i)}function r(t,n){var r=o(n);e(t+".png",r)}function o(e){for(var t=e.split(";base64,"),n=t[0].split(":")[1],r=window.atob(t[1]),o=r.length,i=new Uint8Array(o),a=0;a<o;++a)i[a]=r.charCodeAt(a);return new Blob([i],{type:n})}return{download:e,downloadFile:t,downloadImage:n,downloadBase64Image:r,base64Img2Blob:o}}(),haoutil.isutil=function(){function e(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}function t(e){return"string"==typeof e&&e.constructor==String}function n(e){return"number"==typeof e&&e.constructor==Number}function r(e){return"object"==typeof e&&e.constructor==Date}function o(e){return"function"==typeof e&&e.constructor==Function}function i(e){return"object"==typeof e&&e.constructor==Object}function a(e){return null==e||(!(!t(e)||""!=e)||!(!n(e)||!isNaN(e)))}function u(e){return!a(e)}return{isNull:a,isNotNull:u,isArray:e,isString:t,isNumber:n,isDate:r,isFunction:o,isObject:i}}(),haoutil.math=function(){function e(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function t(t){var n=e(0,t.length-1);return t[n]}function r(e,t){e=String(e);for(var t=e.length;t<n;)e="0"+e,t++;return e}return{getArrayRandomOne:t,random:e,padLeft0:r}}(),haoutil.storage=function(){function e(e,t){r=window.localStorage,null!=r&&r.setItem(e,t)}function t(e){if(r=window.localStorage,null!=r){var t=r.getItem(e);return t}}function n(e){r=window.localStorage,null!=r&&r.removeItem(e)}var r;return{add:e,get:t,del:n}}(),haoutil.str=function(){function e(e){var t=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;return!!t.exec(e)}function t(e,t){if(null==e)return"";e=Number(e),null!=t&&"auto"!=t||(t=e<1e3?"m":"km");var n="";switch(t){default:case"m":n=e.toFixed(2)+"米";break;case"km":n=(.001*e).toFixed(2)+"公里";break;case"mile":n=(54e-5*e).toFixed(2)+"海里";break;case"zhang":n=(.3*e).toFixed(2)+"丈"}return n}function n(e,t){if(null==e)return"";e=Number(e),null!=t&&"auto"!=t||(t=e<1e6?"m":"km");var n="";switch(t){default:case"m":n=e.toFixed(2)+"平方米";break;case"km":n=(e/1e6).toFixed(2)+"平方公里";break;case"mu":n=(.0015*e).toFixed(2)+"亩";break;case"ha":n=(1e-4*e).toFixed(2)+"公顷"}return n}function r(e){Number(e);if(e<60)return e.toFixed(0)+"秒";if(e>=60&&e<3600){var t=Math.floor(e%60);return Math.floor(e/60)+"分钟"+(0!=t?t+"秒":"")}return e=Math.floor(e/60),Math.floor(e/60)+"小时"+Math.floor(e%60)+"分钟"}function o(e){for(var t="",n=e.length%6,r=e.substr(0,e.length-n),o=e.substr(e.length-n,n),i=0;i<r.length;i+=6){var a=parseInt(r.substr(i,6),2);t+=c[a]}return o+=new Array(7-n).join("0"),n&&(t+=c[parseInt(o,2)],t+=new Array((6-n)/2+1).join("=")),t}function i(e){for(var t="",n=0,r=0;r<e.length;r++)if("="!=e[r]){var o=c.indexOf(e[r]).toString(2);t+=new Array(7-o.length).join("0")+o}else n++;return t.substr(0,t.length-2*n)}function a(e){for(var t="",n=0;n<e.length;n++){var r=e.charCodeAt(n).toString(2);t+=new Array(9-r.length).join("0")+r}return t}function u(e){for(var t="",n=0;n<e.length;n+=8)t+=String.fromCharCode(parseInt(e.substr(n,8),2));return t}function s(e){return o(a(e))}function l(e){return u(i(e))}var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");return{isChinese:e,formatLength:t,formatArea:n,formatTime:r,base64:s,decodeBase64:l}}(),haoutil.system=function(){function e(e){e=e||window;var t=e.location.search,n=new Object;if(t.indexOf("?")!=-1)for(var r=t.substr(1),o=r.split("&"),i=0;i<o.length;i++)n[o[i].split("=")[0]]=decodeURI(o[i].split("=")[1]);return n}function t(e,t,n){n=n||window;var r=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),o=n.location.search.substr(1).match(r);return null!=o?decodeURI(o[2]):t}function n(){return"undefined"!=typeof window.innerWidth?{width:window.innerWidth,height:window.innerHeight}:{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}}function r(){var e=window.navigator.userAgent.toLowerCase();if(e.indexOf("msie")>=0){var t=Number(e.match(/msie ([\d]+)/)[1]);return{type:"IE",version:t}}if(e.indexOf("firefox")>=0){var t=Number(e.match(/firefox\/([\d]+)/)[1]);return{type:"Firefox",version:t}}if(e.indexOf("chrome")>=0){var t=Number(e.match(/chrome\/([\d]+)/)[1]);return{type:"Chrome",version:t}}if(e.indexOf("opera")>=0){var t=Number(e.match(/opera.([\d]+)/)[1]);return{type:"Opera",version:t}}if(e.indexOf("Safari")>=0){var t=Number(e.match(/version\/([\d]+)/)[1]);return{type:"Safari",version:t}}return{type:e,version:-1}}function o(){var e=navigator.userAgent.toLowerCase(),t="ipad"==e.match(/ipad/i),n="iphone"==e.match(/iphone/i),r="midp"==e.match(/midp/i),o="rv:1.2.3.4"==e.match(/rv:1.2.3.4/i),i="ucweb"==e.match(/ucweb/i),a="android"==e.match(/android/i),u="windows ce"==e.match(/windows ce/i),s="windows mobile"==e.match(/windows mobile/i);return!(t||n||r||o||i||a||u||s)}function i(e){if(null==e||"object"!=typeof e)return e;if(haoutil.isutil.isDate(e)){var t=new Date;return t.setTime(e.getTime()),t}if(haoutil.isutil.isArray(e)){for(var t=[],n=0,r=e.length;n<r;++n)t[n]=i(e[n]);return t}if("object"==typeof e){var t={};for(var o in e)"_layer"!=o&&"_layers"!=o&&"_parent"!=o&&e.hasOwnProperty(o)&&(t[o]=i(e[o]));return t}return e}function a(e,t,n){var r=function(e,t,n){var r=Math.random().toString().replace(".",""),o="my_json_cb_"+r;window[o]=n;var i=e.indexOf("?")==-1?"?":"&";for(var a in t)i+=a+"="+t[a]+"&";i+="callback="+o;var u=document.createElement("script");u.src=e+i,document.body.appendChild(u)};window.$jsonp=r}function u(e,t){$.ajax({url:e,type:"GET",dataType:"html",timeout:0,success:function(e){t(e)}})}function s(e,t){var n=document.createElement("link");n.rel="stylesheet",n.async=t,n.href=e,d.appendChild(n)}function l(e,t){var n=document.createElement("script");n.charset="utf-8",n.async=t,n.src=e,d.appendChild(n)}function c(e,t){f.test(e)?s(e,t):l(e,t)}var d=document.head||document.getElementsByTagName("head")[0],f=new RegExp("\\.css");return{getRequest:e,getRequestByName:t,getExplorerInfo:r,isPCBroswer:o,clone:i,jsonp:a,getWindowSize:n,getHtml:u,loadCss:s,loadJs:l,loadResource:c}}();