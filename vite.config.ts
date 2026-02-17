import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // <-- Isso é CRÍTICO para produção
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
