var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFile = ['*.js', 'src/**/*.js'];

gulp.task('serve', function () {

    var optons = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFile
    };
    return nodemon(optons)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});