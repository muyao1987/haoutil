// 系统级  或 浏览器 相关操作类";
haoutil.system = (function () {
  //============内部私有属性及方法============

  //url参数获取
  function getRequest(target) {
    let theRequest = new Object();
    try {
      //屏蔽跨域时报错
      target = target || window;
      let url = target.location.search; //获取url中"?"符后的字串
      if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
      }
    } catch (e) {
      //
    }
    return theRequest;
  }

  function getRequestByName(name, defval, target) {
    try {
      target = target || window;
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      let r = target.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      }
    } catch (e) {
      //
    }
    return defval;
  }

  function getWindowSize() {
    if (typeof window.innerWidth != "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    }
  }

  //获取浏览器类型及版本
  function getExplorerInfo() {
    let explorer = window.navigator.userAgent.toLowerCase();
    //ie
    if (explorer.indexOf("msie") >= 0) {
      let ver = Number(explorer.match(/msie ([\d]+)/)[1]);
      return { type: "IE", version: ver };
    }
    //firefox
    else if (explorer.indexOf("firefox") >= 0) {
      let ver = Number(explorer.match(/firefox\/([\d]+)/)[1]);
      return { type: "Firefox", version: ver };
    }
    //Chrome
    else if (explorer.indexOf("chrome") >= 0) {
      let ver = Number(explorer.match(/chrome\/([\d]+)/)[1]);
      return { type: "Chrome", version: ver };
    }
    //Opera
    else if (explorer.indexOf("opera") >= 0) {
      let ver = Number(explorer.match(/opera.([\d]+)/)[1]);
      return { type: "Opera", version: ver };
    }
    //Safari
    else if (explorer.indexOf("Safari") >= 0) {
      let ver = Number(explorer.match(/version\/([\d]+)/)[1]);
      return { type: "Safari", version: ver };
    }
    return { type: explorer, version: -1 };
  }

  //浏览器
  function isPCBroswer() {
    let sUserAgent = navigator.userAgent.toLowerCase();

    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone/i) == "iphone";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return false;
    } else {
      return true;
    }
  }

  function clone(obj, removeKeys, level) {
    if (level == null) {
      level = 9;
    } //避免死循环，拷贝的层级最大深度
    if (removeKeys == null) {
      removeKeys = ["_layer"];
    }

    if (null == obj || "object" != typeof obj) {
      return obj;
    }

    // Handle Date
    if (haoutil.isutil.isDate(obj)) {
      let copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (haoutil.isutil.isArray(obj) && level >= 0) {
      let copy = [];
      for (let i = 0, len = obj.length; i < len; ++i) {
        copy[i] = clone(obj[i], removeKeys, level - 1);
      }
      return copy;
    }

    // Handle Object
    if (typeof obj === "object" && level >= 0) {
      try {
        let copy = {};
        for (let attr in obj) {
          if (typeof attr === "function") {
            continue;
          }
          if (removeKeys.indexOf(attr) != -1) {
            continue;
          }

          if (obj.hasOwnProperty(attr)) {
            copy[attr] = clone(obj[attr], removeKeys, level - 1);
          }
        }
        return copy;
      } catch (e) {
        console.log(e);
      }
    }
    return obj;
  }

  function jsonp(url, data, callback) {
    let jsonp = function (url, data, callback) {
      let fnSuffix = Math.random().toString().replace(".", "");
      let cbFuncName = "my_json_cb_" + fnSuffix;
      // 不推荐
      window[cbFuncName] = callback;
      let querystring = url.indexOf("?") == -1 ? "?" : "&";
      for (let key in data) {
        querystring += key + "=" + data[key] + "&";
      }
      querystring += "callback=" + cbFuncName;
      let scriptElement = document.createElement("script");
      scriptElement.src = url + querystring;
      document.body.appendChild(scriptElement);
    };
    window.$jsonp = jsonp;
  }

  //公共方法
  function getHtml(url, callback) {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "html",
      timeout: 0, //永不超时
      success: function (data) {
        callback(data);
      },
    });
  }

  let nHead = document.head || document.getElementsByTagName("head")[0];
  // loadCss 用于载入css资源
  function loadCss(url, async) {
    let node = document.createElement("link");
    node.rel = "stylesheet";
    node.async = async;
    node.href = url;
    nHead.appendChild(node);
  }

  // loadJs 用于载入js资源
  function loadJs(url, async) {
    let node = document.createElement("script");
    node.charset = "utf-8";
    node.async = async;
    node.src = url;
    nHead.appendChild(node);
  }

  let cssExpr = new RegExp("\\.css");
  function loadResource(url, async) {
    if (cssExpr.test(url)) {
      loadCss(url, async);
    } else {
      loadJs(url, async);
    }
  }

  //===========对外公开的属性及方法=========
  return {
    getRequest: getRequest,
    getRequestByName: getRequestByName,
    getExplorerInfo: getExplorerInfo,
    isPCBroswer: isPCBroswer,
    clone: clone,
    jsonp: jsonp,
    getWindowSize: getWindowSize,
    getHtml: getHtml,
    loadCss: loadCss,
    loadJs: loadJs,
    loadResource: loadResource,
  };
})();
