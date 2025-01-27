import { NavLink} from "react-router-dom";
import { Image } from "@nextui-org/react";

import LayoutDashboard from "../LayoutDashboard";

import CiscoImg from "../../../assets/cisco1.png";
import CiscoImg2 from "../../../assets/cisco2.png";
import DisenoImg from "../../../assets/diseno.jpg";
import DiscoImg from "../../../assets/disco.jpg";
import DisenowebImg from "../../../assets/disenoweb.jpg";
import ExcelImg from "../../../assets/excel.jpg";
import ExcelImg2 from "../../../assets/excel2.jpg";
import AsistenteImg from "../../../assets/asistente.jpg";


const ContenidoPage = () => {
    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 overflow-clip">
                <div className=" flex flex-col gap-6">
                    <p className='text-3xl font-semibold text-center'>Cisco Academy</p>

                    <section className="justify-items-center grid grid-cols-1 sm:grid-cols-2 md:mx-56">
                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <Image src={CiscoImg} alt="cisco1" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-CISCO-01) – Módulo 1: Introduction to Network</h2>
                            </section>
                        </NavLink>

                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <Image src={CiscoImg2} alt="cisco1" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-CISCO-02) – Módulo 2: Switching, Routing and Wireless Essentials (SRWE)</h2>
                            </section>
                        </NavLink>
                    </section>


                    <p className='text-3xl font-semibold text-center'>Oficios Tecnológicos Emergentes</p>
                    <section className="justify-items-center m-4 mb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <img src={DisenoImg} alt="diseno" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-03) – Curso de Diseño para NO Diseñadores</h2>
                            </section>
                        </NavLink>

                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <img src={DiscoImg} alt="disco" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-04) Mantenimiento y Reparación de PC – Nivel Básico </h2>
                            </section>
                        </NavLink>

                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <img src={DisenowebImg} alt="disenoweb" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-07) Super poderes del diseño Web</h2>
                            </section>
                        </NavLink>
                    </section>

                    <p className='text-3xl font-semibold text-center'>Gestión y Liderazgo</p>
                    <section className="justify-items-center m-4 mb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <img src={ExcelImg} alt="excel" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-01) – Curso de Buenas Prácticas en Excel para Administradores y Contadores (Nivel BÁSICO)</h2>
                            </section>
                        </NavLink>

                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <img src={ExcelImg2} alt="cisco1" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-05) Buenas Prácticas en Excel para Administradores y Contadores (NIVEL INTERMEDIO)</h2>
                            </section>
                        </NavLink>

                        <NavLink to="/participant">
                            <section className="bg-gray-50 max-w-80 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                <section className="flex justify-center items-center">
                                    <img src={AsistenteImg} alt="asistente" className="max-h-32" />
                                </section>
                                <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-14) Curso de Asistente a la Gerencia de Talento Humano</h2>
                            </section>
                        </NavLink>
                    </section>


                </div>
            </main>


        </LayoutDashboard >
    );
}

export default ContenidoPage;