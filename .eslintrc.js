module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'no-multi-assign': 'off',
    "import/no-unresolved": 0,
    'import/extensions': 'off',
    "comma-dangle": ["error", "never"],
    'indent': ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
