import { encryption } from "../hooks/crypter.mjs"
import { generateToken } from "../hooks/generToken.mjs"
import { auth, findOneByAuth } from "../models/auth.mjs"
import { createPerson } from "../models/people.mjs"


export const signUp = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, telefono, password } = req?.body.data;

        // Verificar si el usuario ya existe
        const existingUser = await findOneByPerson(cedula);
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Crear nueva persona
        const newPerson = await createPerson({ cedula, nombre, apellido, email, telefono });
        
        if (!newPerson) {
            return res.status(500).json({ message: 'Error al crear la persona' });
        }

        // Crear nuevo usuario con contraseña encriptada
        const encryptedPassword = await encryption(password);
        const newUser = await auth({ cedula, password: encryptedPassword, personas: newPerson.id });
        if (!newUser) {
            return res.status(500).json({ message: 'Error al crear el usuario' });
        }

        // Generar token de registro
        const registerToken = await generateToken(newUser.cedula, '30d');
        res.status(200).json({
            message: 'Usuario creado exitosamente',
            token: registerToken
        });
    } catch (error) {
        console.error('Error during signUp:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

export const singIn = async (req, res) => {
    const { cedula, password } = req?.body.user
    try {
        const user = await findOneByAuth(cedula)

        if (!user) return res.status(400).json({ messager: 'Usuario o clave invalidos' })

        const validPassword = await encryptionComparison(password, user.password)

        if (!validPassword) return res.status(400).json({ messager: 'Usuario o clave invalidos' })

        const sessionToken = await generateToken(user.cedula, '1h')

        res.status(200).json({
            messager: 'Usuario Valido',
            user: rows[0].usuario,
            token: sessionToken
        })


    } catch (error) {
        console.error('Error during signIn:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }

}

export const profile = async (req, res) => {
    try {

        const user = await findOneByAuth(req?.cedula)

        if (!user) return res.status(400).json({ messager: 'Usuario no encontrado' })

        return res.status(200).json({
            user: user.cedula,
            token: req?.newtoken

        })

    } catch (error) {
        console.error('Error during profile:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }

}