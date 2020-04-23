// Modules
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const replace = require("gulp-replace");

// Paths

const files = {
  scssPath: "src/**/**/*.scss",
  jsPath: "src/**/**/*.js",
};

// Sass

function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"));
}

// Js

function jsTask() {
  return src(files.jsPath)
    .pipe(concat("final.js"))
    .pipe(terser())
    .pipe(dest("dist"));
}

// Cachebuster

const cbString = new Date().getTime();
function cacheTask() {
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

// Watch

function watchTask() {
  watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
}

// Default

exports.default = series(parallel(scssTask, jsTask), cacheTask, watchTask);
