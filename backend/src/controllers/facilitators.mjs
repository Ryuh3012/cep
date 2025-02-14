import { createFacilitator } from '../models/facilitators.mjs';
import { createPerson, findOneByPerson } from '../models/people.mjs';

export const newfacilitators = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, telefono } = req
        const person = await createPerson({ cedula, nombre, apellido, email, telefono })
        console.log(person)

        // const newFacilitator = await createFacilitator({ persona: person.idpersona });
        // return res.status(200).json({ message: 'Facilitador creado exitosamente' });
    } catch (error) {
        console.error('Error during newfacilitators:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
