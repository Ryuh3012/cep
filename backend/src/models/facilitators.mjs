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
        return rows[0]; // Devuelve el facilitador creado
    } catch (error) {
        console.error('Error al crear facilitador:', error);
        throw error;
    }
};

export const oneFacilited = async ({ cedula }) => {
    try {
        const query = {
            text: `SELECT * FROM personas WHERE cedula = $1`,
            values: [cedula]
        };
        const { rows } = await connectdb.query(query);
        return rows[0];
    } catch (error) {
        console.error('Error al buscar facilitador:', error);
        throw error;
    }
};

export const getFacilitators = async () => {
    try {
        const query = {
            text: `SELECT facilitadores.idfacilitador, personas.nombre as nombre, personas.apellido as apellido 
                   FROM facilitadores
                   INNER JOIN personas ON personas.idpersona = facilitadores.personaid`
        };
        const { rows } = await connectdb.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener facilitadores:', error);
        return [];
    }
};

export const getFacilitatorsAndCourses = async () => {
    try {
        const query = {
            text: `SELECT facilitadores.idfacilitador, personas.nombre as nombre, personas.apellido as apellido, 
                   COALESCE(CONCAT(cursos.codigodecuso,' ',cursos.nombrecurso ), 'Sin curso asignado') as cursos 
                   FROM facilitadores
                   INNER JOIN personas ON personas.idpersona = facilitadores.personaid
                   LEFT JOIN cursos ON cursos.facilitadorid = facilitadores.idfacilitador`
        };
        const { rows } = await connectdb.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener facilitadores y cursos:', error);
        return [];
    }
};