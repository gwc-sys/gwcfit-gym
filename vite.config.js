import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  preview: {
    allowedHosts: ['gwcfit.gwc-sys.online'],
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
