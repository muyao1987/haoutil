var haoutil = haoutil || {};

if (typeof exports === "object") {
  // eslint-disable-next-line no-undef
  exports.haoutil = haoutil;
} else {
  window.haoutil = haoutil;
}

haoutil.version = "2.6.0";
haoutil.update = "2022-01-10";
haoutil.name = "木遥 通用常用JS方法类库";
haoutil.author = "木遥 , 微信: http://marsgis.cn/weixin.html";
haoutil.website = "https://github.com/muyao1987/haoutil";

haoutil.msg = function (msg) {
  if (haoutil.isutil.isNull(msg)) {
    msg = "未知";
  } else {
    if (typeof msg == "object") {
      msg = JSON.stringify(msg);
    }
  }
  if (window.toastr) {
    //此方法需要引用toastr
    toastr.info(msg);
  } else if (window.layer) {
    window.layer.msg(msg);
  }
  //此方法需要引用layer.js
  else {
    alert(msg);
  }
};
haoutil.tip = haoutil.msg;

haoutil.oneMsg = function (msg, key) {
  if (!haoutil.storage.get(key)) {
    haoutil.msg(msg);
    haoutil.storage.add(key, true);
  }
};

haoutil.alert = function (msg, title) {
  if (haoutil.isutil.isNull(msg)) {
    msg = "未知";
  } else {
    if (typeof msg == "object") {
      msg = JSON.stringify(msg);
    }
  }
  if (window.layer) {
    //此方法需要引用layer.js
    window.layer.alert(msg, {
      title: title || "提示",
      skin: "layui-layer-lan layer-mars-dialog",
      closeBtn: 0,
      anim: 0,
    });
  } else {
    alert(msg);
  }
};

haoutil.loading = {
  index: -1,
  show: function (param) {
    this.close();

    if (window.NProgress) {
      //此方法需要引用NProgress
      param = param || {};
      if (param.color) {
        param.template =
          '<div class="bar ' +
          (param.className || "") +
          '" style="background-color:' +
          param.color +
          ';" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>';
      } else {
        param.template =
          '<div class="bar ' +
          (param.className || "") +
          '" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>';
      }

      window.NProgress.configure(param);
      window.NProgress.start();
    } else if (window.layer) {
      //此方法需要引用layer.js
      this.index = window.layer.load(2, { shade: [0.3, "#000000"] });
    }
  },
  hide: function () {
    this.close();
  },
  close: function () {
    if (window.NProgress) {
      window.NProgress.done(true);
    } else if (window.layer) {
      if (this.index != -1) {
        window.layer.close(this.index);
      }
      this.index = -1;
    }
  },
};
