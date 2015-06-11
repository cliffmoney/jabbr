var gulp = require('gulp');

gulp.task('copy-npm', function(){
	return gulp
	.src('package.json')
	.pipe(gulp.dest('test'));
});

gulp.task('copy-server', function(){
	return gulp
	.src('server/**')
	.pipe(gulp.dest('test/server'));
});