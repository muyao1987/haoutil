/* 2017-10-27 08:39:39 | 修改 木遥（QQ：346819890） */
haoutil.str = (function () {
    // "字符串 相关操作类";
    //============内部私有属性及方法============


    //判断字符是否是中文字符 
    function isChinese(s) {
        var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        if (!patrn.exec(s)) {
            return false;
        } else {
            return true;
        }
    }

    //格式化距离长度
    function formatLength(strlen) {
        var numlen = Number(strlen);

        if (numlen < 1000)
            return numlen.toFixed(2) + "米";
        else
            return (numlen / 1000).toFixed(2) + "千米";
    }

    //格式化面积
    function formatArea(strarea) {
        var numlen = Number(strarea);

        if (strarea < 1000000)
            return strarea.toFixed(2) + "平方米";
        else
            return (strarea / 1000000).toFixed(2) + "平方公里";
    }


    //格式化时间
    function formatTime(strtime) {
        var numtime = Number(strtime);

        if (strtime < 60)
            return strtime.toFixed(0) + "秒";
        else if (strtime >= 60 && strtime < 3600) {
            return Math.floor(strtime / 60) + "分钟" + Math.floor(strtime % 60) + "秒";
        }
        else {
            strtime = Math.floor(strtime / 60); //秒转分钟
            return Math.floor(strtime / 60) + "小时" + Math.floor(strtime % 60) + "分钟";
        }
    }



    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); //索引表

    /** 
     * @description 将二进制序列转换为Base64编码
     * @param {String}
     * @return {String}
     */
    function binToBase64(bitString) {
        var result = "";
        var tail = bitString.length % 6;
        var bitStringTemp1 = bitString.substr(0, bitString.length - tail);
        var bitStringTemp2 = bitString.substr(bitString.length - tail, tail);
        for (var i = 0; i < bitStringTemp1.length; i += 6) {
            var index = parseInt(bitStringTemp1.substr(i, 6), 2);
            result += code[index];
        }
        bitStringTemp2 += new Array(7 - tail).join("0");
        if (tail) {
            result += code[parseInt(bitStringTemp2, 2)];
            result += new Array((6 - tail) / 2 + 1).join("=");
        }
        return result;
    }

    /** 
     * @description 将base64编码转换为二进制序列
     * @param {String}
     * @return {String}
     */
    function base64ToBin(str) {
        var bitString = "";
        var tail = 0;
        for (var i = 0; i < str.length; i++) {
            if (str[i] != "=") {
                var decode = code.indexOf(str[i]).toString(2);
                bitString += (new Array(7 - decode.length)).join("0") + decode;
            } else {
                tail++;
            }
        }
        return bitString.substr(0, bitString.length - tail * 2);
    }

    /** 
     * @description 将字符转换为二进制序列
     * @param {String} str
     * @return {String}  
     */
    function stringToBin(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i).toString(2);
            result += (new Array(9 - charCode.length).join("0") + charCode);
        }
        return result;
    }

    /** 
     * @description 将二进制序列转换为字符串
     * @param {String} Bin
     */
    function BinToStr(Bin) {
        var result = "";
        for (var i = 0; i < Bin.length; i += 8) {
            result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2));
        }
        return result;
    }
    function base64(str) {
        return binToBase64(stringToBin(str));
    }

    function decodeBase64(str) {
        return BinToStr(base64ToBin(str));
    }

    //===========对外公开的属性及方法=========
    return {
        isChinese: isChinese,
        formatLength: formatLength,
        formatArea: formatArea,
        formatTime: formatTime,
        base64: base64,
        decodeBase64: decodeBase64

    };

})();