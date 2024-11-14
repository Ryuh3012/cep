import express from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { port } from "./src/config/config.mjs";



const app = express()
const serve = createServer(app)
const io = new Server(serve, cors({ origin: '*' }))


app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


io.on("connection", (client) => {

    console.log('connect');


})



serve.listen(port, () => {

    console.log(`localhost: ${port}`);

})

