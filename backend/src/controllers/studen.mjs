import { newPayments, updatePayments } from "../models/pagues.mjs";
import { createPerson, findOneByPerson } from "../models/people.mjs";

export const newStuden = async (req, res) => {

    try {
        console.log(req?.body.data);
        const { cedula, nombre, apellido, telefono, email, tipoDeParticipante, cursos, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante, } = req?.body.data

        let person = await findOneByPerson(cedula);

        if (!person) person = await createPerson({ cedula, nombre, apellido, email, telefono, tipoDeParticipante });

        const pague = await newPayments({ cursos, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante, personas: person.idpersona });

        return res.status(200).json({
            messager: 'Haz sido registrado exitosamente',
        });
    } catch (error) {
        console.error('Error during signUp:', error)
        return res.status(500).json({ msg: 'Internal server error' })
    }


}

export const updateStudent = async (req, res) => {

    const { cedula, montoTotal } = req.params;

    try {
        const student = await findOneByPerson(cedula)
        if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });

        const updatedPayment = await updatePayments({ person: student.idpersona, montoTotal })

        if (!updatedPayment) return res.status(404).json({ message: 'No se pudo actualizar el pago' });
        return res.status(200).json({ message: 'Pago actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}
