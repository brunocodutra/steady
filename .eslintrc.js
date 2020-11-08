module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/display-name': false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
