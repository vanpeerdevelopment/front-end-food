import gulp from 'gulp';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import runSequence from 'run-sequence';
import ghPages from 'gulp-gh-pages';

gulp.task('clean', () => {
    return del('dist/');
})

gulp.task('build:app', () => {
    return gulp
        .src('app/**/*')
        .pipe(gulp.dest('dist/'));
})

gulp.task('build:vendor', () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true
        }))
        .pipe(gulp.dest('dist/vendor/'));
})

gulp.task('build', ['build:app', 'build:vendor'])

gulp.task('default', (callback) => {
    runSequence('clean', 'build', callback);
});

gulp.task("deploy", () => {
    return gulp
        .src('dist/**/*')
        .pipe(ghPages());
})
