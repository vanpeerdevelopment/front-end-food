import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';

let browserSyncServer = browserSync.create('front-end-food	');

/*
 * main tasks
 */

gulp.task('default', ['clean:build']);

gulp.task('clean:build', (callback) => {
    runSequence('clean', 'build', callback);
});

gulp.task('clean:dev', (callback) => {
    runSequence('clean', 'dev', callback);
});

gulp.task("deploy", () => {
    return gulp
        .src('dist/**/*')
        .pipe(ghPages());
})


/*
 * helper tasks
 */

gulp.task('clean', () => {
    return del('dist/');
})

gulp.task('dev', ['build', 'watch', 'serve'])

gulp.task('build', ['build:app', 'build:vendor'])

gulp.task('build:app', () => {
    return gulp
        .src('src/app/**/*')
        .pipe(gulp.dest('dist/'));
})

gulp.task('build:vendor', () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true
        }))
        .pipe(gulp.dest('dist/vendor/'));
})

gulp.task('watch', ['watch:app', 'watch:vendor'])

gulp.task('watch:app', () => {
    gulp.watch('src/app/**/*', ['watch:app:build']);
})

gulp.task('watch:vendor', () => {
    gulp.watch('bower.json', ['watch:vendor:build']);
})

gulp.task('watch:app:build', ['build:app'], browserSyncServer.reload)

gulp.task('watch:vendor:build', ['build:vendor'], browserSyncServer.reload)

gulp.task('serve', () => {
    browserSyncServer.init({
        server: {
            baseDir: 'dist/'
        }
    });
})
