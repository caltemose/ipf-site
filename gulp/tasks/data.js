gulp.task('data', function () {
    gulp.src(config.data.src)
        .pipe(gulp.dest(config.data.dest));
});
