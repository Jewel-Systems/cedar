var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var clean       = require('gulp-clean-css');
var prettify    = require('gulp-html-prettify');
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglify');
var pump        = require('pump');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');
var concss      = require('gulp-concat-css');

gulp.task('server', function() {
  // browserSync.init({
  //   proxy: 'localhost:200',
  //   ui: {
  //     port: '8000',
  //   },
  //   // browser: 'google chrome',
  //   notify: false,
  // });

  gulp.watch('_pugFiles/public/**', ['pug']);
  gulp.watch('_sassFiles/**', ['sass']);
  gulp.watch('_cssFiles/**', ['css']);
  gulp.watch('_jsFiles/**', ['defaults', 'login', 'logout', 'user', 'config']);
  gulp.watch('./public/**/*.html').on('change', browserSync.reload);
  gulp.watch('./public/**/*.css').on('change', browserSync.reload);
  gulp.watch('./public/**/*.js').on('change', browserSync.reload);
});

gulp.task('pug', function() {
  return gulp.src('_pugFiles/public/**/[^_]*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettify({indent_char: " ", indent_size: 2}))
    .pipe(gulp.dest('public/'));
});

gulp.task('sass', function() {
  return gulp.src('_sassFiles/**/*.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('_cssFiles'))
    .pipe(browserSync.stream());
});

function compileJS(a) {
  return gulp.src('_jsFiles/' + a + '/**/*.js')
    // .pipe(plumber())
    // .pipe(uglify())
    .pipe(concat(a + '.js')) // Helps change the filename to what you want
    .pipe(gulp.dest('public/js'));
}

gulp.task('defaults', function() {
  return compileJS('default');
});

gulp.task('login', function() {
  return compileJS('login');
});

gulp.task('logout', function() {
  return compileJS('logout');
});

gulp.task('user', function() {
  return compileJS('user');
});

gulp.task('config', function() {
  return compileJS('config');
});

gulp.task('qr', function() {
  return compileJS('qr');
});

gulp.task('css', function() {
  return gulp.src('_cssFiles/*.css')
    .pipe(concss('styles.css'))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(clean({'compatibility' : 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['server']);
gulp.task('all', ['pug', 'sass', 'css', 'defaults', 'login', 'logout', 'user', 'config', 'qr']);
