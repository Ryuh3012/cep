import { connectdb } from "../db/connectdb.mjs";

export const createPerson = async ({ cedula, nombre, apellido, email, telefono, tipoDeParticipante }) => {
    try {

        const data = tipoDeParticipante ? [cedula, nombre, apellido, email, telefono, tipoDeParticipante] : [cedula, nombre, apellido, email, telefono, null];
        const query = {
            text: `INSERT INTO personas(
	        cedula, nombre, apellido, email, telefono, tipodeparticipanteid)
	            VALUES ($1, $2, $3, $4, $5, $6)
                   RETURNING idpersona;`,
            values: data
        };
        const { rows } = await connectdb.query(query);
        return rows[0]; // Devuelve la persona creada
    } catch (error) {
        console.error('Error creating person:', error);
        throw error;

    }

};

export const findOneByPerson = async ({ cedula }) => {
    try {
        const query = {
            text: `select * from personas where cedula = $1`,
            values: [cedula]
        };

        const { rows } = await connectdb.query(query);
        return rows[0]; // Devuelve la persona encontrada
    } catch (error) {
        console.error('Error finding person:', error);
        throw error;
    }

}