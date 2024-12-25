import { dataCourses, newCourse } from "../models/courses.mjs";

export const newCourses = async (req, res) => {
    try {

        const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion } = req?.body

        const courses = await newCourse({ codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion });

        return res.status(200).json({ messager: 'Curso creado exitosamente' });

    } catch (error) {
        console.log(error);
    }
}


export const getCourse = async (req, res) => {
    try {
        const courses = await dataCourses()
        return res.status(200).json({ messager: courses });
    }
    catch (error) {
        console.log(error);
    }
}