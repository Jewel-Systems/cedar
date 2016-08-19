var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var clean       = require('gulp-clean-css');
var prettify    = require('gulp-html-prettify');
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');

gulp.task('pug', function() {
  return gulp.src('_pugFiles/**/*.pug')
    .pipe(pug())
    .pipe(prettify({indent_char: " ", indent_size: 2}))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
  return gulp.src('_sassFiles/**/*.sass')
    .pipe(sass())
    .pipe(prefix(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })))
    .pipe(clean({'compatibility' : 'ie8'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('_pugFiles/**', ['pug']);
  gulp.watch('_sassFiles/**', ['sass']);
});

gulp.task('default', ['watch']);
