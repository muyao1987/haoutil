// 系统级 或 浏览器 相关操作类
/**
 * haoutil.system - 系统级及浏览器相关操作模块。
 * 提供 URL 参数解析、浏览器信息检测、对象克隆、JSONP、
 * 动态加载 JS/CSS 资源等常用方法。
 */
haoutil.system = (function () {
  //============内部私有属性及方法============

  /**
   * 解析当前页面 URL 中"?"后的查询参数，返回参数键值对（值经过 decodeURI 解码）
   * @param {Window} [target] 目标窗口对象，缺省为当前 window（可传入 iframe 的 window）
   * @return {Object} 参数键值对对象，形如 {id: "1", name: "mars"}
   * @example
   * // 页面地址为 index.html?id=1&type=map
   * haoutil.system.getRequest(); // {id: "1", type: "map"}
   */
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

  /**
   * 获取当前页面 URL 中指定名称的参数值（值经过 decodeURI 解码）
   * @param {String} name 参数名称
   * @param {*} [defval] 未找到参数时返回的默认值
   * @param {Window} [target] 目标窗口对象，缺省为当前 window
   * @return {String|*} 参数值，未找到时返回 defval
   * @example
   * // 页面地址为 index.html?id=1
   * haoutil.system.getRequestByName("id", "0"); // "1"
   */
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

  /**
   * 获取浏览器窗口的宽高尺寸
   * @return {Object} 形如 {width: 1920, height: 1080} 的尺寸对象
   */
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

  /**
   * 获取当前浏览器的类型及版本号（基于 userAgent 解析）
   * @return {Object} 形如 {type: "Chrome", version: 120} 的对象；未能识别时 type 为 userAgent 字符串、version 为 -1
   */
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

  /**
   * 判断当前是否为 PC 浏览器环境（依据 userAgent 排除 iPad、iPhone、Android 等移动端）
   * @return {Boolean} PC 浏览器环境时返回 true，移动端返回 false
   */
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

  /**
   * 深拷贝对象（支持 Date、数组、普通对象的递归拷贝）
   * @param {*} obj 要拷贝的目标对象
   * @param {Array} [removeKeys] 需要剔除的属性名数组，缺省为 ["_layer"]
   * @param {Number} [level=9] 递归拷贝的最大层级深度，避免循环引用导致死循环
   * @return {*} 拷贝后的新对象；非对象类型时原样返回
   * @example
   * var obj2 = haoutil.system.clone({name: "mars", _layer: null}); // obj2 不含 _layer 属性
   */
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

  /**
   * 定义 JSONP 跨域请求的辅助方法，并挂载到 window.$jsonp 上；
   * 调用 window.$jsonp(url, data, callback) 时会动态插入 script 标签完成请求，
   * 服务端需按 "callback名称(数据)" 的格式返回
   * @param {String} url 请求地址（占位参数，实际调用时传入 window.$jsonp）
   * @param {Object} data 请求参数（占位参数）
   * @param {Function} callback 请求成功后的回调函数（占位参数）
   */
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

  /**
   * 通过 jQuery 发起 GET 请求获取 HTML 内容（依赖页面已引入 jQuery）
   * @param {String} url 请求地址
   * @param {Function} callback 请求成功后的回调函数，参数为返回的 HTML 字符串
   */
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
  /**
   * 动态加载指定的 CSS 样式文件
   * @param {String} url CSS 文件地址
   * @param {Boolean} [async] 是否异步加载
   */
  function loadCss(url, async) {
    let node = document.createElement("link");
    node.rel = "stylesheet";
    node.async = async;
    node.href = url;
    nHead.appendChild(node);
  }

  /**
   * 动态加载指定的 JS 脚本文件
   * @param {String} url JS 文件地址
   * @param {Boolean} [async] 是否异步加载
   */
  function loadJs(url, async) {
    let node = document.createElement("script");
    node.charset = "utf-8";
    node.async = async;
    node.src = url;
    nHead.appendChild(node);
  }

  let cssExpr = new RegExp("\\.css");
  /**
   * 根据地址后缀自动选择加载 CSS 或 JS 资源（以 .css 结尾时加载样式，否则加载脚本）
   * @param {String} url 资源文件地址
   * @param {Boolean} [async] 是否异步加载
   */
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
