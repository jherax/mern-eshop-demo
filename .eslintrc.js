module.exports = {
  plugins: ['simple-import-sort', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // this should be the last
  ],
  root: true, // Make sure eslint picks up the config at the root of the directory
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
  },
  env: {
    es2021: true,
    browser: true, // Enables browser globals like window and document
    node: true, // Enables Node.js global variables and Node.js scoping.
    jest: true,
  },
  globals: {},
  rules: {
    curly: 'error',
    'no-console': ['error', {allow: ['warn', 'error', 'info']}],
    'spaced-comment': ['warn', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
