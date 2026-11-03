/**
 * haoutil.math - 数学计算相关操作模块。
 * 提供随机数、随机数组元素、数字补零等常用方法。
 */
haoutil.math = (function () {
  //============内部私有属性及方法============

  /**
   * 生成 [min, max] 范围内的随机整数（含两端）
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @return {Number} 随机整数
   * @example
   * haoutil.math.random(1, 100); // 例如 42
   */
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * 从数组中随机取出 1 个元素
   * @param {Array} arr 目标数组
   * @return {*} 随机取出的元素
   * @example
   * haoutil.math.getArrayRandomOne(["a", "b", "c"]); // 例如 "b"
   */
  function getArrayRandomOne(arr) {
    let n = random(0, arr.length - 1);
    return arr[n];
  }

  /**
   * 按指定长度,对数字进行补零，返回指定长度的字符串
   *
   * @export
   * @param {Number|String} numStr 数字对象,示例：1234
   * @param {Number} n 指定长度，示例：8
   * @return {String} 补零后的指定长度的字符串，示例：'00001234'
   */
  function padLeft0(numStr, n) {
    numStr = String(numStr);
    let len = numStr.length;
    while (len < n) {
      numStr = "0" + numStr;
      len++;
    }
    return numStr;
  }

  //===========对外公开的属性及方法=========
  return {
    getArrayRandomOne: getArrayRandomOne,
    random: random,
    padLeft0: padLeft0,
  };
})();
