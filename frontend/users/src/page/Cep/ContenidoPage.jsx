
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


const ContenidoPage = () => {
    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 overflow-clip">
                <div className=" flex flex-col gap-5">
                    <p className='text-3xl font-semibold text-center'>Cisco Academy</p>
                    <section className="sm:flex grid grid-cols-1 sm:justify-items-center gap-2  md:mx-3.5">
                        <CardInfo img={CiscoImg} title='(CEP-CISCO-01) - Módulo 1: Introduction to Network' />
                        <CardInfo img={CiscoImg2} title='(CEP-CISCO-02) - Módulo 2: Switching, Routing and Wireless Essentials (SRWE)' />
                    </section>

                    <p className='text-3xl font-semibold text-center'>Oficios Tecnológicos Emergentes</p>

                    <section className="sm:flex justify-items-center gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <CardInfo img={DisenoImg} title='(CEP-03) - Curso de Diseño para NO Diseñadores' />
                        <CardInfo img={DiscoImg} title='(CEP-04) - Mantenimiento y Reparación de PC - Nivel Básico' />
                        <CardInfo img={DisenowebImg} title='(CEP-07) - Super poderes del diseño Web' />
                    </section>

                    <p className='text-3xl font-semibold text-center'>Gestión y Liderazgo</p>
                    <section className="ms:flex gap-2 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <CardInfo img={ExcelImg} title='(CEP-01) - Curso de Buenas Prácticas en Excel para Administradores y Contadores (Nivel BÁSICO)' />
                        <CardInfo img={ExcelImg2} title='(CEP-05) - Buenas Prácticas en Excel para Administradores y Contadores (NIVEL INTERMEDIO)' />
                        <CardInfo img={AsistenteImg} title='(CEP-14) - Curso de Asistente a la Gerencia de Talento Humano' />

                    </section>


                </div>
            </main>


        </LayoutDashboard >
    );
}

export default ContenidoPage;