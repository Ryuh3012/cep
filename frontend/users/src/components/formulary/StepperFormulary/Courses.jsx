import { Select, SelectItem, Card, CardBody } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import { SocketContext } from "../../../SocketProvider";

const Courses = () => {
    const { socket } = useContext(SocketContext);
    const { handleBlur, handleChange, values: { cursos } } = useContext(StepperContext);
    const [courses, setCourses] = useState([]); // Estado para almacenar los cursos obtenidos del socket

    useEffect(() => {
        if (!socket) return;

        const handleCourses = (listAllcourses) => {
            try {
                const parsed = typeof listAllcourses === 'string' ? JSON.parse(listAllcourses) : listAllcourses;
                setCourses(Array.isArray(parsed) ? parsed : []);
            } catch (err) {
                console.error("Error al obtener cursos:", err);
                setCourses([]);
            }
        };

        socket.emit('[bag] courses', () => { }, handleCourses);

        return () => {
            socket.off('[bag] courses');
        };
    }, [socket]);

    // Encontrar información del curso actualmente seleccionado para mostrar vista previa
    const selectedCourseData = courses.find(
        (c) => String(c.idcurso) === String(cursos) || c.cursos === cursos
    );
    const inputStyle =
        "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all";


    return (
        <div className="flex flex-col w-full gap-4">
            <div className="text-center sm:text-left mb-2">
                <h3 className="text-base font-bold text-slate-800">2. Selección del Curso</h3>
                <p className="text-xs text-slate-500">Selecciona el programa académico que deseas cursar.</p>
            </div>

            <div className="w-full">
                <select
                    name="cursos"
                    value={cursos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    placeholder="Seleccione el curso de la lista disponible"
                    className={inputStyle}
                >
                    {courses.map((c) => {
                        const courseValue = String(c.idcurso || c.cursos);
                        const courseLabel = c.cursos || c.nombrecurso;
                        return (
                            <option key={courseValue} value={courseValue}>
                                {courseLabel}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Vista previa del curso seleccionado */}
            {selectedCourseData && (
                <Card className="bg-slate-50 border border-slate-200/80 shadow-none mt-2">
                    <CardBody className="p-4 flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                            Ficha del Curso Seleccionado
                        </span>
                        <h4 className="text-sm font-bold text-slate-800">
                            {selectedCourseData.cursos || selectedCourseData.nombrecurso}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-1">
                            <div>
                                <span className="font-semibold text-slate-700">Modalidad: </span>
                                <span>{selectedCourseData.modalidad || 'Presencial'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-slate-700">Duración: </span>
                                <span>{selectedCourseData.duracion || 'Consultar'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-slate-700">Horario: </span>
                                <span>{selectedCourseData.horario || 'Por definir'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-slate-700">Inversión: </span>
                                <span className="font-bold text-slate-900">{selectedCourseData.monto || 'Consultar'}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default Courses;

