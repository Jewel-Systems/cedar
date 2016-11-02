var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var clean       = require('gulp-clean-css');
var prettify    = require('gulp-html-prettify');
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglify');
var pump        = require('pump');

gulp.task('server', function() {
  // browserSync.init({
  //   proxy: 'localhost:200',
  //   ui: {
  //     port: '8000',
  //   },
  //   browser: 'google chrome',
  //   notify: false,
  // });

  gulp.watch('_pugFiles/public/**', ['pug']);
  gulp.watch('_sassFiles/**', ['sass']);
  gulp.watch('_jsFiles/**', ['js']);
  gulp.watch('./public/**/*.html').on('change', browserSync.reload);
  gulp.watch('./public/**/*.js').on('change', browserSync.reload);
});

gulp.task('pug', function() {
  return gulp.src('_pugFiles/public/**/[^_]*.pug')
    .pipe(pug())
    .pipe(prettify({indent_char: " ", indent_size: 2}))
    .pipe(gulp.dest('public/'));
});

gulp.task('sass', function() {
  return gulp.src('_sassFiles/**/*.sass')
    .pipe(sass())
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(clean({'compatibility' : 'ie8'}))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('_jsFiles/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['server']);
