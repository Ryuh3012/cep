import { connectdb } from "../db/connectdb.mjs";

export const createFacilitator = async ({ persona }) => {
    try {
        const query = {
            text: `INSERT INTO facilitadores(personaid)
	        VALUES ($1)
                   RETURNING idfacilitador;`,
            values: [persona]
        };
        const { rows } = await connectdb.query(query);
        return rows[0]; // Devuelve la persona creada
    } catch (error) {
        console.log(error);
    }

};

export const oneFacilited = async ({ cedula }) => {
    const query = {
        text: `SELECT * FROM persons WHERE cedula = $1`,
        values: [cedula]
    };

    const { rows } = await connectdb.query(query);
    return rows[0]; // Devuelve la persona encontrada
}

export const getFacilitators = async () => {
    const query = {
        text: `select facilitadores.idfacilitador, personas.nombre as nombre, personas.apellido as apellido from facilitadores
            inner join personas ON personas.idpersona = facilitadores.personaid`
    };

    const { rows } = await connectdb.query(query);
    return rows;
}

export const getFacilitatorsAndCourses = async () => {
    const query = {
        text: `select facilitadores.idfacilitador, personas.nombre as nombre,personas.apellido as apellido, CONCAT(cursos.codigodecuso,' ',cursos.nombrecurso ) as cursos from facilitadores
            inner join personas ON personas.idpersona = facilitadores.personaid
            inner join cursos ON cursos.facilitadorid = facilitadores.idfacilitador`
    };

    const { rows } = await connectdb.query(query);
    return rows;
}