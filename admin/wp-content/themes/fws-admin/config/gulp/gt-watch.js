const gulp = require('gulp');

/*----------------------------------------------------------------------------------------------
	Watch
 ----------------------------------------------------------------------------------------------*/
gulp.task('watch-files', watchFiles);

function watchFiles(done) {
	// // watch .scss files
	// gulp.watch(['src/config/admin/scss/**/*.scss'], gulp.parallel(['css-admin']));
	//
	// // watch .js files
	// gulp.watch('src/jsadmin/**/*.js', 'js');



	done();
}

// export tasks
module.exports = {
	watchFiles: watchFiles
};
