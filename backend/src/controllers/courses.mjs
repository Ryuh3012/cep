import { dataCourses, newCourse } from "../models/courses.mjs";

export const newCourses = async (req, res) => {
    try {
        const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion } = req || {};

        const courses = await newCourse({
            codigodecuso,
            nombrecurso,
            duracion,
            horario,
            monto,
            contenido: typeof contenido === 'string' ? contenido : JSON.stringify(contenido || []),
            status: status || 'Activo',
            facilitador,
            tipodemovilidad,
            formacion
        });

        return courses;
    } catch (error) {
        console.error("Error en newCourses controller:", error);
        throw error;
    }
};
