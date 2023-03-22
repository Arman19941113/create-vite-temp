import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  define: {
    // components and directives all fully support installation: `true`
    __VUE_I18N_FULL_INSTALL__: true,
    // vue-i18n legacy style APIs support: `true`
    __VUE_I18N_LEGACY_API__: false,
    // `@intlify/devtools` support in production: `false`
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [
    vue(),
    vueJsx(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': 'http://127.0.0.1:4000',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 20 * 1024,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 4 * 1024,
  },
})
