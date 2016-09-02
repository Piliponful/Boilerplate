var gulp    = require('gulp'),
    pug     = require('gulp-pug'),
    stylus  = require('gulp-stylus'),
    connect = require('gulp-connect'),
    notify  = require('gulp-notify'),
    jeet    = require('jeet'),
    rupture = require('rupture'),
    typographic = require('typographic');

var options = {
  use: [jeet(), rupture(), typographic()]
}

gulp.task('html', function() {
  gulp.src('pug/index.pug')
    .pipe(pug())
    .on('error', notify.onError())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('stylus/style.styl')
    .pipe(stylus(options))
    .on('error', notify.onError())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3000
  });
});

gulp.task('watch', function() {
  gulp.watch('pug/*.pug', ['html']);
  gulp.watch('stylus/*.styl', ['css']);
});

gulp.task('default', ['html', 'css', 'connect', 'watch']);