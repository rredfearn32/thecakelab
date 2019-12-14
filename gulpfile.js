var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./assets/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.assets'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./assets/style.scss', ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('/')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});