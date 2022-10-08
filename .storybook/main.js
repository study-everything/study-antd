const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').default;

function resolve(...dirs) {
	return path.join(__dirname, '../', ...dirs);
}


module.exports = {
	core: {
    builder: 'webpack5',
  },
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
		"../packages/**/*.story.@(js|jsx|ts|tsx)",
		"../packages/**/*.story.mdx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
	webpackFinal: async (config) => {
    // config.resolve = {
    //   ...config.resolve,
    //   plugins: [
    //     ...(config.resolve.plugins || []),
    //     // 负责解析 @mountain/styles 此类导入
    //     new TsconfigPathsPlugin({
    //       extensions: ['.ts', '.tsx', '.js'],
    //       configFile: path.join(__dirname, '../tsconfig.json'),
    //     }),
    //   ],
    // };
		
		config.resolve = {
      ...config.resolve,
      alias: {
				...config.resolve.alias,
				'@study/util': resolve('packages/util'),
				'@study/style': resolve('packages/style')
			}
    };

		config.module.rules.push({
      test: /\.less$/,
			include: [resolve('packages/style')],
      use: ['style-loader', 'css-loader', {
				loader: 'less-loader',
				options: {
					lessOptions: {
						javascriptEnabled: true
					}
				}
			}],
      include: path.resolve(__dirname, '../packages'),
    });

    return config;
  },
}


console.log(resolve('packages/style'))