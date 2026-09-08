import { useCallback, useContext, useEffect, useState } from 'react';
import Layout from '../layout';
import { SocketContext } from '../../SocketProvider';
import { Chip, useDisclosure } from '@heroui/react';
import CardCourses from '../../components/Card/CardCourses';
import CustomTable from '../../components/Table/CustomTable';
import ModalStudent from '../../components/Modals/ModalStudent';
import { UserPlus, UserCheck, BookOpen, CheckCircle, Clock } from 'lucide-react';

const columns = [
    {
        key: "estudiante",
        label: "PARTICIPANTE / CÉDULA",
    },
    {
        key: "participante",
        label: "TIPO",
    },
    {
        key: "nombrecurso",
        label: "CURSO INSCRITO",
    },
    {
        key: "saldo_pendiente",
        label: "ESTATUS DE PAGO",
    },
];

const AsistenciaPage = () => {
    const { socket } = useContext(SocketContext);
    const [studen, setStuden] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [messag, setMessag] = useState(null);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    useEffect(() => {
        if (!socket) return;

        // Cargar lista de estudiantes
        socket.emit('[bag] Studen', () => { }, (listAllcourses) => {
            if (listAllcourses) {
                try {
                    const parsed = typeof listAllcourses === 'string' ? JSON.parse(listAllcourses) : listAllcourses;
                    setStuden(parsed);
                } catch (e) {
                    console.error("Error al parsear estudiantes:", e);
                }
            }
        });

        // Cargar lista de cursos para el modal de inscripción
        socket.emit('[bag] courses', () => { }, (coursesData) => {
            if (coursesData) {
                try {
                    const parsed = typeof coursesData === 'string' ? JSON.parse(coursesData) : coursesData;
                    setCoursesList(parsed);
                } catch (e) {
                    console.error("Error al parsear cursos:", e);
                }
            }
        });
    }, [socket]);

    const handleSaveStudent = (formData) => {
        if (socket) {
            socket.emit('[bag] addStudent', formData);
        }
        setStuden((prev) => [formData, ...prev]);
        setMessag("Inscripción registrada exitosamente");
        setTimeout(() => setMessag(null), 3000);
    };

    const renderCell = useCallback((user, columnKey) => {
        switch (columnKey) {
            case "estudiante":
                const initialA = user.nombre?.charAt(0) || 'E';
                const initialB = user.apellido?.charAt(0) || '';
                const fullName = `${user.nombre || ''} ${user.apellido || ''}`.trim() || 'Estudiante';
                return (
                    <div className="flex items-center gap-3.5 py-1">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                            {initialA}{initialB}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800 text-sm capitalize">
                                {fullName}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 font-medium">
                                {user.cedula || 'Sin cédula'}
                            </span>
                        </div>
                    </div>
                );
            case "participante":
                const typeStr = String(user.participante || 'Estudiante');
                const isIUJO = typeStr.toLowerCase().includes('iujo');
                return (
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${
                        isIUJO
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                        {typeStr}
                    </span>
                );
            case "nombrecurso":
                return (
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                            <BookOpen size={13} className="text-indigo-600 shrink-0" />
                            <span>{user.nombrecurso || 'Sin curso asignado'}</span>
                        </span>
                    </div>
                );
            case "saldo_pendiente":
                const isComplete = String(user.saldo_pendiente).toLowerCase() === 'completo';
                return (
                    <div className="flex items-center">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl border ${
                            isComplete
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                            {isComplete ? <CheckCircle size={12} /> : <Clock size={12} />}
                            <span>{isComplete ? 'Completo' : 'Pendiente'}</span>
                        </span>
                    </div>
                );
            default:
                return user[columnKey] || '-';
        }
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-6 max-w-7xl mx-auto">
                {messag && (
                    <div className="flex items-center gap-2 py-3 px-4 text-emerald-800 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm animate-fade-in">
                        <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                        <p className="text-sm font-semibold">{messag}</p>
                    </div>
                )}

                <CardCourses />

                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-slate-200/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                                    <UserCheck size={20} />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    Gestión de Inscripciones
                                </h1>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 ml-11">
                                Control de participantes matriculados y estatus de pagos
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-98"
                            onClick={onModalOpen}
                        >
                            <UserPlus size={18} />
                            <span>Nueva Inscripción</span>
                        </button>
                    </div>

                    <ModalStudent
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        onSave={handleSaveStudent}
                        coursesList={coursesList}
                    />

                    <CustomTable
                        columns={columns}
                        data={studen}
                        rowsPerPage={6}
                        keyField="cedula"
                        renderCell={renderCell}
                        ariaLabel="Tabla de inscripciones"
                        emptyContent="No hay inscripciones registradas"
                        searchPlaceholder="Buscar por cédula, nombre o curso..."
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AsistenciaPage;
