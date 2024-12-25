import { encryption, encryptionComparison } from "../hooks/crypter.mjs"
import { generateToken } from "../hooks/generToken.mjs";
import { auth, findOneByAuth } from "../models/auth.mjs"
import { createPerson, findOneByPerson } from "../models/people.mjs";


export const signUp = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, telefono, password, rol } = req?.body;
        // // Verificar si el usuario ya existe
        let newPerson = await findOneByPerson(cedula);

        if (newPerson.length === 0) newPerson = await createPerson({ cedula, nombre, apellido, email, telefono });
        //Crear nuevo usuario con contraseña encriptada
        const encryptedPassword = await encryption(password);

        const getUser = await findOneByAuth(cedula);

        if (getUser) return res.status(400).json({ message: 'Usuario ya existe' });

        const newUser = await auth({ cedula, password: encryptedPassword, personas: newPerson[0].idpersona, rol: rol });

        // // Generar token de registro
        const registerToken = await generateToken({ cedula, rol });

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
    const { cedula, password } = req?.body
    try {
        const user = await findOneByAuth(cedula)
        if (!user) return res.status(400).json({ messager: 'Usuario o clave invalidos' })

        const validPassword = await encryptionComparison(password, user.password)

        if (!validPassword) return res.status(400).json({ messager: 'Usuario o clave invalidos' })

        res.status(200).json({
            messager: 'Usuario Valido',
            token: req?.newtoken
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