/* global __dirname */

import gulp from "gulp";
import gutil from "gulp-util";
import runSequence from "run-sequence";
import del from "del";
import plumber from "gulp-plumber";
import htmlmin from "gulp-htmlmin";
import templateCache from "gulp-angular-templatecache";
import addStream from "add-stream";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import concat from "gulp-concat";
import ngAnnotate from "gulp-ng-annotate";
import uglify from "gulp-uglify";
import cssnano from "gulp-cssnano";
import rename from "gulp-rename";
import eslint from "gulp-eslint";
import karma from "karma";
import protractorLib from "gulp-protractor";
import protractorQA from "gulp-protractor-qa";
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";
import coveralls from "gulp-coveralls";
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
    srcContentCss: "src/content/css/*.css",
    srcContentImg: "src/content/images/*",
    testJs: "test/**/*.js",
    testUnitJs: "test/unit/**/*.js",
    testE2EJs: "test/e2e/**/*.js",
    testE2ESpecJs: "test/e2e/**/*.spec.js",
    testE2E: "test/e2e/",
    dist: "dist/",
    distSrc: "dist/src/",
    distSrcApp: "dist/src/app/",
    distSrcContentCss: "dist/src/content/css/",
    distSrcContentImg: "dist/src/content/images/",
    distSrcVendorJs: "dist/src/vendor/js/",
    distSrcVendorCss: "dist/src/vendor/css/",
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
        "clean",
        ["build:app", "build:vendor"],
        ["watch:app", "watch:vendor", "watch:test:unit", "watch:protractor-qa", "serve"],
        callback);
});

gulp.task("coverage", callback => {
    runSequence(
        "test:coverage",
        "coveralls",
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
gulp.task("build:app:src", ["build:app:src:js", "build:app:src:index", "build:app:src:css", "build:app:src:img", "build:app:src:cname"]);
gulp.task("watch:app:src", ["watch:app:src:js", "watch:app:src:index", "watch:app:src:css", "watch:app:src:img", "watch:app:src:cname"]);
gulp.task("build:app:test", ["build:app:test:unit", "build:app:test:e2e"]);
gulp.task("watch:app:test", ["watch:app:test:unit", "watch:app:test:e2e"]);

gulp.task("build:vendor", ["build:vendor:js", "build:vendor:css"]);
gulp.task("watch:vendor", ["watch:vendor:js", "watch:vendor:css"]);
gulp.task("build:vendor:js", ["build:vendor:js:bower", "build:vendor:js:npm"]);
gulp.task("watch:vendor:js", ["watch:vendor:js:bower", "watch:vendor:js:npm"]);
gulp.task("build:vendor:css", ["build:vendor:css:bower"]);
gulp.task("watch:vendor:css", ["watch:vendor:css:bower"]);

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
let templates = () => {
    return gulp
        .src(paths.srcAppHtml, {base: "src"})
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            keepClosingSlash: true,
            quoteCharacter: "\""
        }))
        .pipe(templateCache("app.templates.js", {
            templateHeader: "export default $templateCache => {\n\"ngInject\";\n",
            templateFooter: "\n};",
            transformUrl(url) {
                return url.substring(url.indexOf("app/"));
            }
        }));
};

gulp.task("build:app:src:js", () => {
    return gulp
        .src(paths.srcAppJs)
        .pipe(addStream.obj(templates()))
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
    gulp.watch([paths.srcAppJs, paths.srcAppHtml], ["build:app:src:js"]);
});

/*
 * app:src:index
 */
gulp.task("build:app:src:index", () => {
    return gulp
        .src(paths.indexHtml)
        .pipe(gulp.dest(paths.distSrc));
});

gulp.task("watch:app:src:index", () => {
    gulp.watch(paths.indexHtml, ["build:app:src:index"]);
});

/*
 * app:src:css
 */
gulp.task("build:app:src:css", () => {
    return gulp
        .src(paths.srcContentCss)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(concat("app.css"))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcContentCss));
});

gulp.task("watch:app:src:css", () => {
    gulp.watch(paths.srcContentCss, ["build:app:src:css"]);
});

/*
 * app:src:img
 */
gulp.task("build:app:src:img", () => {
    return gulp
        .src(paths.srcContentImg)
        .pipe(gulp.dest(paths.distSrcContentImg));
});

gulp.task("watch:app:src:img", () => {
    gulp.watch(paths.srcContentImg, ["build:app:src:img"]);
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
    if(gutil.env.ci) {
        return `${__dirname}/test/unit/config/karma.ci.config.js`;
    }
    return `${__dirname}/test/unit/config/karma.local.config.js`;
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

gulp.task("test:coverage", callback => {
    new karma.Server(
        {
            configFile: `${__dirname}/test/unit/config/karma.coverage.config.js`,
            singleRun: true
        },
        callback)
    .start();
});

gulp.task("coveralls", () => {
    return gulp
        .src("dist/test/unit/coverage/report/lcov.info")
        .pipe(coveralls());
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

let protractorConfigFile = () => {
    if(gutil.env.ci) {
        return `${paths.testE2E}config/protractor.ci.config.js`;
    }
    return `${paths.testE2E}config/protractor.local.config.js`;
};

gulp.task("test:e2e:protractor", () => {
    return gulp
        .src(`${paths.testE2E}config/protractor.bootstrap.js`)
        .pipe(protractor({
            configFile: protractorConfigFile()
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
let srcJsToJs = path => {
    if(path.basename.endsWith(".src")) {
        path.basename = path.basename.substring(0, path.basename.lastIndexOf(".src"));
    }
};

gulp.task("build:vendor:js:bower", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: "**/*.js"
        }))
        .pipe(plumber())
        .pipe(rename(srcJsToJs))
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendorJs));
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
        .pipe(gulp.dest(paths.distSrcVendorJs));
});

gulp.task("watch:vendor:js:npm", () => {
    gulp.watch(paths.npm, ["build:vendor:js:npm"]);
});

/*
 * vendor:css:bower
 */
gulp.task("build:vendor:css:bower", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: "**/*.css"
        }))
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendorCss));
});

gulp.task("watch:vendor:css:bower", () => {
    gulp.watch(paths.bower, ["build:vendor:css:bower"]);
});
