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

// assets versioning ...................................
var rev = require('gulp-rev');
var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var del = require('del');
var handlebarOpts = {
    helpers: {
        assetsReplace: function (path, context) {
            return ['', context.data.root[path]].join('/');
        }
    }
};

// utils ...............................................
var swPrecache = require('sw-precache');
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
  .pipe(gulp.dest('./dist/static'));
});


// CSS
// clean dist + public css folders from previous files
gulp.task('clean-dist-css', function () {
  return gulp.src(['dist/static/css', '../static/css'], {read: false}).pipe(clean({force: true}));
});
// compile + minify scss, move to dist
gulp.task('scss-build', function () {
  return gulp.src(['dev/assets/css/**/*.scss'])
  .pipe(sass({
    errLogToConsole: true
  }))
  .pipe(autoprefixer('last 3 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/static/css'));
});
// versioning css, move versioned and original to public assets, generate manifest
gulp.task('css-versioning', function () {
  return gulp.src(['dist/static/css/**/*.css'])
  .pipe(gulp.dest('../assets/css'))
  .pipe(rev())
  .pipe(gulp.dest('dist/static/css'))
  .pipe(gulp.dest('../assets/css'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('dist/static/css'));
});
// parse manifest + generate php include + move to public
gulp.task('css-path-compile', function () {
  var manifest = JSON.parse(fs.readFileSync('dist/static/css/rev-manifest.json', 'utf8'));
  return gulp.src('dev/static/css/rev-css.hbs')
  .pipe(handlebars(manifest, handlebarOpts))
  .pipe(rename('header-css.php'))
  .pipe(gulp.dest('../'))
  .pipe(reload({stream: true}));
});
gulp.task('scss', function() {
  runSequence('clean-dist-css', 'scss-build', 'css-versioning');
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
  gulp.src(['./dev/root/**/*', './dev/index.html'])
  .pipe(gulp.dest('./dist/'));
});

// generate service worker
gulp.task('generate-service-worker', function(callback) {
  swPrecache.write(('dist/service-worker.js'), {
    staticFileGlobs: ['dist/static/**/*.*', 'dist/index.html', 'dist/bundle.js'],
    stripPrefix: 'dist/',
    verbose:true
  }, callback);
});


// =================================================================================

// default
gulp.task('default', ['serve', 'build']);

// build
gulp.task('build', function(callback) {
    runSequence('clean','img', 'scss', 'webpack', 'move','generate-service-worker');
});
// local server
gulp.task('serve', function () {
    gulp.task('build');
    gulp.task('generate-service-worker');
  browserSync.init({
    server: {
      baseDir: ['dist']
    },
  });
  gulp.watch(['dev/assets/img{,/**}'], ['img'], reload);
  gulp.watch(['dev/**/*'], ['move','webpack', 'generate-service-worker'],reload);
  gulp.watch(['dev/assets/static/**/*'], ['move'], reload);
  gulp.watch(['dev/assets/css/**/*.{css,scss}'], ['scss'], reload);
  gulp.watch(['dev/assets/js/**/*.js'], ['webpack'], reload);
  //gulp.watch(['dev/assets/icon-fonts{,/**}'], ['fonts'], reload);
  //gulp.watch(['dev/assets/icons{,/**}'], ['touch-icons'], reload);
});
