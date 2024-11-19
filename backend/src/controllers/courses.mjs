import { connectdb } from "../db/connectdb.mjs";

export const newCourses = async (req, res) => {



}


export const getCourse = async (req, res) => {

    try {
        const { rows } = await connectdb.query("SELECT * FROM cursos where status='activo'");

        return res.status(200).json({ messager: rows });
    } catch (error) {
        console.log(error);
    }



}