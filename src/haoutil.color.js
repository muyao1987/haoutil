/* 2017-12-8 09:39:39 | 修改 木遥（QQ：346819890） */
haoutil.color = (function () {
    // "颜色 相关操作类";
    //============内部私有属性及方法============
     

    //随机颜色
    function random() {
        return '#' +

          (function (color) {

              return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : arguments.callee(color);

          })('');
    }

     
    //===========对外公开的属性及方法=========
    return { 
        random: random
    };
})();