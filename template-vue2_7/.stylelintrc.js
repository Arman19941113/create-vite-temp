module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'alpha-value-notation': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [/^(define-)?mixin$/],
      },
    ],
    'color-hex-case': 'upper',
    'custom-property-empty-line-before': null,
    'custom-property-pattern': null,
    'declaration-empty-line-before': null,
    'max-line-length': 180,
    'number-leading-zero': 'never',
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': null,
  },
  ignoreFiles: ['**/*.html', '**/*.js'],
}
