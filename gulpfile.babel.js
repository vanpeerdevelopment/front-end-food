import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

gulp.task('default', () => {
    return gulp
        .src('./app/**/*')
        .pipe(gulp.dest('./dist/'));
});

gulp.task("deploy", () => {
    return gulp
        .src('./dist/**/*')
        .pipe(ghPages());
})
