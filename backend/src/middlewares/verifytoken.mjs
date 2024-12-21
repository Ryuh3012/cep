import { verifyToken } from "../hooks/generToken.mjs"

export const verifytokenMiddleware = async (req, res, next) => {

    const token = req?.headers['authorization']

    if (!token) return res.status(401).json({ messager: 'token no valido' })

    const { valid, expired, decoded } = verifyToken(token)
    if (!valid) return res.status(401).json({ messager: 'token no valido' })

    if (expired) {
        const newtoken = await generateToken(decoded.cedula, token.includes('session') ? '1h' : '30d')

        req.newtoken = newtoken
    }
    req.cedula = decoded.cedula
    next()

}