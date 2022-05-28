

function getGulpBabelConfig(isEsm){

	return {
		presets: [
			['@babel/preset-env',{
				modules: isEsm ? false : 'commonjs',
				targets: {
					browsers: [
						"> 0.5%",
						"last 2 versions",
						"Firefox ESR",
						"IE 11",
						"not dead",
					]
				}
			}]
		],
		plugins: [
			['@babel/plugin-transform-runtime', {  corejs: 3 } ]
		]
	}
}

module.exports = getGulpBabelConfig