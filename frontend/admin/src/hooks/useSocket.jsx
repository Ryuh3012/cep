import { useMemo } from 'react';
import io from 'socket.io-client';


export const useSocket = (serverPath) => {


    const socket = useMemo(() => io.connect(serverPath, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
    }), [serverPath, io]);


    return { socket }
}