
import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { SocketContext } from "../../../SocketProvider";

const Peoples = () => {
    const { socket } = useContext(SocketContext);
    const [typeStuden, setTypeStuden] = useState([]);

    const {
        handleBlur,
        handleChange,
        values: { cedula, nombre, apellido, telefono, email, tipoDeParticipante }
    } = useContext(StepperContext);

    const inputStyle =
        "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all";
    
    
        useEffect(() => {
        if (!socket) return;

        const handleTypes = (listAllTypes) => {
            try {
                const parsed = typeof listAllTypes === 'string' ? JSON.parse(listAllTypes) : listAllTypes;
                setTypeStuden(Array.isArray(parsed) ? parsed : []);
            } catch (err) {
                console.error("Error al cargar tipos de participante:", err);
                setTypeStuden([]);
            }
        };

        socket.emit('[bag] StudenType', () => { }, handleTypes);

        return () => {
            socket.off('[bag] StudenType');
        };
    }, [socket]);

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="text-center sm:text-left mb-2">
                <h3 className="text-base font-bold text-slate-800">1. Datos Personales</h3>
                <p className="text-xs text-slate-500">Ingresa la información básica de la persona a inscribir.</p>
            </div>

            <div className="w-full">
                <input
                    type="number"
                    name="cedula"
                    label="Cédula de Identidad"
                    value={cedula}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="Ej: 24123456"
                    className={inputStyle}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    name="nombre"
                    label="Nombres"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="Ej: María Elena"
                    className={inputStyle}
                />
                <input
                    name="apellido"
                    label="Apellidos"
                    value={apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="Ej: Pérez Rodríguez"
                    className={inputStyle}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="email"
                    name="email"
                    label="Correo Electrónico"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="ejemplo@correo.com"
                    className={inputStyle}
                />
                <input
                    type="tel"
                    name="telefono"
                    label="Teléfono Móvil"
                    value={telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="Ej: 0412-1234567"
                    className={inputStyle}
                />
            </div>

            <div className="w-full">
                <select
                    name="tipoDeParticipante"
                    selectedKeys={tipoDeParticipante ? [tipoDeParticipante] : []}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="Seleccione su condición (Estudiante IUJO, Egresado, etc.)"
                    className={inputStyle}
                >
                    {typeStuden.map((item) => {
                        const idKey = String(item.idtiposdeparticipante || item.id || item.participante);
                        return (
                            <option  key={idKey} value={idKey}>
                                {item.tiposdeparticipante || item.nombre || item.participante}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Peoples;

