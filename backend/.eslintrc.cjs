module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
      ts: 'never',
    }],

    'no-console': 'off',
    'no-restricted-syntax': ['error', 'BinaryExpression[operator="of"]'],
    'no-underscore-dangle': ['error', { allow: ['_id', '__dirname'] }],
  },
};
