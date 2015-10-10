/**
 * Javascript task
 * Copy javascript to build folder.
 */

gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dest));
});
