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
            data: {
                globals: JSON.parse(fs.readFileSync('./src/data/globals.json', {encoding: 'utf8'})),
                music: JSON.parse(fs.readFileSync('./src/data/music.json', {encoding: 'utf8'}))
            }
        }))
        .on('error', gutil.log)
        .pipe(prettify({indent_size:4}))
        .pipe(gulp.dest(config.html.dest))
        .pipe(browserSync.reload({stream: true}));
});

// function cleanMusic (data) {
//     for(var i=0; i<data.bands.length; i++) {
//         data.bands[i].modified = 'true';
//     }
//     return data;
// }
