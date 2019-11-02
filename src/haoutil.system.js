/* 2017-10-27 08:31:05 | 修改 木遥（QQ：346819890） */
haoutil.system = (function () {
    // 系统级  或 浏览器 相关操作类"; 
    //============内部私有属性及方法============

    //url参数获取 
    function getRequest(target) {
        target = target || window;
        var url = target.location.search; //获取url中"?"符后的字串   
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    function getRequestByName(name, defval, target) {
        target = target || window;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = target.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return defval;
    }

    function getWindowSize() {
        if (typeof window.innerWidth != 'undefined') {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }

    //获取浏览器类型及版本
    function getExplorerInfo() {
        var explorer = window.navigator.userAgent.toLowerCase();
        //ie 
        if (explorer.indexOf("msie") >= 0) {
            var ver = Number(explorer.match(/msie ([\d]+)/)[1]);
            return { type: "IE", version: ver };
        }
        //firefox 
        else if (explorer.indexOf("firefox") >= 0) {
            var ver = Number(explorer.match(/firefox\/([\d]+)/)[1]);
            return { type: "Firefox", version: ver };
        }
        //Chrome
        else if (explorer.indexOf("chrome") >= 0) {
            var ver = Number(explorer.match(/chrome\/([\d]+)/)[1]);
            return { type: "Chrome", version: ver };
        }
        //Opera
        else if (explorer.indexOf("opera") >= 0) {
            var ver = Number(explorer.match(/opera.([\d]+)/)[1]);
            return { type: "Opera", version: ver };
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            var ver = Number(explorer.match(/version\/([\d]+)/)[1]);
            return { type: "Safari", version: ver };
        }
        return { type: explorer, version: -1 };
    }


    //浏览器
    function isPCBroswer() {
        var sUserAgent = navigator.userAgent.toLowerCase();

        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone/i) == "iphone";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return false;
        } else {
            return true;
        }
    }


    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; ++i) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (typeof obj === 'object') {
            var copy = {};
            for (var attr in obj) {
                if (attr == "_layer" || attr == "_layers" || attr == "_parent") continue;

                if (obj.hasOwnProperty(attr))
                    copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        return obj;
    }

    function jsonp(url, data, callback) {
        var jsonp = function (url, data, callback) {
            var fnSuffix = Math.random().toString().replace('.', '');
            var cbFuncName = 'my_json_cb_' + fnSuffix;
            // 不推荐
            window[cbFuncName] = callback;
            var querystring = url.indexOf('?') == -1 ? '?' : '&';
            for (var key in data) {
                querystring += key + '=' + data[key] + '&';
            }
            querystring += 'callback=' + cbFuncName;
            var scriptElement = document.createElement('script');
            scriptElement.src = url + querystring;
            document.body.appendChild(scriptElement);
        };
        window.$jsonp = jsonp;
    }

    //公共方法
    function getHtml(url, callback) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'html',
            timeout: 0, //永不超时
            success: function (data) {
                callback(data);
            }
        });
    }

    var nHead = document.head || document.getElementsByTagName('head')[0];
    // loadCss 用于载入css资源
    function loadCss(url, async) {
        var node = document.createElement('link');
        node.rel = 'stylesheet';
        node.async = async;
        node.href = url;
        nHead.appendChild(node);
    }

    // loadJs 用于载入js资源
    function loadJs(url, async) {
        var node = document.createElement('script');
        node.charset = 'utf-8';
        node.async = async;
        node.src = url;
        nHead.appendChild(node);
    }

    var cssExpr = new RegExp('\\.css');
    function loadResource(url, async) {
        if (cssExpr.test(url)) {
            loadCss(url, async);
        } else {
            loadJs(url, async);
        }
    }

    //===========对外公开的属性及方法=========
    return {
        getRequest: getRequest,
        getRequestByName: getRequestByName,
        getExplorerInfo: getExplorerInfo,
        isPCBroswer: isPCBroswer,
        clone: clone,
        jsonp: jsonp,
        getWindowSize: getWindowSize,
        getHtml: getHtml,
        loadCss: loadCss,
        loadJs: loadJs,
        loadResource: loadResource
    };
})();