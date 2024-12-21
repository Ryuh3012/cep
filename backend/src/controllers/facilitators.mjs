import { createFacilitator } from '../models/facilitators.mjs';
import { createPerson, findOneByPerson } from '../models/people.mjs';

export const newfacilitators = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, telefono } = req?.body;

        let person = await findOneByPerson({ cedula });
        if (!person) {
            person = await createPerson({ cedula, nombre, apellido, email, telefono })
        };

        const newFacilitator = await createFacilitator({ persona: person.idpersona });
        console.log(newFacilitator);
        return res.status(200).json({ message: 'Facilitador creado exitosamente' });
    } catch (error) {
        console.error('Error during newfacilitators:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};