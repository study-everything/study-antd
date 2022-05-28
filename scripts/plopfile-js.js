const path = require('path') ;

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      { type: 'input', name: 'name', message: '请输入组件名称（多个单词以中横线命名）' },
      { type: 'input', name: 'CN', message: '请输入组件中文名称' },
      { type: 'input', name: 'description', message: '请输入组件描述' },
    ],
    actions: [
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/package.json'),
        templateFile: path.resolve(__dirname, '../templates/package-js/package.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/gulpfile.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/gulpfile.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/src/index.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/src/index.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/src/{{pascalCase name}}.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/src/component.hbs'),
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/src/{{pascalCase name}}.stories.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/src/component.story.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/src/style/index.less'),
        templateFile: path.resolve(__dirname, '../templates/package-js/src/style/style.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/src/style/index.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/src/style/index.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/buildPackage.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/buildPackage.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/compile.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/compile.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/generateDTS.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/generateDTS.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/getBabelConfig.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/getBabelConfig.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/getRollupConfig.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/getRollupConfig.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/getRootDir.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/getRootDir.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../packages/{{kebabCase name}}/scripts/shared.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/scripts/shared.hbs'),
      },
    ],
  });
}
