module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [/^(define-)?mixin$/],
      },
    ],
    'declaration-empty-line-before': null,
    'value-no-vendor-prefix': null,
  },
  ignoreFiles: ['**/*.html', '**/*.js'],
}
