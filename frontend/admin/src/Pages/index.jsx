import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import { SocketContext } from "../SocketProvider";
import {
    BookOpen, Users, UserCheck, CheckCircle2,
    PlayCircle, Clock, ArrowRight, BarChart3,
    LayoutDashboard, CreditCard, TrendingUp,
} from 'lucide-react';

/* ─── Helpers ─── */
const statusBadgeClass = (status) => {
    const map = {
        Activo: "bg-amber-50 text-amber-700 border-amber-200",
        Proceso: "bg-blue-50 text-blue-700 border-blue-200",
        Completados: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return map[status] || "bg-slate-50 text-slate-600 border-slate-200";
};

/* ─── KPI Card ─── */
const KpiCard = ({ label, value, icon: Icon, bg, text, subLabel, loading }) => (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.06] ${bg}`} />
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg} bg-opacity-10 border border-opacity-10`}>
                <Icon size={18} className={text} />
            </div>
        </div>
        {loading ? (
            <div className="h-10 w-24 bg-slate-100 rounded-xl animate-pulse" />
        ) : (
            <p className="text-4xl font-black text-slate-900 tracking-tight leading-none">{value ?? 0}</p>
        )}
        <p className="text-[11px] text-slate-400 font-medium">{subLabel}</p>
    </div>
);

/* ─── Status distribution bars ─── */
const StatusBar = ({ activos, proceso, completados, total, loading }) => {
    const pct = (n) => (total > 0 ? Math.round((n / total) * 100) : 0);
    if (loading) return (
        <div className="space-y-3">
            {[0, 1, 2].map(i => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-20 h-3 bg-slate-100 rounded-full animate-pulse" />
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full animate-pulse" />
                    <div className="w-6 h-3 bg-slate-100 rounded-full animate-pulse" />
                </div>
            ))}
        </div>
    );
    const bars = [
        { label: "Activos", value: activos, pct: pct(activos), bar: "bg-amber-400", txt: "text-amber-600" },
        { label: "En Proceso", value: proceso, pct: pct(proceso), bar: "bg-blue-500", txt: "text-blue-600" },
        { label: "Completados", value: completados, pct: pct(completados), bar: "bg-emerald-500", txt: "text-emerald-600" },
    ];
    return (
        <div className="space-y-3.5">
            {bars.map(({ label, value, pct: p, bar, txt }) => (
                <div key={label} className="flex items-center gap-3">
                    <span className={`text-xs font-semibold w-24 shrink-0 ${txt}`}>{label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${bar}`} style={{ width: `${p}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 w-5 text-right">{value}</span>
                </div>
            ))}
        </div>
    );
};

/* ─── Fila de curso reciente ─── */
const RecentRow = ({ c }) => (
    <div className="flex items-center gap-3 py-3 px-1 hover:bg-slate-50 rounded-xl transition-colors">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-black text-sm uppercase shrink-0 shadow-sm">
            {(c.nombrecurso || 'C').charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{c.nombrecurso}</p>
            <p className="text-[11px] text-slate-400 font-medium truncate">
                {c.codigodecuso && <span className="font-mono text-indigo-500">{c.codigodecuso}</span>}
                {c.codigodecuso ? ' · ' : ''}{c.facilitador}
            </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
            <Users size={12} className="text-slate-400" />
            <span className="font-semibold">{c.inscritos ?? 0}</span>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border shrink-0 ${statusBadgeClass(c.status)}`}>
            {c.status}
        </span>
    </div>
);

/* ─── Tarjeta de acceso rápido ─── */
const QuickLink = ({ to, icon: Icon, label, desc, gradient, navigate }) => (
    <button type="button" onClick={() => navigate(to)}
        className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left group w-full">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${gradient}`}>
            <Icon size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800">{label}</p>
            <p className="text-xs text-slate-400 font-medium truncate">{desc}</p>
        </div>
        <ArrowRight size={15} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
    </button>
);

