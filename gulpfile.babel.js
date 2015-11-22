import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
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

gulp.task("clean", () => {
    return del("dist/");
});

gulp.task("dev", ["build:app", "build:vendor", "watch", "serve"]);

gulp.task("build", ["build:app", "build:vendor", "lint"]);

gulp.task("build:app", ["build:app:js", "build:app:html", "build:app:cname"]);

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
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest("dist/app/"));
});

gulp.task("build:app:html", () => {
    return gulp
        .src(["src/index.html", "src/app/**/*.html"], {
            base: "src"
        })
        .pipe(gulp.dest("dist/"));
});

gulp.task("build:app:cname", () => {
    return gulp
        .src(["src/CNAME"])
        .pipe(gulp.dest("dist/"));
});

gulp.task("build:vendor", ["build:vendor:js"]);

gulp.task("build:vendor:js", ["build:vendor:js:bower", "build:vendor:js:lib"]);

gulp.task("build:vendor:js:bower", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: "**/*.js"
        }))
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(extReplace(".min.js", ".src.min.js"))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest("dist/vendor/"));
});

gulp.task("build:vendor:js:lib", () => {
    return gulp
        .src("src/lib/**/*.js")
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest("dist/vendor/"));
});

gulp.task("lint", () => {
    return gulp.src(["gulpfile.babel.js", "src/app/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("watch", ["watch:app", "watch:vendor"]);

gulp.task("watch:app", () => {
    gulp.watch(["src/app/**/*", "src/CNAME", "src/index.html"], ["watch:app:build"]);
});

gulp.task("watch:vendor", () => {
    gulp.watch(["bower.json", "src/lib/**/*"], ["watch:vendor:build"]);
});

gulp.task("watch:app:build", ["build:app"], browserSyncServer.reload);

gulp.task("watch:vendor:build", ["build:vendor"], browserSyncServer.reload);

gulp.task("serve", () => {
    browserSyncServer.init({
        server: {
            baseDir: "dist/"
        }
    });
});
