const gulp = require("gulp"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  watch = require('gulp-watch');

const tasks = [
  {
    name: "phaser",
    sourcesMask: "./src/Phaser/**/*.js",
    distPath: "./dist-PHASER/",
    outputDistFile: "neutrinoparticles.phaser.js"
  },
  {
    name: "pixi",
    sourcesMask: "./src/PIXI/**/*.js",
    distPath: "./dist-PIXI/",
    outputDistFile: "neutrinoparticles.pixi.js"
  }
];

tasks.forEach(function (task) {

  // build task
  gulp.task("build-" + task.name, function() {
    return gulp.src(task.sourcesMask)
      .pipe(sourcemaps.init())
      .pipe(concat(task.outputDistFile))
      .pipe(babel())
      .pipe(sourcemaps.write("."))
      // .pipe(watch(task.sourcePath + "*.js"))
      .pipe(gulp.dest(task.distPath));
  });

  // watch task
  gulp.task("watch-" + task.name, function () {
    return watch(task.sourcePath, function (data) {
      gulp.run("build-" + task.name);
    })
  });

});
