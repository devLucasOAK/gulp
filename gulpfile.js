'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-template-cache');
var ngAnnotate = require('gulp-ng-annotate');
var mainbowerfiles = require('main-bower-files');
const mainBowerFiles = require('main-bower-files');

gulp.task('libs', function(){
    return gulp.src(mainBowerFiles(), {
        base: 'app/bower_components'
    })
    .pipe(gulp.dest('dist/src'));
});

gulp.task('appModules', function (){
    return gulp.src('app/js/**/*.js')
    .pipe(ngAnnotate())
    .pipe(angularFileSort())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/src'));
});

gulp.task('css', function(){
    return gulp.src('app/css/*.js')
    .pipe(concat('style.css'))
    .pipe(gulp.dist('dist/src'));
});

gulp.task('templates', function(){
    return gulp.src('app/templates/*.html')
    .pipe(templateCache('template.js', {
        module: 'quizApp',
        root: 'app/templates'
    }))
    .pipe(gulp.dist('dist/src'));
});