import { connectdb } from "../db/connectdb.mjs";


export const Createparticipats = async () => {

    const tipoDeParticipants = ['Estudiante IUJO', 'Participantes Externos', 'Personal IUJO']

    try {
        const { rows } = await connectdb.query(`select * from tiposdeparticipantes;`)
        if (rows.length > 0) return;

        const values = await Promise.all([
            connectdb.query(`INSERT INTO tiposdeparticipantes(participante) VALUES('Estudiante IUJO'), ('Participantes Externos'), ('Personal IUJO')`),
            connectdb.query(`INSERT INTO tipoDePago(pago) VALUES ('Transferencia Bancaria'), ('Divisas en efectivo ( directamente en caja principal)'), ('Bolívares en efectivo ( directamente en caja principal'),('Débito / Punto de Venta (directamente en caja principal)'),('Financiamiento'), ('Cancelar el dia de Inicio del Curso')`),
            connectdb.query(`INSERT INTO tiposDeModalidades(modalidad) VALUES('sabatino'), ('online')`),
        ])
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}
