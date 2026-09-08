import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
import {
    LayoutDashboard,
    BookOpen,
    UserCheck,
    Users,
    CreditCard,
    ShieldCheck,
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    X,
    User,
    Settings
} from 'lucide-react';

import Icon from "../assets/icon2.png";

const cookies = new Cookies();
let cachedUserToken = null;

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    const navegation = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState(cachedUserToken);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Cargar sesión con caché en memoria y sessionStorage
    useEffect(() => {
        if (cachedUserToken) {
            setToken(cachedUserToken);
            return;
        }

        // 1. Intentar desde sessionStorage
        const storedUser = sessionStorage.getItem('cep_user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                cachedUserToken = parsed;
                setToken(parsed);
                return;
            } catch (e) {
                console.error("Error al parsear cep_user:", e);
            }
        }

        // 2. Fallback a cookie cifrada legacy
        const tokenCookie = cookies.get('user');
        if (tokenCookie) {
            try {
                const bytes = CryptoJS.AES.decrypt(tokenCookie, 'users');
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                cachedUserToken = decryptedData;
                setToken(decryptedData);
            } catch (error) {
                console.error("Error al desencriptar token:", error);
            }
        }
    }, []);

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Cerrar sidebar al cambiar de ruta en móviles
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const logout = async () => {
        try {
            // Notificar al backend para que destruya la cookie HttpOnly
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (e) {
            console.warn('Error al llamar logout en backend:', e);
        }

        cachedUserToken = null;
        sessionStorage.removeItem('cep_user');
        cookies.remove('user', { path: '/' });
        navegation('/');
    };


    // Título y sección dinámicos según la ruta
    const getPageContext = () => {
        const path = location.pathname.toLowerCase();
        if (path.includes('cursos')) return { section: 'Cursos', page: 'Apertura Académica' };
        if (path.includes('inscripcion')) return { section: 'Estudiantes', page: 'Gestión de Inscripciones' };
        if (path.includes('facilitador')) return { section: 'Personal', page: 'Facilitadores' };
        if (path.includes('caja')) return { section: 'Finanzas', page: 'Caja Principal' };
        return { section: 'General', page: 'Panel de Control' };
    };

    const { section, page } = getPageContext();

    return (
        <div className="flex min-h-screen bg-slate-50/60">
            {/* BACKDROP PARA MÓVILES */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
            }`}>
                {/* Cabecera del Logo */}
                <div className="p-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <img src={Icon} alt="Logo CEP" className="w-9 h-auto object-contain" />
                        <div>
                            <span className="font-black text-xs text-[#1F2559] uppercase tracking-wider block">
                                CEP Admin
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                                Extensión Profesional
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Lista de Navegación */}
                <div className="p-4 flex-1 overflow-y-auto space-y-6">
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                            General
                        </p>
                        <nav className="space-y-1">
                            <NavItem to="/home" icon={LayoutDashboard} label="Inicio" end />
                        </nav>
                    </div>

                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                            Gestión Académica
                        </p>
                        <nav className="space-y-1">
                            <NavItem to="/cursos" icon={BookOpen} label="Apertura" end />
                            <NavItem to="/inscripcion" icon={UserCheck} label="Inscripción" end />
                            <NavItem to="/facilitador" icon={Users} label="Facilitadores" end />
                        </nav>
                    </div>

                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                            Finanzas
                        </p>
                        <nav className="space-y-1">
                            <NavItem to="/caja" icon={CreditCard} label="Caja" end />
                        </nav>
                    </div>
                </div>

                {/* Botón Salir al pie */}
                <div className="p-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* ÁREA DE CONTENIDO */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* NAVBAR SUPERIOR MODERNO */}
                <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
                    {/* Lado Izquierdo: Botón Hamburguesa + Breadcrumbs */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Abrir menú"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <span className="text-slate-400 font-medium hidden sm:inline">{section}</span>
                            <span className="text-slate-300 hidden sm:inline">/</span>
                            <span className="font-bold text-slate-800">{page}</span>
                        </div>
                    </div>

                    {/* Lado Derecho: Estado, Notificaciones y Menú de Usuario */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Estado En Línea */}
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>En línea</span>
                        </div>

                        {/* Campana de Notificaciones */}
                        <button
                            type="button"
                            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                            aria-label="Notificaciones"
                        >
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                        </button>

                        {/* Menú de Usuario Flotante */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                type="button"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-3 p-1.5 pl-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all"
                            >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1F2559] to-[#3B49A2] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                    {token?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-800 leading-tight">
                                        {token?.nombre || 'Administrador'}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        {(Number(token?.roleid || token?.rolId) === 1) ? 'Administrador' : (Number(token?.roleid || token?.rolId) === 2 ? 'Cajero / Operador' : (token?.rol || 'Personal CEP'))}
                                    </span>
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown del Perfil */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-xs font-bold text-slate-800">{token?.nombre || 'Usuario'}</p>
                                        <p className="text-[11px] text-slate-400">{token?.cedula ? `C.I. ${token.cedula}` : 'Sesión activa'}</p>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            type="button"
                                            onClick={() => { setIsUserMenuOpen(false); navegation('/home'); }}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <User size={14} className="text-slate-400" />
                                            <span>Mi Perfil</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Settings size={14} className="text-slate-400" />
                                            <span>Configuración</span>
                                        </button>
                                    </div>
                                    <div className="pt-1 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => { setIsUserMenuOpen(false); logout(); }}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={14} />
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* CONTENIDO PRINCIPAL */}
                <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon: Icon, label, end }) => (
    <NavLink
        end={end}
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                    ? "bg-[#1F2559] text-white shadow-md shadow-indigo-950/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            }`
        }
    >
        <Icon size={18} />
        <span>{label}</span>
    </NavLink>
);

export default Layout;