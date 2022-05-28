const path = require('path');
const fs = require('fs-extra');

async function isTypescript() {
  const tsconfigPath = path.resolve(__dirname, '../tsconfig.json');
  return await fs.pathExists(tsconfigPath);
}

function cwd() {
  return process.cwd();
}

let innerPackageJson = null;

async function getPackageJson() {
  if (innerPackageJson) {
    return innerPackageJson;
  }
  const packageBuffer = await fs.readFile(path.join(cwd(), 'package.json'));
  const packageJson = packageBuffer.toString('utf-8');
  innerPackageJson = JSON.parse(packageJson);
  return innerPackageJson;
}

module.exports = {
  isTypescript,
  cwd,
  getPackageJson,
};
