import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';


import Icon from "../assets/icon2.png";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    const navegation = useNavigate()
    const cookies = new Cookies();


    const remover = () => {
        cookies.remove('user')
        return navegation('/')
    }
    return (
        <div className="bg-[#d9dbe0] h-screen">
            <Navbar
                isBordered
                className="bg-[#2A398C] text-white "
            >
                <NavbarBrand>
                    <div>
                        <Image src={Icon} alt="logo" width={70} />
                    </div>
                    <p className="font-semibold ">COORDINACIÓN DE EXTENSIÓN PROFESIONAL</p>

                </NavbarBrand>
                <NavbarContent justify="center">
                    <NavbarItem>
                        {/* bg-[#F29441] rounded */}
                        <NavLink end to="/home" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                            Inicio
                        </NavLink>
                    </NavbarItem>
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    className=" text-white font-light rounded p-2"
                                    radius="sm"
                                    variant="light"
                                >
                                    Features
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu>
                            <DropdownItem>
                                <NavLink end to="/cursos" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                    Cursos
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink end to="/asistencia" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                    Asistencia
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink end to="/facilitador" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                    Facilitadores
                                </NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <NavbarItem>
                        <NavLink end to="/caja" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'}>
                            Caja
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        className=" text-white font-semibold text-xl rounded p-2"
                                        radius="sm"
                                        variant="light"
                                    >
                                        sadas
                                        {/* {decryptedData[0].usuario} */}
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu>
                                {/* {decryptedData[0].rol === "Administrador" ? <DropdownItem>
                                    <NavLink end to="/admin" className={({ isActive }) => isActive ? 'font-bold text-sm rounded p-2' : 'font-light'} >
                                        Control
                                    </NavLink>
                                </DropdownItem> : null} */}


                                <DropdownItem>
                                    <Button
                                        className=" h-2 "
                                        variant="light"
                                        onClick={() => remover()}
                                    >
                                        salir
                                    </Button>

                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}

        </div >
    );
}

export default Layout;
