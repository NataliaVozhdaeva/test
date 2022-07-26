const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const del = require('del');

function browsersync() {
  browserSync.init({
    server: 'src/',
    notify: false,
  });
}

function buildSass() {
  return src('src/styles/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
        }),
        cssnano(),
      ])
    )
    .pipe(dest('dist/css'))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

function buildJs() {
  return src('src/scripts/main.js').pipe(dest('dist/js')).pipe(dest('src/js')).pipe(browserSync.stream());
}

function html() {
  return src('src/**/*.html').pipe(dest('dist/')).pipe(browserSync.stream());
}

function serve() {
  watch('src/scripts/**/*.js', buildJs);
  watch('src/styles/**/*.scss', buildSass);
  watch('src/**/*.html', html);
}

function copy() {
  return src('src/img/**/*.*', {
    base: 'src/',
  }).pipe(dest('dist/img'));
}

function cleanDist() {
  return del('dist/**/*', { force: true });
}

exports.build = series(cleanDist, buildSass, buildJs, html, copy);
exports.default = series([buildSass, buildJs], parallel(browsersync, serve));
