import { connectdb } from "../db/connectdb.mjs";

export const getParticipants = async (req, res) => {

    try {
        const { rows } = await connectdb.query("SELECT * FROM tiposdeparticipantes");
        return res.status(200).json({
            messager: rows
        });
    } catch (error) {
        console.log(error);
    }


}