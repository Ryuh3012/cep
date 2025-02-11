import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";
import { connectdb } from "./src/db/connectdb.mjs";

import { Createparticipats } from "./src/libs/createParticipans.mjs";

import { singIn } from "./src/controllers/auth.mjs";
import { dataCourses } from "./src/models/courses.mjs";
import { getFormacion, getModalidad } from "./src/models/modalidad.mjs";
import { createFacilitator, getFacilitators, getFacilitatorsAndCourses } from "./src/models/facilitators.mjs";
import { newCourses } from "./src/controllers/courses.mjs";



const app = express()
connectdb.connect()

// createTable();
Createparticipats();
const serve = createServer(app)

export const io = new Server(serve, cors({ origin: '*' }))


app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


io.on("connection", async (client) => {

    console.log('Cliente conectado');

    try {


        client.on('[bag] sesion', async (req, res) => {

            const { cedula, password } = req
            const auth = await singIn({ cedula, password })


            client.emit('[bag] correct', auth)


        })

    } catch (error) {
        console.log(error)
    }

    client.on('[bag] addCourse', async (data) => {
        const { codigodecuso, nombrecurso, duracion, horario, monto, contenido, status, facilitador, modalidad, formacion } = data
        const newCourse = await newCourses({ codigodecuso, nombrecurso, duracion, horario, monto, contenido: contenido.split('\n'), status, facilitador, tipodemovilidad: modalidad, formacion });
        client.emit('[bag] correct', newCourse)

    })
    client.on('[bag] teacher', async (data) => {

        const { cedula, nombre, apellido, email, telefono } = data

        let person = await findOneByPerson({ cedula });
        if (!person) person = await createPerson({ cedula, nombre, apellido, email, telefono })

        const newFacilitator = await createFacilitator({ persona: person.idpersona });

        return client.emit('[bag] correct', { msg: 'Facilitador creado exitosamente' });

    })

    io.emit('[bag] courses', await dataCourses())

    client.emit('[bag] modalidad', await getModalidad());

    client.emit('[bag] formacion', await getFormacion());

    client.emit('[bag] facilitadores', await getFacilitatorsAndCourses());

    client.emit('[bag] facilitador', await getFacilitators());


})
serve.listen(port, () => {

    console.log(`localhost: ${port}`);

})

