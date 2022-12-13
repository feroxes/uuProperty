const FS = require("fs");

const NORMALIZE_NAME = /[^\w\d-_]/g;

let root;

function getRoot() {
  if (root) return root;
  // TODO more sophisticated lookup
  root = process.cwd();
  return root;
}

function normalizeDirName(dirname) {
  return dirname.replace(NORMALIZE_NAME, "-");
}

function ensureDir(path) {
  try {
    FS.mkdirSync(path);
  } catch (e) {
    // dir already exists, its ok
    if (e.code !== "EEXIST") throw e;
  }
}

module.exports = {
  getRoot,
  normalizeDirName,
  ensureDir,
};
