import postcssMixins from 'postcss-mixins'
import postcssSimpleVars from 'postcss-simple-vars'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import tailwindNesting from 'tailwindcss/nesting/index.js'

export default {
  parser: 'postcss-scss',
  plugins: [
    postcssMixins,
    postcssSimpleVars,
    tailwindNesting(),
    tailwindcss,
    postcssPresetEnv({
      stage: 0,
      // browsers: .browserslistrc
    }),
  ],
}
