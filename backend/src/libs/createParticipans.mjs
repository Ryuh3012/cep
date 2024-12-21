import { connectdb } from "../db/connectdb.mjs";


export const Createparticipats = async () => {


    try {
        const { rows } = await connectdb.query(`select * from tiposDeParticipantes`)
        if (rows.length > 0) return;

        const values = await Promise.all([
            connectdb.query(`INSERT INTO tiposDeParticipantes(participante) VALUES('Estudiante IUJO'), ('Participantes Externos'), ('Personal IUJO')`),
            connectdb.query(`INSERT INTO tipodepagos(pago) VALUES ('Transferencia Bancaria'), ('Divisas en efectivo ( directamente en caja principal)'), ('Bolívares en efectivo ( directamente en caja principal'),('Débito / Punto de Venta (directamente en caja principal)'),('Financiamiento'), ('Cancelar el dia de Inicio del Curso')`),
            connectdb.query(`INSERT INTO tipodemodalidades(modalidad) VALUES('sabatino'), ('online')`),
            connectdb.query(`INSERT INTO formaciones(formacion) VALUES('oficios tecnológicos emergentes'),('cisco'),('inteligencia y liderazgo'),('doplomados')`),
            connectdb.query(`INSERT INTO roles(rol) VALUES('Caja'), ('Administrador'),('Asistente')`),
            // connectdb.query(`INSERT INTO cursos(codigodecuso,nombrecurso, duracion,horario, monto, contenido, status, facilitadorid, tipodemovilidadid, formacionid ) VALUES(''), (''),('')`),
        ])
    } catch (error) {
        console.log(error);
    }
}
