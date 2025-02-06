import { connectdb } from "../db/connectdb.mjs"

export const getModalidad = async () => {

    const query = {

        text: 'select * from tipodemodalidades',
    }

    const { rows } = await connectdb.query(query);

    return rows

}
export const getFormacion = async () => {

    const query = {
        text: 'select * from formaciones'

    }

    const { rows } = await connectdb.query(query);

    return rows
}