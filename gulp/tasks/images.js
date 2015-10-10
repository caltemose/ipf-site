/**
 * Images task
 * Copies images into the build folder.
 */

gulp.task('images', function () {
    gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest));
});
