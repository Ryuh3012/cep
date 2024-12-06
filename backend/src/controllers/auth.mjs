import { connectdb } from "../db/connectdb.mjs"

export const singIn = async (req, res) => {
    const { cedula, password } = req?.body.user
    try {
        const {rows} = await connectdb.query('select cedula, password from usuarios where cedula = $1', [cedula])

        if (rows.length == 0) return res.status(400).json({ messager: 'Usuario invalido' })

        // const matChPassword = await encryptionComparison(password, rows[0].password)

        // if (!matChPassword) return res.status(400).json({ messager: 'Usuario invalido' })

        // res.status(200).json({ messager: 'Usuario Valido', user: rows[0].usuario })


    } catch (error) {
        console.log(error);
    }
}