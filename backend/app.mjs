import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";
import { connectdb } from "./src/db/connectdb.mjs";

import { Createparticipats } from "./src/libs/createParticipans.mjs";
// import { createTable } from "./src/libs/createtable.mjs";

import cursosRoute from "./src/route/cursesRoute.mjs";
import auth from "./src/route/auth.mjs";
import personaRoute from "./src/route/peopleRoute.mjs";
import participants from "./src/route/participantsRoute.mjs";


const app = express()
connectdb.connect()
// createTable();
Createparticipats();
const serve = createServer(app)
const io = new Server(serve, cors({ origin: '*' }))


app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(auth)
app.use(cursosRoute)
app.use(personaRoute)
app.use(participants)





io.on("connection", async (client) => {

    console.log('connect');

    const getCourses = async () => {
        const { rows } = await connectdb.query(`SELECT cursos.codigodecuso, cursos.nombre as NombreDelCurso, cursos.horario, cursos.monto, cursos.status, personas.nombre,tipoDemodalidades.modalidad , formaciones.formacion FROM cursos join facilitadores on cursos.facilitadorId = facilitadores.idfacilitador join personas on facilitadores.personaid = personas.idPersona  join tipoDemodalidades on cursos.tipodemovilidadid  = tipoDemodalidades.idtipodemodalidad join formaciones on cursos.formacionid = formaciones.idformacion`)
        return rows
    }
    const data = await getCourses()
    client.emit('courses', data)

})



serve.listen(port, () => {

    console.log(`localhost: ${port}`);

})

