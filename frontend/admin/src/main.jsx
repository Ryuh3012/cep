import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'

import './index.css'
import App from './App'

import { SocketProvider } from './SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
    <HeroUIProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </HeroUIProvider>
)
