/**
 * haoutil.isutil - 类型判断相关操作模块。
 * 提供常用数据类型的判断，以及“是否为空”的通用判断。
 */
haoutil.isutil = (function () {
  //============内部私有属性及方法============

  /**
   * 判断是否为数组
   * @param {*} obj 待判断的值
   * @return {Boolean} 是数组时返回 true
   */
  function isArray(obj) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }
  }

  /**
   * 判断是否为字符串
   * @param {*} str 待判断的值
   * @return {Boolean} 是字符串时返回 true
   */
  function isString(str) {
    return typeof str == "string" && str.constructor == String;
  }

  /**
   * 判断是否为数值类型（number）
   * @param {*} obj 待判断的值
   * @return {Boolean} 是数值时返回 true
   */
  function isNumber(obj) {
    return typeof obj == "number" && obj.constructor == Number;
  }

  /**
   * 判断是否为日期对象
   * @param {*} obj 待判断的值
   * @return {Boolean} 是 Date 对象时返回 true
   */
  function isDate(obj) {
    return typeof obj == "object" && obj.constructor == Date;
  }

  /**
   * 判断是否为函数
   * @param {*} obj 待判断的值
   * @return {Boolean} 是函数时返回 true
   */
  function isFunction(obj) {
    return typeof obj == "function" && obj.constructor == Function;
  }

  /**
   * 判断是否为普通对象（Object，不含数组、Date 等）
   * @param {*} obj 待判断的值
   * @return {Boolean} 是普通对象时返回 true
   */
  function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  /**
   * 判断是否为“空值”：null、undefined、空字符串、NaN 均视为空
   * @param {*} value 待判断的值
   * @return {Boolean} 为空时返回 true
   * @example
   * haoutil.isutil.isNull(""); // true
   * haoutil.isutil.isNull(0); // false
   */
  function isNull(value) {
    if (value == null) {
      return true;
    }
    if (isString(value) && value == "") {
      return true;
    }
    if (isNumber(value) && isNaN(value)) {
      return true;
    }

    return false;
  }

  /**
   * 判断是否为非空值（isNull 的取反）
   * @param {*} value 待判断的值
   * @return {Boolean} 非空时返回 true
   */
  function isNotNull(value) {
    return !isNull(value);
  }

  //===========对外公开的属性及方法=========
  return {
    isNull: isNull,
    isNotNull: isNotNull,
    isArray: isArray,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate,
    isFunction: isFunction,
    isObject: isObject,
  };
})();
