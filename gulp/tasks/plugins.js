var concat = require('gulp-concat');

gulp.task('plugins', function() {
    return gulp.src('src/lib/vendor/*.js')
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('build/assets/js'));
});
