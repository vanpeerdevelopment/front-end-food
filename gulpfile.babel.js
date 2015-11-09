import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import ghPages from 'gulp-gh-pages';

gulp.task('clean', () => {
    return del('dist/');
})

gulp.task('build', () => {
    return gulp
        .src('app/**/*')
        .pipe(gulp.dest('dist/'));
})

gulp.task('default', (callback) => {
    runSequence('clean', 'build', callback);
});

gulp.task("deploy", () => {
    return gulp
        .src('dist/**/*')
        .pipe(ghPages());
})
