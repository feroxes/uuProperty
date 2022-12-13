module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: require.resolve("babel-eslint"),
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: "module",
  },
  plugins: ["json", "prettier"],
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-const-assign": "warn",
    "no-this-before-super": "warn",
    "no-undef": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
    "constructor-super": "warn",
    "valid-typeof": "warn",
    "no-console": 0,
    "prettier/prettier": "warn",
  },
};
