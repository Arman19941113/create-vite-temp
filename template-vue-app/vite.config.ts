import { defineConfig } from 'vitest/config'
import { splitVendorChunkPlugin } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    basicSsl(),
    vue(),
    vueJsx(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    https: true,
    open: true,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 20 * 1024,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 4 * 1024,
  },
  test: {
    open: true,
    include: [
      '__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
})
