import proceso from "../../assets/icons/proces.png";
import cursos from "../../assets/icons/check.png";
import grupo from "../../assets/icons/grupo.png";

import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../SocketProvider";

const CardCourses = () => {
    const { socket } = useContext(SocketContext);

    // Inicializamos con objeto por defecto para evitar errores antes de recibir la respuesta del Socket
    const [statisticsCourses, setStatisticsCourses] = useState({ cursos: 0 });
    const [statisticsProceso, setStatisticsProceso] = useState({ cursos: 0 });
    const [statisticsComplete, setStatisticsComplete] = useState({ cursos: 0 });

    useEffect(() => {
        if (!socket) return;

        socket.emit('[bag] statisticsCourses', () => { }, (listAllcourses) => {
            if (listAllcourses) setStatisticsCourses(JSON.parse(listAllcourses));
        });

        socket.emit('[bag] statisticsCoursesProceso', () => { }, (listAllcourses) => {
            if (listAllcourses) setStatisticsProceso(JSON.parse(listAllcourses));
        });

        socket.emit('[bag] statisticsComplete', () => { }, (listAllcourses) => {
            if (listAllcourses) setStatisticsComplete(JSON.parse(listAllcourses));
        });

        return () => {
            socket.off('[bag] statisticsCourses');
            socket.off('[bag] statisticsCoursesProceso');
            socket.off('[bag] statisticsComplete');
        };
    }, [socket]);

    return (
        <div className="grid gap-4 sm:grid-cols-3 w-full">
            {/* Cursos Completados */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-all">
                <div>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                        Cursos Completados
                    </p>
                    <h3 className="text-3xl font-bold text-slate-800 mt-1">
                        {statisticsComplete?.cursos ?? 0}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Programas finalizados</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <img src={cursos} alt="Completados" className="w-6 h-6 object-contain" />
                </div>
            </div>

            {/* Cursos En Proceso */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all">
                <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        Cursos En Proceso
                    </p>
                    <h3 className="text-3xl font-bold text-slate-800 mt-1">
                        {statisticsProceso?.cursos ?? 0}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Clases dictándose actualmente</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <img src={proceso} alt="En proceso" className="w-6 h-6 object-contain" />
                </div>
            </div>

            {/* Cursos En Espera */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-amber-200 transition-all">
                <div>
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                        Cursos En Espera
                    </p>
                    <h3 className="text-3xl font-bold text-slate-800 mt-1">
                        {statisticsCourses?.cursos ?? 0}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Esperando cuórum de alumnos</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <img src={grupo} alt="En espera" className="w-6 h-6 object-contain" />
                </div>
            </div>
        </div>
    );
};

export default CardCourses;