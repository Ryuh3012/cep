
import LayoutDashboard from "../LayoutDashboard";


import CiscoImg from "../../assets/cisco1.png";
// import CiscoImg2 from "../../assets/cisco2.png";
// import DisenoImg from "../../assets/diseno.jpg";
// import DiscoImg from "../../assets/disco.jpg";
// import DisenowebImg from "../../assets/disenoweb.jpg";
// import ExcelImg from "../../assets/excel.jpg";
// import ExcelImg2 from "../../assets/excel2.jpg";
// import AsistenteImg from "../../assets/asistente.jpg";
// // import CardInfo from "../../components/CardInfo";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../SocketProvider";
import { Button, Card, CardBody, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";


const ContenidoPage = () => {
    const { socket } = useContext(SocketContext)
    const [show, setShow] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    useEffect(() => {
        socket.on('[bag] courses', (e) => {
            setShow(i => i = e)
        });

    }, []);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();


    const handleFilter = (formacion) => {
        return show?.filter((item) => item.formacion === formacion)
    };

    console.log(show[0])

    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 overflow-clip">
                <div className=" flex flex-col gap-5">
                    <p className='text-3xl font-semibold text-center'>cisco</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">

                        {handleFilter('cisco').map((item, index) => (
                            <Card key={index} className="p-2 hover:-translate-y-2 cursor-pointer">
                                <Image src={CiscoImg} alt="cisco1" width={500} />
                                <CardBody className="flex justify-center  w-full  h-full font-mont font-bold text-gray-950 text-lg m-2">
                                    <p>{item.cursos}</p>

                                </CardBody>
                                <Button onPress={onOpen} className="bg-[#1F2559] text-white rounded-[5px] px-4 py-2  font-semibold flex justify-center items-center">Ver</Button>
                                <Modal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    placement="top-center"
                                    size="2xl"
                                    scrollBehavior={scrollBehavior}

                                >
                                    <ModalContent className="overflow-auto" scrollBehavior>
                                        {(onClose) => (
                                            <div className="overflow-auto">
                                                <ModalHeader className="flex justify-center gap-1">{item.cursos}</ModalHeader>
                                                <ModalBody className="w-full overflow-auto" >
                                                    <ul className="w-full">
                                                        <li className="flex items-center py-2">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Horario : <br /> <span className="text-xs">{item.horario}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Duración : <br /> <span className="text-xs">{item.duracion}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Modalidad : <br /> <span className="text-xs">{item.modalidad}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Facilitador : <br /> <span className="text-xs">{item.facilitador}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                            </svg>
                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Precio : <span className="text-xs">{item.monto}</span></p>
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
                                                        <ul>

                                                            <li>
                                                                {item.contendido}
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="flat" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Button color="primary" onPress={onClose}>
                                                        inscripción
                                                    </Button>
                                                </ModalFooter>
                                            </div>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </Card>
                        ))}
                    </section>
                    <p className='text-3xl font-semibold text-center'>Oficios Tecnológicos Emergentes</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {handleFilter('oficios tecnológicos emergentes').map((item, index) => (
                            <Card key={index} className="p-2 hover:-translate-y-2 cursor-pointer" onClick={onOpen} onPress={onOpen} >
                                <Image src={CiscoImg} alt="cisco1" width={500} />
                                <CardBody className="flex justify-center  w-full  h-full font-mont font-bold text-gray-950 text-lg m-2">
                                    <p>{item.cursos}</p>

                                </CardBody>
                                <Button onPress={onOpen} className="bg-[#1F2559] text-white rounded-[5px] px-4 py-2  font-semibold flex justify-center items-center">Ver</Button>
                                <Modal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    placement="top-center"
                                    size="2xl"
                                    scrollBehavior={scrollBehavior}

                                >
                                    <ModalContent className="overflow-auto" scrollBehavior>
                                        {(onClose) => (
                                            <div className="overflow-auto">
                                                <ModalHeader className="flex justify-center gap-1">{item.cursos}</ModalHeader>
                                                <ModalBody className="w-full overflow-auto" >
                                                    <ul className="w-full">
                                                        <li className="flex items-center py-2">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Horario : <br /> <span className="text-xs">{item.horario}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Duración : <br /> <span className="text-xs">{item.duracion}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Modalidad : <br /> <span className="text-xs">{item.modalidad}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Facilitador : <br /> <span className="text-xs">{item.facilitador}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                            </svg>
                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Precio : <span className="text-xs">{item.monto}</span></p>
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
                                                        <ul>

                                                            <li>
                                                                {item.contendido}
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="flat" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Link to={'/participant'}>
                                                        <Button color="primary" variant="flat" onPress={onClose}>
                                                            inscripción
                                                        </Button>
                                                    </Link>
                                                </ModalFooter>
                                            </div>
                                        )}
                                    </ModalContent>
                                </Modal>

                            </Card>

                        ))}
                    </section>
                    <p className='text-3xl font-semibold text-center'>inteligencia y liderazg</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {handleFilter('inteligencia y liderazgo').map((item, index) => (
                            <Card key={index} className="p-2 hover:-translate-y-2 cursor-pointer">
                                {/* <Image src={CiscoImg} alt="cisco1" width={500} /> */}
                                <CardBody className="flex justify-center  w-full  h-full font-mont font-bold text-gray-950 text-lg m-2">
                                    <p>{item.cursos}</p>
                                </CardBody>
                                <Button onPress={onOpen} className="bg-[#1F2559] text-white rounded-[5px] px-4 py-2  font-semibold flex justify-center items-center">Ver</Button>
                                <Modal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    placement="top-center"
                                    size="2xl"
                                    scrollBehavior={scrollBehavior}

                                >
                                    <ModalContent className="overflow-auto" scrollBehavior>
                                        {(onClose) => (
                                            <div className="overflow-auto">
                                                <ModalHeader className="flex justify-center gap-1">{item.cursos}</ModalHeader>
                                                <ModalBody className="w-full overflow-auto" >
                                                    <ul className="w-full">
                                                        <li className="flex items-center py-2">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Horario : <br /> <span className="text-xs">{item.horario}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Duración : <br /> <span className="text-xs">{item.duracion}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Modalidad : <br /> <span className="text-xs">{item.modalidad}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                            </svg>

                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Facilitador : <br /> <span className="text-xs">{item.facilitador}</span></p>
                                                        </li>
                                                        <li className="flex items-center py-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                            </svg>
                                                            <p className="text-sm font-mont font-semibold text-gray-950 uppercase">Precio : <span className="text-xs">{item.monto}</span></p>
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
                                                        <ul>

                                                            <li>
                                                                {item.contendido}
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="flat" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Link to={'/participant'}>
                                                        <Button color="primary" variant="flat" onPress={onClose}>
                                                            inscripción
                                                        </Button>
                                                    </Link>
                                                </ModalFooter>
                                            </div>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </Card>
                        ))}
                    </section>
                </div>
            </main>




        </LayoutDashboard >
    );
}

export default ContenidoPage;