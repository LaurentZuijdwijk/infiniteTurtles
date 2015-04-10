
var gulp, coffee, uglify, zip, sourcemaps, paths, shell;

gulp = require('gulp');

coffee = require('gulp-coffee');
concat = require('gulp-concat');
uglify = require('gulp-uglify');

paths = {
	coffeescripts: ['src/color.coffee', 'src/turtle.coffee','src/**/*.coffee']
};

gulp.task('coffeescripts', function() {
	// Minify and copy all JavaScript (except vendor scripts)
	return gulp.src(paths.coffeescripts)
		.pipe(concat('turtle.min.coffee'))
		.pipe(coffee())
		.pipe(uglify())
	.pipe(gulp.dest('dist'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.coffeescripts, ['coffeescripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['coffeescripts']);