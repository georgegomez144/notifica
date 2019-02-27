var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('ts', () => {
    return gulp.src('./src/ts/**/*.ts')
        .pipe(ts({
            outFile: 'notifica.js',
            target: 'ES3'
        }))
        .pipe(gulp.dest('./demo/dist/js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            basename: 'notifica',
            suffix: '.min'
        }))
        .pipe(gulp.dest('./demo/dist/js'));
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            basename: 'notifica',
            suffix: '.min'
        }))
        .pipe(gulp.dest('./demo/dist/css'));
});


gulp.task('watch-ts', () => {
    gulp.watch('./src/ts/**/*.ts', ['ts']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['run-ts', 'watch-ts']);
gulp.task('run-ts', ['sass', 'ts']);