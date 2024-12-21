import { connectdb } from "../db/connectdb.mjs";

export const dataParticipants = async () => {

    const query = {
        text: `select * from tiposDeParticipantes`
    }
    const { rows } = await connectdb.query(query)
    
    return rows;

}