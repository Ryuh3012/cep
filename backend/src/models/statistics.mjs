import { connectdb } from "../db/connectdb.mjs";

/**
 * Obtiene todos los KPIs del dashboard con 4 queries en paralelo.
 * Evita múltiples roundtrips independientes desde el frontend.
 */
export const getDashboardData = async () => {
    try {
        const kpisQuery = {
            text: `SELECT
                COUNT(*) FILTER (WHERE status = 'Activo')      AS cursos_activos,
                COUNT(*) FILTER (WHERE status = 'Proceso')     AS cursos_proceso,
                COUNT(*) FILTER (WHERE status = 'Completados') AS cursos_completados,
                COUNT(*)                                        AS total_cursos
               FROM cursos;`
        };
        const studentsQuery = {
            text: `SELECT COUNT(DISTINCT personasid) AS total_estudiantes FROM personas_has_cursos;`
        };
        const facilitatorsQuery = {
            text: `SELECT COUNT(*) AS total_facilitadores FROM facilitadores;`
        };
        const recentCoursesQuery = {
            text: `SELECT
                    c.idcurso,
                    c.codigodecuso,
                    c.nombrecurso,
                    c.horario,
                    c.status,
                    c.monto,
                    COALESCE(p.nombre || ' ' || p.apellido, 'Sin asignar') AS facilitador,
                    COUNT(pc.personasid) AS inscritos
                   FROM cursos c
                   LEFT JOIN facilitadores f  ON f.idfacilitador = c.facilitadorid
                   LEFT JOIN personas p       ON p.idpersona = f.personaid
                   LEFT JOIN personas_has_cursos pc ON pc.cursoid = c.idcurso
                   GROUP BY c.idcurso, c.codigodecuso, c.nombrecurso, c.horario, c.status, c.monto, p.nombre, p.apellido
                   ORDER BY c.idcurso DESC
                   LIMIT 5;`
        };

        const [kpisRes, studRes, facRes, recentRes] = await Promise.all([
            connectdb.query(kpisQuery),
            connectdb.query(studentsQuery),
            connectdb.query(facilitatorsQuery),
            connectdb.query(recentCoursesQuery),
        ]);

        return {
            cursos_activos:      parseInt(kpisRes.rows[0]?.cursos_activos      || 0),
            cursos_proceso:      parseInt(kpisRes.rows[0]?.cursos_proceso      || 0),
            cursos_completados:  parseInt(kpisRes.rows[0]?.cursos_completados  || 0),
            total_cursos:        parseInt(kpisRes.rows[0]?.total_cursos        || 0),
            total_estudiantes:   parseInt(studRes.rows[0]?.total_estudiantes   || 0),
            total_facilitadores: parseInt(facRes.rows[0]?.total_facilitadores  || 0),
            cursos_recientes:    recentRes.rows || [],
        };
    } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
        return {
            cursos_activos: 0, cursos_proceso: 0, cursos_completados: 0,
            total_cursos: 0, total_estudiantes: 0, total_facilitadores: 0,
            cursos_recientes: [],
        };
    }
};

export const getAllStatistics = async () => {
    try {
        const query = {
            text: `SELECT 
                    COUNT(*) FILTER (WHERE status = 'Activo') AS activos,
                    COUNT(*) FILTER (WHERE status = 'Proceso') AS proceso,
                    COUNT(*) FILTER (WHERE status = 'Completados') AS completados
                   FROM cursos;`
        };
        const { rows } = await connectdb.query(query);
        return rows[0] || { activos: 0, proceso: 0, completados: 0 };
    } catch (error) {
        console.error("Error al obtener estadísticas consolidadas:", error);
        return { activos: 0, proceso: 0, completados: 0 };
    }
};

export const statisticsCoursesActives = async () => {
    try {
        const query = {
            text: `SELECT COUNT(idcurso) AS cursos FROM cursos WHERE status = 'Activo';`
        };
        const { rows } = await connectdb.query(query);
        return rows[0] || { cursos: 0 };
    } catch (error) {
        console.error("Error en statisticsCoursesActives:", error);
        return { cursos: 0 };
    }
};

export const statisticsCoursesProceso = async () => {
    try {
        const query = {
            text: `SELECT COUNT(idcurso) AS cursos FROM cursos WHERE status = 'Proceso';`
        };
        const { rows } = await connectdb.query(query);
        return rows[0] || { cursos: 0 };
    } catch (error) {
        console.error("Error en statisticsCoursesProceso:", error);
        return { cursos: 0 };
    }
};

export const statisticsComplete = async () => {
    try {
        const query = {
            text: `SELECT COUNT(idcurso) AS cursos FROM cursos WHERE status = 'Completados';`
        };
        const { rows } = await connectdb.query(query);
        return rows[0] || { cursos: 0 };
    } catch (error) {
        console.error("Error en statisticsComplete:", error);
        return { cursos: 0 };
    }
};