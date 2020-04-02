// Modules
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

// Paths

const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js"
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
    .pipe(uglify())
    .pipe(dest("dist"));
}

// Watch

function watchTask() {
  watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
}

// Default

exports.default = series(parallel(scssTask, jsTask), watchTask);

// const uglifycss = require("gulp-uglifycss");

// sass.compiler = require("node-sass");

// gulp.task("sass", function() {
//   return gulp
//     .src("src/scss/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(gulp.dest("src/css"));
// });

// gulp.task("css", function() {
//   gulp
//     .src("src/css/*.css")
//     .pipe(
//       uglifycss({
//         uglyComments: true
//       })
//     )
//     .pipe(gulp.dest("./dist/"));
// });

// gulp.task("run", gulp.parallel("sass", "css"));

// gulp.task("watch", function() {
//   gulp.watch("src/scss/*.scss", gulp.parallel("sass"));
//   gulp.watch("src/css/*.css", gulp.parallel("css"));
// });

// gulp.task("default", gulp.parallel("run", "watch"));
