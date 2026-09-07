"use client";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../SocketProvider";

const ModalCourses = ({ isOpen, onClose, handleSubmit, handleChange, handleBlur, values, errors, touched }) => {
    const { socket } = useContext(SocketContext);

    const [modalidades, setModalidades] = useState([]);
    const [formaciones, setFormaciones] = useState([]);
    const [teacher, setTeacher] = useState([]);

    const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, modalidad, formacion } = values;

    // Escuchar eventos del socket
    useEffect(() => {
        if (!socket) return;

        socket.on('[bag] modalidad', (data) => setModalidades(data));
        socket.on('[bag] formacion', (data) => setFormaciones(data));
        socket.emit('[bag] facilitador', () => { }, (listAllcourses) => setTeacher(JSON.parse(listAllcourses)));

        return () => {
            socket.off('[bag] modalidad');
            socket.off('[bag] formacion');
            socket.off('[bag] facilitador');
        };
    }, [socket]);

    // Bloquear el scroll de la página cuando el modal esté abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const statuss = ['Activo', 'Proceso', 'Completados'];

    const inputStyle = "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all";
    const labelStyle = "block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop / Fondo oscuro con desenfoque */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Contenedor del Modal */}
            <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Crear curso
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                {/* Body con Scroll */}
                <div className="p-4 md:p-5 overflow-y-auto space-y-4 flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Código de curso</label>
                                <input
                                    type="text"
                                    name="codigodecuso"
                                    className={inputStyle}
                                    value={codigodecuso}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Introduce el código"
                                />
                                {errors?.codigodecuso && touched?.codigodecuso && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.codigodecuso}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Nombre de curso</label>
                                <input
                                    type="text"
                                    name="nombrecurso"
                                    className={inputStyle}
                                    value={nombrecurso}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Introduce el nombre"
                                />
                                {errors?.nombrecurso && touched?.nombrecurso && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.nombrecurso}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Duración</label>
                                <input
                                    type="text"
                                    name="duracion"
                                    className={inputStyle}
                                    value={duracion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Ej. 40 horas"
                                />
                                {errors?.duracion && touched?.duracion && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.duracion}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Horario</label>
                                <input
                                    type="text"
                                    name="horario"
                                    className={inputStyle}
                                    value={horario}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Ej. Sábados 9am - 12pm"
                                />
                                {errors?.horario && touched?.horario && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.horario}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Facilitador</label>
                                <select
                                    name="facilitador"
                                    className={inputStyle}
                                    value={facilitador}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Selecciona facilitador</option>
                                    {teacher.map(({ idfacilitador, nombre }) => (
                                        <option key={idfacilitador} value={idfacilitador}>
                                            {nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors?.facilitador && touched?.facilitador && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.facilitador}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Modalidad</label>
                                <select
                                    name="modalidad"
                                    className={inputStyle}
                                    value={modalidad}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Selecciona modalidad</option>
                                    {modalidades.map(({ idtipodemodalidad, modalidad }) => (
                                        <option key={idtipodemodalidad} value={idtipodemodalidad}>
                                            {modalidad}
                                        </option>
                                    ))}
                                </select>
                                {errors?.modalidad && touched?.modalidad && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.modalidad}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Formación</label>
                                <select
                                    name="formacion"
                                    className={inputStyle}
                                    value={formacion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Selecciona formación</option>
                                    {formaciones.map(({ idformacion, formacion }) => (
                                        <option key={idformacion} value={idformacion}>
                                            {formacion}
                                        </option>
                                    ))}
                                </select>
                                {errors?.formacion && touched?.formacion && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.formacion}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Estatus</label>
                                <select
                                    name="status"
                                    className={inputStyle}
                                    value={status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Selecciona estatus</option>
                                    {statuss.map(e => <option key={e} value={e}>{e}</option>)}
                                </select>
                                {errors?.status && touched?.status && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                        ⚠️ {errors.status}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className={labelStyle}>Precio ($)</label>
                            <input
                                type="number"
                                name="monto"
                                className={inputStyle}
                                value={monto}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Introduce precio"
                            />
                            {errors?.monto && touched?.monto && (
                                <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                    ⚠️ {errors.monto}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelStyle}>Contenido</label>
                            <textarea
                                name="contenido"
                                rows="3"
                                className={inputStyle}
                                value={contenido}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Contenido del curso..."
                            />
                            {errors?.contenido && touched?.contenido && (
                                <p className="text-red-500 text-xs pl-1 mt-1 font-medium flex items-center gap-1">
                                    ⚠️ {errors.contenido}
                                </p>
                            )}
                        </div>

                        {/* Botones de acción (Footer) */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                            >
                                Crear Curso
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalCourses;