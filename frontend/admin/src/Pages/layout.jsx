import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuItem } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react";

import Cookies from 'universal-cookie';
import CryptoJS from "crypto-js";


import Icon from "../assets/icon2.png";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    const navegation = useNavigate()

    const [token, setToken] = useState(null);
    const cookis = new Cookies();


    useEffect(() => {
        const token = cookis.get('user')
        const bytes = CryptoJS.AES.decrypt(token, 'users');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setToken(decryptedData)
    }, []);

    const remover = () => {
        cookis.remove('user')
        return navegation('/')
    }
    return (
        <div className=" bg-[#d9dbe0] h-screen ">
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

                    {token?.roleid === 2 ?
                        <NavbarContent justify="center">
                            <NavbarItem>
                                <NavLink end to="/home" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'}>
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
                                            Cursos
                                        </Button>
                                    </DropdownTrigger>
                                </NavbarItem>

                                <DropdownMenu>
                                    <DropdownItem>
                                        <NavLink end to="/cursos" className={({ isActive }) => isActive ? 'text-lg font-semibold ' : 'font-light'} >
                                            Apertura
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink end to="/inscripcion" className={({ isActive }) => isActive ? 'text-lg font-semibold ' : 'font-light'} >
                                            Inscripción
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink end to="/facilitador" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'} >
                                            Facilitadores
                                        </NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarContent>
                        : null}

                    {
                        token?.roleid === 1 ? <NavbarItem>
                            <NavLink end to="/caja" className={({ isActive }) => isActive ? 'text-lg font-bold ' : 'font-light'}>
                                Caja
                            </NavLink>
                        </NavbarItem> : null

                    }

                    <NavbarItem>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        className=" text-white font-semibold text-xl"
                                        radius="none"
                                        variant=""
                                    >
                                        {token?.nombre}
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu>
                                {token?.roleid === 2 ? <DropdownItem>
                                    <Button
                                        className="h-1 p-2"
                                        variant="light"
                                    >
                                        <NavLink end to="/admin" className={({ isActive }) => isActive ? 'font-bold text-sm rounded p-2' : 'font-light'} >
                                            Control

                                        </NavLink>
                                    </Button>
                                </DropdownItem> : null}


                                <DropdownItem>
                                    <Button
                                        className="h-1 p-2"
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
