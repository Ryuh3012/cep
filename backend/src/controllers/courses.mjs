import { dataCourses, newCourse, upDateCourseStatus } from "../models/courses.mjs";

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

export const updateCourses = async (req, res) => {
    try {
        const { idcurso, status } = req || {};
        const courses = await upDateCourseStatus({
            idcurso,
            status
        });
        return courses;
    } catch (error) {
        console.error("Error en updateCourses controller:", error);
        throw error;
    }
}
