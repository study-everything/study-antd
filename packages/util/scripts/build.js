const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const buildPackage = require('./buildPackage');

const { argv } = yargs(hideBin(process.argv))
  .option('sourcemap', {
    type: 'boolean',
    default: false,
    description: 'sourcemap',
  })
  .option('formats', {
    type: 'string',
    array: true,
    choices: ['es', 'cjs', 'umd'],
    default: ['es', 'cjs'],
  });

(async () => {
  await buildPackage(argv);
})();
