import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SocketProvider } from './SocketProvider.jsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <NextUIProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </NextUIProvider>
)
