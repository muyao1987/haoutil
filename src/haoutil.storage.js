//"localStorage 相关操作类";
/**
 * haoutil.storage - localStorage 本地存储相关操作模块。
 * 基于 window.localStorage 提供键值对的存取与删除（存储值需为字符串）。
 */
haoutil.storage = (function () {
  var _storage;

  /**
   * 存入指定键值对
   * @param {String} name 存储键名
   * @param {String} data 存储值（localStorage 仅支持字符串）
   * @example
   * haoutil.storage.add("username", "mars");
   */
  function add(name, data) {
    _storage = window.localStorage;
    if (_storage == null) {
      return;
    }
    _storage.setItem(name, data);
  }

  /**
   * 获取指定键名存储的值
   * @param {String} name 存储键名
   * @return {String|null} 存储的值，不存在时返回 null（浏览器不支持 localStorage 时返回 undefined）
   * @example
   * haoutil.storage.get("username"); // "mars"
   */
  function get(name) {
    _storage = window.localStorage;
    if (_storage == null) {
      return;
    }
    var data = _storage.getItem(name);
    return data;
  }
  /**
   * 删除指定键名存储的值
   * @param {String} name 存储键名
   */
  function del(name) {
    _storage = window.localStorage;
    if (_storage == null) {
      return;
    }
    _storage.removeItem(name);
  }

  //===========对外公开的属性及方法=========
  return {
    add: add,
    get: get,
    del: del,
  };
})();
