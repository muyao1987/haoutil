/* github地址：https://github.com/muyao1987/haoutil  木遥（QQ：346819890） */

var haoutil = haoutil || {};

haoutil.version = "2.3";
haoutil.name = "木遥通用常用JS方法类库";
haoutil.author = "木遥（QQ：346819890） https://github.com/muyao1987/haoutil";




haoutil.msg = function (msg) {
    if (window.toastr)//此方法需要引用toastr 
        toastr.info(msg);
    else if (window.layer)
        layer.msg(msg);//此方法需要引用layer.js
    else
        alert(msg);
};
haoutil.tip = haoutil.msg;

haoutil.alert = function (msg, title) {
    if (window.toastr)//此方法需要引用toastr 
        toastr.warning(msg, title);
    else if (window.layer)//此方法需要引用layer.js
        layer.alert(msg, {
            title: title || '提示',
            skin: 'layui-layer-lan layer-mars-dialog2',
            closeBtn: 0,
            anim: 0
        });
    else
        alert(msg);
};

haoutil.loading = {
    index: -1,
    show: function (param) {
        this.close();

        if (window.NProgress) {//此方法需要引用NProgress 
            param = param || {};
            if (param.color) {
                param.template = '<div class="bar ' + (param.className || '') + '" style="background-color:' + param.color + ';" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>';
            }
            else {
                param.template = '<div class="bar ' + (param.className || '') + '" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>';
            }

            NProgress.configure(param);
            NProgress.start();
        }
        else if (window.layer) {//此方法需要引用layer.js
            this.index = layer.load(2, { shade: [0.3, '#000000'] });
        }
    },
    hide: function () {
        this.close();
    },
    close: function () {
        if (window.NProgress) {
            NProgress.done(true);
        }
        else if (window.layer) {
            if (this.index != -1)
                layer.close(this.index);
            this.index = -1;
        }
    }
};


if (window.noCopy) {
    function KeyDown() {
        //console.log("ASCII代码是："+event.keyCode);

        if (
                event.keyCode == 112 ||             //屏蔽 F1   
                event.keyCode == 123 ||             //屏蔽 F12 
                (event.ctrlKey && event.keyCode == 82) ||       //屏蔽 Ctrl + R
                (event.ctrlKey && event.keyCode == 78) ||       //屏蔽 Ctrl + N
                (event.shiftKey && event.keyCode == 121) ||      //屏蔽  shift+F10
                (event.altKey && event.keyCode == 115) ||        //屏蔽  Alt+F4
            (event.srcElement.tagName == "A" && event.shiftKey)//屏蔽 shift 加鼠标左键新开一网页
            ) {
            event.keyCode = 0;
            event.returnValue = false;
            return false;
        }

        return true;
    }
    //键盘按下 
    document.onkeydown = KeyDown;
    document.oncontextmenu = function () {
        event.returnValue = false;
    };
    document.onselectstart = function () {
        event.returnValue = false;
    };
    document.oncopy = function () {
        event.returnValue = false;
    };
}


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