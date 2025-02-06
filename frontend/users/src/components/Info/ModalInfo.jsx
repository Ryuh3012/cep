import { useContext } from "react";
import { useEffect } from "react";
import { SocketContext } from "../../../../admin/src/SocketProvider";

const ModalInfo = () => {

    const { socket } = useContext(SocketContext)


    useEffect(() => {


    }, []);

    return (
        <div>

        </div>
    );
}

export default ModalInfo;
