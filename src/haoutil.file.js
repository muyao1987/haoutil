/**
 * haoutil.file - 文件相关操作模块。
 * 提供浏览器端文件/图片的下载保存、base64 与 Blob 的转换等常用方法。
 */
haoutil.file = (function () {
  //============内部私有属性及方法============

  /**
   * 通过临时创建的 <a> 标签触发浏览器下载一个 Blob 对象
   * @param {String} fileName 保存的文件名（含扩展名）
   * @param {Blob} blob 要下载的 Blob 对象
   */
  function _download(fileName, blob) {
    var aLink = document.createElement("a");
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  }

  /**
   * 将字符串内容下载保存为文件
   * @param {String} fileName 保存的文件名（含扩展名）
   * @param {String} string 要保存的字符串内容
   * @example
   * haoutil.file.downloadFile("hello.txt", "你好，world");
   */
  function downloadFile(fileName, string) {
    var blob = new Blob([string]);
    _download(fileName, blob);
  }

  /**
   * 将 canvas 画板导出为 png 图片并下载
   * @param {String} name 保存的文件名（不含扩展名，自动追加 .png）
   * @param {HTMLCanvasElement} canvas 要导出的 canvas 画板对象
   */
  function downloadImage(name, canvas) {
    var base64 = canvas.toDataURL("image/png");
    var blob = base64Img2Blob(base64);
    _download(name + ".png", blob);
  }

  /**
   * 将 base64 编码的图片数据下载保存为 png 图片
   * @param {String} name 保存的文件名（不含扩展名，自动追加 .png）
   * @param {String} base64 图片的 base64 编码字符串，形如 "data:image/png;base64,..."
   */
  function downloadBase64Image(name, base64) {
    var blob = base64Img2Blob(base64);
    _download(name + ".png", blob);
  }

  /**
   * 将 base64 编码的图片字符串转换为 Blob 对象
   * @param {String} code 图片的 base64 编码字符串，形如 "data:image/png;base64,..."
   * @return {Blob} 转换后的 Blob 对象（type 取自 base64 头部声明的 MIME 类型）
   */
  function base64Img2Blob(code) {
    var parts = code.split(";base64,");
    var contentType = parts[0].split(":")[1];
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
    base64Img2Blob: base64Img2Blob,
  };
})();
