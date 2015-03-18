gulp        = require 'gulp'
less        = require 'gulp-less'
path        = require 'path'
del         = require 'del'
livereload  = require 'gulp-livereload'
react       = require 'gulp-react'
browserSync = require 'browser-sync'
coffeex     = require 'gulp-coffee-react'
gutil       = require 'gulp-util'

gulp.task 'styles', ->
  gulp.src 'styles/*.less'
    .pipe less()
    .pipe gulp.dest 'styles/'
    .pipe livereload()

gulp.task 'react', ->
  gulp.src 'templates/*.coffee' 
  .pipe coffeex({bare: true}).on('error', gutil.log)
  .pipe gulp.dest 'dist'
  .pipe livereload()

gulp.task 'browser-sync', ->
  browserSync
    server:
      baseDir: './'

gulp.task 'default', ['react', 'styles', 'browser-sync'], ->
  livereload.listen()
  gulp.watch 'styles/*.less', ['styles', browserSync.reload]
  gulp.watch 'templates/*.coffee', ['react', browserSync.reload]
  gulp.watch 'index.html', [browserSync.reload]
