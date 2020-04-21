const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const webpack = require('webpack-stream');
const webpackAdmin = require('../webpack/webpack.config.js');
const gulpif = require('gulp-if');
const globalVars = require('./_global-vars');

/*----------------------------------------------------------------------------------------------
	JS
 ----------------------------------------------------------------------------------------------*/
gulp.task('js', adminJS);

function adminJS() {
	return gulp.src('src/config/admin/js/**.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(webpack(webpackAdmin))
		.pipe(gulpif(globalVars.productionBuild, uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('.'));
}

// export tasks
module.exports = {
	adminJS: adminJS
};
