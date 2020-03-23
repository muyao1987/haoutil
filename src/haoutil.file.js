/* 2017-8-31 17:26:30 | 修改 木遥（微信:  http://marsgis.cn/weixin.html） */
haoutil.file = (function () {
    //"文件 相关操作类";
    //============内部私有属性及方法============

    function _download(fileName, blob) {
        var aLink = document.createElement('a');
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
    }


    //下载保存文件
    function downloadFile(fileName, string) {
        var blob = new Blob([string]);
        _download(fileName, blob);
    }


    //下载导出图片
    function downloadImage(name, canvas) {
        var base64 = canvas.toDataURL("image/png");
        var blob = base64Img2Blob(base64);
        _download(name + '.png', blob);
    }

    //下载导出图片
    function downloadBase64Image(name, base64) { 
        var blob = base64Img2Blob(base64);
        _download(name + '.png', blob);
    }


    function base64Img2Blob(code) {
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }


    //===========对外公开的属性及方法=========
    return {
        download: _download,
        downloadFile: downloadFile,
        downloadImage: downloadImage,
        downloadBase64Image: downloadBase64Image,
        base64Img2Blob: base64Img2Blob
    };
})();