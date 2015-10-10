/**
 * Default job
 * Compiles templates, css, assets and serves them with Browsersync.
 */

gulp.task('default', ['build'], function () {
    gulp.start('browserSync');
    gulp.start('watch');
});
