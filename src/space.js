/**
 * haoutil - 命名空间及顶层通用方法。
 * 定义全局命名空间 haoutil 及版本信息，并提供消息提示（msg/tip/oneMsg）、
 * 弹窗提示（alert）、加载中遮罩（loading）等顶层方法；
 * 提示组件按 toastr > layer > alert 的优先级自动降级。
 */
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

/**
 * 消息提示，优先使用 toastr，其次 layer，均未引入时降级为 alert
 * @param {String|Object} [msg] 提示内容，为空时提示“未知”，为对象时自动 JSON.stringify
 */
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
/** haoutil.tip 为 haoutil.msg 的别名，用法相同 */
haoutil.tip = haoutil.msg;

/**
 * 同一 key 仅提示一次的消息（依赖 haoutil.storage 记录是否已提示）
 * @param {String|Object} msg 提示内容
 * @param {String} key 用于标记是否已提示的存储键名
 */
haoutil.oneMsg = function (msg, key) {
  if (!haoutil.storage.get(key)) {
    haoutil.msg(msg);
    haoutil.storage.add(key, true);
  }
};

/**
 * 弹窗提示，优先使用 layer（默认使用 mars-dialog 风格皮肤），未引入时降级为 alert
 * @param {String|Object} [msg] 弹窗内容，为空时提示“未知”，为对象时自动 JSON.stringify
 * @param {String} [title] 弹窗标题，缺省为“提示”
 */
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

/**
 * 加载中遮罩控制对象。
 * 优先使用 NProgress（可配置 color、className 等），未引入时降级为 layer 的 load 遮罩
 */
haoutil.loading = {
  index: -1,
  /**
   * 显示加载中遮罩
   * @param {Object} [param] 配置参数，支持 color（进度条颜色）、className（样式类名）等，直接透传给 NProgress.configure
   */
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
  /** 隐藏加载中遮罩（同 close） */
  hide: function () {
    this.close();
  },
  /** 关闭加载中遮罩 */
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
