export const auth = async ({ cedula, password, personas }) => {

    const query = {
        text: `insert into users(cedula, password, personaid)
        values($1, $2,$3)
        RETURNING idusuario
        `,
        values: [cedula, password, personas]
    }

    const { rows } = await connectdb.query(query)

    return rows;
}

export const findOneByAuth = async ({ cedula }) => {

    const query = {
        text: `select * from users where cedula = $1`,
        values: [cedula]
    }

    const { rows } = await connectdb.query(query)
    return rows[0];
}