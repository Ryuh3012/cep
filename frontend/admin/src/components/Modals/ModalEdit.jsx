import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";

const estatusOptions = ['Activo', 'Proceso', 'Completados'];

const ModalEdit = ({ item, isOpen, onClose, onSave }) => {
    const [status, setStatus] = useState('Activo');

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
            <ModalContent>
                <form onSubmit={handleFormSubmit}>
                    <ModalHeader className="text-lg font-bold">
                        Editar Estatus del Curso
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-xs text-slate-500 mb-2">
                            Curso: <span className="font-semibold text-slate-700">{item?.nombrecurso || item?.codigodecuso}</span>
                        </p>
                        <Select
                            label="Estatus"
                            name="status"
                            variant="faded"
                            color="primary"
                            selectedKeys={[status]}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {estatusOptions.map((e) => (
                                <SelectItem key={e} value={e} className="capitalize">
                                    {e}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" color="default" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" type="submit">
                            Actualizar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ModalEdit;