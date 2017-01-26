/**
 * Created by Administrator on 1/25/2017.
 */

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default',function(){
    nodemon({
        script:'app.js',
        env:{
            PORT:8000
        },
        ext:'js',
        ignore:'./node_modules/**'
    }).on('restart',function(){
        console.log('Restating')
    });
});