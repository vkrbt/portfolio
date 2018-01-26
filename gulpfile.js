'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');

const src = {
  scss: {
    styles: './src/scss/styles.scss',
    all: './src/scss/**/*.scss',
  },
  img: './src/img/**/*.*',
};

const dist = {
  root: './dist',
  css: './dist/css/',
  img: './dist/img',
};

gulp.task('scss', () => gulp
  .src(src.scss.styles)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dist.css))
);

gulp.task('img', () => gulp
  .src(src.img)
  .pipe(imagemin([
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 })
  ]))
  .pipe(gulp.dest(dist.img))
);

gulp.task('build', ['scss', 'img']);

gulp.task('watch', () => {
  gulp.watch(src.scss.styles, ['scss']);
  gulp.watch(src.scss.all, ['scss']);
  gulp.watch(src.img, ['img']);
});

gulp.task('webserver', () => gulp
  .src(dist.root)
  .pipe(webserver({
    livereload: true,
    directoryListing: false,
  }))
);

gulp.task('default', ['build', 'watch', 'webserver']);
