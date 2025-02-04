import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { Link } from "react-router-dom";

const ModalCourses = ({ isOpen, onClose, onOpen, handleSubmit, handleChange, handleBlur, values }) => {

    const { codigodecurso, horario, facilitador, Modalidad, formacion, monto, status } = values

    const methodPayArr = []
    const modalidad = ['online', 'presencial']
    return (
        <Modal isOpen={isOpen} placement="top-center" size="2xl" onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <div className="">
                        <ModalHeader className="flex flex-col gap-1">Crear curso</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit}
                                className="flex flex-col w-full gap-y-2 "

                            >
                                {/* {(errors.name && touched.name) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.name}</p>)}
                                {(errors.dni && touched.dni) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.dni}</p>)}
                                {(errors.prince && touched.prince) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.prince}</p>)} */}


                                <div className="flex w-full gap-3">

                                    <Input
                                        className="w-full"
                                        name="codigodecurso"
                                        label="codigo de curso"
                                        value={codigodecurso}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        placeholder="Introduce el Nombre"
                                    />

                                    <Input
                                        type="text"
                                        label="horario"
                                        name="horario"
                                        value={horario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Introduce horario"
                                    />

                                </div>
                                <div className='flex w-full gap-3'>

                                    <Select
                                        label="Facilitador"
                                        name="facilitador"
                                        value={facilitador}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {methodPayArr.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                                    </Select>

                                    <Select
                                        label='Modalidad'
                                        name="Modalidad"
                                        value={Modalidad}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>

                                        {modalidad.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                                    </Select>
                                </div>
                                <div className='flex w-full gap-3'>
                                    <Select
                                        label='formacion'
                                        name="formacion"
                                        value={formacion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>

                                        {modalidad.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                                    </Select>
                                    <Select
                                        label='status'
                                        name="status"
                                        value={status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>

                                        {modalidad.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                                    </Select>
                                </div>
                                <Textarea className="max-w-50 " label="Description"
                                    placeholder="Enter your description" />
                                <Input
                                    type="text"
                                    label="Precio"
                                    name="monto"
                                    value={monto}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Introduce Precio"
                                />



                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit" onPress={onClose}>
                                        Action
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
