const path = require('path');
function getRootDir() {
  return path.join(process.cwd(), '../');
}
module.exports = getRootDir;
