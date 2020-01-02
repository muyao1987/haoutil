/* 2017-12-5 13:38:32 | 修改 木遥（QQ：346819890） */
haoutil.isutil = (function () {
    // "判断 相关操作类";

    //============内部私有属性及方法============
    function isArray(obj) {
        if (typeof Array.isArray === "function") {
            return Array.isArray(obj);
        } else {
            return Object.prototype.toString.call(obj) === "[object Array]";
        }
    } 
    
    function isString(str) {
        return (typeof str == 'string') && str.constructor == String;
    }

    function isNumber(obj) {
        return (typeof obj == 'number') && obj.constructor == Number;
    }

    function isDate(obj) {
        return (typeof obj == 'object') && obj.constructor == Date;
    }

    function isFunction(obj) {
        return (typeof obj == 'function') && obj.constructor == Function;
    }

    function isObject(obj) {
        return (typeof obj == 'object') && obj.constructor == Object;
    }



    function isNull(value) { 
        if (value == null) return true;
        if (isString(value) && value == "") return true;
        if (isNumber(value) && isNaN(value)) return true;

        return false;
    }

    function isNotNull(value) { 
        return !isNull(value);
    }

    //===========对外公开的属性及方法=========
    return {
        isNull: isNull,
        isNotNull: isNotNull,
        isArray: isArray,
        isString: isString,
        isNumber: isNumber,
        isDate: isDate,
        isFunction: isFunction,
        isObject: isObject
    };
})();