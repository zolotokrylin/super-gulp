// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'); // check js on errors
var stylus = require('gulp-stylus'); // stylus to css
var concat = require('gulp-concat'); // merge files
var jade = require('gulp-jade'); // jade to html
var uglify = require('gulp-uglify'); // minify js
var rename = require('gulp-rename'); // rename files
var minifyCSS = require('gulp-minify-css'); // minify css
var livereload = require('gulp-livereload'); // livereload on chrome
var autoprefixer = require('gulp-autoprefixer'); // set prefixies in css

// copy images
gulp.task('img', function () {
    return gulp.src('src/img/**')
        .pipe(gulp.dest('out/img'))
});

// Jade Task
gulp.task('jade', function () {
    return gulp.src('src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('out'))
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Comple Stylus to css
gulp.task('comple-stylus', function () {
    return gulp.src('src/styl/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('out/css/'));
});

//minify css
gulp.task('minify-css', function () {
    gulp.src('out/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('out/css'))
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(['src/js/*.js'])
        .pipe(concat('mine.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('out/js'))
//        &&
//        gulp.src([
//                'js/bootstrap/transition.js',
//                'js/bootstrap/alert.js',
//                'js/bootstrap/button.js',
//                'js/bootstrap/carousel.js',
//                'js/bootstrap/collapse.js',
//                'js/bootstrap/dropdown.js',
//                'js/bootstrap/modal.js',
//                'js/bootstrap/tooltip.js',
//                'js/bootstrap/popover.js',
//                'js/bootstrap/scrollspy.js',
//                'js/bootstrap/tab.js',
//                'js/bootstrap/affix.js'])
//            .pipe(concat('bootstrap.min.js'))
//            .pipe(uglify())
//            .pipe(gulp.dest('out/js'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/js/**', ['lint', 'scripts']);
    gulp.watch('src/styl/*.styl', ['comple-stylus']);
    gulp.watch('out/css/*.css', ['minify-css']);
    gulp.watch('src/jade/**', ['jade']);
    gulp.watch('src/img/*', ['img']);
    var server = livereload();
    gulp.watch('out/**').on('change', function(file) {
        server.changed(file.path);
    });
});

// Default Task
gulp.task('default',
    [
        'lint',
        'comple-stylus',
        'jade',
        'watch',
        'img',
        'minify-css'
    ]);


