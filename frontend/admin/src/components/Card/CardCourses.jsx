import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../SocketProvider";
import { CheckCircle2, PlayCircle, Clock, TrendingUp } from "lucide-react";

const CardCourses = () => {
    const { socket } = useContext(SocketContext);

    const [stats, setStats] = useState({
        activos: 0,
        proceso: 0,
        completados: 0
    });

    useEffect(() => {
        if (!socket) return;

        socket.emit('[bag] statistics', null, (response) => {
            if (response) {
                try {
                    const parsed = typeof response === 'string' ? JSON.parse(response) : response;
                    setStats({
                        activos: Number(parsed.activos ?? parsed.cursos ?? 0),
                        proceso: Number(parsed.proceso ?? 0),
                        completados: Number(parsed.completados ?? 0)
                    });
                } catch (e) {
                    console.error("Error al procesar estadísticas:", e);
                }
            }
        });
    }, [socket]);

    const cards = [
        {
            title: "Cursos Completados",
            count: stats.completados,
            subtitle: "Programas finalizados con éxito",
            icon: CheckCircle2,
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-50 border-emerald-100",
            textColor: "text-emerald-700",
            borderColor: "hover:border-emerald-300",
            glow: "hover:shadow-emerald-500/10"
        },
        {
            title: "Cursos En Proceso",
            count: stats.proceso,
            subtitle: "Clases activas dictándose ahora",
            icon: PlayCircle,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50 border-blue-100",
            textColor: "text-blue-700",
            borderColor: "hover:border-blue-300",
            glow: "hover:shadow-blue-500/10"
        },
        {
            title: "Cursos En Espera",
            count: stats.activos,
            subtitle: "Esperando inicio de cuórum",
            icon: Clock,
            iconColor: "text-amber-600",
            iconBg: "bg-amber-50 border-amber-100",
            textColor: "text-amber-700",
            borderColor: "hover:border-amber-300",
            glow: "hover:shadow-amber-500/10"
        }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-3 w-full">
            {cards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                    <div
                        key={idx}
                        className={`bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${card.borderColor} ${card.glow}`}
                    >
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${card.iconBg} ${card.iconColor}`}></span>
                                <p className={`text-xs font-bold uppercase tracking-wider ${card.textColor}`}>
                                    {card.title}
                                </p>
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                                {card.count}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">
                                {card.subtitle}
                            </p>
                        </div>
                        <div className={`w-13 h-13 p-3 rounded-2xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${card.iconBg}`}>
                            <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardCourses;