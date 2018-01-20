const gulp = require("gulp"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  watch = require('gulp-watch');

const paths = {
  phaser: "./dist-PHASER/",
  outputFile: "neutrinoparticles.phaser.js"
};
paths.phaserSrc = paths.phaser + "src/";
paths.phaserSrcGlob = paths.phaserSrc + "*.js";

gulp.task("build-phaser", function () {
  return gulp.src(paths.phaserSrcGlob)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.outputFile))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    // .pipe(watch(paths.phaserSrcGlob))
    .pipe(gulp.dest(paths.phaser));
});

//the watch task
gulp.task('watch', function() {
  return watch(paths.phaserSrc, function(data){
    gulp.run("build-phaser");
  })
});