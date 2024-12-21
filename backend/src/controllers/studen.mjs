import { createPerson } from "../models/people.mjs";

export const newStuden = async (req, res) => {

    try {
        console.log(req?.body.data);
        const { cedula, nombre, apellido, telefono, email, tipoDeParticipante, cursos, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante, } = req?.body.data

        let person = await findOneByPerson(cedula);

        if (!person) person = await createPerson({ cedula, nombre, apellido, email, telefono, tipoDeParticipante });

        const pague = await newPage({ cursos, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante, personas: person.idpersona });

        return res.status(200).json({
            messager: 'Haz sido registrado exitosamente',
        });
    } catch (error) {
        console.error('Error during signUp:', error)
        return res.status(500).json({ msg: 'Internal server error' })
    }


}
