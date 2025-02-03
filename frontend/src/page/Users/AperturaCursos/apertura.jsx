import { Link } from "react-router-dom";
import Layout from "../../Admin/layout";
import { Input, Select } from "@nextui-org/react";
import { useState } from "react";
//import { Image } from "@nextui-org/react";

import CiscoImg from "../../../assets/cisco1.png";
import CiscoImg2 from "../../../assets/cisco2.png";
import DisenoImg from "../../../assets/diseno.jpg";
import DiscoImg from "../../../assets/disco.jpg";
import DisenowebImg from "../../../assets/disenoweb.jpg";
import ExcelImg from "../../../assets/excel.jpg";
import ExcelImg2 from "../../../assets/excel2.jpg";
import AsistenteImg from "../../../assets/asistente.jpg";


const AperturaCursos = () => {
    const [isopen, setIsopen] = useState(false);
    const [isopen2, setIsopen2] = useState(false);
    return (
        <Layout>
            <section className="bg-[#d9dbe0]">
                <div className="p-10 flex flex-col gap-6">
                    <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                        <section className="flex justify-end">
                            <button className="bg-[#8C113E] text-white uppercase py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-slate-400 transition duration-2oo ease-in-out" onClick={()=>setIsopen2(true)}> Crear nuevo curso </button>
                        </section>

                        {
                            isopen2 && (
                                <section className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                                    <div className="p-10 flex flex-col gap-6 h-auto">
                                        <section className="bg-white rounded-[5px] mt-14 shadow-md p-5 max-w-full border-[1px] border-[#C4CEDC]">
                                            <div className="container horizontal">
                                                <h1 className='text-[30px] font-semibold text-center border-b-2 mx-20 mb-2 border-[#2A398C]'>Crear nuevo curso</h1>
                                                <form action="" method="post">
                                                    <div className="flex flex-col justify-center items-center sm:flex-col">
                                                        <div className="flex flex-col w-full p-1">

                                                            <Input
                                                                type="text"
                                                                name="id"
                                                                label="ID"
                                                                //value={id}
                                                                //onChange={handleChange}
                                                                //onBlur={handleBlur}
                                                                //required={true}
                                                                variant="faded"
                                                                color="secondary"
                                                                placeholder="Indentificador del curso"
                                                            />
                                                        </div>

                                                        <div className="lg:flex w-full p-1">
                                                            <Select
                                                                name="programa"
                                                                label="Programa"
                                                                //value={programa}
                                                                //onChange={handleChange}
                                                                //onBlur={handleBlur}
                                                                //required={true}
                                                                variant="faded"
                                                                color="secondary"
                                                                placeholder="Pertenece al programa..."
                                                            >
                                                                

                                                            </Select>
                                                        </div>

                                                            <div className="lg:flex w-full">
                                                                <div className='flex flex-col w-full p-1'>
                                                                    <Input
                                                                        name="nombreCurso"
                                                                        label="Nombre"
                                                                        //value={nombreCurso}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Introduce el nombre del curso"
                                                                    />

                                                                </div>

                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="number"
                                                                        label="Cupos"
                                                                        name="cupos"
                                                                        //value={cupos}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Cantidad de cupos disponibles"
                                                                    />
                                                                </div>

                                                            </div>

                                                            <div className="lg:flex  w-full">
                                                                <div className='flex flex-col w-full lg:gap-2 p-1'>
                                                                    <Select
                                                                        name="facilitador"
                                                                        label="Facilitador"
                                                                        //value={facilitador}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Asignar facilitador..."
                                                                    >
                                                                        

                                                                    </Select>

                                                                </div>
                                                                <div className="flex flex-col w-full gap-2 p-1">
                                                                    <Input
                                                                        type="number"
                                                                        label="Cédula del facilitador"
                                                                        name="cedulafac"
                                                                        //value={cedulafac}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Introduce la cédula del facilitador"
                                                                    />
                                                                </div>

                                                            </div>

                                                            <div className="lg:flex  w-full">
                                                                <div className='flex flex-col w-full p-1'>
                                                                    <Input
                                                                        type="date"
                                                                        label="Fecha de inicio del curso"
                                                                        name="diaini"
                                                                        //value={diaini}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Fecha de inicio del curso"
                                                                    />

                                                                </div>
                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="date"
                                                                        label="Fecha de finalización del curso"
                                                                        name="diafin"
                                                                        //value={diafin}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Fecha de finalización del curso"
                                                                    />
                                                                </div>

                                                            </div>

                                                            <div className="lg:flex  w-full">
                                                                <div className='flex flex-col w-full p-1'>
                                                                    <Select
                                                                        name="modalidad"
                                                                        label="Modalidad"
                                                                        //value={modalidad}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Presencial, online..."
                                                                    >
                                                                        

                                                                    </Select>

                                                                </div>
                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="text"
                                                                        label="Días del curso"
                                                                        name="dia"
                                                                        //value={dia}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Días que se dará el curso..."
                                                                    />
                                                                </div>

                                                                <div className='flex flex-col w-full p-1'>
                                                                    <Input
                                                                        type="number"
                                                                        name="duracion"
                                                                        label="Duración del curso"
                                                                        //value={duracion}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Total horas..."
                                                                    />

                                                                </div>

                                                            </div>


                                                            <div className="lg:flex  w-full">
                                                            
                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="time"
                                                                        label="Hora de inicio de la sesión"
                                                                        name="horas"
                                                                        //value={horas}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Introduce la hora"
                                                                    />
                                                                </div>

                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="time"
                                                                        label="Hora de finalización de la sesión"
                                                                        name="horas"
                                                                        //value={horas}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Introduce la hora"
                                                                    />
                                                                </div>

                                                            </div>

                                                            

                                                            <div className="lg:flex w-full">
                                                            
                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="number"
                                                                        label="Costo para estudiantes del IUJO"
                                                                        name="costo"
                                                                        //value={costo}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Costo en dólares"
                                                                    />
                                                                </div>

                                                                <div className="flex flex-col w-full p-1">
                                                                    <Input
                                                                        type="number"
                                                                        label="Costo para participantes externos"
                                                                        name="costo"
                                                                        //value={costo}
                                                                        //onChange={handleChange}
                                                                        //onBlur={handleBlur}
                                                                        //required={true}
                                                                        variant="faded"
                                                                        color="secondary"
                                                                        placeholder="Costo en dólares"
                                                                    />
                                                                </div>

                                                            </div>

                                                            <section>
                                                                <button className="bg-[#8C113E] text-white uppercase py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-slate-400 transition duration-2oo ease-in-out" onClick={()=>setIsopen2(false)}> Cerrar </button>
                                                                <button className="bg-[#8C113E] text-white uppercase m-1 py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-slate-400  transition duration-2oo ease-in-out"> Crear curso </button> 
                                                            </section>

                                                            
                                                    </div>                           

                                                </form>

                                                
                                            </div>
                                        </section>
                                    </div>
                                </section>
                            )
                        }


                        <h1 className='text-[30px] font-semibold text-center'>Cisco Academy</h1>
                        <div className= "text-center">
                            <section className="justify-items-center m-4 mb-9 grid grid-cols-1 sm:grid-cols-2 md:mx-56">
                                <section onClick={()=>setIsopen(true)}>
                                    <section className="bg-gray-50 max-w-80 max-h-60 m-2 text-white font-bold rounded hover:bg-gray-100 border-2 inset-shadow-sm">
                                        <section className="flex justify-center items-center">
                                            <img src={CiscoImg} alt="cisco1" className="max-h-32"/>
                                        </section>
                                        <h2 className="font-mont text-gray-950 text-lg m-2">(CEP-CISCO-01) – Módulo 1: Introduction to Network</h2>
                                    </section>
                                </section>

                                {
                                    isopen && (
                                        <section className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                                            <section className="bg-white p-6 sm:mt-14 rounded flex flex-col justify-center items-center gap-2">
                                                <h2 className="text-center font-mont font-semibold text-2xl border-b-2 mx-20 mb-1 border-[#2A398C] sm:text-left">(CEP-CISCO-01) – Módulo 1: Introduction to Network</h2>
                                                
                                                <section className=" flex justify-center items-center"> 
                                                    <section className="m-1">
                                                        <ul className="mb-2 mx-2">
                                                            <li className="flex flex-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                                </svg>
                                                                <section className="text-left">
                                                                    <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Horario</h3>
                                                                    <p className="font-mont text-sm">Sabatino 08:00am – 12:00m</p>
                                                                </section>
                                                            </li>
                                                        </ul>

                                                        <ul className="m-2">
                                                            <li className="flex flex-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                <section className="text-left">
                                                                    <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Duración</h3>
                                                                    <p className="font-mont text-sm">70 Horas / 14 Semanas / 5 horas académicas<br/>semanales</p>
                                                                </section>
                                                            </li>
                                                        </ul>

                                                        <ul className="m-2">
                                                            <li className="flex flex-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                                                </svg>
                                                                <section className="text-left">
                                                                    <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Modalidad</h3>
                                                                    <p className="font-mont text-sm">Presencial – Un PC por participante</p>
                                                                </section>
                                                            </li>
                                                        </ul>

                                                        <ul className="m-2">
                                                            <li className="flex flex-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                                </svg>
                                                                <section className="text-left">
                                                                    <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Facilitador</h3>
                                                                    <p className="font-mont text-sm">José David Vásquez</p>
                                                                </section>
                                                            </li>
                                                        </ul>

                                                        <ul className="m-2">
                                                            <li className="flex flex-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                                </svg>
                                                                <section className="text-left">
                                                                    <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Costo</h3>
                                                                    <p className="font-mont text-sm">100$ un solo pago / 120$ en tres partes</p>
                                                                </section>
                                                            </li>
                                                        </ul>

                                                        <ul className="m-2">
                                                            <li className="flex flex-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mx-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                                </svg>
                                                                <section className="text-left">
                                                                    <h3 className="text-sm font-mont font-semibold text-gray-950 uppercase">Forma de pago</h3>
                                                                    <p className="font-mont text-sm"> <b className="mx-1">•</b>Transferencia Bancaria (tasa de cambio oficial <br/> de Banco Central de Venezuela):
                                                                        <p className="ml-4 text-sm">Banco Mercantil </p>
                                                                        <p className="ml-4 text-sm">Cuenta Corriente Nro. 0105-0083-44-1083100815</p>
                                                                        <p className="ml-4 text-sm">Titular: IUJO, A.C</p>
                                                                        <p className="ml-4 text-sm">Rif: J-30576524-3</p>
                                                                    </p>
                                                                    <p className="font-mont text-sm"> <b className="mx-1">•</b>Efectivo en Divisas y punto de ventas<br/>(en la caja principal de la sede)</p>
                                                                </section>
                                                            </li>
                                                        </ul>
                                                    </section>

                                                    <section className="text-left m-1">
                                                        <h3 className="font-mont font-semibold text-gray-950 text-lg my-1 uppercase">CONTENIDO:</h3>

                                                        <p className="font-mont"> <b className="mx-1">•</b> Configuración básica de switches</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Protocolos y modelos.</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Capa física</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Sistemas numéricos</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Capa de enlace de datos</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Switching Ethernet.</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Capa de red</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Resolución de dirección</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Configuración básica de un router.</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Asignación de direcciones IPv4.</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Asignación de direcciones IPv6</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> ICMP</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Capa de transporte</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Capa de aplicación</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Fundamentos de seguridad en la red.</p>
                                                        <p className="font-mont"> <b className="mx-1">•</b> Cree una red pequeña. </p>
                                                    </section>

                                                        
                                                </section>
                                                


                                                <section className="">
                                                    <button className="m-2 bg-[#8C113E] text-white uppercase py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-slate-400 transition duration-2oo ease-in-out" onClick={()=>setIsopen(false)}> Cerrar </button>
                                                    <Link end to="../../participant">
                                                        <button className="m-2 bg-[#8C113E] text-white uppercase py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-slate-400 transition duration-2oo ease-in-out"> Aperturar </button>
                                                    </Link>
                                                    
                                                </section>
                                            </section>
                                        </section>
                                    )
                                }

                                
                        
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

export default AperturaCursos;