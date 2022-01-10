'use strict';

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const header = require('gulp-header');

const packageinfo = require('./package.json')

const banner = `/**
*  ${packageinfo.description}  
*  源码地址：${packageinfo.homepage}
*  版本信息：v${packageinfo.version}
*  编译日期：<%= date %>    
*  版权所有：Copyright by 火星科技 木遥  http://marsgis.cn
*/
`;

//压缩混淆haoutil
gulp.task('build', done => {
  let bannerData = { date: (new Date).format("yyyy-M-d HH:mm:ss") };

  gulp.src([
    "src/space.js",
    "src/prototype.js",
    "src/haoutil.*.js",
  ])
    .pipe(concat('haoutil-src.js'))
    .pipe(header(banner, bannerData))
    .pipe(gulp.dest('dist/'))
    .pipe(concat('haoutil.js'))
    .pipe(uglify())
    .pipe(header(banner, bannerData))
    .pipe(gulp.dest('dist/'));

  done();
});




Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};
