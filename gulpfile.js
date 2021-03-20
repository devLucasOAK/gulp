'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var mainBowerFiles = require('main-bower-files');
var gulpUglify = require('gulp-uglify');



gulp.task('libs', gulp.series(function(){
    return gulp.src(mainBowerFiles())
        .pipe(angularFileSort())
        .pipe(concat('libs.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/src'));
}));

gulp.task('appModules', function (){
    return gulp.src('app/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(angularFileSort())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('css', gulp.series(function(){
    return gulp.src('app/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/src'));
}));

gulp.task('templates', gulp.series(function(){
    return gulp.src('app/templates/*.html')
        .pipe(templateCache('template.js', {
            module: 'quizApp',
            root: 'app/templates'
    }))
    .pipe(gulp.dest('dist/src'));
}));

gulp.task('index', gulp.series(function(){
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist/'));
}));


gulp.task('appMain', gulp.series(function(){
    return gulp.src('app/app.js')
        .pipe(gulp.dest('dist/'));
}));

gulp.task('build', gulp.parallel('index', 'templates', 'css', 'libs', 'appModules', 'appMain'));