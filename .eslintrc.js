module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/**/*"],
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-unused-vars": "warn",
    "no-extra-boolean-cast": "off",
    "no-constant-condition": "off",
    "no-async-promise-executor": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
    "no-console": "off",
    "func-names": "off",
    "import/no-dynamic-require": "off",
  },
};
