import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";
import { connectdb } from "./src/db/connectdb.mjs";

import { Createparticipats } from "./src/libs/createParticipans.mjs";
import { createTable } from "./src/libs/createtable.mjs";

import index from './src/routes/index.mjs'


const app = express()
connectdb.connect()
// createTable();
// Createparticipats();
const serve = createServer(app)

export const io = new Server(serve, cors({ origin: '*' }))


app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(index)

io.on("connection", async (client) => {

    console.log('connect');

    // client.emit('courses', allCourses)

})
serve.listen(port, () => {

    console.log(`localhost: ${port}`);

})

