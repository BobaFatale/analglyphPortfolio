const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
// const babel = require('gulp-babel');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

//a task to compile sass
gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles/'))
});

//a task to compile javascript
gulp.task('js', () => {
  browserify('dev/scripts/main.js', {debug: true})
    .transform('babelify', {
      sourceMaps: true,
      presets: ['es2015']
    })
    .bundle()
    .on('error',notify.onError({
      message: "Error: <%= error.message %>",
      title: 'Error in JS 💀'
    }))
	  .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/scripts'))
    .pipe(reload({stream:true}));
});
// gulp.task('scripts', () => {
// 	return gulp.src('./dev/scripts/main.js')
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
// 		.pipe(gulp.dest('./public/scripts/'))
// });

//browsersync task (launches a local server)
gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

//a tast ot watch all ofmy other tasks
gulp.task('watch',() => {
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/**/*.js', ['js']);
	gulp.watch('./public/styles/style.css',reload);

})

gulp.task('default', ['styles', 'js','bs', 'watch']);