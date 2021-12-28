import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore: no d.ts
import postcssMixins from 'postcss-mixins'
// @ts-ignore ignore
import postcssNested from 'postcss-nested'
// @ts-ignore ignore
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': '/src',
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssMixins,
        postcssNested,
        postcssPresetEnv({
          stage: 0,
        }),
      ],
    },
  },
  envDir: '/env',
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    https: false,
    open: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 20 * 1024,
    sourcemap: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 4 * 1024,
  },
})
