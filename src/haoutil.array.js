/**
 * haoutil.array - 数组相关操作模块。
 * 提供数组元素的查找、移除、插入等常用方法。
 */
haoutil.array = (function () {
  //============内部私有属性及方法============

  /**
   * 查找指定元素在数组中第一次出现的下标（使用 == 宽松比较）
   * @param {Array} arr 目标数组
   * @param {*} val 要查找的元素
   * @return {Number} 元素所在下标，未找到时返回 -1
   * @example
   * haoutil.array.indexOf([1, 2, 3], 2); // 1
   */
  function indexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        return i;
      }
    }
    return -1;
  }
  /**
   * 移除数组中第一次出现的指定元素（使用 == 宽松比较），直接修改原数组
   * @param {Array} arr 目标数组
   * @param {*} val 要移除的元素
   */
  function remove(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  /**
   * 在数组指定位置插入元素，直接修改原数组
   * @param {Array} arr 目标数组
   * @param {*} item 要插入的元素
   * @param {Number} [index=0] 插入位置的下标，缺省时插入到数组头部
   * @example
   * haoutil.array.insert([1, 3], 2, 1); // [1, 2, 3]
   */
  function insert(arr, item, index) {
    if (index == null) {
      index = 0;
    }
    arr.splice(index, 0, item);
  }

  //===========对外公开的属性及方法=========
  return {
    indexOf: indexOf,
    remove: remove,
    insert: insert,
  };
})();
