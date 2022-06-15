module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "max-len": ["error", {code: 100}],
    "quotes": ["error", "double"],
    "valid-jsdoc": [0],
    "require-jsdoc": [0],
  },
};
