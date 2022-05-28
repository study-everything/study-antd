
const spawn = require('child-process-promise').spawn;
const getRootDir = require('./getRootDir');
const { cwd } = require('./shared')

async function generateDTS(){
	const rootDir = getRootDir()
	await spawn('tsc', ['--project', 'tsconfig.json', '--declaration', 'true', '--declarationDir', 'lib' ,'--declarationMap', 'false', '--emitDeclarationOnly', 'true'], {
		cwd: cwd()
	})
}

module.exports = generateDTS