haoutil.storage = (function () {
    //"localStorage 相关操作类";
    var _storage;

    //添加
    function add(name, data) {
        _storage = window.localStorage;
        _storage.setItem(name, data);
    }

    //获取cookie
    function get(name) {
        _storage = window.localStorage;
        var data = _storage.getItem(name);
        return data;
    }
    function del(name) {
        _storage = window.localStorage;
        _storage.removeItem(name);
    }

    //===========对外公开的属性及方法=========
    return {
        add: add,
        get: get,
        del: del
    };
})();
