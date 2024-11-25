import { connectdb } from "../db/connectdb.mjs"

export const getAuth = async (req, res) => {
    const { cedula, password } = req?.body.user
    try {
        const { rows } = connectdb.query('select cedula, password from usuarios where cedula = $1 and password= $2', [cedula, password])

        if (rows.length == 0) return res.status(401).json({ res: 'Usuario o clave invalidos' })


    } catch (error) {
        console.log(error);
    }
    console.log(getAuth);



}