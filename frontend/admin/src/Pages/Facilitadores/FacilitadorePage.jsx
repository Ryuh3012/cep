import { useCallback, useContext, useEffect, useState } from 'react';
import Layout from '../layout';
import { SocketContext } from '../../SocketProvider';
import CardCourses from '../../components/Card/CardCourses';
import CustomTable from '../../components/Table/CustomTable';
import ModalFacilitador from '../../components/Modals/ModalFacilitador';
import { useDisclosure } from '@heroui/react';
import { Plus, Users, BookOpen, CheckCircle, Mail, Phone } from 'lucide-react';

const columns = [
    {
        key: "facilitador",
        label: "FACILITADOR",
    },
    {
        key: "cursos",
        label: "CURSO QUE DIRIGE",
    },
    {
        key: "contacto",
        label: "DATOS DE CONTACTO",
    },
];

const FacilitadorePage = () => {
    const [teacher, setTeacher] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [messag, setMessag] = useState(null);
    const { socket } = useContext(SocketContext);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    useEffect(() => {
        if (!socket) return;

        // Cargar facilitadores
        socket.emit('[bag] facilitador', () => { }, (listAllcourses) => {
            if (listAllcourses) {
                try {
                    const parsed = typeof listAllcourses === 'string' ? JSON.parse(listAllcourses) : listAllcourses;
                    setTeacher(parsed);
                } catch (e) {
                    console.error("Error al parsear facilitadores:", e);
                }
            }
        });

        // Cargar cursos disponibles para asignarle al facilitador
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

    const handleSaveFacilitador = (formData) => {
        if (socket) {
            socket.emit('[bag] teacher', formData);
        }
        setTeacher((prev) => [formData, ...prev]);
        setMessag("Facilitador registrado exitosamente");
        setTimeout(() => setMessag(null), 3000);
    };

    const renderCell = useCallback((user, columnKey) => {
        switch (columnKey) {
            case "facilitador":
                const initialA = user.nombre?.charAt(0) || 'F';
                const initialB = user.apellido?.charAt(0) || '';
                return (
                    <div className="flex items-center gap-3.5 py-1">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                            {initialA}{initialB}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800 text-sm">
                                {user.nombre} {user.apellido}
                            </span>
                            {user.cedula && (
                                <span className="text-[11px] font-mono text-slate-400">
                                    {user.cedula}
                                </span>
                            )}
                        </div>
                    </div>
                );
            case "cursos":
                const hasCourse = user.cursos && user.cursos !== 'Sin curso asignado';
                return (
                    <div className="flex items-center">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                            hasCourse
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-slate-50 text-slate-400 border-slate-200 italic'
                        }`}>
                            <BookOpen size={13} className={hasCourse ? 'text-blue-600' : 'text-slate-400'} />
                            <span>{user.cursos || 'Sin curso asignado'}</span>
                        </span>
                    </div>
                );
            case "contacto":
                return (
                    <div className="flex flex-col gap-1 text-xs text-slate-600">
                        {user.email && (
                            <span className="inline-flex items-center gap-1.5 text-slate-600">
                                <Mail size={12} className="text-slate-400" />
                                {user.email}
                            </span>
                        )}
                        {user.telefono && (
                            <span className="inline-flex items-center gap-1.5 text-slate-600">
                                <Phone size={12} className="text-slate-400" />
                                {user.telefono}
                            </span>
                        )}
                        {!user.email && !user.telefono && (
                            <span className="text-slate-400 italic">No especificado</span>
                        )}
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
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                                    <Users size={20} />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    Gestión de Facilitadores
                                </h1>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 ml-11">
                                Instructores académicos, especialidades y cursos asignados
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-98"
                            onClick={onModalOpen}
                        >
                            <Plus size={18} />
                            <span>Nuevo Facilitador</span>
                        </button>
                    </div>

                    <ModalFacilitador
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        onSave={handleSaveFacilitador}
                        coursesList={coursesList}
                    />

                    <CustomTable
                        columns={columns}
                        data={teacher}
                        rowsPerPage={6}
                        keyField="idfacilitador"
                        renderCell={renderCell}
                        ariaLabel="Tabla de facilitadores"
                        emptyContent="No se encontraron facilitadores registrados"
                        searchPlaceholder="Buscar facilitador por nombre, cédula o curso..."
                    />
                </div>
            </div>
        </Layout>
    );
};

export default FacilitadorePage;
