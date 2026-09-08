import { useState, useEffect } from "react";

const initialValues = {
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    idcurso: "",
    cursos: ""
};

const ModalFacilitador = ({ isOpen, onClose, onSave, coursesList = [] }) => {
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

        if (name === "cursoSelect") {
            if (!value) {
                setFormData((prev) => ({ ...prev, idcurso: "", cursos: "" }));
            } else {
                const selected = coursesList.find(
                    (c, i) => String(c.idcurso || c.id || c.codigodecuso || i) === String(value)
                );
                if (selected) {
                    const courseName = selected.nombrecurso || selected.cursos || "";
                    const courseCode = selected.codigodecuso || "";
                    const display = courseCode && !courseName.includes(courseCode)
                        ? `${courseCode} ${courseName}`.trim()
                        : courseName;

                    setFormData((prev) => ({
                        ...prev,
                        idcurso: selected.idcurso || selected.id || selected.codigodecuso || value,
                        cursos: display
                    }));
                }
            }
            if (errors.cursos) {
                setErrors((prev) => ({ ...prev, cursos: null }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: null }));
            }
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.cedula.trim()) newErrors.cedula = "La cédula es requerida";
        if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
        if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
        if (!formData.email.trim()) newErrors.email = "El correo es requerido";
        if (!formData.cursos.trim()) newErrors.cursos = "Debe asignar el curso que dirigirá";
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
            <div className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Registrar Facilitador
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
                        <div>
                            <label className={labelStyle}>Cédula</label>
                            <input
                                type="text"
                                name="cedula"
                                className={inputStyle}
                                value={formData.cedula}
                                onChange={handleChange}
                                placeholder="Ej. V-12345678"
                            />
                            {errors.cedula && (
                                <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.cedula}</p>
                            )}
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
                                    placeholder="Nombre del facilitador"
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
                                    placeholder="Apellido del facilitador"
                                />
                                {errors.apellido && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.apellido}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className={labelStyle}>Curso que Dirige</label>
                            <select
                                name="cursoSelect"
                                className={inputStyle}
                                value={
                                    formData.idcurso ||
                                    (coursesList.find((c) => (c.nombrecurso || c.cursos) === formData.cursos)?.idcurso || "")
                                }
                                onChange={handleChange}
                            >
                                <option value="">Selecciona el curso asignado</option>
                                {coursesList.map((c, i) => {
                                    const courseName = c.nombrecurso || c.cursos;
                                    const courseCode = c.codigodecuso || "";
                                    const display = courseCode && !courseName.includes(courseCode)
                                        ? `${courseCode} - ${courseName}`
                                        : courseName;
                                    const valueId = String(c.idcurso || c.id || c.codigodecuso || i);
                                    return (
                                        <option key={valueId} value={valueId}>
                                            {display}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.cursos && (
                                <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.cursos}</p>
                            )}
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
                                    placeholder="ejemplo@correo.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs pl-1 mt-1 font-medium">⚠️ {errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className={labelStyle}>Teléfono de Contacto</label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    className={inputStyle}
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Ej. 0412-1234567"
                                />
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
                                Registrar Facilitador
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalFacilitador;
