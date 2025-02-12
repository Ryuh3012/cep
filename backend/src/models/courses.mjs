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


    const queryActiveCourses = {
        text: `select  cursos.idcurso, CONCAT(cursos.codigodecuso,' ',cursos.nombrecurso ) as cursos, cursos.horario as horario, cursos.duracion as duracion,personas.nombre as facilitador, cursos.contenido as contendido,tipodemodalidades.modalidad as modalidad,formaciones.formacion, cursos.monto as monto, cursos.status  from cursos
                inner join facilitadores on cursos.facilitadorid = facilitadores.idfacilitador
                inner join personas on personas.idpersona = facilitadores.personaid
                inner join formaciones on formaciones.idformacion = cursos.formacionid
                inner join tipodemodalidades ON tipodemodalidades.idtipodemodalidad = cursos.tipodemovilidadid
`
    };
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