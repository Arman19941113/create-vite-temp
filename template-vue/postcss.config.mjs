import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'
import postcssSimpleVars from 'postcss-simple-vars'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  parser: 'postcss-scss',
  plugins: [
    postcssMixins,
    postcssNested,
    postcssSimpleVars,
    postcssPresetEnv({
      stage: 0,
      // browsers: .browserslistrc
    }),
  ],
}
