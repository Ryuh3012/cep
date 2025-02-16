import { connectdb } from "../db/connectdb.mjs"

export const getPagues = async () => {

    const query = {
        text: `select * from tipodepagos`

    }

    const { rows } = await connectdb.query(query)
    return rows
}