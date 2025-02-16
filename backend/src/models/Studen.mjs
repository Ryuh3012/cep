import { connectdb } from "../db/connectdb.mjs";

export const addStudent = async ({ person, courses }) => {

    const query = {

        text: `INSERT INTO personas_has_cursos( personasid, cursoid) VALUES ($1 , $2);`,
        values: [person, courses]

    }
    const { rows } = await connectdb.query(query);
    return rows;

}

export const getStudent = async () => {

    const query = {

        text: `select personas.cedula, personas.nombre, personas.apellido, tiposdeparticipantes.participante, cursos.nombrecurso,CASE 
WHEN (cursos.monto- pagos.monto ) < CURSOS.MONTO then 'Pendiente' 
else 'Completo'
end as saldo_pendiente
from personas_has_cursos
inner join personas on personas.idpersona = personas_has_cursos.personasid 
inner join tiposdeparticipantes ON tiposdeparticipantes.idtiposdeparticipante = personas.tipodeparticipanteid
inner join cursos on cursos.idcurso = personas_has_cursos.cursoid
inner join pagos ON pagos.personaid = personas.idpersona


`

    }
    const { rows } = await connectdb.query(query);
    return rows

}