var gulp = require('gulp');

var js = require('./js');
var css = require('./css');
var public = require('./public');
var serve = require('./serve');
var assets = require('./assets');
var clean = require('./clean');
var html = require('./html');

gulp

  // ==============================================
  // HTML 相关 tasks
  // ==============================================

  .task('html:build', html.build)

  // ==============================================
  // JavaScript 相关 tasks
  // ==============================================

  .task('js:lint', js.lint)
  .task('js:build', ['public'], js.build)
  .task('js:dist', ['public'], js.dist)
  .task('js:watch', ['public'], js.watch)

  // ==============================================
  // CSS 相关 tasks
  // ==============================================

  .task('css:lint', css.lint)
  .task('css:build', css.build)
  .task('css:dist', css.dist)
  .task('css:watch', ['css:build'], css.watch)

  // ==============================================
  // 拷贝assets(图片, 字体)
  // ==============================================

  .task('assets', ['public'], assets)
  .task('public', public)

  // ==============================================
  // 删除生成的文件
  // ==============================================

  .task('clean', clean)

  // ==============================================
  // 启动服务
  // ==============================================

  .task('serve', serve)

  // ==============================================
  // watch/build
  // ==============================================

  .task('watch', ['js:watch', 'css:watch'])
  .task('build', ['js:build', 'css:build', 'assets'])

  // ==============================================
  // Build/watch/serve
  // ==============================================

  .task('bws', ['assets', 'watch', 'serve'])
  .task('default', ['build', 'serve']);
