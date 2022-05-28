const gulp = require('gulp')
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const getBabelConfig = require('./scripts/getBabelConfig');

const esmTsProject = ts.createProject('tsconfig.json')
const cjsTsProject = ts.createProject('tsconfig.json')
async function compileToESM(){
	return await gulp.src('src/**/*.ts').pipe(esmTsProject()).js.pipe(babel(getBabelConfig(true))).pipe(gulp.dest('esm'))
}



async function compileToCJS(){
	return gulp.src('src/**/*.ts').pipe(cjsTsProject()).js.pipe(babel(getBabelConfig(false))).pipe(gulp.dest('cjs'))
}

async function copyAssets(){
	return await gulp.src(['src/**/*.less', 'src/**/*.js']).pipe(gulp.dest('esm')).pipe(gulp.dest('cjs'))
}

async function lessToCss(){
	return await gulp.src('src/index.less').pipe(less({
		javascriptEnabled: true
	})).pipe(gulp.dest('esm')).pipe(gulp.dest('cjs'))
}

exports.build = gulp.parallel(copyAssets, lessToCss, compileToESM, compileToCJS )
