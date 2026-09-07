import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
import {
    LayoutDashboard,
    BookOpen,
    UserCheck,
    Users,
    CreditCard,
    ShieldCheck,
    Search,
    Bell,
    ChevronDown,
    LogOut
} from 'lucide-react';

import Icon from "../assets/icon2.png";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    const navegation = useNavigate();
    const [token, setToken] = useState(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const cookis = new Cookies();

    useEffect(() => {
        const tokenCookie = cookis.get('user');
        if (tokenCookie) {
            try {
                const bytes = CryptoJS.AES.decrypt(tokenCookie, 'users');
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                setToken(decryptedData);
            } catch (error) {
                console.error("Error al desencriptar el token de usuario:", error);
            }
        }
    }, []);

    const remover = () => {
        cookis.remove('user');
        return navegation('/');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
                <div className="p-6 flex items-center gap-3 border-b border-gray-50">
                    <img src={Icon} alt="Logo" className="w-10 h-auto object-contain" />
                    <span className="font-bold text-xs text-indigo-950 uppercase tracking-wide leading-tight">
                        Coordinación de Extensión Profesional
                    </span>
                </div>

                <div className="px-6 py-6 flex-1 overflow-y-auto">
                    {/* {token?.roleid === 2 && ( */}
                    <>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Menú</p>
                        <nav className="space-y-1 mb-8">
                            <NavItem to="/home" icon={LayoutDashboard} label="Inicio" end />
                        </nav>

                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Cursos</p>
                        <nav className="space-y-1 mb-8">
                            <NavItem to="/cursos" icon={BookOpen} label="Apertura" end />
                            <NavItem to="/inscripcion" icon={UserCheck} label="Inscripción" end />
                            <NavItem to="/facilitador" icon={Users} label="Facilitadores" end />

                        </nav>
                    </>
                    {/* )} */}

                    {/* {token?.roleid === 1 && ( */}
                    <>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Caja</p>
                        <nav className="space-y-1 mb-8">
                            <NavItem to="/caja" icon={CreditCard} label="Caja" end />
                        </nav>
                    </>
                    {/* )} */}

                    {/* {token?.roleid === 2 && ( */}
                    <>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Otros</p>
                        <nav className="space-y-1">
                            <NavItem to="/admin" icon={ShieldCheck} label="Control" end />
                        </nav>
                    </>
                    {/* )} */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsUserMenuOpen(false);
                            remover();
                        }}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={16} />
                        Salir
                    </button>
                </div>

            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-12 bg-white  border-gray-100 flex items-center justify-end relative z-20">
                    <div className="relative border-l pl-6">
                            <div className="w-8 h-8 rounded-full bg-indigo-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                {token?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span className="font-semibold text-sm text-gray-700 group-hover:text-indigo-900 transition-colors">
                                {token?.nombre}
                            </span>
                           
                    </div>
                </header>

                {/* CONTENIDO PRINCIPAL */}
                <main className="p-8 flex-1 overflow-y-auto">
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
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? "bg-[#1e1b4b] text-white shadow-md shadow-indigo-900/20"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`
        }
    >
        <Icon size={20} />
        <span className="font-medium text-sm">{label}</span>
    </NavLink>
);

export default Layout;