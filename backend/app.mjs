import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";
import { connectdb } from "./src/db/connectdb.mjs";

import cursosRoute from "./src/route/cursesRoute.mjs";
import personaRoute from "./src/route/peopleRoute.mjs";
import participants from "./src/route/participantsRoute.mjs";
import { Createparticipats } from "./src/libs/createParticipans.mjs";
import e from "express";

const app = express()
connectdb.connect()
Createparticipats()
const serve = createServer(app)
const io = new Server(serve, cors({ origin: '*' }))


app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cursosRoute)
app.use(personaRoute)
app.use(participants)





io.on("connection", async (client) => {

    console.log('connect');
    
    const getData = async () => {
        const { rows } = await connectdb.query(`SELECT cursos.codigodecurso, cursos.nombre as NombreDelCurso, cursos.horario, cursos.monto, cursos.status, personas.nombre, tiposdemodalidades.modalidad, formaciones.formacion FROM cursos join facilitadores on cursos.facilitadorId = facilitadores.id join personas on facilitadores.personaid = personas.id join tiposdemodalidades on cursos.tipoDemodalidadId = tiposdemodalidades.id join formaciones on cursos.formacionid = formaciones.id`)
        return rows
    }
    const data = await getData()
    client.emit('courses', data)

})



serve.listen(port, () => {

    console.log(`localhost: ${port}`);

})

