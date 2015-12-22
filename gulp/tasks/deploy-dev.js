var rsync = require('gulp-rsync');

gulp.task('deploy-dev', function() {
    return gulp.src('build/**')
        .pipe(rsync({
            root: 'build',
            hostname: 'ipf.chadzilla.com',
            destination: '/home/ipfestival/ipf.chadzilla.com/',
            username: 'ipfestival',
            progress: true,
            recursive: true
    }));
});
