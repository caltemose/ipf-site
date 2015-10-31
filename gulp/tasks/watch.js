/**
 * Watch tasks
 * Tasks to watch for changes in the project and run appropriate commands.
 */

var browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('watch', ['watch:images', 'watch:files', 'watch:css', 'watch:js', 'watch:templates']);

gulp.task('watch:images', function () {
    gulp.watch(config.watch.images, ['images']);
});

gulp.task('watch:files', function () {
    gulp.watch(config.watch.images, ['images']);
});

gulp.task('watch:css', function () {
    gulp.watch(config.watch.css, ['css']);
});

gulp.task('watch:js', function () {
    gulp.watch(config.watch.js, ['js']);
});

gulp.task('watch:templates', function () {
    gulp.watch(config.watch.html, ['templates']);
});
