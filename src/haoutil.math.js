haoutil.math = (function () {
  // "数学 相关操作类";
  //============内部私有属性及方法============

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //随机数组中随机取1个元素
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
