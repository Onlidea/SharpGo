var gulp = require('gulp');
var config = require('../config');
var stylint = require('gulp-stylint');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var Log = require('./log');
var livereload = require('gulp-livereload');

module.exports = {

  build: function() {
    var log = Log('css:build');

    var c = gulp.src('./src/' + config.styleEntryPoint)
      .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
      .pipe(stylus())
      .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
      .pipe(concat(config.styleDestFile))
      .pipe(gulpif(config.minify, minify()))
      .pipe(gulp.dest(config.public));

    if (config.livereload) {
      c = c.pipe(livereload({
        start: true
      }));
    }
    return c;
  },

  lint: function() {
    return gulp.src('src/**/*.styl')
      .pipe(stylint())
      .pipe(stylint.reporter());
  },

  watch: function() {
    return gulp.watch(['src/**/*.styl'], ['css:build']);
  }

};
