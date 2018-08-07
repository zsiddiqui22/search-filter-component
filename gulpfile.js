var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var imageMin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var pug          = require('gulp-pug');


// Copy HTML
gulp.task('html', function() {
    gulp.src('src/*.html')
    //.pipe(pug())
    .pipe(gulp.dest('dist'));
});


// Gulp Sass Task
gulp.task('build-css', function() {
    gulp.src('src/scss/{,/**/*}*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
            //outputStyle: 'nested'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

//Gulp Scripts Task
gulp.task('scripts', function(){
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(concat('search-filter-component.js'))
        .pipe(gulp.dest('dist/js'));
});

//Gulp Images Task
gulp.task('imageMin', function(){
    return gulp.src('src/images/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({quality: '50-100', speed: 5})]
        }))
        .pipe(gulp.dest('dist/images'))
});

// Fonts
gulp.task('fonts',function(){
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});
// Create Gulp Watch Task
gulp.task('watch', function(){
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/css/**/*.scss', ['build-css']);
    gulp.watch(['src/js/*.js'], ['scripts']);
    gulp.watch(['src/img/*.*'], ['imageMin']);
    gulp.watch(['src/fonts/*.*'], ['fonts']);
});

// Create Gulp Default Task
gulp.task('default', ['watch','html', 'build-css', 'scripts', 'imageMin', 'fonts']);
//gulp.task('default', ['watch', 'build-css', 'imageMin']);
