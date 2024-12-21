import { dataParticipants } from "../models/typeParticipants.mjs";

export const getParticipants = async (req, res) => {

    try {

        const data = await dataParticipants();
        return res.status(200).json({
            messager: data
        });
    } catch (error) {
        console.log(error);
    }


}