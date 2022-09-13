var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll serve']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('_site/css'))
        //.pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.watch('_scss/*.scss', ['sass']);
});

gulp.task('default', ['build', 'serve', 'watch']);