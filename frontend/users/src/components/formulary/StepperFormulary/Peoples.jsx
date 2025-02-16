
import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { SocketContext } from "../../../SocketProvider";




const Peoples = () => {

    const { socket } = useContext(SocketContext)
    const [typeStuden, setTypeStuden] = useState([]);

    const { handleBlur, handleSubmit, handleChange, values: { cedula, nombre, apellido, telefono, email, tipoDeParticipante } } = useContext(StepperContext)

    useEffect(() => {
        socket.emit('[bag] StudenType', () => { }, (listAllcourses) => setTypeStuden(JSON.parse(listAllcourses)))
        return () => {
            socket.off('[bag] StudenType')
        }
    }, [socket])
    console.log(typeStuden)
    // [bag] StudenType

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center py-1 gap-y-2 ms:flex-col">
                <div className="flex flex-col w-full">

                    <Input
                        type="number"
                        name="cedula"
                        label="Cedula"
                        value={cedula}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        variant="faded"
                        color="secondary"
                        placeholder="Introduce La Cedula"
                    />
                </div>
                <div className="lg:flex w-full gap-3">
                    <div className='flex flex-col w-full gap-2'>
                        <Input
                            name="nombre"
                            label="Nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Nombre"
                        />

                    </div>
                    <div className='flex flex-col w-full gap-2 sm:py-1'>
                        <Input
                            type="text"
                            label="Apellido"
                            name="apellido"
                            value={apellido}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Apellido"
                        />
                    </div>

                </div>
                <div className="lg:flex  w-full gap-3">
                    <div className='flex flex-col w-full lg:gap-2 '>
                        <Input
                            type="email"
                            name="email"
                            label="Correo"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Nombre"
                        />

                    </div>
                    <div className='flex flex-col w-full gap-2 sm:py-1'>
                        <Input
                            type="text"
                            label="Telefono"
                            name="telefono"
                            value={telefono}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Apellido"
                        />
                    </div>

                </div>
                <div className="lg:flex w-full gap-3">
                    <Select
                        name="tipoDeParticipante"
                        label="Tipo De Participante"
                        value={tipoDeParticipante}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        variant="faded"
                        color="secondary"
                        placeholder="Participante"
                    >
                        {typeStuden.map(({ idtiposdeparticipante: id, participante }) => <SelectItem key={id}>{participante}</SelectItem>)}

                    </Select>
                </div>

            </div>
        </form>

    );
}

export default Peoples;
