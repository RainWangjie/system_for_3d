/**
 * Created by gewangjie on 16/3/24.
 */
'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('default',['css', 'images','js'],function(){
    console.log('gulp完成，yeah！！！');
});
gulp.task("images", function () {
    return gulp.src("resources/images/**")
        .pipe(gulp.dest('public/images'));
});
gulp.task('sass', function () {
    return gulp.src('resources/sass/*/*.scss')
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
    gulp.src("resources/js/admin/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("public/js/admin"));
    return gulp.src("resources/js/module/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("public/js/module"));
});