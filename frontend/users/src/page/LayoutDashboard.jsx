import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from '@nextui-org/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import img from "../assets/cropped-cabeceraweb2.jpg";
import Asident from './asiden/Asident';

const LayoutDashboard = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-sm md:text-base font-bold text-red-600 border-b-2 border-red-600 pb-1 transition-colors'
            : 'text-sm md:text-base font-medium text-slate-700 hover:text-red-600 transition-colors';

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Cabecera institucional */}
            <header className="w-full bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto flex justify-center items-center overflow-hidden">
                    <Image
                        src={img}
                        alt="Cabecera IUJO"
                        className="w-full max-h-32 object-contain"
                        radius="none"
                    />
                </div>
            </header>

            {/* Navbar principal */}
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className=" bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40"
                maxWidth="xl"
            >
                <NavbarContent className="md:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} />
                </NavbarContent>

                <NavbarContent className="md:hidden" justify="center">
                    <span className="font-bold text-base text-slate-800 tracking-tight">CEP - IUJO</span>
                </NavbarContent>

                <NavbarContent className="hidden md:flex gap-6" justify="center">
                    <NavbarItem>
                        <NavLink to="/" className={navLinkClass}>
                            Inicio
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem>
                        <NavLink to="/Extension-Profesional" className={navLinkClass}>
                            Cursos CEP
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="font-medium text-slate-700 hover:text-red-600 text-sm md:text-base px-2"
                                    radius="sm"
                                    variant="light"
                                >
                                    Oferta Académica ▾
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Oferta Académica">
                                <DropdownItem key="carreras">
                                    <a
                                        href="https://webiujocatia.wordpress.com/carreras-ofertadas/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-1 text-slate-700 hover:text-red-600 text-sm"
                                    >
                                        Carreras Ofertadas
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="pensa">
                                    <a
                                        href="https://webiujocatia.wordpress.com/pensa-de-estudio/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-1 text-slate-700 hover:text-red-600 text-sm"
                                    >
                                        Pensa de Estudio
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>

                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="font-medium text-slate-700 hover:text-red-600 text-sm md:text-base px-2"
                                    radius="sm"
                                    variant="light"
                                >
                                    Procesos ▾
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Procesos Académicos" className="max-h-80 overflow-y-auto">
                                <DropdownItem key="preingreso">
                                    <a href="https://webiujocatia.wordpress.com/registro-preingreso/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Preingreso Universitario
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="reincorporacion">
                                    <a href="https://webiujocatia.wordpress.com/registro-reincorporacion/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Reincorporación
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="matricula">
                                    <a href="https://webiujocatia.wordpress.com/pago-matricula/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Pago de Matrículas
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="documentos-regulares">
                                    <a href="https://webiujocatia.wordpress.com/pago-aranceles-estudiantes/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Pago de Documentos (Regulares)
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="documentos-egresados">
                                    <a href="https://webiujocatia.wordpress.com/pago-aranceles-egresados/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Pago de Documentos (Egresados)
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="retiro-materias">
                                    <a href="https://webiujocatia.wordpress.com/retiro-materias/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Retiro de Materias
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="retiro-semestre">
                                    <a href="https://webiujocatia.wordpress.com/retiro-semestre/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Retiro de Semestre
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="socioeconomico">
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSchjddWVKV7zmLBwljVf7bwFh7cqNVvspRdbBxYM7KBKGXKMA/viewform" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Estudio Socioeconómico
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>

                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="font-medium text-slate-700 hover:text-red-600 text-sm md:text-base px-2"
                                    radius="sm"
                                    variant="light"
                                >
                                    Formación Complementaria ▾
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Formación Complementaria">
                                <DropdownItem key="foc-registro">
                                    <a href="https://webiujocatia.wordpress.com/registro-foc/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Registro de Actividad (FOC)
                                    </a>
                                </DropdownItem>
                                <DropdownItem key="foc-programacion">
                                    <a href="https://webiujocatia.wordpress.com/programacion-foc/" target="_blank" rel="noopener noreferrer" className="block w-full text-slate-700 hover:text-red-600 text-sm">
                                        Programación e Inscripción FOC
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>

                    <NavbarItem>
                        <NavLink to="/contacto" className={navLinkClass}>
                            Contacto
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem>
                        <NavLink to="/nosotros" className={navLinkClass}>
                            Nosotros
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>

                {/* Menú móvil optimizado */}
                <NavbarMenu className="bg-white/95 backdrop-blur-md pt-4 gap-3">
                    <NavbarMenuItem>
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-800 hover:text-red-600">
                            🏠 Inicio
                        </NavLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <NavLink to="/Extension-Profesional" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-800 hover:text-red-600">
                            🎓 Cursos CEP
                        </NavLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <NavLink to="/participant" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-800 hover:text-red-600">
                            📝 Formulario de Inscripción
                        </NavLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <NavLink to="/contacto" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-800 hover:text-red-600">
                            📞 Contacto y Ubicación
                        </NavLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <NavLink to="/nosotros" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-800 hover:text-red-600">
                            ℹ️ Sobre Nosotros (IUJO)
                        </NavLink>
                    </NavbarMenuItem>

                    <div className="border-t border-slate-200 my-2 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Portales Institucionales</span>
                        <NavbarMenuItem className="mt-2">
                            <a href="http://caracas.iujo.edu.ve/sigea/" target="_blank" rel="noopener noreferrer" className="block py-1 text-sm font-medium text-slate-600 hover:text-red-600">
                                ↗ Portal SIGEA
                            </a>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <a href="https://aulaccs.iujoac.org.ve" target="_blank" rel="noopener noreferrer" className="block py-1 text-sm font-medium text-slate-600 hover:text-red-600">
                                ↗ Aula Virtual EVA
                            </a>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <a href="https://webiujocatia.wordpress.com/carreras-ofertadas/" target="_blank" rel="noopener noreferrer" className="block py-1 text-sm font-medium text-slate-600 hover:text-red-600">
                                ↗ Carreras Ofertadas
                            </a>
                        </NavbarMenuItem>
                    </div>
                </NavbarMenu>
            </Navbar>

            {/* Contenedor principal responsive */}
            <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 p-3 md:p-6">
                <Asident />
                <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 md:p-6 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;

