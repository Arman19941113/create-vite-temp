module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind'] }],
    'value-no-vendor-prefix': null,
  },
  ignoreFiles: ['**/*.html', '**/*.js'],
}
