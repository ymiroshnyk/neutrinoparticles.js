var gulp = require("gulp");
var concat = require("gulp-concat");
var babel = require("gulp-babel");

gulp.task("build-phaser", function () {
  return gulp.src("./dist-PHASER/src/*.js")
    .pipe(concat("neutrinoparticles.phaser.js"))
    .pipe(babel())
    .pipe(gulp.dest("./dist-PHASER/"));
});