
var gulp = require('gulp'),
	clean = require('gulp-clean'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	umd = require('gulp-umd'),
	karma = require('karma').server;
	paths = {
		coffeescripts: ['src/color.coffee', 'src/drawers/turtle-drawer.coffee', 'src/turtle.coffee','src/**/*.coffee']
	};


 
gulp.task('clean', function () {
	'use strict';
	return gulp.src('dist/**/*.js', {read: false})
    	.pipe(clean());
});


gulp.task('test', function(done) {
	'use strict';
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
});

gulp.task('coffeescripts', function() {
	// Minify and copy all JavaScript (except vendor scripts)
	return gulp.src(paths.coffeescripts)
		.pipe(concat('turtle.min.coffee'))
		.pipe(coffee())
		//.pipe(umd())
		.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
	// Minify and copy all JavaScript (except vendor scripts)
	return gulp.src('./src/**/*.coffee')
	.pipe(coffee())
		//.pipe(umd())
	.pipe(gulp.dest('dist'));
});



// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.coffeescripts, ['coffeescripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'coffeescripts', 'build', 'test']);