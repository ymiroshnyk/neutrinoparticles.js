const gulp = require("gulp"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    watch = require('gulp-watch'),
    wrapper = require("gulp-module-wrapper"),
    rename = require("gulp-rename"),
    mainDist = "./dist/neutrinoparticles.js",
    outputDistFile = "neutrinoparticles",
    bundleSuffix = ".bundle",
    umdSuffix = ".umd",
    jsFileExtension = ".js";


const tasks = [
    {
        name: "phaser",
        sourcesMask: "./src/Phaser/**/*.js",
        distPath: "./dist-PHASER/"
    },
    {
        name: "pixi",
        sourcesMask: "./src/PIXI/**/*.js",
        distPath: "./dist-PIXI/"
    }
];

const getDistFileName = function({name}){
    return  outputDistFile +"."+ name + jsFileExtension;
};

const getDistBundleFileName = function({name}){
    return  outputDistFile +"."+ name + bundleSuffix + jsFileExtension;
};

const getDistUmdFileName = function({name}){
    return  outputDistFile +"."+ name + umdSuffix + jsFileExtension;
};

const getDistUmdBundleFileName = function({name}){
    return  outputDistFile +"."+ name + umdSuffix + bundleSuffix + jsFileExtension;
};

tasks.forEach(function (task) {

    // build task
    gulp.task("build-" + task.name, function () {
        return gulp.src(task.sourcesMask, {base: task.distPath})
            .pipe(sourcemaps.init())
            .pipe(concat(getDistFileName(task)))
            .pipe(babel())
            .pipe(sourcemaps.write("."))
            // .pipe(watch(task.sourcePath + "*.js"))
            .pipe(gulp.dest(task.distPath));
    });

    gulp.task("wrap-umd-" + task.name, function () {
        return gulp.src(task.sourcesMask, {base: task.distPath})
            .pipe(sourcemaps.init())
            .pipe(wrapper(
                {
                    type: 'umd'
                }
            ))
            .pipe(babel())
            .pipe(concat(getDistUmdFileName(task)))
            .pipe(gulp.dest(task.distPath));
    });

    gulp.task("bundle-umd-" + task.name, ["wrap-umd-" + task.name], function () {
        return gulp.src([mainDist, task.distPath + getDistUmdFileName(task)])
            .pipe(concat(getDistUmdBundleFileName(task)))
            .pipe(gulp.dest(task.distPath));

    });

    gulp.task("bundle-" + task.name, ["build-" + task.name], function () {
        return gulp.src([mainDist, task.distPath + getDistFileName(task)])
            .pipe(concat(getDistBundleFileName(task)))
            .pipe(gulp.dest(task.distPath));
    });

    gulp.task("do-all-" + task.name, [ "bundle-umd-" + task.name, "bundle-" + task.name]);

    // watch task
    gulp.task("watch-" + task.name, function () {
        return watch(task.sourcesMask, function (data) {
            gulp.run("build-" + task.name);
        })
    });

});
