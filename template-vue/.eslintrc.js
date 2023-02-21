module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    // specify a custom parser to parse <script> tags
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      'jsx': true,
    },
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  // An environment provides predefined global variables
  env: {
    browser: true,
    node: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    'indent': [
      'error', 2, {
        'SwitchCase': 1,
      },
    ],
    // Typescript recommended
    '@typescript-eslint/ban-ts-comment': [
      'error', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
        minimumDescriptionLength: 1,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Vue recommended
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
  },
}
