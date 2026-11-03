/**
 * haoutil.color - 颜色相关操作模块。
 * 提供随机颜色值生成等常用方法。
 */
haoutil.color = (function () {
  //============内部私有属性及方法============

  /**
   * 生成随机颜色值
   * @return {String} 十六进制颜色字符串，形如 "#3fa2c1"
   * @example
   * haoutil.color.random(); // "#e10a7c"
   */
  function random() {
    return (
      "#" +
      (function (color) {
        return (color += "0123456789abcdef"[Math.floor(Math.random() * 16)]) && color.length == 6 ? color : arguments.callee(color);
      })("")
    );
  }

  //===========对外公开的属性及方法=========
  return {
    random: random,
  };
})();
