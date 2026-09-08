import { connectdb } from "../db/connectdb.mjs";

export const addStudent = async ({ person, courses }) => {
    try {
        const query = {
            text: `INSERT INTO personas_has_cursos(personasid, cursoid) VALUES ($1, $2) RETURNING *;`,
            values: [person, courses]
        };
        const { rows } = await connectdb.query(query);
        return rows[0];
    } catch (error) {
        console.error("Error al asociar estudiante con curso:", error);
        throw error;
    }
};

export const getStudent = async () => {
    try {
        const query = {
            text: `SELECT 
                    personas.cedula, 
                    personas.nombre, 
                    personas.apellido, 
                    COALESCE(tiposdeparticipantes.participante, 'Estudiante') AS participante, 
                    cursos.nombrecurso,
                    CASE 
                        WHEN COALESCE(pagos_resumen.total_pagado, 0) >= cursos.monto THEN 'Completo' 
                        ELSE 'Pendiente' 
                    END AS saldo_pendiente
                   FROM personas_has_cursos
                   INNER JOIN personas ON personas.idpersona = personas_has_cursos.personasid 
                   LEFT JOIN tiposdeparticipantes ON tiposdeparticipantes.idtiposdeparticipante = personas.tipodeparticipanteid
                   INNER JOIN cursos ON cursos.idcurso = personas_has_cursos.cursoid
                   LEFT JOIN (
                       SELECT personaid, SUM(monto) AS total_pagado 
                       FROM pagos 
                       GROUP BY personaid
                   ) AS pagos_resumen ON pagos_resumen.personaid = personas.idpersona
                   ORDER BY personas_has_cursos.idpersona_ha_curso DESC;`
        };
        const { rows } = await connectdb.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener lista de estudiantes:", error);
        return [];
    }
};