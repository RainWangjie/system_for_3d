/**
 * Created by gewangjie on 16/3/24.
 */
'use strict';
var gulp = require('gulp');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');

gulp.task('default', ['css', 'images', 'js'], function () {
    console.log('gulp完成，yeah！！！');
});
gulp.task("images", function () {
    return gulp.src("resources/images/**")
        .pipe(gulp.dest('public/images'));
});
gulp.task("font", function () {
    return gulp.src("resources/font/**")
        .pipe(gulp.dest('public/font'));
});
gulp.task('sass', function () {
    return gulp.src('resources/sass/*/*.scss')
        .pipe(autoprefix('last 2 versions'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('resources/css/'));
});
gulp.task("css", ['sass'], function () {
    return gulp.src("resources/css/*/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("public/css/"));
});
gulp.task("commonJS", function () {
    return gulp.src("resources/js/common/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("public/js/common"));
});
gulp.task("js", function () {
    gulp.src("resources/js/module/h5/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("public/js/module/h5"));
    gulp.src("resources/js/admin/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("public/js/admin"));
    return gulp.src("resources/js/module/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("public/js/module"));
});
gulp.task("move", function (cb) {
    gulp.src("public/**")
        .pipe(gulp.dest("/Users/gewangjie/Rain/work/3dworld/appid37a947e0bb/public"));
    console.log('finish public');
    gulp.src("views/**")
        .pipe(gulp.dest("/Users/gewangjie/Rain/work/3dworld/appid37a947e0bb/views"));
    console.log('finish views');
    gulp.src("routes/**")
        .pipe(gulp.dest("/Users/gewangjie/Rain/work/3dworld/appid37a947e0bb/routes"));
    console.log('finish routes');
    gulp.src("resources/**")
        .pipe(gulp.dest("/Users/gewangjie/Rain/work/3dworld/appid37a947e0bb/resources"));
    console.log('finish resources');
});