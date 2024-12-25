import { connectdb } from "../db/connectdb.mjs";

export const auth = async ({ cedula, password, personas, rol }) => {

    const query = {
        text: `insert into usuarios(cedula, password, roleid,personaid)
        values($1, $2, $3, $4)
        RETURNING idusuario
        `,
        values: [cedula, password, rol, personas]
    }

    const { rows } = await connectdb.query(query)

    return rows[0];
}

export const findOneByAuth = async (cedula) => {

    const query = {
        text: `select * from usuarios where cedula = $1`,
        values: [cedula]
    }

    const { rows } = await connectdb.query(query)
    return rows[0];
}