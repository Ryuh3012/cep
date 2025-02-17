import { connectdb } from "../db/connectdb.mjs"

export const statisticsCoursesActives = async () => {


    const query = {
        text: `select count(idcurso) as cursos from cursos
where status = 'activo'`
    }

    const { rows } = await connectdb.query(query)

    return rows[0]

}
export const statisticsCoursesProceso = async () => {

    const query = {

        text: `select count(idcurso) as cursos from cursos
        where status = 'Proceso'`

    }
    const { rows } = await connectdb.query(query)
    return rows[0]
}
export const statisticsComplete = async () => {

    const query = {

        text: `select count(idcurso) as cursos from cursos
        where status = 'Completados'`

    }
    const { rows } = await connectdb.query(query)
    return rows[0]
}