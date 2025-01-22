import { generateToken, verifyToken } from "../hooks/generToken.mjs"

export const verifytokenMiddleware = async (req, res, next) => {

    const token = req?.headers['authorization']

    if (!token) return res.status(401).json({ messager: 'Acceso denegado' })

    const { valid, expired, decoded } = verifyToken(token)

    if (!valid) return res.status(401).json({ messager: 'Acceso denegado' })

    if (expired) return res.status(401).json({ messager: 'token expirado' })
    req.cedula = decoded.cedula
    req.rol = decoded.rol
    
    next()

}
export const verifyAdmin = async (req, res, next) => {


    if (req.rol !== 2) return res.status(403).json({ msg: 'No tienes permiso para acceder a este recurso' });
    next();
}

export const verifyUser = (req, res, next) => {
    if (req.rol == 1 || req.rol == 2) return next();
    return res.status(403).json({ msg: 'Uso exclusivo para administrador o caja' });
}