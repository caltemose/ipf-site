/**
 * BrowserSync task
 * Configure BrowserSync.
 */

var browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('browserSync', function () {
    browserSync({
        open: 'local',
        server: {
            baseDir: './build'
        }
    });

    gulp.watch(['*.html', '*.css', '*.js'], {cwd: './build'}, reload);
});
