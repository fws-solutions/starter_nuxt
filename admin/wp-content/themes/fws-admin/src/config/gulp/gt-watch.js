const gulp = require('gulp');

/*----------------------------------------------------------------------------------------------
	Watch
 ----------------------------------------------------------------------------------------------*/
gulp.task('watch-files', watchFiles);

function watchFiles(done) {
	// watch .scss files
	gulp.watch('src/config/admin/scss/**/*.scss', 'css');

	// watch .js files
	gulp.watch('src/config/admin/js/**/*.js', 'js');
	
	done();
}

// export tasks
module.exports = {
	watchFiles: watchFiles
};
