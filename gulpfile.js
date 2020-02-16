let gulp = require('gulp');
let webserver = require('gulp-webserver');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./assets/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./assets/style.scss', gulp.series('sass'));
});

gulp.task('webserver', function() {
    gulp.src('/')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});