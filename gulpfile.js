var gulp = require('gulp')
    , gutil = require('gulp-util')
    , del = require('del')
    , sass = require('gulp-sass')
    , notify = require('gulp-notify')
    , jade = require('gulp-jade')
    , marked = require('marked')
    , prettify = require('gulp-prettify')
    , fs = require('fs')
    , eslint = require('gulp-eslint')
    , browserSync = require('browser-sync').create()
    // , reload = browserSync.reload
    , rsync = require('gulp-rsync')
    ;

var CONFIG = {
    css: {
        src: 'src/assets/css/main.scss',
        dest: 'build/assets/css'
    },
    html: {
        src: 'src/**/*.jade',
        dest: 'build/',
        globals: 'src/globals.json'
    },
    js: {
        src: 'src/assets/js/**/*.js',
        dest: 'build/assets/js'
    },
    watch: {
        css: 'src/assets/css/**/*.scss',
        html: 'src/**/*.jade'
    }
};

//
// ----------- tasks -----------
//

gulp.task('clean', function(cb) {
    del([CONFIG.css.dest, CONFIG.js.dest], cb);
});

gulp.task('images', function () {
    gulp.src('src/assets/img/**')
        .pipe(gulp.dest('build/assets/img'));
});

gulp.task('css', function() {
    return gulp.src(CONFIG.css.src)
        .pipe(sass({style:'expanded'})
        .on('error', sass.logError))
        .pipe(gulp.dest(CONFIG.css.dest))
        .pipe(browserSync.stream())
        // .pipe(notify({message:'styles task complete'}));
});

gulp.task('templates', function() {
    return gulp.src(CONFIG.html.src)
        .pipe(jade({
            pretty:true,
            data: JSON.parse( fs.readFileSync(CONFIG.html.globals, { encoding: 'utf8' }) )
        }))
        .on('error', gutil.log)
        .pipe(prettify({indent_size:4}))
        .pipe(gulp.dest(CONFIG.html.dest))
        .pipe(browserSync.stream())
        // .pipe(notify({message:'templates task complete'}));
        // .pipe(reload({stream:true}));
});

gulp.task('js', function () {
    gulp.src('src/assets/js/**')
        .pipe(gulp.dest('build/assets/js'));
});

gulp.task('lint', function () {
    return gulp.src([CONFIG.js.src])
        .pipe(eslint({configFile: './eshint.json'}))
        .pipe(eslint.format());
        // .pipe(eslint.failOnError());
});

gulp.task('watch', function () {
    gulp.watch(CONFIG.watch.css, ['css']);
    gulp.watch(CONFIG.watch.html, ['templates']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
});

gulp.task('deploy', function() {
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


//
// ----------- jobs -----------
//

gulp.task('default', ['clean'], function() {
    gulp.start('images', 'css', 'templates', 'js', 'watch', 'browser-sync');
});

gulp.task('release', ['clean'], function () {
    gulp.start('images', 'css', 'templates', 'js');
});
