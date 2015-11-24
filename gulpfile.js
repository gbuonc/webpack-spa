'use strict';
var require;
var gulp = require("gulp");
var gutil = require("gulp-util");

// image optim .........................................
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// ccs build ...........................................
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var bless = require('gulp-bless');

// utils ...............................................
var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

// =================================================================================

// clean dist folder
gulp.task('clean', function () {
    return gulp.src(['dist'], { read: false }).pipe(clean());
});

// compress and move static images
gulp.task('img', function () {
  gulp.src(['./dev/assets/img{,/**}'])
  .pipe(imagemin({use: [pngquant()]}))
  .pipe(gulp.dest('./dist/assets'));
});

// run webpack with webpack.config.js
gulp.task("webpack", function(callback) {
    var devCompiler = webpack(webpackConfig);
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("default", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// move  static assets to dist
gulp.task('move', function () {
  gulp.src(['./dev/assets/static/*'])
  .pipe(gulp.dest('./dist'));
});

// =================================================================================

// default
gulp.task('default', ['serve', 'build']);

// build
gulp.task('build', function(callback) {
    runSequence('clean','img', 'webpack', 'move');
});

// local server
gulp.task('serve', function () {
    gulp.task('build');
  browserSync.init({
    server: {
      baseDir: ['dist']
    },
  });
  gulp.watch(['dev/**/*'], ['webpack'],reload);
  // gulp.watch(['dev/assets/css/**/*.{css,scss}'], ['scss'], reload);
  gulp.watch(['dev/assets/img{,/**}'], ['img'], reload);
  gulp.watch(['dev/assets/js/**/*.js'], ['webpack'], reload);
  //gulp.watch(['dev/assets/icon-fonts{,/**}'], ['fonts'], reload);
  //gulp.watch(['dev/assets/icons{,/**}'], ['touch-icons'], reload);
});
