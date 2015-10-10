/**
 * Templates task
 * Processes Jade tempates.
 */

var jade = require('gulp-jade'),
    prettify = require('gulp-prettify'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync');

gulp.task('templates', function () {
    return gulp.src(config.html.src)
        .pipe(jade({
            pretty: true,
            data: JSON.parse(fs.readFileSync('./src/globals.json', {encoding: 'utf8'}))
        }))
        .on('error', gutil.log)
        .pipe(prettify({indent_size:4}))
        .pipe(gulp.dest(config.html.dest))
        .pipe(browserSync.reload({stream: true}));
});
