const gulp = require('gulp');
const globalVars = require('./src/config/gulp/_global-vars');

/*----------------------------------------------------------------------------------------------
	Prepare and Run all Gulp Tasks
 ----------------------------------------------------------------------------------------------*/
const adminSassSRC = ['src/config/admin/scss/admin.scss'];
const gtCss = require('./src/config/gulp/gt-css');
const gtJs = require('./src/config/gulp/gt-js');
const gtWatch = require('./src/config/gulp/gt-watch');

// prepare for build
function prodBuild(done) {
	globalVars.productionBuild = true;
	done();
}

function devBuild(done) {
	globalVars.productionBuild = false;
	done();
}

// build all files for production
gulp.task('build', gulp.series(
	prodBuild,
	gulp.parallel(
		gtCss.css.bind(null, adminSassSRC, 'admin.css', '.'),
		gtJs.adminJS
	)
));

// build all files for development
gulp.task('build-dev', gulp.series(
	devBuild,
	gulp.parallel(
		gtCss.css.bind(null, adminSassSRC, 'admin.css', '.'),
		gtJs.adminJS
	)
));

// start dev tasks
gulp.task('watch', gulp.series(
	devBuild,
	gulp.parallel(
		gtCss.css.bind(null, adminSassSRC, 'admin.css', '.'),
		gtJs.adminJS
	),
	gtWatch.watchFiles
));
