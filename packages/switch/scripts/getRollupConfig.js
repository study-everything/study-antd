const path = require('path');
const { cwd, isTypescript, getPackageJson } = require('./shared');
const fs = require('fs-extra');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs'); // 将 commonjs 模块 转换成 ES Module
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const getRootDir = require('./getRootDir');

async function getRollupConfig(config = {}) {
  const packageJson = await getPackageJson();

  let external;

  if (config.format === 'umd') {
    external = [...Object.keys({ ...packageJson.peerDependencies })];
  } else {
    external = [
      ...new Set([
        ...Object.keys({ ...packageJson.peerDependencies, ...packageJson.dependencies }).map(
          key => {
            if (key.startsWith('@study')) {
              return key;
            }
            return new RegExp(`^${key}`);
          },
        ),
      ]),
      /@babel\/runtime/,
    ];
  }

  const plugins = [
    commonjs(),
    nodeResolve({
      extensions: isTypescript() ? ['.ts', '.tsx', '.js', '.jsx'] : ['.js', '.jsx'],
    }),
    isTypescript()
      ? typescript({
          tsconfig: path.resolve(cwd(), 'tsconfig.json'), // tsconfig 要指定 module 不能是 commonjs，否则typescript 将目标代码转为commonjs，后续不能转成 esm
        })
      : null,
    babel({
      babelHelpers: 'runtime',
      extensions: ['.ts', '.tsx'],
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            // modules: config.format === 'esm' ? false : 'commonjs',
            targets: {
              browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'IE 11', 'not dead'],
            },
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
          },
        ],
      ],
    }),
  ].filter(Boolean);

  const output = {
    name: packageJson.name,
    format: config.format,
    sourcemap: config.sourcemap,
  };

  if (config.format === 'es') {
    (output.dir = path.resolve(cwd(), 'esm')), (output.preserveModules = true); // 不进行代码合并，每个文件单独输出 需要指定 output.dir
  }
  if (config.format === 'cjs') {
    (output.dir = path.resolve(cwd(), 'cjs')), (output.preserveModules = true); // 不进行代码合并，每个文件单独输出 需要指定 output.dir
    output.exports = 'named'; // https://rollupjs.org/guide/en/#outputexports
  }

  if (config.format === 'umd') {
    output.file = path.resolve(cwd(), 'dist/index.umd.js');
    output.globals = {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
    };
  }

  return {
    input: config.entry ? config.entry : path.resolve(cwd(), './src/index.tsx'),
    output,
    external,
    plugins,
  };
}

module.exports = getRollupConfig;
