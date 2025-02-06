import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { SocketContext } from "../../SocketProvider";
import { useContext } from "react";

const ModalCourses = ({ isOpen, onClose, onOpen, handleSubmit, handleChange, handleBlur, values, errors, touched }) => {

    const { socket } = useContext(SocketContext)


    const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, modalidad, formacion } = values

    const [modalidades, setsmodalidades] = useState([]);
    const [formaciones, setFormaciones] = useState([]);
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        socket.on('[bag] modalidad', (data) => setsmodalidades(data))
        socket.on('[bag] formacion', (data) => setFormaciones(data))
        socket.on('[bag] facilitador', (data) => setTeacher(data))

    }, []);
    console.log(teacher)
    const statuss = ['activo', 'cerrado']
    return (
        <Modal isOpen={isOpen} placement="top-center" size="2xl" onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <div className="bg-[#d9dbe0]">
                        <ModalHeader className="flex flex-col gap-1 justify-center items-center text-3xl font-bold">Crear curso</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit}
                                className="flex flex-col w-full gap-y-2 "

                            >
                                {errors.codigodecuso && touched.codigodecuso || errors.horario && touched.horario || errors.facilitador && touched.facilitador || errors.modalidad && touched.modalidad || errors.formacion && touched.formacion || errors.monto && touched.monto || errors.status && touched.status || errors.contenido && touched.contenido || errors.nombrecurso && touched.nombrecurso || errors.duracion && touched.duracion
                                    ?

                                    <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-danger-600 bg-danger-50 ">
                                        {(errors.codigodecuso && touched.codigodecuso) && (<p>{errors.codigodecuso}</p>)}
                                        {(errors.nombrecurso && touched.nombrecurso) && (<p>{errors.nombrecurso}</p>)}
                                        {(errors.duracion && touched.duracion) && (<p>{errors.duracion}</p>)}
                                        {(errors.horario && touched.horario) && (<p>{errors.horario}</p>)}
                                        {(errors.facilitador && touched.facilitador) && (<p>{errors.facilitador}</p>)}
                                        {(errors.modalidad && touched.modalidad) && (<p>{errors.modalidad}</p>)}
                                        {(errors.formacion && touched.formacion) && (<p>{errors.formacion}</p>)}
                                        {(errors.status && touched.status) && (<p>{errors.status}</p>)}
                                        {(errors.monto && touched.monto) && (<p>{errors.monto}</p>)}
                                        {(errors.contenido && touched.contenido) && (<p>{errors.contenido}</p>)}

                                    </div> : null}
                                <div className="flex w-full gap-3">


                                    <Input
                                        className="w-full"
                                        name="codigodecuso"
                                        label="Codigo de curso"
                                        variant="faded"
                                        color="primary"
                                        value={codigodecuso}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        placeholder="Introduce el codigo del curso"
                                    />
                                    <Input
                                        className="w-full"
                                        name="nombrecurso"
                                        label="Nombre de curso"
                                        variant="faded"
                                        color="primary"
                                        value={nombrecurso}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        placeholder="Introduce el nombre del curso"
                                    />
                                </div>
                                <div className="flex w-full gap-3">

                                    <Input
                                        className="w-full"
                                        name="duracion"
                                        label="Duracion del curso"
                                        variant="faded"
                                        color="primary"
                                        value={duracion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        placeholder="Introduce la duracion del curso"
                                    />

                                    <Input
                                        type="text"
                                        label="Horario del curso"
                                        name="horario"
                                        variant="faded"
                                        color="primary"
                                        value={horario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Introduce horario"
                                    />

                                </div>
                                <div className='flex w-full gap-3'>

                                    <Select
                                        label="Facilitador del curso"
                                        name="facilitador"
                                        variant="faded"
                                        color="primary"

                                        value={facilitador}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {teacher.map(({ idfacilitador, nombre }) => <SelectItem key={idfacilitador}>{nombre}</SelectItem>)}
                                    </Select>

                                    <Select
                                        label='Modalidad del curso'
                                        name="modalidad"
                                        color="primary"
                                        value={modalidad}
                                        variant="faded"
                                        onChange={handleChange}
                                        onBlur={handleBlur}>

                                        {modalidades.map(({ idtipodemodalidad, modalidad }) => <SelectItem key={idtipodemodalidad}>{modalidad}</SelectItem>)}
                                    </Select>
                                </div>
                                <div className='flex w-full gap-3'>
                                    <Select
                                        label='Formacion del curso'
                                        name="formacion"
                                        color="primary"
                                        variant="faded"
                                        value={formacion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>

                                        {formaciones.map(({ idformacion, formacion }) => <SelectItem key={idformacion}>{formacion}</SelectItem>)}
                                    </Select>
                                    <Select
                                        label='Estatus del curso'
                                        name="status"
                                        color="primary"
                                        variant="faded"
                                        value={status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>

                                        {statuss.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                                    </Select>
                                </div>
                                <Textarea
                                    className="max-w-50 "
                                    label="Contenido"
                                    color="primary"
                                    placeholder="Contenido del curso"
                                    name="contenido"
                                    variant="faded"
                                    value={contenido}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Input
                                    type="number"
                                    label="Precio"
                                    color="primary"
                                    name="monto"
                                    variant="faded"
                                    value={monto}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Introduce Precio"
                                />



                                <ModalFooter className="flex justify-between">
                                    <Button color="danger" variant="light" onPress={onClose} className="w-[50%] p-2 text-base">
                                        Cerrar
                                    </Button>
                                    <Button color="primary" type="submit" onPress={onClose} className="w-[50%] p-2 text-base">
                                        Crear
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalBody>

                    </div>
                )
                }
            </ModalContent >
        </Modal >
    );

}

export default ModalCourses;
