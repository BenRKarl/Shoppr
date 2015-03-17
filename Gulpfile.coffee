gulp = require 'gulp'
less = require 'gulp-less'
path = require 'path'
del  = require 'del'

gulp.task 'default', ->
  # del 'styles/main.css', (err) -> return if err?
    gulp.src 'styles/*.less'
      .pipe less()
      .pipe gulp.dest 'styles/'
