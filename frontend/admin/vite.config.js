import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Separa las librerías grandes en chunks independientes para mejor caché en el navegador
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@heroui/react', 'framer-motion', 'lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})