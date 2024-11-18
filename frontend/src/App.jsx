import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
//import Navegation from "./Navegation";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';

export default function App() {
  const menuItems = [
    "Perfil",
    "Chat",
    "Cursos",
    "Estadísticas",
    "Certificados",
    "Cerrar sesión",
  ];

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Navbar disableAnimation isBlurred className="bg-white">
      <NavbarContent className="sm:hidden" justify="start">
      <NavbarMenuToggle /> 
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">CEP2</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">CEP1</p>
        </NavbarBrand>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" className="text-cep-azul">
            Cursos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Asistencia
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Estadísticas
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button onPress={onOpen} color="layout" className="text-cep-violeta border-1 border-cep-violeta hover:text-white hover:bg-cep-violeta">Iniciar sesión</Button>
          <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Iniciar sesión</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="CÉDULA"
                      placeholder="Ingrese su cédula"
                      type="number"
                      variant="bordered"
                    />
                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="CONTRASEÑA"
                      placeholder="Ingrese su contraseña"
                      type="password"
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Recuérdame
                      </Checkbox>
                      <Link className="text-cep-azul" href="#" size="sm">
                        ¿Olvidó su contraseña?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Ingresar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#" className="text-white bg-cep-violeta border-1 hover:text-cep-violeta hover:bg-white hover:border-cep-violeta">
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>    
  );
}