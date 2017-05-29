var gulp = require('gulp'),
    sass = require('gulp-sass'),
    js = require('gulp-uglify'),
    cssmini = require('gulp-minify-css'),
    htmlmini = require('gulp-minify-html'),
    imgmin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat');

gulp.task('sass',function(){
    gulp.src('web/css/*.scss').pipe(sass()).pipe(gulp.dest('web/css/'));
    gulp.watch('web/css/*.scss',['sass']);
})

gulp.task('img', function () {
    return gulp.src('web/image/*')
        .pipe(imgmin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('web/image/'));
})

gulp.task('jsint', function () {
    gulp.src('web/js/index.js').pipe(jshint()).pipe(jshint.reporter()); // 输出检查结果
})

gulp.task('jsmin',function(){
    gulp.src(['web/js/*.js','!web/js/*.min.js']).pipe(js()).pipe(gulp.dest('web/js/'));
})

gulp.task('cssmini',function(){
    gulp.src(['web/css/*.css','!web/css/*.min.css']).pipe(cssmini()).pipe(gulp.dest('web/css/'));
})

gulp.task('htmlmini',function(){
    gulp.src('web/*.html').pipe(htmlmini()).pipe(gulp.dest('web/'));
})

gulp.task('concatjs',function(){
    gulp.src(['web/js/jquery.min.js','web/js/swiper.min.js','web/js/index.js']).pipe(concat('all.js')).pipe(gulp.dest('web/js/'));
})

gulp.task('concatcss',function(){
    gulp.src(['web/css/public.css','web/css/index.css','web/css/*.css']).pipe(concat('all.css')).pipe(gulp.dest('web/css/'));
})

gulp.task('default',['jsmin','cssmini','htmlmini']);