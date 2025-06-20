import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['fast-deep-equal']
  },
  plugins: [
    VueRouter({}),
    vue(),
    Components({
      dts: true,
      directoryAsNamespace: true
    }),
    Layouts()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  }
})
