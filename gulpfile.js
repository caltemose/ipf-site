var gulp = require('gulp')
    , del = require('del')
    , sass = require('gulp-sass')
    , notify = require('gulp-notify')
    , jade = require('gulp-jade')
    , marked = require('marked')
    , prettify = require('gulp-prettify')
    , fs = require('fs')
    , eslint = require('gulp-eslint')
    , browserSync = require('browser-sync')
    , reload = browserSync.reload
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
// ----------- private tasks ----------- 
//

gulp.task('clean', function(cb) {
    del([CONFIG.css.dest, CONFIG.js.dest], cb);
});

gulp.task('css', function() {
    return gulp.src(CONFIG.css.src)
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest(CONFIG.css.dest))
        .pipe(notify({message:'styles task complete'}))
        .pipe(reload({stream:true}));
});

gulp.task('templates', function() {
    return gulp.src(CONFIG.html.src)
        .pipe(jade({
            pretty:true,
            data: JSON.parse( fs.readFileSync(CONFIG.html.globals, { encoding: 'utf8' }) )
        }))
        .pipe(prettify({indent_size:4}))
        .pipe(gulp.dest(CONFIG.html.dest))
        .pipe(notify({message:'templates task complete'}))
        .pipe(reload({stream:true}));
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
    browserSync({
        server: {
            baseDir: './build',
            directory: false
        }
    });
});


// 
// ----------- public tasks ----------- 
//

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'templates', 'lint', 'watch', 'browser-sync');
});


// gulp.task('default', ['js','css','templates','express','watch']);
