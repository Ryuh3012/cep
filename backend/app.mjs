import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";
import { connectdb } from "./src/db/connectdb.mjs";
import { singIn } from "./src/controllers/auth.mjs";
import { cookieParserMiddleware } from "./src/middlewares/authMiddleware.mjs";
import routerAuth from "./src/Router/routerAuth.mjs";

import { dataCourses, newCourse } from "./src/models/courses.mjs";
import { getFormacion, getModalidad } from "./src/models/modalidad.mjs";
import { createFacilitator, getFacilitatorsAndCourses } from "./src/models/facilitators.mjs";
import { findOneByPerson, createPerson } from "./src/models/people.mjs";
import { newStuden } from "./src/controllers/studen.mjs";
import { dataParticipants } from "./src/models/typeParticipants.mjs";
import { getStudent } from "./src/models/Studen.mjs";
import { getDashboardData, getAllStatistics, statisticsComplete, statisticsCoursesActives, statisticsCoursesProceso } from "./src/models/statistics.mjs";
import { Createparticipats } from "./src/libs/createParticipans.mjs";

const app = express();
const serve = createServer(app);

export const io = new Server(serve, {
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
        credentials: true
    }
});

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParserMiddleware);

app.use('/auth', routerAuth);
app.use('/api/auth', routerAuth);

// Caché en memoria para tablas de catálogo estáticas
let cachedModalidades = null;
let cachedFormaciones = null;

const getCachedCatalogs = async () => {
    try {
        if (!cachedModalidades) cachedModalidades = await getModalidad();
        if (!cachedFormaciones) cachedFormaciones = await getFormacion();
    } catch (e) {
        console.error("Error cargando catálogos iniciales:", e);
    }
};
getCachedCatalogs();

