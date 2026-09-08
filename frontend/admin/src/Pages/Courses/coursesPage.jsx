import { Chip, Tooltip, useDisclosure } from '@heroui/react';
import Layout from '../layout';
import { useContext, useEffect, useState, useCallback } from 'react';
import CardCourses from '../../components/Card/CardCourses';
import { SocketContext } from '../../SocketProvider';
import ModalCourses from '../../components/Modals/ModalCourses';
import ModalEdit from '../../components/Modals/ModalEdit';
import CustomTable from '../../components/Table/CustomTable';
import { useFormik } from 'formik';
import { Plus, Clock, Edit2, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const columns = [
    {
        key: "nombrecurso",
        label: "CURSO Y CÓDIGO",
    },
    {
        key: "horario",
        label: "HORARIO",
    },
    {
        key: "facilitador",
        label: "FACILITADOR",
    },
    {
        key: "modalidad",
        label: "MODALIDAD",
    },
    {
        key: "formacion",
        label: "FORMACIÓN",
    },
    {
        key: "monto",
        label: "PRECIO",
    },
    {
        key: "status",
        label: "ESTATUS",
    },
    {
        key: "actions",
        label: "ACCIONES",
    }
];

const initialValues = {
    codigodecuso: '',
    nombrecurso: '',
    duracion: '',
    horario: '',
    monto: '',
    contenido: '',
    status: '',
    facilitador: '',
    modalidad: '',
    formacion: ''
};

const CoursesPage = () => {
    const { socket } = useContext(SocketContext);

    const [cursos, setCursos] = useState([]);
    const [messag, setMessag] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [courseToEdit, setCourseToEdit] = useState(null);

    useEffect(() => {
        if (!socket) return;
        socket.emit('[bag] courses', () => { }, (listAllcourses) => {
            if (listAllcourses) {
                try {
                    const parsed = typeof listAllcourses === 'string' ? JSON.parse(listAllcourses) : listAllcourses;
                    setCursos(parsed);
                } catch (err) {
                    console.error("Error al parsear cursos:", err);
                }
            }
        });
    }, [socket]);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    const { errors, touched, handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues,
        onSubmit: async (formValues, { resetForm }) => {
            try {
                if (socket) {
                    socket.emit('[bag] addCourse', formValues, {});
                }
                setCursos((prev) => [formValues, ...prev]);
                setMessag("Curso creado adecuadamente");
                onModalClose();
                resetForm();
                setTimeout(() => setMessag(null), 3000);
            } catch (error) {
                console.error("Error al guardar curso:", error);
                setErrorMsg("No se pudo registrar el curso");
                setTimeout(() => setErrorMsg(null), 3000);
            }
        }
    });

    const statusOpen = (status) => {
        if (status === 'Activo') return 'warning';
        if (status === 'Proceso') return 'primary';
        if (status === 'Completados') return 'success';
        return 'default';
    };

    const handleUpdateStatus = (updatedCourse) => {
        setCursos((prev) =>
            prev.map((c) => {
                const isMatch = (c.codigodecuso && c.codigodecuso === updatedCourse.codigodecuso) ||
                    (c.idcurso && c.idcurso === updatedCourse.idcurso) ||
                    (c.id && c.id === updatedCourse.id);
                return isMatch ? { ...c, status: updatedCourse.status } : c;
            })
        );
        setMessag("Estatus del curso actualizado");
        setTimeout(() => setMessag(null), 3000);
    };

    const renderCell = useCallback((item, columnKey) => {
        switch (columnKey) {
            case "nombrecurso":
                return (
                    <div className="flex flex-col gap-1 py-1">
                        <span className="font-bold text-slate-800 text-sm leading-snug">
                            {item.nombrecurso || item.cursos || '-'}
                        </span>
                        {item.codigodecuso && (
                            <span className="inline-flex text-[11px] font-mono text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md w-fit font-semibold border border-indigo-100">
                                {item.codigodecuso}
                            </span>
                        )}
                    </div>
                );
            case "horario":
                return (
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <Clock size={13} className="text-slate-400 shrink-0" />
                        <span>{item.horario || 'Por definir'}</span>
                    </div>
                );
            case "facilitador":
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-xs">
                            {(item.facilitador || 'F').charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                            {item.facilitador || 'Sin asignar'}
                        </span>
                    </div>
                );
            case "modalidad":
                const isOnline = String(item.modalidad).toLowerCase().includes('online');
                return (
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${
                        isOnline
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                    }`}>
                        {item.modalidad || 'Presencial'}
                    </span>
                );
            case "formacion":
                return (
                    <span className="text-xs px-2.5 py-1 rounded-lg font-medium bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                        {item.formacion || 'General'}
                    </span>
                );
            case "monto":
                const amount = Number(item.monto);
                return (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                        {item.monto ? `$${isNaN(amount) ? item.monto : amount.toFixed(2)}` : 'Gratuito'}
                    </span>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize font-semibold text-xs border"
                        color={statusOpen(item.status)}
                        variant="flat"
                        size="sm"
                    >
                        {item.status || 'Sin estatus'}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Editar estatus" delay={100}>
                            <button
                                type="button"
                                onClick={() => setCourseToEdit(item)}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-200"
                                aria-label="Editar estatus"
                            >
                                <Edit2 size={15} />
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                const cellValue = item[columnKey];
                if (cellValue === null || cellValue === undefined) return '-';
                return String(cellValue);
        }
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-6 max-w-7xl mx-auto">
                {/* Alertas con animación y diseño flotante */}
                {messag && (
                    <div className="flex items-center gap-2 py-3 px-4 text-emerald-800 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm animate-fade-in">
                        <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                        <p className="text-sm font-semibold">{messag}</p>
                    </div>
                )}
                {errorMsg && (
                    <div className="flex items-center gap-2 py-3 px-4 text-red-800 bg-red-50 rounded-2xl border border-red-200 shadow-sm animate-fade-in">
                        <AlertCircle size={18} className="text-red-600 shrink-0" />
                        <p className="text-sm font-semibold">{errorMsg}</p>
                    </div>
                )}

                {/* Métricas / Estadísticas */}
                <CardCourses />

                {/* Contenedor Principal con estilo Card moderno */}
                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-slate-200/80">
                    {/* Encabezado con título y botón de acción */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                    <BookOpen size={20} />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    Apertura de Cursos
                                </h1>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 ml-11">
                                Administra los programas académicos, cupos, modalidades y facilitadores
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-98"
                            onClick={onModalOpen}
                        >
                            <Plus size={18} />
                            <span>Nuevo Curso</span>
                        </button>
                    </div>

                    <ModalCourses
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        onOpen={onModalOpen}
                        values={values}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />

                    {courseToEdit && (
                        <ModalEdit
                            isOpen={Boolean(courseToEdit)}
                            item={courseToEdit}
                            onClose={() => setCourseToEdit(null)}
                            onSave={handleUpdateStatus}
                        />
                    )}

                    <CustomTable
                        columns={columns}
                        data={cursos}
                        rowsPerPage={6}
                        keyField="codigodecuso"
                        renderCell={renderCell}
                        ariaLabel="Tabla de cursos"
                        emptyContent="No se encontraron cursos abiertos"
                        searchPlaceholder="Buscar por nombre, código, facilitador..."
                    />
                </div>
            </div>
        </Layout>
    );
};

export default CoursesPage;
