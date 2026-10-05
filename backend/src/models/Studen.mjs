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
    cursos.nombrecurso AS nombrecurso,
    
    -- Estatus de pago basado en si el saldo es 0 o mayor
    CASE 
        WHEN (COALESCE(cursos.monto, 0) - COALESCE(pagos.monto, 0)) <= 0 THEN 'Completo' 
        ELSE 'Pendiente'
    END AS saldo_pendiente,

    -- Resta directa de cursos.monto - pagos.monto
    CASE 
        WHEN (COALESCE(cursos.monto, 0) - COALESCE(pagos.monto, 0)) = 'NaN'::numeric 
          OR (COALESCE(cursos.monto, 0) - COALESCE(pagos.monto, 0)) IS NULL 
        THEN 0
        ELSE GREATEST(0, COALESCE(cursos.monto, 0) - COALESCE(pagos.monto, 0))
    END AS monto

FROM personas_has_cursos
INNER JOIN personas 
    ON personas.idpersona = personas_has_cursos.personasid 
LEFT JOIN tiposdeparticipantes 
    ON tiposdeparticipantes.idtiposdeparticipante = personas.tipodeparticipanteid
INNER JOIN cursos 
    ON cursos.idcurso = personas_has_cursos.cursoid
LEFT JOIN pagos 
    ON pagos.personaid = personas.idpersona

ORDER BY personas_has_cursos.idpersona_ha_curso DESC;`
        };
        const { rows } = await connectdb.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener lista de estudiantes:", error);
        return [];
    }
};