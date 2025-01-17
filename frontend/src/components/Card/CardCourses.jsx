import { Image } from "@nextui-org/react";
import proceso from "../../assets/icons/proces.png";
import cursos from "../../assets/icons/check.png";
import grupo from "../../assets/icons/grupo.png";

const CardCourses = () => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r bg-emerald-500/10  rounded-lg border" />
                <div className="relative p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500 rounded-lg shadow-lg">
                            <Image src={cursos} className="w-10 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-emerald-600">Cursos Completados</p>
                            <p className="text-2xl font-bold">0/0</p>
                            <p className="text-sm text-emerald-600/80">Cursos finalizados</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r bg-blue-500/10 rounded-lg border" />
                <div className="relative p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-lg shadow-lg">
                            <Image src={proceso} className="w-10" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-600">Cursos En Proceso</p>
                            <p className="text-2xl font-bold">0/0</p>
                            <p className="text-sm text-blue-600/80">Curso iniciado</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r bg-amber-500/10 rounded-lg border" />
                <div className="relative p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500 rounded-lg shadow-lg">
                            <Image src={grupo} className="w-10" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-amber-600">Cursos En Espera</p>
                            <p className="text-2xl font-bold">0/0</p>
                            <p className="text-sm text-amber-600/80">Esperando Participantes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardCourses;
