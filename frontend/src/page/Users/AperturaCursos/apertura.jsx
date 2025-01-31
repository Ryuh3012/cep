//import { Link } from "react-router-dom";
import Layout from "../../Admin/layout";
import { Input, Select } from "@nextui-org/react";
//import { Image } from "@nextui-org/react";

//import CiscoImg from "../../../assets/cisco1.png";


const AperturaCursos = () => {
    return (
        <Layout>
            <div className="p-10 flex flex-col gap-6 h-auto bg-[#d9dbe0] ">
                <section className="bg-white rounded-[5px] shadow-md p-5 max-w-full border-[1px] border-[#C4CEDC]">
                    <div className="container horizontal">
                        <section className="justify-end">
                            <button className="bg-[#8C113E] text-slate-400 uppercase w-[15%] py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-white transition duration-2oo ease-in-out"> Aperturar curso </button>
                        </section>

                        <h1 className='text-[30px] font-semibold text-center border-b-2 mx-20 mb-6 border-[#2A398C]'>Crear nuevo curso</h1>
                        <form action="" method="post">
                            <div className="flex flex-col justify-center items-center py-1 gap-y-2 ms:flex-col">
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

                                <div className="lg:flex w-full gap-3 p-1">
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

                                    <div className="lg:flex w-full gap-3 p-1">
                                    <div className='flex flex-col w-full gap-2'>
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

                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    <div className="lg:flex  w-full gap-3 p-1">
                                    <div className='flex flex-col w-full lg:gap-2 '>
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

                                    <div className="lg:flex  w-full gap-3 p-1">
                                    <div className='flex flex-col w-full lg:gap-2 '>
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
                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    <div className="lg:flex  w-full gap-3 p-1">
                                    <div className='flex flex-col w-full lg:gap-2 '>
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
                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    <div className='flex flex-col w-full lg:gap-2 '>
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


                                    <div className="lg:flex  w-full gap-3 p-1">
                                    
                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    

                                    <div className="lg:flex  w-full gap-3 p-1">
                                    
                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    <div className="flex flex-col w-full gap-2 p-1">
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

                                    <button className="bg-[#8C113E] text-slate-400 uppercase w-[25%] py-3 px-4 rounded-xl font-semibold cursor-pointer  lg:hover:bg-[#6A2473] lg:hover:text-white transition duration-2oo ease-in-out"> Crear curso </button>

                                    
                                    
                            </div>                           

                        </form>

                        
                    </div>
                </section>
            </div>
            
        </Layout>
    );
}

export default AperturaCursos;