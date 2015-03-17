gulp       = require 'gulp'
less       = require 'gulp-less'
path       = require 'path'
del        = require 'del'
livereload = require 'gulp-livereload'

gulp.task 'styles', ->
    gulp.src 'styles/*.less'
      .pipe less()
      .pipe gulp.dest 'styles/'
      .pipe livereload()

gulp.task 'default', ->
  livereload.listen()
  gulp.watch 'styles/*.less', ['styles']
