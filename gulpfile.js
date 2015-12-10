var concat = require('gulp-concat-util');
var browserify = require('browserify');
var rename = require('gulp-rename');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var hbsfy = require('hbsfy');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var chokidar = require('chokidar');

var userScriptHeader =
  `// ==UserScript==
// @name userscript
// @description userscript boilerplate
// @author Eugeny Dementev
// @license MIT
// @version 1.0
// @include http://userscripts.org/*
// ==/UserScript==
(function(){`;
var userScriptFooter = `})();`;

gulp.task('wrap', ['bundle'], function () {
  return gulp.src('bundle.js')
    .pipe(concat.header(userScriptHeader))
    .pipe(concat.footer(userScriptFooter))
    .pipe(rename('userScriptBundle.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('bundle', function () {
  return browserify('./index.js')
    .transform(babelify)
    .transform(hbsfy)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('.'));
});

gulp.task('uglify', function () {
  return gulp.src('bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('build', function () {
  runSequence('build', 'wrap');
});

gulp.task('release', function () {
  runSequence('build', 'uglify', 'wrap');
});

var watchFiles = [
  './templates/**/*.hbs',
  './src/**/*.js',
  './index.js'
];

gulp.task('dev', function () {
  chokidar.watch(watchFiles, { ignored: /[\/\\]\./ }).on('all', (event, path) => {
    console.log(event, path);
    gulp.start('build');
  });
});

gulp.task('default', ['dev']);
