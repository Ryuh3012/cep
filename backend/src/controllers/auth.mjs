import { encryption, encryptionComparison } from "../hooks/crypter.mjs";
import { generateToken, COOKIE_OPTIONS } from "../services/tokenService.mjs";
import { auth, findOneByAuth } from "../models/auth.mjs";
import { createPerson, findOneByPerson } from "../models/people.mjs";

/**
 * Valida la contraseña comparando directamente (texto plano) o con bcryptjs
 */
const comparePassword = async (inputPassword, storedPassword) => {
    if (!storedPassword) return true; // Si en BD no hay clave fijada
    if (!inputPassword) return false;

    const inputClean = String(inputPassword).trim();
    const storedClean = String(storedPassword).trim();

    // 1. Comparación directa en texto plano (como estaba antes en la BD)
    if (inputClean === storedClean) {
        return true;
    }

    // 2. Comparación mediante hash bcryptjs
    try {
        const isMatch = await encryptionComparison(inputClean, storedClean);
        if (isMatch) return true;
    } catch {
        // En caso de que storedPassword no sea un hash bcrypt válido
    }

    return false;
};

/**
 * Endpoint HTTP: POST /api/auth/login
 * Autentica usuario, genera JWT y fija la Cookie HTTP-Only
 */
export const loginHttp = async (req, res) => {
    try {
        const { cedula, password } = req.body || {};

        if (!cedula || !password) {
            return res.status(400).json({ message: 'Cédula y contraseña son requeridas.' });
        }

        const user = await findOneByAuth(cedula);
        if (!user) {
            return res.status(401).json({ message: 'Usuario o clave inválidos.' });
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Usuario o clave inválidos.' });
        }

        // Generar JWT firmado
        const token = generateToken({
            idUsuario: user.idusuario,
            usuario: user.cedula,
            rolId: user.roleid,
            nombre: user.nombre,
        });

        // 🍪 Fijar Cookie HTTP-Only Segura
        res.cookie('token', token, COOKIE_OPTIONS);

        const safeUser = {
            idUsuario: user.idusuario,
            cedula: user.cedula,
            nombre: user.nombre,
            apellido: user.apellido,
            roleid: user.roleid,
            rol: user.rol_nombre,
        };

        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: safeUser,
            token, // Se envía también por si el cliente necesita inspeccionar claims
        });
    } catch (error) {
        console.error('Error en loginHttp:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Endpoint HTTP: POST /api/auth/logout
 * Elimina la cookie segura
 */
export const logoutHttp = async (req, res) => {
    try {
        res.clearCookie('token', {
            ...COOKIE_OPTIONS,
            maxAge: 0,
        });
        return res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    } catch (error) {
        console.error('Error en logoutHttp:', error);
        return res.status(500).json({ message: 'Error al cerrar sesión.' });
    }
};

/**
 * Endpoint HTTP: GET /api/auth/me
 * Retorna los datos del usuario verificado mediante verifyTokenMiddleware
 */
export const getMeHttp = async (req, res) => {
    try {
        return res.status(200).json({
            user: {
                idUsuario: req.idUsuario,
                cedula: req.usuario,
                rolId: req.rolId,
                nombre: req.nombre,
            }
        });
    } catch (error) {
        console.error('Error en getMeHttp:', error);
        return res.status(500).json({ message: 'Error al obtener sesión.' });
    }
};

/**
 * Función para autenticación vía WebSocket [bag] sesion
 */
export const singIn = async ({ cedula, password }) => {
    try {
        const user = await findOneByAuth(cedula);
        if (!user) return null;

        const isValid = await comparePassword(password, user.password);
        if (!isValid) return null;

        const token = generateToken({
            idUsuario: user.idusuario,
            usuario: user.cedula,
            rolId: user.roleid,
            nombre: user.nombre,
        });

        const safeUser = {
            idUsuario: user.idusuario,
            cedula: user.cedula,
            nombre: user.nombre,
            apellido: user.apellido,
            roleid: user.roleid,
            rol: user.rol_nombre,
        };

        return {
            token: safeUser,
            jwt: token,
        };
    } catch (error) {
        console.error("Error en singIn:", error);
        return null;
    }
};

export const signUp = async (req, res) => {
    // Registro de usuarios
};
