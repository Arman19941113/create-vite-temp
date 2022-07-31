import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    createVuePlugin({ jsx: true }),
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
    https: false,
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
})
