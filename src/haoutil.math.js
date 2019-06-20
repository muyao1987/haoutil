/* 2017-8-10 13:50:49 | 修改 木遥（QQ：346819890） */
haoutil.math = (function () {
   // "数学 相关操作类";
    //============内部私有属性及方法============


    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    //随机数组中随机取1个元素
    function getArrayRandomOne(arr) {
        var n = random(0, arr.length - 1);
        return arr[n];
    }

    //补零padLeft0
    function padLeft0(numStr, len) {
        numStr = String(numStr);
        var len = numStr.length;
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
        padLeft0: padLeft0
    };
})();