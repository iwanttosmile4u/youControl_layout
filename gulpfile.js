const gulp = require('gulp'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('@selfisekai/gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

sass.compiler = require('sass');

const paths = {
  src: {
    styles: './src/styles/**/*.scss',
    scripts: './src/scripts/*.js',
    images: './src/images/**/*'
  },
  dist: {
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/',
    self: './dist/'
  }
};

const buildJS = () =>
  gulp
    .src(paths.src.scripts)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());

const buildCSS = () =>
  gulp
    .src(paths.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());

const buildIMG = () =>
  gulp
    .src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream());

const cleanDist = () =>
  gulp.src(paths.dist.self, { allowEmpty: true }).pipe(clean());

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(paths.src.styles, buildCSS).on('change', browserSync.reload);
  gulp.watch(paths.src.scripts, buildJS).on('change', browserSync.reload);
  gulp.watch(paths.src.images, buildIMG).on('change', browserSync.reload);
};

gulp.task(
  'default',
  gulp.series(cleanDist, gulp.parallel(buildCSS, buildJS, buildIMG), watcher)
);
