import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const fullReloadAlways = {
  name: 'full-reload-always',
  handleHotUpdate({ server }) {
    server.ws.send({ type: "full-reload" })
    return []
  },
} 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReloadAlways],
})