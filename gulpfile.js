/*eslint-env node */

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');


gulp.task('connect', function() {
    connect.server({
        root: './',
        port: 3000,
        livereload: true
    });
});

/* *************
    CSS
************* */

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var postcssProcessors = [
    autoprefixer({
        browsers: [
            'Explorer >= 11',
            'last 2 Explorer versions',
            'last 2 ExplorerMobile versions',
            'last 2 Edge versions',

            'last 2 Firefox versions',
            'last 2 FirefoxAndroid versions',

            'last 2 Chrome versions',
            'last 2 ChromeAndroid versions',

            'last 3 Safari versions',
            'last 3 iOS versions',

            'last 2 Opera versions',
            'last 2 OperaMini versions',
            'last 2 OperaMobile versions',

            'last 2 Android versions',
            'last 2 BlackBerry versions'
        ]
    })
];

var sassMainFile = 'sass/main.scss';
var sassFiles = 'sass/**/*.scss';

gulp.task('css', function() {
    gulp.src(sassMainFile)
        .pipe(sourcemaps.init())
        .pipe(
            sass({ outputStyle: 'compressed' })
            .on('error', gutil.log)
        )
        .pipe(
            postcss(postcssProcessors, { syntax: scss })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
});


/* *************
    HTML
************* */

var htmlFiles = ['*.html'];

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(connect.reload());
});


/* *************
    JS
************* */

var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var babel = require('gulp-babel');

var jsFiles = 'js/src/**/*.js';

gulp.task('js', function() {
    gulp.src('js/src/vendor/*.js')
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js/build/'))
    gulp.src('js/src/app/*.js')
        .pipe(
            babel({ presets: ['es2015'] })
            .on('error', gutil.log)
        )
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js/build/'))
        .pipe(connect.reload());
});


/* *************
    WATCH
************* */

gulp.task('watch', function() {
    gulp.watch(sassFiles, ['css']);
    gulp.watch(jsFiles, ['js']);
    gulp.watch(htmlFiles, ['html']);
});


/* *************
    DEFAULT
************* */

gulp.task('default', ['connect', 'css', 'js', 'watch']);
