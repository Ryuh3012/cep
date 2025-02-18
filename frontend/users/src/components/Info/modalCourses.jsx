import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ModalCourses = ({ item, isOpen, onClose }) => {

    const [scrollBehavior, setScrollBehavior] = useState("inside");

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => onClose(false)}
                placement="top-center"
                size="2xl"
                scrollBehavior={scrollBehavior}
            >
                <ModalContent className="overflow-auto" scrollBehavior>
                    {() => (
                        <div className="overflow-auto">
                            <ModalHeader className="flex justify-center gap-1">{item?.cursos}</ModalHeader>
                            <ModalBody className="w-full overflow-auto" >
                                <ul className="w-full">
                                    <li className="flex items-center py-2">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>

                                        <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Horario : <br /> <span className="text-xs">{item?.horario}</span></p>
                                    </li>
                                    <li className="flex items-center py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Duración : <br /> <span className="text-xs">{item?.duracion}</span></p>
                                    </li>
                                    <li className="flex items-center py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                        </svg>

                                        <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Modalidad : <br /> <span className="text-xs">{item?.modalidad}</span></p>
                                    </li>
                                    <li className="flex items-center py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>

                                        <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Facilitador : <br /> <span className="text-xs">{item?.facilitador}</span></p>
                                    </li>
                                    <li className="flex items-center py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                        </svg>
                                        <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Precio : <span className="text-xs">{item?.monto}</span></p>
                                    </li>
                                    <li className="flex flex-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                        </svg>
                                        <section className="text-left">
                                            <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Forma de pago</h3>
                                            <p className="font-mont text-sm"> <b className="mx-1">•</b>Transferencia Bancaria (tasa de cambio oficial <br /> de Banco Central de Venezuela):
                                                <p className="ml-4 text-sm">Banco Mercantil </p>
                                                <p className="ml-4 text-sm">Cuenta Corriente Nro. 0105-0083-44-1083100815</p>
                                                <p className="ml-4 text-sm">Titular: IUJO, A.C</p>
                                                <p className="ml-4 text-sm">Rif: J-30576524-3</p>
                                            </p>
                                            <p className="font-mont text-sm"> <b className="mx-1">•</b>Efectivo en Divisas y punto de ventas<br />(en la caja principal de la sede)</p>
                                        </section>
                                    </li>
                                </ul>
                                <section className="text-left m-1">
                                    <div className='flex  items-center'>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                        </svg>
                                        <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Contenido : </p>
                                    </div>

                                    {
                                        item?.contendido.map(e => (

                                            <li key={e} className='p-2'>

                                                {e}
                                            </li>
                                        ))
                                    }
                                </section>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => onClose()} >
                                    Close
                                </Button>
                                <Button color="primary" >
                                    <Link className="hover:text-red-700 " to={'/participant'}>Inscripción</Link>
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


export default ModalCourses;
