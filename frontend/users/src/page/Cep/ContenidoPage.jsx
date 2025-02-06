
import LayoutDashboard from "../LayoutDashboard";


import CiscoImg from "../../assets/cisco1.png";
import CiscoImg2 from "../../assets/cisco2.png";
import DisenoImg from "../../assets/diseno.jpg";
import DiscoImg from "../../assets/disco.jpg";
import DisenowebImg from "../../assets/disenoweb.jpg";
import ExcelImg from "../../assets/excel.jpg";
import ExcelImg2 from "../../assets/excel2.jpg";
import AsistenteImg from "../../assets/asistente.jpg";
import CardInfo from "../../components/CardInfo";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../SocketProvider";


const ContenidoPage = () => {
    const { socket } = useContext(SocketContext)
    const [show, setShow] = useState([]);

    useEffect(() => {

        socket.on('[bag] courses', (data) => setShow(data))

    }, []);
    console.log(show)


    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 overflow-clip">
                <div className=" flex flex-col gap-5">
                    <p className='text-3xl font-semibold text-center'>cisco</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {
                            show?.map(e => (
                                <div key={e.idcurso} >
                                    {e.formacion === 'cisco' ?

                                        <CardInfo key={e.idcurso} img={CiscoImg} title={e.cursos} />

                                        : null}
                                </div>
                            ))

                        }
                    </section>
                    <p className='text-3xl font-semibold text-center'>Oficios Tecnológicos Emergentes</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {
                            show?.map(e => (
                                <div key={e.idcurso} >
                                    {e.formacion === 'oficios tecnológicos emergentes' ?

                                        <CardInfo key={e.idcurso} img={DisenowebImg} title={e.cursos} />

                                        : null}
                                </div>
                            ))

                        }
                    </section>
                    <p className='text-3xl font-semibold text-center'>inteligencia y liderazg</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        {
                            show?.map(e => (
                                <div key={e.idcurso} >
                                    {e.formacion === 'inteligencia y liderazgo' ?

                                        <CardInfo key={e.idcurso} img={ExcelImg} title={e.cursos} />

                                        : null}
                                </div>
                            ))

                        }
                    </section>



                </div>
            </main>


        </LayoutDashboard >
    );
}

export default ContenidoPage;