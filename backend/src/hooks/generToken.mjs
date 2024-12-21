import jwt, { decode } from 'jsonwebtoken'
import { tokenPassword } from '../config/config.mjs'


export const generateToken = async (cedula, expiresIn) => {
    return jwt.sign({ cedula }, tokenPassword, { expiresIn });

}

export const verifyToken = (token) => {


    try {

        const decoded = jwt.verify(token, tokenPassword)
        return { valid: true, expired: false, decoded }

    } catch (error) {
        console.error(error);
        return { valid: false, expired: error.message === 'jwt expired', decoded: null }
    }

}