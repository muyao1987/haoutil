/* 2017-10-10 13:32:56 | 修改 木遥（微信:  http://marsgis.cn/weixin.html） */
haoutil.cookie = (function () {
    //"cookie 相关操作类";
    //============内部私有属性及方法============ 
    var _isH5Mobile;
    function isH5Mobile(value) {
        _isH5Mobile = value;
    }

    //添加cookie
    function add(name, value, days) {

        //判断是否设置过期时间,0代表关闭浏览器时失效
        var date;
        if (days > 0) {
            date = new Date();
            date.setTime(date.getTime + days * 24 * 60 * 60 * 1000); //单位是天后失效
        }
        else {
            date = new Date(0x7fffffff * 1e3);
        }
        var cookieString = name + "=" + escape(value) + "; expires=" + date.toGMTString();

        if (_isH5Mobile && window['plus'] != null) {
            plus.navigator.setCookie(name, cookieString);
        } else {
            document.cookie = cookieString;
        }
    }

    //获取cookie
    function get(name) {
        var strCookie
        if (_isH5Mobile && window['plus'] != null) {
            strCookie = plus.navigator.getCookie(name);
            if (strCookie == null) return null;

        } else {
            strCookie = document.cookie;
        }


        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) {
                return unescape(arr[1]);
            }
        }
        return null;
    }

    //删除cookie
    function del(name) {
        if (_isH5Mobile && window['plus'] != null) {
            plus.navigator.removeCookie(name);
        }
        else {
            var date = new Date();
            date.setTime(date.getTime() - 10000); //设定一个过去的时间即可
            document.cookie = name + "=v; expires=" + date.toGMTString();
        }
    }

    //===========对外公开的属性及方法=========
    return {
        isH5Mobile: isH5Mobile,
        add: add,
        get: get,
        del: del
    };
})();
