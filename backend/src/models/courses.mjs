import { connectdb } from "../db/connectdb.mjs";

export const newCourse = async ({ codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, tipodemovilidad, formacion }) => {
    try {
        const query = {
            text: `INSERT INTO cursos(codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitadorid, tipodemovilidadid, formacionid)
                   VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                   RETURNING *;`,
            values: [
                codigodecuso,
                nombrecurso,
                duracion,
                horario,
                monto,
                typeof contenido === 'string' ? contenido : JSON.stringify(contenido),
                status || 'Activo',
                facilitador ? parseInt(facilitador) : null,
                tipodemovilidad ? parseInt(tipodemovilidad) : null,
                formacion ? parseInt(formacion) : null
            ]
        };
        const { rows } = await connectdb.query(query);
        return rows[0];
    } catch (error) {
        console.error('Error al insertar nuevo curso:', error);
        throw error;
    }
};

export const dataCourses = async () => {
    try {
        const queryActiveCourses = {
            text: `SELECT 
                    cursos.idcurso, 
                    cursos.codigodecuso,
                    cursos.nombrecurso,
                    CONCAT(cursos.codigodecuso, ' ', cursos.nombrecurso) AS cursos, 
                    cursos.horario AS horario, 
                    cursos.duracion AS duracion,
                    COALESCE(personas.nombre, 'Sin asignar') AS facilitador, 
                    cursos.contenido AS contenido,
                    COALESCE(tipodemodalidades.modalidad, 'No definida') AS modalidad,
                    COALESCE(formaciones.formacion, 'General') AS formacion, 
                    cursos.monto AS monto, 
                    cursos.status  
                   FROM cursos
                   LEFT JOIN facilitadores ON cursos.facilitadorid = facilitadores.idfacilitador
                   LEFT JOIN personas ON personas.idpersona = facilitadores.personaid
                   LEFT JOIN formaciones ON formaciones.idformacion = cursos.formacionid
                   LEFT JOIN tipodemodalidades ON tipodemodalidades.idtipoDemodalidad = cursos.tipodemovilidadid
                   ORDER BY cursos.idcurso DESC;`
        };
        const { rows: activeCourses } = await connectdb.query(queryActiveCourses);
        return activeCourses;
    } catch (error) {
        console.error('Error al consultar cursos:', error);
        return [];
    }
};

export const upDateCourseStatus = async ({ idcurso, status }) => {
    try {
        const query = {
            text: `UPDATE cursos SET status = $1 WHERE idcurso = $2 RETURNING *;`,
            values: [status, idcurso]
        };
        const { rows } = await connectdb.query(query);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar estatus de curso:', error);
        throw error;
    }
};