import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom"
import Icon from "../assets/icon2.png";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
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
                        <NavLink end to="/home" className={({ isActive }) => isActive ? 'bg-[#F29441] rounded p-2' : 'font-light hover:rounded p-2'} >
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
                                <NavLink end to="/cursos" className={({ isActive }) => isActive ? 'font-bold text-sm rounded p-2' : 'font-light'} >
                                    Cursos
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink end to="/asistencia" className={({ isActive }) => isActive ? 'font-bold text-sm p-2' : 'font-light'} >
                                    Asistencia
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink end to="/facilitador" className={({ isActive }) => isActive ? 'font-bold text-sm p-2' : 'font-light'} >
                                    Facilitadores
                                </NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <NavbarItem>
                        <NavLink end to="/caja" className={({ isActive }) => isActive ? 'bg-[#F29441] rounded p-2' : ' font-light'}>
                            Caja
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}

        </div >
    );
}

export default Layout;
