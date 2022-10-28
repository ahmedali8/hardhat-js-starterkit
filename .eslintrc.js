module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["node_modules/**/*"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "func-names": "off",
    "import/no-dynamic-require": "off",
    indent: "off",
    "no-unused-vars": "warn",
    "no-extra-boolean-cast": "off",
    "no-constant-condition": "off",
    "no-async-promise-executor": "off",
    "no-console": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
  },
};
