const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

//a task to compile sass
gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles/'))
});

//a task to compile javascript
gulp.task('scripts', () => {
	return gulp.src('./dev/scripts/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/scripts/'))
});

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
	gulp.watch('./dev/scripts/**/*.js', ['scripts']);
	gulp.watch('./public/styles/style.css',reload);

})

gulp.task('default', ['styles', 'scripts','bs', 'watch']);