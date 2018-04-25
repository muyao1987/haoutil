'use strict';

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//压缩混淆haoutil
gulp.task('haoutil', function () {
    gulp.src([
        "src/haoutil/space.js",
        "src/haoutil/prototype.js",
        "src/haoutil/haoutil.*.js",
    ])
    .pipe(concat('haoutil-src.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(concat('haoutil.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
     

});


gulp.task('build', ['haoutil'], function () {
    gulp.watch('src/haoutil/*.js', ['haoutil']);
});