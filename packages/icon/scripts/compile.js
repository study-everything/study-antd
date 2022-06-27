const { rollup } = require('rollup');

async function compile(rollupConfig) {
  let bundle;
  try {
    bundle = await rollup(rollupConfig);
    const outputs = Array.isArray(rollupConfig.output)
      ? rollupConfig.output
      : [rollupConfig.output];
    await Promise.all(outputs.map(output => bundle.write(output)));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    if (bundle) {
      await bundle.close();
    }
  }
}

module.exports = compile;
