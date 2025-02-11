import { dataCourses, newCourse } from "../models/courses.mjs";

export const newCourses = async (req, res) => {
    try {
        const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion } = req

        const courses = await newCourse({ codigodecuso, nombrecurso, duracion, horario, monto, contenido: JSON.stringify(contenido), status, facilitador, tipodemovilidad, formacion });

        return { messager: 'Curso creado exitosamente' };
    } catch (error) {
        console.log(error);
    }


}
