const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const flexBugsFix = require('postcss-flexbugs-fixes');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const globalVars = require('./_global-vars');

/*----------------------------------------------------------------------------------------------
	SCSS
 ----------------------------------------------------------------------------------------------*/
const adminSassSRC = ['src/config/admin/scss/admin.scss'];

const processors = [
	autoprefixer({overrideBrowserslist: ['last 2 versions', 'ios >= 8']}),
	flexBugsFix
];

// compile scss files
gulp.task('css-admin', css.bind(null, adminSassSRC, 'admin.css', 'dist'));

function css(src, name, dest) {
	return gulp.src(src)
		.pipe(plumber(globalVars.msgERROR))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: globalVars.productionBuild ? 'compressed' : 'expanded'}))
		.pipe(postcss(processors))
		.pipe(rename(name))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest));
}

// export tasks
module.exports = {
	css: css
};
