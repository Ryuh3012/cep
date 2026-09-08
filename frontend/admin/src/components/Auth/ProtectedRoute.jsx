import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

import CryptoJS from 'crypto-js';

const cookies = new Cookies();

/**
 * Obtiene el usuario autenticado desde el almacenamiento local o cookies de sesión
 * Garantiza que siempre devuelva un objeto con datos válidos o null (nunca strings corruptos).
 */
export const getAuthenticatedUser = () => {
    try {
        // 1. Intentar desde sessionStorage (más seguro y rápido)
        const stored = sessionStorage.getItem('cep_user');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && typeof parsed === 'object' && (parsed.cedula || parsed.idUsuario || parsed.idusuario || parsed.nombre)) {
                return parsed;
            }
        }

        // 2. Intentar desde la cookie legacy cifrada con CryptoJS
        const legacyCookie = cookies.get('user');
        if (legacyCookie) {
            if (typeof legacyCookie === 'object' && (legacyCookie.cedula || legacyCookie.roleid)) {
                return legacyCookie;
            }

            try {
                let rawCipher = legacyCookie;
                // Si la cookie viene serializada dos veces con JSON
                if (typeof rawCipher === 'string' && rawCipher.startsWith('"') && rawCipher.endsWith('"')) {
                    rawCipher = JSON.parse(rawCipher);
                }

                if (typeof rawCipher === 'string') {
                    const bytes = CryptoJS.AES.decrypt(rawCipher, 'users');
                    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
                    if (decryptedString) {
                        const decryptedData = JSON.parse(decryptedString);
                        if (decryptedData && typeof decryptedData === 'object' && (decryptedData.cedula || decryptedData.nombre || decryptedData.roleid)) {
                            return decryptedData;
                        }
                    }
                }
            } catch (decryptErr) {
                console.warn('Cookie de sesión inválida o corrupta:', decryptErr);
            }
        }
    } catch (e) {
        console.error('Error leyendo usuario autenticado:', e);
    }
    return null;
};

/**
 * Componente para proteger rutas privadas del frontend según autenticación y roles.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Array<number>} [props.allowedRoles] - IDs de roles permitidos (ej. [1] solo Admin, [1, 2] Admin y Operador)
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const user = getAuthenticatedUser();

    // 1. Si no hay sesión activa, redirigir al login
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // 2. Si se especifican roles y el usuario no tiene permiso, redirigir a /home
    if (allowedRoles && allowedRoles.length > 0) {
        const userRoleId = Number(user.roleid || user.rolId);
        if (!isNaN(userRoleId) && !allowedRoles.includes(userRoleId)) {
            if (location.pathname !== '/home') {
                return <Navigate to="/home" replace />;
            }
        }
    }

    return children;
};

export default ProtectedRoute;

