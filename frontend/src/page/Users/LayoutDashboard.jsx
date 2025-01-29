import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


import img from "../../assets/cropped-cabeceraweb2.jpg";
import Asident from './asiden/Asident';

const LayoutDashboard = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = ["Home", "Oferta Academicas", "Procesos", "Extension-Profesional", "Formacion Complementaria", "Contacto"];


    return (
        <div className="bg-[#d9dbe0] h-screen overflow-auto">
            <Image src={img} className='hidden sm:block' height={150} width={1500} />
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="md:hidden"
                    />
                </NavbarContent>
                <NavbarContent className="hidden md:flex gap-4" justify="center">
                    <NavbarItem >
                        <NavLink className={({ isActive }) => isActive ? 'text-lg font-bold border-b-3 border-red-600 -translate-y-1 -translate-x-1 p-1' : 'font-light'} to="/">
                            Home
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem>
                        <Dropdown >
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        className=" font-light rounded p-2 "
                                        radius="sm"
                                        variant="light"
                                    >
                                        Oferta Academicas
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem >
                            <DropdownMenu>
                                <DropdownItem className=''>
                                    <NavLink end to="https://webiujocatia.wordpress.com/carreras-ofertadas/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Carreras Ofertadas
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/pensa-de-estudio/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        pensa de Estudio
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        className=" font-light rounded p-2"
                                        radius="sm"
                                        variant="light"
                                    >
                                        Procesos
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/registro-preingreso/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Preingreso
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/registro-reincorporacion/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Reincorporacion
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/pago-matricula/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Pago de matriculas
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/pago-aranceles-estudiantes/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Pago de documentos (estudiantes regulares )
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/pago-aranceles-egresados/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Pago de documentos (egreso)
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/retiro-materias/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Retiro de materias
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/retiro-semestre/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Retiro de semestre
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://docs.google.com/forms/d/e/1FAIpQLSchjddWVKV7zmLBwljVf7bwFh7cqNVvspRdbBxYM7KBKGXKMA/viewform" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Estudios SOCIO-ECONÓMICO
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink className={({ isActive }) => isActive ? 'text-lg font-bold border-b-3 border-red-600 -translate-y-1 -translate-x-1 p-1' : 'font-light'} to="/Extension-Profesional">
                            Extension Profesional
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        className=" font-light rounded p-2"
                                        radius="sm"
                                        variant="light"
                                    >
                                        Formacion Complementaria
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/registro-foc/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Registro de Actividad- certificados y Eternos
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink end to="https://webiujocatia.wordpress.com/programacion-foc/" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                        Programacion e Inscripción de Cursos
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to='/contacto' className={({ isActive }) => isActive ? 'text-lg font-bold border-b-3 border-red-600 -translate-y-1 -translate-x-1 p-1' : 'font-light'} >
                            Contacto
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <NavLink
                                to={`/${item}`}
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground "
                                }
                                size="lg"
                            >
                                {item}
                            </NavLink>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>

            </Navbar>

            <section className='flex p-2 w-full divide-x-3 bg-white '>
                <Asident />
                {children}

            </section>
        </div >
    );
}

export default LayoutDashboard;
