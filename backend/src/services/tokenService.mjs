import jwt from 'jsonwebtoken';
import { tokenPassword } from '../config/config.mjs';

const JWT_SECRET = tokenPassword || 'default_jwt_secret_cep_2026';
const TOKEN_EXPIRATION = '7d';

/**
 * Genera un token JWT firmado con los datos esenciales del usuario.
 * @param {Object} payload
 * @param {number|string} payload.idUsuario
 * @param {string} payload.usuario - Cédula o identificador
 * @param {number} payload.rolId - 1: Admin, 2: Operador/Cajero
 * @param {string} payload.nombre - Nombre del usuario
 * @returns {string} Token JWT firmado
 */
export const generateToken = ({ idUsuario, usuario, rolId, nombre }) => {
    try {
        return jwt.sign(
            {
                idUsuario,
                usuario,
                rolId,
                nombre,
            },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRATION }
        );
    } catch (error) {
        console.error('Error al generar JWT:', error);
        throw error;
    }
};

/**
 * Verifica la autenticidad y vigencia de un token JWT.
 * @param {string} token
 * @returns {{ valid: boolean, expired: boolean, decoded: Object|null }}
 */
export const verifyToken = (token) => {
    try {
        if (!token) {
            return { valid: false, expired: false, decoded: null };
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        return { valid: true, expired: false, decoded };
    } catch (error) {
        return {
            valid: false,
            expired: error.name === 'TokenExpiredError',
            decoded: null,
        };
    }
};

/**
 * Opciones de seguridad para la Cookie HTTP-Only
 */
export const COOKIE_OPTIONS = {
    httpOnly: true, // Bloquea acceso por JavaScript (mitiga XSS)
    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
    sameSite: 'lax', // Protección contra ataques CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
    path: '/',
};

