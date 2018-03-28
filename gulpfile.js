var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
 	browserSync = require('browser-sync').create();

gulp.task('server', function() {
	nodemon({
		script: './bin/www',
		ignore: ['gulpfile.js', "node_modules"],
		env: {
			'NODE_ENV': "development"
		}
	}).on('start', function() {
		browserSync.init({
			proxy: 'http://localhost:3000',
			files: ["public/**/*.*", "views/**", "routes/**"],
			port:8080
		}, function() {
			console.log("browser refreshed.");
		});
	});
});
