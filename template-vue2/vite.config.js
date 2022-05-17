import * as path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [createVuePlugin({ jsx: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 20 * 1024,
    sourcemap: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 4 * 1024,
  },
})
