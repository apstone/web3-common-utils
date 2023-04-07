module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  ignorePatterns: ['node_modules/', '.eslintrc.js', 'jest.config.js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {},
  settings: {
    react: {
      version: '18.0.33', // Change this to your version of React
    },
  },
};
