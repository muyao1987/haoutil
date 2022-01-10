haoutil.array = (function () {
  //============内部私有属性及方法============

  function indexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        return i;
      }
    }
    return -1;
  }
  function remove(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
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
