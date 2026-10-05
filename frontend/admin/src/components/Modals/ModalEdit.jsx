/* eslint-disable react/prop-types */
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, } from "@heroui/react";
import { useState, useEffect } from "react";

const estatusOptions = ['Activo', 'Proceso', 'Completados'];

function ModalEdit({ item, isOpen, onClose, onSave }) {
    const [status, setStatus] = useState('Activo');
    console.log(item)

    useEffect(() => {

        if (item?.status) {
            setStatus(item.status);
        }
    }, [item]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSave && item) {
            onSave({ ...item, status });
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden">
                <form onSubmit={handleFormSubmit}>
                    <ModalHeader className="flex flex-col gap-1 pt-6 px-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                            Editar Estatus del Curso
                        </h3>
                        <p className="text-xs text-slate-400 font-normal">
                            Modifica el estado actual de este registro en el sistema.
                        </p>
                    </ModalHeader>

                    <ModalBody className="py-5 px-6 space-y-4">
                        {/* Tarjeta con información destacada del curso */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                                Curso seleccionado
                            </span>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                                {item?.nombrecurso || item?.codigodecuso || 'Sin nombre asignado'}
                            </p>
                        </div>

                        {/* Selector estilizado */}
                        <div>
                            <label className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>status</label>
                            <select
                                name="status"
                                className='w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all'
                                value={status ?? ""}
                                onChange={(e) => setStatus(e.target.value)}
                                onBlur={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Selecciona estatus</option>
                                {estatusOptions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </ModalBody>

                    <ModalFooter className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                        <Button
                            variant="light"
                            color="danger"
                            onClick={onClose}
                            className="font-medium"
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            className="font-semibold shadow-md shadow-primary/20"
                        >
                            Actualizar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default ModalEdit;