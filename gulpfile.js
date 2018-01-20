var gulp = require("gulp");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");

gulp.task("build-phaser", function () {
  return gulp.src("./dist-PHASER/src/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("neutrinoparticles.phaser.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist-PHASER/"));
});