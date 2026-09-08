import { connectdb } from "../db/connectdb.mjs";

export const createPerson = async ({ cedula, nombre, apellido, email, telefono, tipoDeParticipante }) => {
    try {
        const participats = tipoDeParticipante ? tipoDeParticipante : null;
        const query = {
            text: `INSERT INTO personas(
                cedula, nombre, apellido, email, telefono, tipodeparticipanteid)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING idpersona, cedula, nombre, apellido;`,
            values: [cedula, nombre, apellido, email, telefono, participats]
        };
        const { rows } = await connectdb.query(query);
        return rows[0]; // Retorna la persona creada
    } catch (error) {
        console.error('Error creating person:', error);
        throw error;
    }
};

export const findOneByPerson = async (cedula) => {
    try {
        // Soporta tanto string directo como objeto { cedula }
        const cedulaVal = typeof cedula === 'object' && cedula !== null ? cedula.cedula : cedula;
        const query = {
            text: `SELECT * FROM personas WHERE cedula = $1;`,
            values: [cedulaVal]
        };

        const { rows } = await connectdb.query(query);
        return rows[0]; // Devuelve la persona encontrada o undefined
    } catch (error) {
        console.error('Error finding person:', error);
        throw error;
    }
};