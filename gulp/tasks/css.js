/**
 * CSS task
 * Compiles SASS files into CSS in the build folder.
 */

var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

gulp.task('css', function () {
    return gulp.src(config.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 version']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.css.dest))
        .pipe(browserSync.reload({stream: true}));
});
