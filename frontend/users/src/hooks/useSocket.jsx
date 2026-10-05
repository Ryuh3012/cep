import { useEffect, useMemo } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
    const socket = useMemo(() => io(serverPath, {
        transports: ['websocket'],
        autoConnect: true,
    }), [serverPath]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    return { socket };
};