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

const pixiTaskConf = {
    name: "pixi",
    sourcesMask: "./src/PIXI/**/*.js",
    distPath: "./dist-PIXI/"
};

const phaserTaskConf = {
    name: "phaser",
    sourcesMask: "./src/Phaser/**/*.js",
    distPath: "./dist-PHASER/"
};

const tasks = [pixiTaskConf, phaserTaskConf];

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

gulp.task("wrap-umd-pixi", function () {
    return gulp.src(pixiTaskConf.sourcesMask, {base: pixiTaskConf.distPath})
        .pipe(sourcemaps.init())
        .pipe(wrapper(
            {
                type: 'commonjs',
                "PIXINeutrinoContext.js": {
                    exports: "Object.assign(module.exports, {PIXINeutrinoContext})"
                },
                "PIXINeutrinoMaterials.js": {
                    exports: "Object.assign(module.exports, {PIXINeutrinoMaterials})"
                },
                "PIXINeutrinoEffect.js": {
                    exports: "Object.assign(module.exports, {PIXINeutrinoEffect})"
                },
                "PIXINeutrinoEffectModel.js": {
                    exports: "Object.assign(module.exports, {PIXINeutrinoEffectModel})"
                },
                "PIXINeutrinoRenderBuffers.js": {
                    exports: "Object.assign(module.exports, {PIXINeutrinoRenderBuffers})"
                }
            }
        ))
        .pipe(babel())
        .pipe(concat(getDistUmdFileName(pixiTaskConf)))
        .pipe(gulp.dest(pixiTaskConf.distPath));
});

gulp.task("wrap-umd-phaser", function () {
    return gulp.src(phaserTaskConf.sourcesMask, {base: phaserTaskConf.distPath})
        .pipe(sourcemaps.init())
        .pipe(wrapper(
            {
                type: 'commonjs',
                "PhaserNeutrino.js": {
                    exports: "Object.assign(module.exports, {PhaserNeutrino})"
                },
                "PhaserNeutrinoContext.js": {
                    exports: "Object.assign(module.exports, {PhaserNeutrinoContext})"
                },
                "PhaserNeutrinoMaterials.js": {
                    exports: "Object.assign(module.exports, {PhaserNeutrinoMaterials})"
                },
                "PhaserNeutrinoEffect.js": {
                    exports: "Object.assign(module.exports, {PhaserNeutrinoEffect})"
                },
                "PhaserNeutrinoEffectModel.js": {
                    exports: "Object.assign(module.exports, {PhaserNeutrinoEffectModel})"
                },
                "PhaserNeutrinoRenderBuffers.js": {
                    exports: "Object.assign(module.exports, {PhaserNeutrinoRenderBuffers})"
                }
            }
        ))
        .pipe(babel())
        .pipe(concat(getDistUmdFileName(phaserTaskConf)))
        .pipe(gulp.dest(phaserTaskConf.distPath));
});

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
