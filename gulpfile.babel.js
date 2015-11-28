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
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";
import ghPages from "gulp-gh-pages";

const browserSyncServer = browserSync.create("front-end-food");

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
        .src("dist/**/*")
        .pipe(ghPages());
});

/*
 * helper tasks
 */
gulp.task("build", ["build:app", "build:vendor", "lint"]);
gulp.task("dev", ["build:app", "build:vendor", "watch", "serve"]);
gulp.task("watch", ["watch:app", "watch:vendor"]);

gulp.task("build:app", ["build:app:js", "build:app:html", "build:app:cname"]);
gulp.task("watch:app", ["watch:app:js", "watch:app:html", "watch:app:cname"]);

gulp.task("build:vendor", ["build:vendor:js"]);
gulp.task("watch:vendor", ["watch:vendor:js"]);
gulp.task("build:vendor:js", ["build:vendor:js:bower", "build:vendor:js:npm"]);
gulp.task("watch:vendor:js", ["watch:vendor:js:bower", "watch:vendor:js:npm"]);

/*
 * general
 */
gulp.task("clean", () => {
    return del("dist/");
});

gulp.task("lint", () => {
    return gulp.src(["gulpfile.babel.js", "src/app/**/*.js", "test/unit/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("serve", () => {
    browserSyncServer.init({
        server: {
            baseDir: "dist/"
        }
    });
});

/*
 * app
 */
/*
 * app:js
 */
gulp.task("build:app:js", () => {
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
        .pipe(gulp.dest("dist/app/"));
});

gulp.task("watch:app:js", () => {
    gulp.watch(["src/app/**/*.js"], ["watch:app:js:build"]);
});

gulp.task("watch:app:js:build", ["build:app:js"], browserSyncServer.reload);

/*
 * app:html
 */
gulp.task("build:app:html", () => {
    return gulp
        .src(["src/index.html", "src/app/**/*.html"], {
            base: "src"
        })
        .pipe(gulp.dest("dist/"));
});

gulp.task("watch:app:html", () => {
    gulp.watch(["src/index.html", "src/app/**/*.html"], ["watch:app:html:build"]);
});

gulp.task("watch:app:html:build", ["build:app:html"], browserSyncServer.reload);

/*
 * app:cname
 */
gulp.task("build:app:cname", () => {
    return gulp
        .src(["src/CNAME"])
        .pipe(gulp.dest("dist/"));
});

gulp.task("watch:app:cname", () => {
    gulp.watch(["src/CNAME"], ["watch:app:cname:build"]);
});

gulp.task("watch:app:cname:build", ["build:app:cname"], browserSyncServer.reload);

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
        .pipe(gulp.dest("dist/vendor/"));
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
        .pipe(gulp.dest("dist/vendor/"));
});

gulp.task("watch:vendor:js:npm", () => {
    gulp.watch(["package.json"], ["watch:vendor:js:npm:build"]);
});

gulp.task("watch:vendor:js:npm:build", ["build:vendor:js:npm"], browserSyncServer.reload);
