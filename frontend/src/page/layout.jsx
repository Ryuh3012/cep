import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom"
import Icon from "../assets/icon2.png";

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
                        <NavLink end to="/cursos" className={({ isActive }) => isActive ? 'bg-[#F29441] rounded p-2' : 'text-black font-light'} >
                            Inicio
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem>
                        <NavLink end to="/" className={({ isActive }) => isActive ? 'bg-purple-500 rounded p-2' : ' font-light'}>
                            casos
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink end to="/" className={({ isActive }) => isActive ? 'bg-purple-500 rounded p-2' : ' font-light'}>
                            clientes
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}

        </div>
    );
}

export default Layout;
