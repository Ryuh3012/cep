import { connectdb } from "../db/connectdb.mjs";


export const createTable = async () => {

    try {
        // const table = await Promise.all([
        //     connectdb.query(`create table personas(idPersona serial PRIMARY KEY not null, cedula varchar(12) not null UNIQUE, nombre text not null, apellido text not null, email text not null, telefono text not null, tipoDeparticipanteId int not null)`),
        //     connectdb.query(`create table tiposDeParticipantes(idTiposDeParticipante serial PRIMARY KEY not null, participante varchar(23) not null)`),
        //     connectdb.query(`create table usuarios(idUsuario serial PRIMARY KEY not null, cedula varchar(12) not null UNIQUE, password TEXT not null, roleid int not null, personaid int not null);`),
        //     connectdb.query(`create table roles(idRole serial PRIMARY KEY not null, rol varchar(15) not null)`),
        //     connectdb.query(`create table facilitadores(idfacilitador serial PRIMARY KEY not null,cedula varchar(12) not null UNIQUE, personaid int not null)`),
        //     connectdb.query(`create table cursos(idcurso serial PRIMARY KEY not null,codigoDeCuso text UNIQUE not null, nombre text not null, duracion text not null, horario text not null,monto decimal not null, contenido JSON not null, status text,facilitadorid int not null, tipodemovilidadId int not null, formacionId int not null);`),
        //     connectdb.query(`create table personas_has_cursos(idpersona_ha_curso serial PRIMARY KEY not null, personasid int not null, cursoid int not null)`),
        //     connectdb.query(`create table tipoDemodalidades(idtipoDemodalidad serial PRIMARY KEY not null,modalidad varchar(9) not null)`),
        //     connectdb.query(`create table formaciones(idformacion serial PRIMARY KEY not null, formacion varchar(47) not null)`),
        //     connectdb.query(`create table pagos(idpago serial PRIMARY KEY not null, personaid int not null, monto decimal not null, fecha date not null, referencia decimal not null, nombre text not null, cedula varchar(11) not null, tipodepagoid int not null);`),
        //     connectdb.query(`create table tipoDepagos(idtipoDepago serial PRIMARY KEY not null,pago text not null)`),
        //     connectdb.query(`create table asistencias(idasistencia serial PRIMARY KEY not null,fechaInico date, asistencia varchar(12), fechafinal date, personas_has_cursosid int )`),
        // ])
        // const key = await Promise.all([
        //     connectdb.query(`ALTER TABLE personas ADD FOREIGN KEY(tipoDeparticipanteId) REFERENCES tiposDeParticipantes(idTiposDeParticipante)`),
        //     connectdb.query(`ALTER TABLE usuarios ADD FOREIGN KEY(personaid) REFERENCES personas(idPersona)`),
        //     connectdb.query(`ALTER TABLE usuarios ADD FOREIGN KEY(roleid) REFERENCES roles(idRole)`),
        //     connectdb.query(`ALTER TABLE facilitadores ADD FOREIGN KEY(personaid) REFERENCES personas(idPersona)`),
        //     connectdb.query(`ALTER TABLE cursos ADD FOREIGN KEY(facilitadorid) REFERENCES facilitadores(idfacilitador)`),
        //     connectdb.query('ALTER TABLE cursos ADD FOREIGN KEY(tipodemovilidadId) REFERENCES tipoDemodalidades(idtipoDemodalidad)'),
        //     connectdb.query('ALTER TABLE cursos ADD FOREIGN KEY(formacionId) REFERENCES formaciones(idformacion)'),
        //     connectdb.query('ALTER TABLE personas_has_cursos ADD FOREIGN KEY(personasid) REFERENCES personas(idPersona)'),
        //     connectdb.query('ALTER TABLE personas_has_cursos ADD FOREIGN KEY(cursoid) REFERENCES cursos(idcurso)'),
        //     connectdb.query('ALTER TABLE pagos ADD FOREIGN KEY(personaid) REFERENCES personas(idpersona)'),
        //     connectdb.query('ALTER TABLE pagos ADD FOREIGN KEY(tipodepagoid) REFERENCES tipoDepagos(idtipoDepago)'),
        //     connectdb.query('ALTER TABLE asistencias ADD FOREIGN KEY(personas_has_cursosid) REFERENCES personas_has_cursos(idpersona_ha_curso)'),
        // ])
    } catch (error) {
    }
}
