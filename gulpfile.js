/**
 * Created by gewangjie on 16/3/24.
 */
'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var sass = require('gulp-sass');

gulp.task('default',['css', 'images'],function(){
    console.log('gulp success!!!');
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
gulp.task("js", function () {
    return gulp.src("resources/js/*/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("public/js/"));
});