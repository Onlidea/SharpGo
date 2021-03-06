var gulp = require('gulp');
var config = require('../config');
var browserify = require('browserify');
var babel = require('babelify');
var markdown = require('markdownify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpEslint = require('gulp-eslint');
var watchify = require('watchify');
var gulpif = require('gulp-if');
var Log = require('./log');
var livereload = require('gulp-livereload');
var ESLintCLI = require('eslint').CLIEngine;
var eslintCLI = new ESLintCLI({
  useEslintrc: true
});

var opts = {
  debug: config.sourcemaps,
  extensions: ['.md', '.markdown'],
  cache: {},
  packageCache: {}
};

function bundle(b) {
  var log = Log('js:build');

  return b
    .add('./src/' + config.scriptEntryPoint)
    .on('file', function(file, id) {
      log.debug(file);
    })
    .bundle()
    .on('error', function(err) {
      log.error(err.toString());
      this.emit('end');
      process.exit(1);
    })
    .pipe(source(config.scriptDestFile))
    .pipe(buffer())
    .pipe(gulpif(config.minify, uglify()))
    .pipe(gulp.dest(config.public));
}

function lint(ids, out) {
  var report = eslintCLI.executeOnFiles(ids);
  var formatter = eslintCLI.getFormatter('compact');
  var output = formatter(report.results);
  if (output) {
    out.warn(output);
  } else {
    out.info('Your code looks good! :-)');
  }
}

/*
 * Define tasks
 */

module.exports = {

  lint: function() {
    return gulp.src('./src/**/*.js')
      .pipe(gulpEslint())
      .pipe(gulpEslint.format());
  },

  build: function() {
    return bundle(browserify(opts)
      .transform(babel)
      .transform(markdown));
  },

  watch: function() {
    var log = Log('watch');
    var w = watchify(browserify(opts), {
      ignoreWatch: true
    });

    w.on('update', function(ids) {
      log.info(ids.join('\n'));
      lint(ids, log);

      return w.bundle()
        .pipe(source(config.scriptDestFile))
        .pipe(buffer())
        .pipe(gulpif(config.minify, uglify()))
        .pipe(gulp.dest(config.public))
        .pipe(livereload({
          start: true,
          quiet: true
        }));
    });

    w.on('log', function(msg) {
      log.info(msg);
    });

    w.transform(babel)
      .transform(markdown);

    return bundle(w);
  }

};
