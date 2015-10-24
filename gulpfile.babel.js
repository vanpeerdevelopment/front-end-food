import gulp from 'gulp';

gulp.task('default', () => {
    return gulp
        .src('app/**')
        .pipe(gulp.dest('dist/'));
});
