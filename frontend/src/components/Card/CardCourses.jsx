import { Image } from "@nextui-org/react";
import proceso from "../../icons/proces.png";
import cursos from "../../icons/coursos.png";
import grupo from "../../icons/grupo.png";

const CardCourses = () => {
    return (
        <div className="flex justify-between py-2 gap-6 sm:flex-nowrap">
            <div className="flex flex-col bg-green-600 rounded-lg shadow-lg w-[25%] p-5 h-full text-white">
                <div className="flex gap-3">
                    <div className="flex justify-center items-center h-full rounded-lg shadow-lg bg-green-500">
                        <Image
                            src={cursos}
                            className="w-[50px]"
                        />
                    </div>
                    <div>
                        <p className='lg:text-2xl font-bold sm:text-base'> 0/10</p>
                        <p className='lg:text-base font-semibold  sm:text-base'>Cursos Completado</p>
                        <p className='text-opacity-80 text-slate-100 sm:text-xs'>Cursos finalizado</p>
                    </div>
                </div>

            </div>
            <div className="flex flex-col bg-[#6483D0] rounded-lg shadow-lg w-[25%] p-5 h-full text-white">
                <div className="flex gap-3">
                    <div className="flex justify-center items-center h-full rounded-lg shadow-lg bg-[#7AABDC]">
                        <Image
                            src={proceso}
                            className="w-[50px]"
                        />
                    </div>
                    <div>
                        <p className='lg:text-2xl font-bold sm:text-base'> 0/10</p>
                        <p className='lg:text-base font-semibold  sm:text-base'>Cursos En Proceso</p>
                        <p className='text-opacity-80 text-slate-100 sm:text-xs'>Curso Iniciado</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-yellow-600 rounded-lg shadow-lg w-[25%] p-5 h-full text-white">
                <div className="flex gap-3">
                    <div className="flex justify-center items-center h-full rounded-lg shadow-lg bg-yellow-500">
                        <Image
                            src={grupo}
                            className="w-[50px]"
                        />
                    </div>
                    <div>
                        <p className='lg:text-2xl font-bold sm:text-base'> 0/10</p>
                        <p className='lg:text-base font-semibold  sm:text-base'>Cursos En Espera</p>
                        <p className='text-opacity-80 text-slate-100 sm:text-xs'>Esperando Participantes</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CardCourses;
