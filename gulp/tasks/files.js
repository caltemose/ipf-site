/**
 * Files task
 * Copies downloadable files into the build folder.
 */

gulp.task('files', function () {
    gulp.src(config.files.src)
        .pipe(gulp.dest(config.files.dest));
});