/* ─── Dashboard principal ─── */
const Index = () => {
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        cursos_activos: 0, cursos_proceso: 0, cursos_completados: 0,
        total_cursos: 0, total_estudiantes: 0, total_facilitadores: 0,
        cursos_recientes: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!socket) return;
        setLoading(true);
        socket.emit('[bag] dashboard', null, (res) => {
            if (res) setData(res);
            setLoading(false);
        });
    }, [socket]);

    const kpis = [
        { label: 'Total Cursos',   value: data.total_cursos,        icon: BookOpen,     bg: 'bg-indigo-500',  text: 'text-indigo-600',  subLabel: 'Programas registrados' },
        { label: 'Estudiantes',    value: data.total_estudiantes,   icon: UserCheck,    bg: 'bg-sky-500',     text: 'text-sky-600',     subLabel: 'Inscritos en total'    },
        { label: 'Facilitadores',  value: data.total_facilitadores, icon: Users,        bg: 'bg-violet-500',  text: 'text-violet-600',  subLabel: 'Personal académico'    },
        { label: 'Completados',    value: data.cursos_completados,  icon: CheckCircle2, bg: 'bg-emerald-500', text: 'text-emerald-600', subLabel: 'Cursos finalizados'    },
    ];

    const quickLinks = [
        { to: '/cursos',      icon: BookOpen,   label: 'Apertura de Cursos', desc: 'Gestionar programas académicos', gradient: 'bg-gradient-to-br from-indigo-500 to-blue-600'   },
        { to: '/inscripcion', icon: UserCheck,  label: 'Inscripciones',      desc: 'Ver y registrar estudiantes',    gradient: 'bg-gradient-to-br from-sky-500 to-cyan-600'       },
        { to: '/facilitador', icon: Users,      label: 'Facilitadores',      desc: 'Administrar personal docente',   gradient: 'bg-gradient-to-br from-violet-500 to-purple-600'  },
        { to: '/caja',        icon: CreditCard, label: 'Caja',               desc: 'Control de pagos y finanzas',    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600'   },
    ];

    return (
        <Layout>
            <div className="flex flex-col gap-6 max-w-7xl mx-auto">

                {/* ── Encabezado ── */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2.5 mb-1">
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                                <LayoutDashboard size={20} />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                Panel de Control
                            </h1>
                        </div>
                        <p className="text-sm text-slate-400 font-medium ml-11">
                            Resumen ejecutivo del sistema CEP — Extensión Profesional
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-500">
                        <TrendingUp size={13} className="text-slate-400" />
                        <span>
                            {new Date().toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                    </div>
                </div>

                {/* ── KPI Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.map((kpi) => (
                        <KpiCard key={kpi.label} {...kpi} loading={loading} />
                    ))}
                </div>

                {/* ── Fila central ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

                    {/* Distribución de estatus (2/5) */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                <BarChart3 size={16} className="text-slate-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Distribución de Cursos</p>
                                <p className="text-[11px] text-slate-400 font-medium">Por estatus académico</p>
                            </div>
                        </div>

                        <StatusBar
                            activos={data.cursos_activos}
                            proceso={data.cursos_proceso}
                            completados={data.cursos_completados}
                            total={data.total_cursos}
                            loading={loading}
                        />

                        {!loading && (
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                                {[
                                    { label: 'Activos',     val: data.cursos_activos,     Icon: Clock,        cls: 'text-amber-600 bg-amber-50 border-amber-200' },
                                    { label: 'En Proceso',  val: data.cursos_proceso,     Icon: PlayCircle,   cls: 'text-blue-600 bg-blue-50 border-blue-200' },
                                    { label: 'Finalizados', val: data.cursos_completados, Icon: CheckCircle2, cls: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                                ].map(({ label, val, Icon, cls }) => (
                                    <div key={label} className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border ${cls}`}>
                                        <Icon size={14} />
                                        <span className="text-lg font-black leading-none">{val}</span>
                                        <span className="text-[10px] font-semibold leading-tight text-center">{label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cursos recientes (3/5) */}
                    <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                    <BookOpen size={16} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Cursos Recientes</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Últimos 5 registrados</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => navigate('/cursos')}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                                Ver todos <ArrowRight size={13} />
                            </button>
                        </div>

                        <div className="flex-1">
                            {loading ? (
                                <div className="space-y-3">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-3 py-2">
                                            <div className="w-9 h-9 bg-slate-100 rounded-xl animate-pulse shrink-0" />
                                            <div className="flex-1 space-y-1.5">
                                                <div className="h-3 bg-slate-100 rounded-full animate-pulse w-3/4" />
                                                <div className="h-2.5 bg-slate-100 rounded-full animate-pulse w-1/2" />
                                            </div>
                                            <div className="h-5 w-16 bg-slate-100 rounded-lg animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            ) : data.cursos_recientes.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {data.cursos_recientes.map(c => (
                                        <RecentRow key={c.idcurso} c={c} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-32 gap-2 text-slate-400">
                                    <BookOpen size={28} className="opacity-30" />
                                    <p className="text-sm font-medium">No hay cursos registrados aún</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Accesos rápidos ── */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                            <ArrowRight size={16} className="text-slate-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Accesos Rápidos</p>
                            <p className="text-[11px] text-slate-400 font-medium">Navega a las secciones del sistema</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {quickLinks.map(ql => (
                            <QuickLink key={ql.to} {...ql} navigate={navigate} />
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Index;