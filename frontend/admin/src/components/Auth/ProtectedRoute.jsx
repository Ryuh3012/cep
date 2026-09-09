import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Obtiene el usuario autenticado desde el almacenamiento local o cookies de sesión
 */
export const getAuthenticatedUser = () => {
    try {
        const stored = sessionStorage.getItem('cep_user');
        if (stored) {
            return JSON.parse(stored);
        }

        const legacyCookie = cookies.get('user');
        if (legacyCookie) {
            if (typeof legacyCookie === 'object') return legacyCookie;
            return JSON.parse(legacyCookie);
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
        if (!allowedRoles.includes(userRoleId)) {
            return <Navigate to="/home" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;

