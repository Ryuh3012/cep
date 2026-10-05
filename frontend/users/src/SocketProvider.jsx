import { createContext } from 'react';
import { useSocket } from './hooks/useSocket';

export const SocketContext = createContext();

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const SocketProvider = ({ children }) => {
    const { socket } = useSocket(SOCKET_SERVER_URL);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};