import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";
import { connectdb } from "./src/db/connectdb.mjs";

import { Createparticipats } from "./src/libs/createParticipans.mjs";
import { createTable } from "./src/libs/createtable.mjs";

import { findOneByAuth } from "./src/models/auth.mjs";
import { encryptionComparison } from "./src/hooks/crypter.mjs";
import { createPerson } from "./src/models/people.mjs";
import { createFacilitator } from "./src/models/facilitators.mjs";
import { verifytokenMiddleware } from "./src/middlewares/verifytokenMiddleware.mjs";
import { singIn } from "./src/controllers/auth.mjs";


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

    console.log('connect');

    client.on('[bag] teacher', async (data) => {

        const { cedula, nombre, apellido, email, telefono } = data

        let person = await findOneByPerson({ cedula });
        if (!person) person = await createPerson({ cedula, nombre, apellido, email, telefono })

        const newFacilitator = await createFacilitator({ persona: person.idpersona });

        return client.emit('[bag] correct', { msg: 'Facilitador creado exitosamente' });

    })


    client.on('[bag] sesion', async (data) => {

        const { cedula, password } = data
        const auth = await singIn({ cedula, password })

        if (auth.message) return client.emit('error', auth)
        if (app.msg) client.emit('[bag] correct', auth)

        client.emit('[bag] correct', { user: auth })

        //     if (user.rol === 1) {
        //         const veiry = verifytokenMiddleware()

        //     }
        if (auth.rol === 2) {

            console.log('hello word');

        }
        //     if (user.rol === 3) { }

        //     if (!user.rol) return client.on('disconnect')

        // });

    })


})
serve.listen(port, () => {

    console.log(`localhost: ${port}`);

})

