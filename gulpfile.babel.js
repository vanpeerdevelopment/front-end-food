/* global __dirname */

import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import concat from "gulp-concat";
import ngAnnotate from "gulp-ng-annotate";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import extReplace from "gulp-ext-replace";
import eslint from "gulp-eslint";
import karma from "karma";
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";
import ghPages from "gulp-gh-pages";

const browserSyncServer = browserSync.create("front-end-food");

let paths = {
    gulpfile: "gulpfile.babel.js",
    bower: "bower.json",
    npm: "package.json",
    indexHtml: "src/index.html",
    cname: "src/CNAME",
    srcAppJs: "src/app/**/*.js",
    srcAppHtml: "src/app/**/*.html",
    testUnitJs: "test/unit/**/*.js",
    testUnitSpecJs: "test/unit/**/*.spec.js",
    dist: "dist/",
    distSrc: "dist/src/",
    distSrcApp: "dist/src/app/",
    distSrcVendor: "dist/src/vendor/",
    distTestUnit: "dist/test/unit/",
    deploy: "dist/src/**/*"
};

/*
 * main tasks
 */
gulp.task("default", ["clean:build"]);

gulp.task("clean:build", callback => {
    runSequence("clean", "build", callback);
});

gulp.task("clean:dev", callback => {
    runSequence("clean", "dev", callback);
});

gulp.task("deploy", () => {
    return gulp
        .src(paths.deploy)
        .pipe(ghPages());
});

/*
 * helper tasks
 */
let test = singleRunEnabled => {
    return callback => {
        new karma.Server({
            configFile: `${__dirname}/test/unit/karma.conf.js`,
            singleRun: singleRunEnabled
        },
        callback)
        .start();
    };
};

let testSingleRun = test(true);
let testWatch = test(false);

gulp.task("build", ["build:app", "build:vendor", "lint"], testSingleRun);
gulp.task("dev", ["build:app", "build:vendor", "watch:app", "watch:vendor", "serve"], testWatch);

gulp.task("build:app", ["build:app:src", "build:app:test"]);
gulp.task("watch:app", ["watch:app:src", "watch:app:test"]);
gulp.task("build:app:src", ["build:app:src:js", "build:app:src:html", "build:app:src:cname"]);
gulp.task("watch:app:src", ["watch:app:src:js", "watch:app:src:html", "watch:app:src:cname"]);
gulp.task("build:app:test", ["build:app:test:js"]);
gulp.task("watch:app:test", ["watch:app:test:js"]);

gulp.task("build:vendor", ["build:vendor:js"]);
gulp.task("watch:vendor", ["watch:vendor:js"]);
gulp.task("build:vendor:js", ["build:vendor:js:bower", "build:vendor:js:npm"]);
gulp.task("watch:vendor:js", ["watch:vendor:js:bower", "watch:vendor:js:npm"]);

/*
 * general
 */
gulp.task("clean", () => {
    return del(paths.dist);
});

gulp.task("lint", () => {
    return gulp.src([paths.gulpfile, paths.srcAppJs, paths.testUnitJs])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("serve", () => {
    browserSyncServer.init({
        server: {
            baseDir: paths.distSrc
        }
    });
});

/*
 * app:src:js
 */
gulp.task("build:app:src:js", () => {
    return gulp
        .src(paths.srcAppJs)
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(concat("app.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcApp));
});

gulp.task("watch:app:src:js", () => {
    gulp.watch(paths.srcAppJs, ["watch:app:src:js:build"]);
});

gulp.task("watch:app:src:js:build", ["build:app:src:js"], browserSyncServer.reload);

/*
 * app:src:html
 */
gulp.task("build:app:src:html", () => {
    return gulp
        .src([paths.indexHtml, paths.srcAppHtml], {
            base: "src"
        })
        .pipe(gulp.dest(paths.distSrc));
});

gulp.task("watch:app:src:html", () => {
    gulp.watch([paths.indexHtml, paths.srcAppHtml], ["watch:app:src:html:build"]);
});

gulp.task("watch:app:src:html:build", ["build:app:src:html"], browserSyncServer.reload);

/*
 * app:src:cname
 */
gulp.task("build:app:src:cname", () => {
    return gulp
        .src(paths.cname)
        .pipe(gulp.dest(paths.distSrc));
});

gulp.task("watch:app:src:cname", () => {
    gulp.watch(paths.cname, ["watch:app:src:cname:build"]);
});

gulp.task("watch:app:src:cname:build", ["build:app:src:cname"], browserSyncServer.reload);

/*
 * app:test:js
 */
gulp.task("build:app:test:js", () => {
    return gulp
        .src(paths.testUnitSpecJs)
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distTestUnit));
});

gulp.task("watch:app:test:js", () => {
    gulp.watch(paths.testUnitSpecJs, ["build:app:test:js"]);
});

/*
 * vendor:js:bower
 */
gulp.task("build:vendor:js:bower", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: "**/*.js"
        }))
        .pipe(extReplace(".js", ".src.js"))
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendor));
});

gulp.task("watch:vendor:js:bower", () => {
    gulp.watch(paths.bower, ["watch:vendor:js:bower:build"]);
});

gulp.task("watch:vendor:js:bower:build", ["build:vendor:js:bower"], browserSyncServer.reload);

/*
 * vendor:js:npm
 */
gulp.task("build:vendor:js:npm", () => {
    return gulp
        .src([
            "node_modules/angular-new-router/dist/router.es5.js",
            "node_modules/babel-polyfill/dist/polyfill.js"
        ])
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendor));
});

gulp.task("watch:vendor:js:npm", () => {
    gulp.watch(paths.npm, ["watch:vendor:js:npm:build"]);
});

gulp.task("watch:vendor:js:npm:build", ["build:vendor:js:npm"], browserSyncServer.reload);
