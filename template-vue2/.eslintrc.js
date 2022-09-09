module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      'jsx': true,
    },
  },
  plugins: [
    'vue',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  // An environment provides predefined global variables
  env: {
    browser: true,
    node: true,
  },
  globals: {},
  rules: {
    'indent': [
      'error', 2, {
        'SwitchCase': 1,
      },
    ],
    // Priority B: Strongly Recommended
    'vue/html-closing-bracket-newline': [
      'error', {
        'singleline': 'never',
        'multiline': 'never',
      },
    ],
    'vue/html-indent': [
      'error', 2, {
        'alignAttributesVertically': false,
      },
    ],
    'vue/html-self-closing': [
      'error', {
        'html': {
          'void': 'never',
          'normal': 'never',
          'component': 'always',
        },
        'svg': 'never',
        'math': 'never',
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
