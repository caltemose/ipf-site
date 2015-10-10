/**
 * Clean task
 * Deletes all files from the build folder.
 */

var del = require('del');

gulp.task('clean', function () {
    return del([config.html.dest]);
});
