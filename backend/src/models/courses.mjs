import { io } from "../../app.mjs";
import { connectdb } from "../db/connectdb.mjs";

export const newCourse = async ({ codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion }) => {
    try {
        const query = {
            text: `insert into cursos(codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitadorid, tipodemovilidadid, formacionid)
            values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `,
            values: [codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion]
        }
        const { rows } = await connectdb.query(query);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

export const dataCourses = async () => {

    // const query = {
    //     text: `SELECT cursos.codigodecuso, cursos.nombre AS NombreDelCurso, cursos.horario, cursos.monto, cursos.status, 
    //             personas.nombre, tipoDemodalidades.modalidad, formaciones.formacion 
    //            FROM cursos 
    //            JOIN facilitadores ON cursos.facilitadorId = facilitadores.idfacilitador 
    //            JOIN personas ON facilitadores.personaid = personas.idPersona  
    //            JOIN tipoDemodalidades ON cursos.tipodemovilidadid = tipoDemodalidades.idtipodemodalidad 
    //            JOIN formaciones ON cursos.formacionid = formaciones.idformacion`
    // };

    const queryActiveCourses = {
        text: `select * from cursos where status = 'activo'`
    };
    // const { rows } = await connectdb.query(query);
    const { rows: activeCourses } = await connectdb.query(queryActiveCourses);


    return activeCourses;
}
export const upDateCourse = async ({ courses }) => {

    try {
        const query = {
            text: `update courses set 
            where idcourse = $1
            `,
            values: [courses]
        }
        const { rows } = await connectdb.query(query);
    } catch (error) {
        console.log(error);
    }


}