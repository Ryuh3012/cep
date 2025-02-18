
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
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import ModalCourses from "../../components/Info/modalCourses";


const ContenidoPage = () => {
    const { socket } = useContext(SocketContext)
    const [show, setShow] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);


    useEffect(() => {
        socket.emit('[bag] courses', () => { }, (listAllcourses) => setShow(JSON.parse(listAllcourses)))

        return () => {
            socket.off('[bag] courses')
        }
    }, [socket])


    const handleFilter = (formacion) => {
        return show?.filter((item) => item.formacion === formacion)
    };


    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 overflow-clip">
                <div className=" flex flex-col gap-5">
                    <p className='text-3xl font-semibold text-center'>cisco</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">

                        {handleFilter('cisco').map((item) => (
                            <Card
                                key={item}
                                onPress={() => {
                                    setModalItem(item);
                                    setOpenModal(true);
                                }}
                                isPressable={true}
                                className="p-2 hover:-translate-y-2 cursor-pointer" >

                                <Image src={CiscoImg} alt="cisco1" width={500} />
                                <CardBody className="flex justify-center  w-full  h-full font-mont font-bold text-gray-950 text-lg m-2">
                                    <p>{item.cursos}</p>

                                </CardBody>
                                {
                                    openModal && modalItem === item && (
                                        <ModalCourses item={modalItem} onClose={() => setOpenModal(false)} isOpen={openModal} />
                                    )
                                }
                            </Card>
                        ))}
                    </section>
                    <p className='text-3xl font-semibold text-center'>Oficios Tecnológicos Emergentes</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {handleFilter('oficios tecnológicos emergentes').map((item) => (
                            <Card
                                key={item}
                                onPress={() => {
                                    setModalItem(item);
                                    setOpenModal(true);
                                }}
                                isPressable={true}
                                className="p-2 hover:-translate-y-2 cursor-pointer" >

                                <Image src={CiscoImg} alt="cisco1" width={500} />
                                <CardBody className="flex justify-center  w-full  h-full font-mont font-bold text-gray-950 text-lg m-2">
                                    <p>{item.cursos}</p>

                                </CardBody>
                                {
                                    openModal && modalItem === item && (
                                        <ModalCourses item={modalItem} onClose={() => setOpenModal(false)} isOpen={openModal} />
                                    )
                                }
                            </Card>

                        ))}
                    </section>
                    <p className='text-3xl font-semibold text-center'>inteligencia y liderazg</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {handleFilter('inteligencia y liderazgo').map((item) => (
                            <Card
                                key={item}
                                onPress={() => {
                                    setModalItem(item);
                                    setOpenModal(true);
                                }}
                                isPressable={true}
                                className="p-2 hover:-translate-y-2 cursor-pointer" >

                                <Image src={CiscoImg} alt="cisco1" width={500} />
                                <CardBody className="flex justify-center  w-full  h-full font-mont font-bold text-gray-950 text-lg m-2">
                                    <p>{item.cursos}</p>

                                </CardBody>
                                {
                                    openModal && modalItem === item && (
                                        <ModalCourses item={modalItem} onClose={() => setOpenModal(false)} isOpen={openModal} />
                                    )
                                }
                            </Card>
                        ))}
                    </section>
                </div>
            </main>




        </LayoutDashboard >
    );
}

export default ContenidoPage;