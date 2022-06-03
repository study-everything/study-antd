const compile = require("./compile")
const generateDTS = require("./generateDTS.JS")
const getRollupConfig = require("./getRollupConfig")
const { isTypescript, getPackageJson } = require("./shared")
const chalk = require('chalk')
async function buildPackage(){
	const options = {
		formats: ['cjs', 'es', 'umd'],
		sourcemap: false
	}
	let packageJson;
	try {
		const { sourcemap, formats } = options
		packageJson = await getPackageJson()
		console.log(`正在打包组件 ${chalk.cyan(packageJson.name)}...`)
		let startTime = Date.now()
		if(isTypescript()) {
			console.log(`组件 ${chalk.cyan(packageJson.name)} 是 typescript 项目，正在生成声明文件(.d.ts)...`)
			await generateDTS()
			console.log(`组件 ${chalk.cyan(packageJson.name)} 的声明文件生成成功！`)
		}
		for (const format of formats) {
			console.log(`正在将组件  ${chalk.cyan(packageJson.name)} 打包成 ${chalk.cyan(format)}`)
			const rollupConfig = await getRollupConfig({ format, sourcemap })
			await compile(rollupConfig)
		}
		console.log(`组件 ${chalk.cyan(packageJson.name)} 打包成功，共花费 ${chalk.green(
			`${((Date.now() - startTime) / 1000).toFixed(2)}s`
		)}`)
	} catch (error) {
		console.error(`组件 ${chalk.cyan(packageJson.name)} 打包失败`)
		console.log(error.toString())
		process.exit(1)
	}

	


}

module.exports = buildPackage