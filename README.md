# haoutil

个人开发的常用 js 的静态方法类库，使用 gulp 打包。

浏览器端通用工具函数库，涵盖数组、颜色、Cookie、文件下载、类型判断、数学计算、localStorage 存储、字符串处理、系统/浏览器检测等常用模块，采用 ES5 + IIFE + 全局命名空间风格，引入即可用，无任何必选依赖。

## 安装引入

npm 安装：

```bash
npm install haoutil
```

页面 script 标签引入（推荐使用未压缩版便于调试）：

```html
<script src="dist/haoutil-src.js"></script>
```

CommonJS / Node 环境引入：

```js
const haoutil = require("haoutil");
```

## API 模块总览

| 模块 | 说明 |
| --- | --- |
| `haoutil.array` | 数组操作：查找、移除、插入元素 |
| `haoutil.color` | 颜色操作：生成随机颜色值 |
| `haoutil.cookie` | Cookie 操作：写入、读取、删除（支持 HTML5+ 移动端） |
| `haoutil.file` | 文件操作：下载保存文本/图片，base64 转 Blob |
| `haoutil.isutil` | 类型判断：数组、字符串、数值、日期、函数、对象、空值判断 |
| `haoutil.math` | 数学计算：范围随机整数、随机取数组元素、数字补零 |
| `haoutil.storage` | 本地存储：基于 localStorage 的键值存取与删除 |
| `haoutil.str` | 字符串处理：中文判断、长度/面积/时长格式化、Base64 编解码 |
| `haoutil.system` | 系统/浏览器：URL 参数解析、浏览器信息、对象克隆、JSONP、动态加载 JS/CSS |
| `prototype` | 原生对象扩展：String 的 startsWith/endsWith/replaceAll、Date 的 format |

顶层还提供以下通用方法（在 `src/space.js` 中定义）：

| 方法 | 说明 |
| --- | --- |
| `haoutil.msg(msg)` / `haoutil.tip(msg)` | 消息提示，按 toastr > layer > alert 优先级降级 |
| `haoutil.oneMsg(msg, key)` | 同一 key 仅提示一次 |
| `haoutil.alert(msg, title)` | 弹窗提示，优先使用 layer |
| `haoutil.loading.show/hide/close` | 加载中遮罩，优先使用 NProgress，其次 layer |
| `haoutil.version` 等属性 | 版本、作者、官网等元信息 |

## 常用示例

```js
// 类型判断
haoutil.isutil.isNull(""); // true
haoutil.isutil.isArray([1, 2]); // true

// 字符串格式化
haoutil.str.formatLength(1500); // "1.50公里"
haoutil.str.formatArea(3000, "mu"); // "4.50亩"
haoutil.str.formatTime(330); // "5分钟30秒"
haoutil.str.base64("hello"); // "aGVsbG8="

// 数学计算
haoutil.math.random(1, 100); // [1, 100] 内随机整数
haoutil.math.padLeft0(1234, 8); // "00001234"

// 本地存储
haoutil.storage.add("username", "mars");
haoutil.storage.get("username"); // "mars"

// URL 参数：页面地址为 index.html?id=1
haoutil.system.getRequestByName("id", "0"); // "1"

// 文件下载
haoutil.file.downloadFile("hello.txt", "你好，world");

// 消息提示
haoutil.msg("保存成功");
```

原生对象扩展示例：

```js
"hello world".startsWith("hello"); // true
(new Date()).format("yyyy-MM-dd HH:mm:ss"); // 2017-01-09 08:35:26
```

## 运行命令

```bash
# 安装依赖
npm install

# 合并压缩打包到 dist/ 目录
npm run build
```

## 目录结构

```
haoutil
├── src/                     # 源码目录
│   ├── space.js             # 命名空间及顶层方法（msg/alert/loading 等）
│   ├── prototype.js         # String/Date 原生对象扩展
│   ├── haoutil.array.js     # 数组操作
│   ├── haoutil.color.js     # 颜色操作
│   ├── haoutil.cookie.js    # Cookie 操作
│   ├── haoutil.file.js      # 文件操作
│   ├── haoutil.isutil.js    # 类型判断
│   ├── haoutil.math.js      # 数学计算
│   ├── haoutil.storage.js   # localStorage 存储
│   ├── haoutil.str.js       # 字符串处理
│   └── haoutil.system.js    # 系统/浏览器操作
├── dist/                    # 打包产物（npm 包入口）
│   ├── haoutil-src.js       # 合并后的源码版
│   └── haoutil.js           # 压缩版
├── gulpfile.js              # gulp 打包配置
├── package.json
└── README.md
```

## 作者

[火星科技](http://marsgis.cn/) - [木遥](https://work.weixin.qq.com/wework_admin/user/h5/qqmail_user_card/vc9b130b6638aebeb7)  

## 许可证

[Apache-2.0](LICENSE)
