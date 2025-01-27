import { Link } from "react-router-dom";
import Layout from "../../Admin/layout";
//import { Image } from "@nextui-org/react";

import CiscoImg from "../../../assets/cisco1.png";
import CiscoImg2 from "../../../assets/cisco2.png";
import DisenoImg from "../../../assets/diseno.jpg";
import DiscoImg from "../../../assets/disco.jpg";
import DisenowebImg from "../../../assets/disenoweb.jpg";
import ExcelImg from "../../../assets/excel.jpg";
import ExcelImg2 from "../../../assets/excel2.jpg";
import AsistenteImg from "../../../assets/asistente.jpg";


const InscripcionPage = () => {
    return (
        <Layout>
            <section className="bg-[#d9dbe0]">
                <div className="p-10 flex flex-col gap-6">
                    <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                        <h1 className='text-[30px] font-semibold text-center'>Cisco Academy</h1>

                        <div className= "text-center">
                            <section className="justify-items-center m-4 mb-9 grid grid-cols-1 sm:grid-cols-2 md:mx-56">
                                <Link end to="../formulario">
                                    <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={CiscoImg} alt="cisco1" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-CISCO-01) – Módulo 1: Introduction to Network</h2>
                                    </section>
                                </Link>
                        
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={CiscoImg2} alt="cisco1" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-CISCO-02) – Módulo 2: Switching, Routing and Wireless Essentials (SRWE)</h2>
                                    </section>
                                </Link>
                            </section>


                            <h1 className='text-[30px] font-semibold text-center'>Oficios Tecnológicos Emergentes</h1>
                            <section className="justify-items-center m-4 mb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={DisenoImg} alt="diseno" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-03) – Curso de Diseño para NO Diseñadores</h2>
                                    </section>
                                </Link>
                                
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={DiscoImg} alt="disco" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-04) Mantenimiento y Reparación de PC – Nivel Básico </h2>
                                    </section>
                                </Link>
                        
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={DisenowebImg} alt="disenoweb" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-07) Super poderes del diseño Web</h2>
                                    </section>
                                </Link>
                            </section>

                            <h1 className='text-[30px] font-semibold text-center'>Gestión y Liderazgo</h1>
                            <section className="justify-items-center m-4 mb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={ExcelImg} alt="excel" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-01) – Curso de Buenas Prácticas en Excel para Administradores y Contadores (Nivel BÁSICO)</h2>
                                    </section>
                                </Link>
                                
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={ExcelImg2} alt="cisco1" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-05) Buenas Prácticas en Excel para Administradores y Contadores (NIVEL INTERMEDIO)</h2>
                                    </section>
                                </Link>
                        
                                <Link href="/">
                                    <section className="bg-gray-50 max-w-80 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={AsistenteImg} alt="asistente" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-14) Curso de Asistente a la Gerencia de Talento Humano</h2>
                                    </section>
                                </Link>
                            </section>
                    
                        </div>
                    </div>
                </div>
            </section>
            
        </Layout>
    );
}

export default InscripcionPage;