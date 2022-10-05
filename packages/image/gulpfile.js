const {src, dest, task, parallel} = require("gulp");
const gulpLess = require('gulp-less')
const replace = require('gulp-replace')
const gulpTs = require('gulp-typescript')
const tsConfig = require('./tsconfig.json')
const babel = require('gulp-babel');
const getBabelConfig = require("./scripts/getBabelConfig");
const buildPackage = require("./scripts/buildPackage");

async function compileLess(isEsm){
	const targetDict = isEsm ? 'esm/style' : 'cjs/style'
	return src(['src/style/index.less']).pipe(replace(/(@import\s)['"]~@study\/style\/([^'"]+)['"]/g, '$1\'../../packages/style/$2\'')).pipe(gulpLess({
		javascriptEnabled: true
	})).pipe(dest(targetDict))
}

async function copyLess(isEsm){
	const targetDict = isEsm ? 'esm/style' : 'cjs/style'
	return src('src/style/*.less').pipe(dest(targetDict))
}

/**
 * 编译 style 下 index.tsx
 * import '@study/style/esm/index.less'
 */
async function compileStyeTs(isEsm){
	const targetDict = isEsm ? 'esm/style' : 'cjs/style'
	return src(['src/style/*.tsx', 'src/style/*.ts'])
			.pipe(gulpTs({...tsConfig.compilerOptions}))
			.js.pipe(babel(getBabelConfig(isEsm)))
			.pipe(replace(/(import\s)['"]@study\/style\/src\/([^'"]+)['"]/g, `$1@study/style/${targetDict}/$2`))
			.pipe(dest(targetDict))
}

async function compileToESM() {
	await compileLess(true)
	await copyLess(true)
}

async function compileToCJS() {
	await compileLess(false)
	await copyLess(false)
}



exports.default = parallel(buildPackage, compileToESM, compileToCJS)