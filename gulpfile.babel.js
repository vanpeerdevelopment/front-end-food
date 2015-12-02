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
const DIST = "dist/";
const DIST_SRC = `${DIST}src/`;

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
        .src(`${DIST_SRC}**/*`)
        .pipe(ghPages());
});

/*
 * helper tasks
 */
gulp.task("build", ["build:app", "build:vendor", "lint", "test"]);
gulp.task("dev", ["build:app", "build:vendor", "watch", "serve"]);
gulp.task("watch", ["watch:app", "watch:vendor", "watch:test"]);

gulp.task("build:app", ["build:app:src"]);
gulp.task("watch:app", ["watch:app:src"]);
gulp.task("build:app:src", ["build:app:src:js", "build:app:src:html", "build:app:src:cname"]);
gulp.task("watch:app:src", ["watch:app:src:js", "watch:app:src:html", "watch:app:src:cname"]);

gulp.task("build:vendor", ["build:vendor:js"]);
gulp.task("watch:vendor", ["watch:vendor:js"]);
gulp.task("build:vendor:js", ["build:vendor:js:bower", "build:vendor:js:npm"]);
gulp.task("watch:vendor:js", ["watch:vendor:js:bower", "watch:vendor:js:npm"]);

/*
 * general
 */
gulp.task("clean", () => {
    return del(DIST);
});

gulp.task("lint", () => {
    return gulp.src(["gulpfile.babel.js", "src/app/**/*.js", "test/unit/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test", callback => {
    new karma.Server({
        configFile: `${__dirname}/test/unit/karma.conf.js`,
        singleRun: true
    },
    callback)
    .start();
});

gulp.task("watch:test", callback => {
    new karma.Server({
        configFile: `${__dirname}/test/unit/karma.conf.js`
    },
    callback)
    .start();
});

gulp.task("serve", () => {
    browserSyncServer.init({
        server: {
            baseDir: DIST_SRC
        }
    });
});

/*
 * app
 */
/*
 * src
 */
/*
 * app:src:js
 */
gulp.task("build:app:src:js", () => {
    return gulp
        .src(["src/app/**/*.js"])
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
        .pipe(gulp.dest(`${DIST_SRC}app/`));
});

gulp.task("watch:app:src:js", () => {
    gulp.watch(["src/app/**/*.js"], ["watch:app:src:js:build"]);
});

gulp.task("watch:app:src:js:build", ["build:app:src:js"], browserSyncServer.reload);

/*
 * app:src:html
 */
gulp.task("build:app:src:html", () => {
    return gulp
        .src(["src/index.html", "src/app/**/*.html"], {
            base: "src"
        })
        .pipe(gulp.dest(DIST_SRC));
});

gulp.task("watch:app:src:html", () => {
    gulp.watch(["src/index.html", "src/app/**/*.html"], ["watch:app:src:html:build"]);
});

gulp.task("watch:app:src:html:build", ["build:app:src:html"], browserSyncServer.reload);

/*
 * app:src:cname
 */
gulp.task("build:app:src:cname", () => {
    return gulp
        .src(["src/CNAME"])
        .pipe(gulp.dest(DIST_SRC));
});

gulp.task("watch:app:src:cname", () => {
    gulp.watch(["src/CNAME"], ["watch:app:src:cname:build"]);
});

gulp.task("watch:app:src:cname:build", ["build:app:src:cname"], browserSyncServer.reload);

/*
 * vendor
 */
/*
 * vendor:js
 */
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
        .pipe(gulp.dest(`${DIST_SRC}vendor/`));
});

gulp.task("watch:vendor:js:bower", () => {
    gulp.watch(["bower.json"], ["watch:vendor:js:bower:build"]);
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
        .pipe(gulp.dest(`${DIST_SRC}vendor/`));
});

gulp.task("watch:vendor:js:npm", () => {
    gulp.watch(["package.json"], ["watch:vendor:js:npm:build"]);
});

gulp.task("watch:vendor:js:npm:build", ["build:vendor:js:npm"], browserSyncServer.reload);
