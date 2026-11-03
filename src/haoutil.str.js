// "字符串 相关操作类";
/**
 * haoutil.str - 字符串相关操作模块。
 * 提供中文字符判断、长度/面积/时长的单位换算格式化、Base64 编解码等常用方法。
 */
haoutil.str = (function () {
  //============内部私有属性及方法============

  /**
   * 判断字符串中是否含有中文字符（含全角标点区间）
   * @param {String} s 待判断的字符串
   * @return {Boolean} 含有中文时返回 true
   * @example
   * haoutil.str.isChinese("hello"); // false
   * haoutil.str.isChinese("你好"); // true
   */
  function isChinese(s) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (!patrn.exec(s)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 进行单位换算，格式化显示长度值
   * @param {Number|String} val 长度值（单位为米）
   * @param {String} [unit] 目标单位，支持 "m"（米）、"km"（公里）、"mile"（海里）、"zhang"（丈）；缺省或为 "auto" 时按值大小自动选择米或公里
   * @return {String} 格式化后的字符串，入参为空时返回空字符串
   * @example
   * haoutil.str.formatLength(800); // "800.00米"
   * haoutil.str.formatLength(1500); // "1.50公里"
   * haoutil.str.formatLength(1000, "mile"); // "0.54海里"
   */
  function formatLength(val, unit) {
    if (val == null) {
      return "";
    }
    val = Number(val);

    if (unit == null || unit == "auto") {
      if (val < 1000) {
        unit = "m";
      } else {
        unit = "km";
      }
    }

    var valstr = "";
    switch (unit) {
      default:
      case "m":
        valstr = val.toFixed(2) + "米";
        break;
      case "km":
        valstr = (val * 0.001).toFixed(2) + "公里";
        break;
      case "mile":
        valstr = (val * 0.00054).toFixed(2) + "海里";
        break;
      case "zhang":
        valstr = (val * 0.3).toFixed(2) + "丈";
        break;
    }
    return valstr;
  }

  /**
   * 进行单位换算，格式化显示面积值
   * @param {Number|String} val 面积值（单位为平方米）
   * @param {String} [unit] 目标单位，支持 "m"（平方米）、"km"（平方公里）、"mu"（亩）、"ha"（公顷）；缺省或为 "auto" 时按值大小自动选择平方米或平方公里
   * @return {String} 格式化后的字符串，入参为空时返回空字符串
   * @example
   * haoutil.str.formatArea(800); // "800.00平方米"
   * haoutil.str.formatArea(3000, "mu"); // "4.50亩"
   */
  function formatArea(val, unit) {
    if (val == null) {
      return "";
    }
    val = Number(val);

    if (unit == null || unit == "auto") {
      if (val < 1000000) {
        unit = "m";
      } else {
        unit = "km";
      }
    }

    var valstr = "";
    switch (unit) {
      default:
      case "m":
        valstr = val.toFixed(2) + "平方米";
        break;
      case "km":
        valstr = (val / 1000000).toFixed(2) + "平方公里";
        break;
      case "mu":
        valstr = (val * 0.0015).toFixed(2) + "亩";
        break;
      case "ha":
        valstr = (val * 0.0001).toFixed(2) + "公顷";
        break;
    }

    return valstr;
  }

  /**
   * 将秒数格式化为易读的时长描述
   * @param {Number|String} strtime 时长（单位为秒）
   * @return {String} 格式化后的时长，形如 "59秒"、"5分钟30秒"、"2小时30分钟"
   * @example
   * haoutil.str.formatTime(330); // "5分钟30秒"
   */
  function formatTime(strtime) {
    strtime = Number(strtime) || 0;

    if (strtime < 60) {
      return strtime.toFixed(0) + "秒";
    } else if (strtime >= 60 && strtime < 3600) {
      var miao = Math.floor(strtime % 60);
      return Math.floor(strtime / 60) + "分钟" + (miao != 0 ? miao + "秒" : "");
    } else {
      strtime = Math.floor(strtime / 60); //秒转分钟
      return Math.floor(strtime / 60) + "小时" + Math.floor(strtime % 60) + "分钟";
    }
  }

  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); //索引表

  /**
   * @description 将二进制序列转换为Base64编码
   * @param {String} bitString 二进制序列
   * @return {String} Base64编码后的字符串
   */
  function binToBase64(bitString) {
    var result = "";
    var tail = bitString.length % 6;
    var bitStringTemp1 = bitString.substr(0, bitString.length - tail);
    var bitStringTemp2 = bitString.substr(bitString.length - tail, tail);
    for (var i = 0; i < bitStringTemp1.length; i += 6) {
      var index = parseInt(bitStringTemp1.substr(i, 6), 2);
      result += code[index];
    }
    bitStringTemp2 += new Array(7 - tail).join("0");
    if (tail) {
      result += code[parseInt(bitStringTemp2, 2)];
      result += new Array((6 - tail) / 2 + 1).join("=");
    }
    return result;
  }

  /**
   * @description 将base64编码转换为二进制序列
   * @param {String} str Base64编码的字符串
   * @return {String} 二进制序列
   */
  function base64ToBin(str) {
    var bitString = "";
    var tail = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] != "=") {
        var decode = code.indexOf(str[i]).toString(2);
        bitString += new Array(7 - decode.length).join("0") + decode;
      } else {
        tail++;
      }
    }
    return bitString.substr(0, bitString.length - tail * 2);
  }

  /**
   * @description 将字符转换为二进制序列
   * @param {String} str
   * @return {String}
   */
  function stringToBin(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i).toString(2);
      result += new Array(9 - charCode.length).join("0") + charCode;
    }
    return result;
  }

  /**
   * @description 将二进制序列转换为字符串
   * @param {String} Bin
   */
  function BinToStr(Bin) {
    var result = "";
    for (var i = 0; i < Bin.length; i += 8) {
      result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2));
    }
    return result;
  }
  /**
   * 将字符串编码为 Base64
   * @param {String} str 原始字符串
   * @return {String} Base64 编码后的字符串
   * @example
   * haoutil.str.base64("hello"); // "aGVsbG8="
   */
  function base64(str) {
    return binToBase64(stringToBin(str));
  }

  /**
   * 将 Base64 编码的字符串解码还原
   * @param {String} str Base64 编码的字符串
   * @return {String} 解码后的原始字符串
   * @example
   * haoutil.str.decodeBase64("aGVsbG8="); // "hello"
   */
  function decodeBase64(str) {
    return BinToStr(base64ToBin(str));
  }

  //===========对外公开的属性及方法=========
  return {
    isChinese: isChinese,
    formatLength: formatLength,
    formatArea: formatArea,
    formatTime: formatTime,
    base64: base64,
    decodeBase64: decodeBase64,
  };
})();
