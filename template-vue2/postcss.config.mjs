import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import tailwindNesting from 'tailwindcss/nesting/index.js'

export default {
  plugins: [
    tailwindNesting(),
    tailwindcss,
    postcssPresetEnv({
      stage: 0,
      enableClientSidePolyfills: true,
    }),
  ],
}
