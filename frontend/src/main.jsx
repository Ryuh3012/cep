import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </NextUIProvider>
  </StrictMode>,
)
