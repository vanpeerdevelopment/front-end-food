/* global __dirname, process */
/* eslint no-process-env: 0 */

import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import plumber from "gulp-plumber";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import concat from "gulp-concat";
import ngAnnotate from "gulp-ng-annotate";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import extReplace from "gulp-ext-replace";
import eslint from "gulp-eslint";
import karma from "karma";
import protractorLib from "gulp-protractor";
import protractorQA from "gulp-protractor-qa";
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";
import ghPages from "gulp-gh-pages";

const protractor = protractorLib.protractor;
const browserSyncServer = browserSync.create("front-end-food");

let paths = {
    gulpfile: "gulpfile.babel.js",
    bower: "bower.json",
    npm: "package.json",
    indexHtml: "src/index.html",
    cname: "src/CNAME",
    srcAppJs: "src/app/**/*.js",
    srcAppHtml: "src/app/**/*.html",
    testJs: "test/**/*.js",
    testUnitJs: "test/unit/**/*.js",
    testE2EJs: "test/e2e/**/*.js",
    testE2ESpecJs: "test/e2e/**/*.spec.js",
    testE2E: "test/e2e/",
    dist: "dist/",
    distSrc: "dist/src/",
    distSrcApp: "dist/src/app/",
    distSrcVendor: "dist/src/vendor/",
    distTestUnit: "dist/test/unit/",
    distTestE2E: "dist/test/e2e/",
    deploy: "dist/src/**/*"
};

/*
 * main tasks
 */
gulp.task("default", ["build"]);

gulp.task("build", callback => {
    runSequence(
        "clean",
        ["build:app", "build:vendor"],
        ["lint", "protractor-qa"],
        "test:unit",
        "test:e2e",
        callback);
});

gulp.task("dev", callback => {
    runSequence(
        "build",
        ["watch:app", "watch:vendor", "watch:test:unit", "watch:protractor-qa", "serve"],
        callback);
});

gulp.task("deploy", () => {
    return gulp
        .src(paths.deploy)
        .pipe(ghPages());
});

/*
 * helper tasks
 */
gulp.task("build:app", ["build:app:src", "build:app:test"]);
gulp.task("watch:app", ["watch:app:src", "watch:app:test"]);
gulp.task("build:app:src", ["build:app:src:js", "build:app:src:html", "build:app:src:cname"]);
gulp.task("watch:app:src", ["watch:app:src:js", "watch:app:src:html", "watch:app:src:cname"]);
gulp.task("build:app:test", ["build:app:test:unit", "build:app:test:e2e"]);
gulp.task("watch:app:test", ["watch:app:test:unit", "watch:app:test:e2e"]);

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
    return gulp
        .src([paths.gulpfile, paths.srcAppJs, paths.testJs])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("serve", callback => {
    browserSyncServer.init(
        {
            server: {
                baseDir: paths.distSrc
            },
            files: `${paths.distSrc}**/*`
        },
        callback
    );
});

/*
 * app:src:js
 */
gulp.task("build:app:src:js", () => {
    return gulp
        .src(paths.srcAppJs)
        .pipe(plumber())
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
    gulp.watch(paths.srcAppJs, ["build:app:src:js"]);
});

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
    gulp.watch([paths.indexHtml, paths.srcAppHtml], ["build:app:src:html"]);
});

/*
 * app:src:cname
 */
gulp.task("build:app:src:cname", () => {
    return gulp
        .src(paths.cname)
        .pipe(gulp.dest(paths.distSrc));
});

gulp.task("watch:app:src:cname", () => {
    gulp.watch(paths.cname, ["build:app:src:cname"]);
});

/*
 * app:test:unit
 */
gulp.task("build:app:test:unit", () => {
    return gulp
        .src(paths.testUnitJs)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distTestUnit));
});

gulp.task("watch:app:test:unit", () => {
    gulp.watch(paths.testUnitJs, ["build:app:test:unit"]);
});

let karmaConfigFile = () => {
    if(process.env.CI) {
        return `${__dirname}/test/unit/config/karma.saucelabs.config.js`;
    }
    return `${__dirname}/test/unit/config/karma.phantomjs.config.js`;
};

let unitTest = (singleRun, callback) => {
    new karma.Server(
        {
            configFile: karmaConfigFile(),
            singleRun
        },
        callback)
    .start();
};

gulp.task("test:unit", callback => {
    unitTest(true, callback);
});

gulp.task("watch:test:unit", callback => {
    unitTest(false, callback);
});

/*
 * app:test:e2e
 */
gulp.task("build:app:test:e2e", () => {
    return gulp
        .src(paths.testE2EJs)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(gulp.dest(paths.distTestE2E))
        .pipe(concat("e2e.js"))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distTestE2E));
});

gulp.task("watch:app:test:e2e", () => {
    gulp.watch(paths.testE2EJs, ["build:app:test:e2e"]);
});

let startProtractorQA = runOnce => {
    protractorQA.init({
        runOnce,
        testSrc: `${paths.distTestE2E}**/!(e2e).js`,
        viewSrc: paths.srcAppHtml
    });
};

gulp.task("protractor-qa", () => {
    startProtractorQA(true);
});

gulp.task("watch:protractor-qa", () => {
    startProtractorQA(false);
});

gulp.task("test:e2e", callback => {
    runSequence(
        "test:e2e:server:start",
        "test:e2e:protractor",
        "test:e2e:server:stop",
        callback);
});

gulp.task("test:e2e:server:start", callback => {
    browserSyncServer.init(
        {
            open: false,
            server: {
                baseDir: paths.distSrc
            }
        },
        callback
    );
});

gulp.task("test:e2e:protractor", () => {
    return gulp
        .src(`${paths.testE2E}config/protractor.bootstrap.js`)
        .pipe(protractor({
            configFile: `${paths.testE2E}config/protractor.config.js`
        }))
        .on("error", err => {
            throw err;
        });
});

gulp.task("test:e2e:server:stop", () => {
    browserSyncServer.exit();
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
        .pipe(plumber())
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
    gulp.watch(paths.bower, ["build:vendor:js:bower"]);
});

/*
 * vendor:js:npm
 */
gulp.task("build:vendor:js:npm", () => {
    return gulp
        .src([
            "node_modules/angular-new-router/dist/router.es5.js",
            "node_modules/babel-polyfill/dist/polyfill.js"
        ])
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendor));
});

gulp.task("watch:vendor:js:npm", () => {
    gulp.watch(paths.npm, ["build:vendor:js:npm"]);
});
