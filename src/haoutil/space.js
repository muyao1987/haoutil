/* github地址：https://github.com/muyao1987/haoutil  木遥（QQ：346819890） */

var haoutil = haoutil || {};

haoutil.version = "2.2";
haoutil.name = "木遥通用常用JS方法类库";
haoutil.author = "木遥（QQ：346819890） https://github.com/muyao1987/haoutil";



//此方法需要引用layer.js
haoutil.msg = function (msg) {
    layer.msg(msg);
};
haoutil.tip = haoutil.msg;

haoutil.alert = function (msg, title) {
    layer.alert(msg, {
        title: title || '提示',
        skin: 'layui-layer-lan layer-mars-dialog2', 
        closeBtn: 0,
        anim: 0
    });
};
haoutil.loading = {
    index: -1,
    show: function (param) {
        this.close();
        if (param == null) {
            param = { style: 2, shade: [0.3, '#000000'] };
        }
        else if (haoutil.isutil.isString(param)) { 
            param = { title: param, style: 2, shade: [0.3, '#000000'] };
        } 
        this.index = layer.load(param.style, param);
    },
    hide: function () {
        this.close();
    },
    close: function () {
        if (this.loadingIdx != -1)
            layer.close(this.loadingIdx);
        this.loadingIdx = -1;
    }
};







//function expose() {
//    var old = window.haoutil;

//    haoutil.noConflict = function () {
//        window.haoutil = old;
//        return this;
//    };

//    window.haoutil = haoutil;
//}

//// define haoutil for Node module pattern loaders, including Browserify
//if (typeof module === 'object' && typeof module.exports === 'object') {
//    module.exports = haoutil;

//    // define haoutil as an AMD module
//} else if (typeof define === 'function' && define.amd) {
//    define(haoutil);
//}

//// define gispace as a global haoutil variable, saving the original haoutil to restore later if needed
//if (typeof window !== 'undefined') {
//    expose();
//}