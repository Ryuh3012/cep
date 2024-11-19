import { connectdb } from "../db/connectdb.mjs";

export const newStuden = async (req, res) => {

    try {
        const {cedula, nombre, apellido, email, telefono} = req?.body.data

        const { rows } = await connectdb.query('INSERT INTO personas(cedula, nombre, apellido, email, telefono, tipodeparticipanteid ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING iduser;)',[])
        return res.status(200).json({
            messager: rows
        });
    } catch (error) {
        console.log(error);
    }


}
