import { newPayments, updatePayments } from "../models/pagues.mjs";
import { createPerson, findOneByPerson } from "../models/people.mjs";
import { addStudent } from "../models/Studen.mjs";

export const newStuden = async (req, res) => {

    // try {
    const { cedula, nombre, apellido, telefono, email, tipoDeParticipante, cursos, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante, } = req

    let person = await findOneByPerson(cedula);
    
    if (!person) person = await createPerson({ cedula, nombre, apellido, email, telefono, tipoDeParticipante });
    const typepague = (tipoDePago) => {
        if (tipoDePago == "Transferencia Bancaria") return 1
        if (tipoDePago == 'Divisas en efectivo ( directamente en caja principal)') return 2
        if (tipoDePago == "Bolívares en efectivo ( directamente en caja principal)") return 3
        if (tipoDePago == "Débito / Punto de Venta (directamente en caja principal)") return 4
        if (tipoDePago == "Financiamiento") return 5
        if (tipoDePago == "Cancelar el dia de Inicio del Curso") return 6
    }

    const pague = await newPayments({ tipoDePago: typepague(tipoDePago), montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante, persona: person.idpersona });

    const addStudentAndCourso = await addStudent({ person: person.idpersona, courses: cursos })
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
