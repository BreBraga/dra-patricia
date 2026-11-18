import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // duas páginas: a landing (/) e o link da bio do Instagram (/bio/)
      input: {
        site: 'index.html',
        bio: 'bio/index.html',
      },
    },
  },
})
