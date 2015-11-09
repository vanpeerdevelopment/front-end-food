import gulp from 'gulp';
import del from 'del';
import ghPages from 'gulp-gh-pages';

gulp.task('clean', () => {
    return del('dist/');
})

gulp.task('default', () => {
    return gulp
        .src('app/**/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task("deploy", () => {
    return gulp
        .src('dist/**/*')
        .pipe(ghPages());
})
