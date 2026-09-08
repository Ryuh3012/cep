import { verifyToken } from "../services/tokenService.mjs";

/**
 * Middleware para parsear cookies desde las cabeceras HTTP de forma ligera
 * sin dependencias externas obligatorias.
 */
export const cookieParserMiddleware = (req, res, next) => {
    if (!req.cookies) {
        req.cookies = {};
        const cookieHeader = req.headers.cookie;
        if (cookieHeader) {
            cookieHeader.split(';').forEach((cookie) => {
                const parts = cookie.split('=');
                const name = parts[0]?.trim();
                const value = parts.slice(1).join('=').trim();
                if (name && value) {
                    req.cookies[name] = decodeURIComponent(value);
                }
            });
        }
    }
    next();
};

/**
 * 1. Middleware para verificar que el JWT dentro de la COOKIE esté activo
 * (con fallback a la cabecera Authorization: Bearer <token>)
 */
export const verifyTokenMiddleware = async (req, res, next) => {
    // 🍪 Leemos el token directamente desde las cookies fijadas por el navegador
    let token = req.cookies?.token;

    // Fallback opcional: cabecera Authorization
    if (!token && req.headers?.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Si no hay cookie ni token, acceso denegado de una
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay sesión activa.' });
    }

    // Usamos el helper de verificación del servicio
    const { valid, expired, decoded } = verifyToken(token);

    if (expired) {
        return res.status(401).json({ message: 'Token expirado. Cierre de sesión requerido.' });
    }

    if (!valid || !decoded) {
        return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
    }

    // Si todo está perfecto, inyectamos los datos del usuario en el objeto 'req'
    req.idUsuario = decoded.idUsuario;
    req.usuario = decoded.usuario;
    req.rolId = Number(decoded.rolId); // El ID del rol para los siguientes middlewares
    req.nombre = decoded.nombre;

    next();
};

/**
 * 2. Middleware exclusivo para Administrador General (Rol ID: 1)
 */
export const verifyAdmin = async (req, res, next) => {
    if (req.rolId !== 1) {
        return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso.' });
    }
    next();
};

/**
 * 3. Middleware mixto (Admin = 1 o Cajero/Operador = 2)
 */
export const verifyUser = async (req, res, next) => {
    if (req.rolId === 1 || req.rolId === 2) {
        return next();
    }
    return res.status(403).json({ message: 'Uso exclusivo para administrador o personal de caja.' });
};

