/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // vue
    'vue/html-self-closing': [
      'error',
      {
        html: {
          // since prettier is opinionated, we can't use 'never' here
          void: 'any',
          normal: 'any',
          component: 'always',
        },
        svg: 'any',
        math: 'any',
      },
    ],
    // Eslint bugs
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  }
}
