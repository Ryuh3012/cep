import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

/**
 * Hook para gestionar la conexión WebSocket de forma limpia sin fugas de memoria
 * @param {string} serverPath - URL del servidor socket
 */
export const useSocket = (serverPath) => {
    const socketRef = useRef(null);

    // Instancia única y persistente
    if (!socketRef.current) {
        socketRef.current = io(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });
    }

    // Limpieza de memoria obligatoria al desmontar la aplicación
    useEffect(() => {
        const currentSocket = socketRef.current;
        return () => {
            if (currentSocket) {
                currentSocket.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    return { socket: socketRef.current };
};