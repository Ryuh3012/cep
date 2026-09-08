import { useState, useEffect } from "react";

const initialValues = {
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    participante: "Estudiante IUJO",
    nombrecurso: "",
    saldo_pendiente: "Pendiente"
};

const ModalStudent = ({ isOpen, onClose, onSave, coursesList = [] }) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Bloquear el scroll de la página cuando el modal esté abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setFormData(initialValues);
            setErrors({});
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.cedula.trim()) newErrors.cedula = "La cédula es requerida";
        if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
        if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
        if (!formData.nombrecurso.trim()) newErrors.nombrecurso = "Debe seleccionar un curso";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (onSave) {
            onSave(formData);
        }
        onClose();
    };

    const inputStyle =
        "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all";
    const labelStyle = "block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Contenedor del Modal */}
            <div className="relative z-10 w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Registrar Estudiante / Inscripción
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>

                {/* Formulario */}
                <div className="p-4 md:p-5 overflow-y-auto space-y-4 flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Cédula</label>
                                <input
                                    type="text"
                                    name="cedula"
                                    className={inputStyle}
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    placeholder="Ej. V-25123456"
                                />
                                {errors.cedula && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.cedula}</p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Tipo de Participante</label>
                                <select
                                    name="participante"
                                    className={inputStyle}
                                    value={formData.participante}
                                    onChange={handleChange}
                                >
                                    <option value="Estudiante IUJO">Estudiante IUJO</option>
                                    <option value="Personal IUJO">Personal IUJO</option>
                                    <option value="Participante Externo">Participante Externo</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className={inputStyle}
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre del estudiante"
                                />
                                {errors.nombre && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.nombre}</p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Apellido</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    className={inputStyle}
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    placeholder="Apellido del estudiante"
                                />
                                {errors.apellido && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.apellido}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={inputStyle}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Teléfono</label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    className={inputStyle}
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Ej. 0414-1234567"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Curso a Inscribir</label>
                                <select
                                    name="nombrecurso"
                                    className={inputStyle}
                                    value={formData.nombrecurso}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona un curso</option>
                                    {coursesList.map((c, i) => (
                                        <option key={c.id || c.codigodecuso || i} value={c.nombrecurso || c.cursos}>
                                            {c.nombrecurso || c.cursos}
                                        </option>
                                    ))}
                                </select>
                                {errors.nombrecurso && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.nombrecurso}</p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Estatus de Pago</label>
                                <select
                                    name="saldo_pendiente"
                                    className={inputStyle}
                                    value={formData.saldo_pendiente}
                                    onChange={handleChange}
                                >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Completo">Completo</option>
                                </select>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                            >
                                Registrar Estudiante
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalStudent;