io.on("connection", async (client) => {
    console.log(`[Socket] Cliente conectado: ${client.id}`);

    // Envío inicial opcional al conectar
    try {
        if (!cachedModalidades) cachedModalidades = await getModalidad();
        if (!cachedFormaciones) cachedFormaciones = await getFormacion();
        client.emit('[bag] modalidad', cachedModalidades);
        client.emit('[bag] formacion', cachedFormaciones);
    } catch (e) {
        console.error("Error enviando modalidad/formacion inicial:", e);
    }

    // Petición bajo demanda: Modalidades
    client.on('[bag] modalidad', async (_, cb) => {
        try {
            if (!cachedModalidades) cachedModalidades = await getModalidad();
            client.emit('[bag] modalidad', cachedModalidades);
            if (cb) cb(cachedModalidades);
        } catch (error) {
            console.error('Error en [bag] modalidad:', error);
            if (cb) cb([]);
        }
    });

    // Petición bajo demanda: Formaciones
    client.on('[bag] formacion', async (_, cb) => {
        try {
            if (!cachedFormaciones) cachedFormaciones = await getFormacion();
            client.emit('[bag] formacion', cachedFormaciones);
            if (cb) cb(cachedFormaciones);
        } catch (error) {
            console.error('Error en [bag] formacion:', error);
            if (cb) cb([]);
        }
    });

    // 1. Autenticación / Login
    client.on('[bag] sesion', async (req) => {
        try {
            const { cedula, password } = req || {};
            const auth = await singIn({ cedula, password });
            client.emit('[bag] correct', auth);
        } catch (error) {
            console.error('Error en [bag] sesion:', error);
            client.emit('[bag] correct', []);
        }
    });

    // 2. Crear Curso
    client.on('[bag] addCourse', async (data) => {
        try {
            const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, modalidad, formacion } = data || {};
            const created = await newCourse({
                codigodecuso,
                nombrecurso,
                duracion,
                horario,
                monto,
                contenido: Array.isArray(contenido) ? contenido : (contenido ? String(contenido).split('\n') : []),
                status: status || 'Activo',
                facilitador,
                tipodemovilidad: modalidad,
                formacion
            });
            client.emit('[bag] correct', created);
        } catch (error) {
            console.error('Error en [bag] addCourse:', error);
        }
    });

    // 3. Registrar Facilitador
    client.on('[bag] teacher', async (data) => {
        try {
            const { cedula, nombre, apellido, email, telefono, idcurso } = data || {};
            let person = await findOneByPerson(cedula);
            if (!person) {
                person = await createPerson({ cedula, nombre, apellido, email, telefono });
            }

            const newFacilitator = await createFacilitator({ persona: person.idpersona });

            if (idcurso && newFacilitator?.idfacilitador) {
                await connectdb.query({
                    text: `UPDATE cursos SET facilitadorid = $1 WHERE idcurso = $2 OR codigodecuso = $3`,
                    values: [newFacilitator.idfacilitador, isNaN(idcurso) ? null : parseInt(idcurso), String(idcurso)]
                });
            }

            client.emit('[bag] correct', { msg: 'Facilitador creado exitosamente' });
        } catch (error) {
            console.error('Error en [bag] teacher:', error);
            client.emit('[bag] error', { msg: 'No se pudo crear el facilitador' });
        }
    });

    // 4. Registrar Estudiante
    client.on('[bag] addStudent', async (data) => {
        try {
            await newStuden(data);
            client.emit('[bag] correct', { msg: 'Estudiante registrado exitosamente' });
        } catch (error) {
            console.error('Error en [bag] addStudent:', error);
        }
    });

    // 5. Consultas de Datos
    client.on('[bag] courses', async (_, cb) => {
        try {
            const courses = await dataCourses();
            if (cb) cb(JSON.stringify(courses));
        } catch (error) {
            console.error('Error en [bag] courses:', error);
            if (cb) cb(JSON.stringify([]));
        }
    });

    client.on('[bag] facilitador', async (_, cb) => {
        try {
            const facilitators = await getFacilitatorsAndCourses();
            client.emit('[bag] facilitador', facilitators);
            if (cb) cb(facilitators);
        } catch (error) {
            console.error('Error en [bag] facilitador:', error);
            if (cb) cb([]);
        }
    });

    client.on('[bag] Studen', async (_, cb) => {
        try {
            const students = await getStudent();
            if (cb) cb(JSON.stringify(students));
        } catch (error) {
            console.error('Error en [bag] Studen:', error);
            if (cb) cb(JSON.stringify([]));
        }
    });

    client.on('[bag] StudenType', async (_, cb) => {
        try {
            const types = await dataParticipants();
            if (cb) cb(JSON.stringify(types));
        } catch (error) {
            console.error('Error en [bag] StudenType:', error);
            if (cb) cb(JSON.stringify([]));
        }
    });

    // 6. Dashboard
    client.on('[bag] dashboard', async (_, cb) => {
        try {
            const data = await getDashboardData();
            if (cb) cb(data);
        } catch (error) {
            console.error('Error en [bag] dashboard:', error);
            if (cb) cb({
                cursos_activos: 0, cursos_proceso: 0, cursos_completados: 0,
                total_cursos: 0, total_estudiantes: 0, total_facilitadores: 0,
                cursos_recientes: [],
            });
        }
    });

    // 7. Estadísticas
    client.on('[bag] statistics', async (_, cb) => {
        try {
            const stats = await getAllStatistics();
            if (cb) cb(stats);
        } catch (error) {
            console.error('Error en [bag] statistics:', error);
            if (cb) cb({ activos: 0, proceso: 0, completados: 0 });
        }
    });

    client.on('[bag] statisticsCourses', async (_, cb) => {
        try {
            const stats = await statisticsCoursesActives();
            if (cb) cb(JSON.stringify(stats));
        } catch (error) {
            console.error('Error en [bag] statisticsCourses:', error);
            if (cb) cb(JSON.stringify({ cursos: 0 }));
        }
    });

    client.on('[bag] statisticsCoursesProceso', async (_, cb) => {
        try {
            const stats = await statisticsCoursesProceso();
            if (cb) cb(JSON.stringify(stats));
        } catch (error) {
            console.error('Error en [bag] statisticsCoursesProceso:', error);
            if (cb) cb(JSON.stringify({ cursos: 0 }));
        }
    });

    client.on('[bag] statisticsComplete', async (_, cb) => {
        try {
            const stats = await statisticsComplete();
            if (cb) cb(JSON.stringify(stats));
        } catch (error) {
            console.error('Error en [bag] statisticsComplete:', error);
            if (cb) cb(JSON.stringify({ cursos: 0 }));
        }
    });

    client.on("disconnect", () => {
        console.log(`[Socket] Cliente desconectado: ${client.id}`);
    });
});

serve.listen(port, () => {
    console.log(`Servidor activo en el puerto: ${port}`);
});