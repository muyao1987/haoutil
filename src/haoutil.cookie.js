/**
 * haoutil.cookie - Cookie 相关操作模块。
 * 提供浏览器 Cookie 的写入、读取、删除；
 * 在 HTML5+ 移动端（5+ Runtime）环境下可自动改用 plus.navigator 存取。
 */
haoutil.cookie = (function () {
  //============内部私有属性及方法============
  var _isH5Mobile;
  /**
   * 设置是否为 HTML5+ 移动端（5+ Runtime）环境。
   * 为 true 且存在 window.plus 时，Cookie 读写走 plus.navigator，否则走 document.cookie
   * @param {Boolean} value 是否为 H5 移动端环境
   */
  function isH5Mobile(value) {
    _isH5Mobile = value;
  }

  /**
   * 写入 Cookie（path 为根路径 "/"）
   * @param {String} name Cookie 名称
   * @param {String} value Cookie 值
   * @param {Number} [days] 有效天数；大于 0 时按天数设置过期时间，缺省或为 0 时长期有效（关闭浏览器不失效）
   * @example
   * haoutil.cookie.add("token", "abc123", 7); // 保存 7 天
   */
  function add(name, value, days) {
    //判断是否设置过期时间,0代表关闭浏览器时失效
    var date;
    if (days > 0) {
      date = new Date();
      date.setTime(date.getTime + days * 24 * 60 * 60 * 1000); //单位是天后失效
    } else {
      date = new Date(0x7fffffff * 1e3);
    }
    var cookieString = name + "=" + escape(value) + ";path=/;expires=" + date.toGMTString();

    if (_isH5Mobile && window["plus"] != null) {
      window["plus"].navigator.setCookie(name, cookieString);
    } else {
      document.cookie = cookieString;
    }
  }

  /**
   * 读取指定名称的 Cookie 值
   * @param {String} name Cookie 名称
   * @return {String|null} Cookie 值，不存在时返回 null
   * @example
   * haoutil.cookie.get("token"); // "abc123"
   */
  function get(name) {
    var strCookie;
    if (_isH5Mobile && window["plus"] != null) {
      strCookie = window["plus"].navigator.getCookie(name);
      if (strCookie == null) {
        return null;
      }
    } else {
      strCookie = document.cookie;
    }

    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (arr[0] == name) {
        return unescape(arr[1]);
      }
    }
    return null;
  }

  /**
   * 删除指定名称的 Cookie（通过设置一个已过期的时间实现）
   * @param {String} name Cookie 名称
   */
  function del(name) {
    if (_isH5Mobile && window["plus"] != null) {
      window["plus"].navigator.removeCookie(name);
    } else {
      var date = new Date();
      date.setTime(date.getTime() - 10000); //设定一个过去的时间即可
      document.cookie = name + "=v; expires=" + date.toGMTString();
    }
  }

  //===========对外公开的属性及方法=========
  return {
    isH5Mobile: isH5Mobile,
    add: add,
    get: get,
    del: del,
  };
})();
