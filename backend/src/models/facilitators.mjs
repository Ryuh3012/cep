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

export const datafacilitators = async ({ cedula }) => {
    const query = {
        text: `SELECT * FROM persons WHERE cedula = $1`,
        values: [cedula]
    };

    const { rows } = await connectdb.query(query);
    return rows[0]; // Devuelve la persona encontrada
}