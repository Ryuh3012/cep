import logo from "../../../assets/icon.png";
import icon3 from "../../../assets/sigea.webp";
import icon4 from "../../../assets/aula.webp";
import icon5 from "../../../assets/icons8-facebook.svg";
import icon6 from "../../../assets/icons8-whatsapp.svg";
import icon7 from "../../../assets/icons8-mail-100.png";
import icon8 from "../../../assets/icons8-x-100.png";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";
const Asident = () => {
    return (
        <div className=" flex flex-col shadow-xl gap-5 h-full">
            <div className="h-full">
                <div className="bg-red-600 p-2 rounded-lg text-white">
                    <p>FOC - COORDINACIÓN DE FORMACIÓN COMPLEMENTARIA</p>
                </div>
                <ul className="flex flex-col p-2 gap-2">

                    <li className="text-sm">
                        Programación Permanente
                    </li>
                    <li className=" text-sm ">
                        (FOC) Registro de Actividad - Certificados internos y externos
                    </li>
                </ul>
            </div>
            <div className="h-full">
                <div>
                    <div className="bg-red-600 p-2 rounded-lg text-white">
                        <p>CEP -COORDINACIÓN DE EXTENSIÓN PROFESIONAL</p>

                    </div>
                    <div className="flex flex-col justify-center items-center p-2">
                        <Image src={logo} width={300} />

                        <Link className="">
                            <p className="text-sm p-1 hover:text-red-600">Programación permanente de cursos</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-full">
                <div>
                    <div className="bg-red-600 p-2 rounded-lg text-white">
                        <p>SIGEA - SISTEMA DE GESTIÓN ACADÉMICA</p>

                    </div>
                    <div className="flex flex-col justify-center items-center p-2">
                        <Image src={icon3} width={300} />
                        <Link to='http://caracas.iujo.edu.ve/sigea/'>
                            <p className="text-sm p-1 hover:text-red-600">Entrar al SIGEA - Sistema de Gestión Académica</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-full">
                <div className="bg-red-600 p-2 rounded-lg text-white w-full">
                    <p>Entrar al SIGEA - Sistema de Gestión Académica</p>
                </div>

                <div className="flex flex-col justify-center items-center p-2">
                    <Image src={icon4} width={300} />
                    <Link to='https://aulaccs.iujoac.org.ve'>
                        <p className="text-sm p-1 hover:text-red-600">Entorno Virtual de Aprendizaje (EVA) IUJO Caracas</p>
                    </Link>
                </div>
            </div>

            <div className="h-full">
                <div className="bg-red-600 p-1 rounded-lg text-white w-full">
                    <p>Oferta Académica</p>
                </div>
                <ul className="flex flex-col p-2 gap-2">
                    <Link to='https://webiujocatia.wordpress.com/carreras-ofertadas/'>
                        <li className="text-sm hover:text-red-600">Carreras Ofertadas</li>
                    </Link>
                    <Link to='https://webiujocatia.wordpress.com/pensa-de-estudio/'>
                        <li className=" text-sm hover:text-red-600">Pensa de Estudio</li>
                    </Link>
                    <Link to='https://webiujocatia.wordpress.com/wp-content/uploads/2015/01/reglamento-interno-de-evaluacic3b3n-iujo-dic2014.pdf'>
                        <li className=" text-sm hover:text-red-600">Reglamento Interno de Evaluación</li>
                    </Link>
                </ul>
            </div>
            <div className="h-full">
                <div className="bg-red-600 p-1 rounded-lg text-white">
                    <p>Organización</p>
                </div>
                <ul className="flex flex-col p-2 gap-2 ">
                    <Link to='/nosotros'>
                        <li className="text-sm hover:text-red-600">Historia del IUJO</li>
                    </Link>
                    <Link to='https://webiujocatia.wordpress.com/estructura-organizativa/'>
                        <li className=" text-sm hover:text-red-600">Estructura Organizativa</li>
                    </Link>
                    <Link to='https://webiujocatia.wordpress.com/direccion-nacional-de-educacion-superior-de-fe-y-alegria/'>
                        <li className=" text-sm hover:text-red-600">Dirección de Educación Universitaria de Fe y Alegría</li>
                    </Link>
                </ul>
            </div>
            <div className="h-full">
                <ul className="flex justify-center items-center gap-3">
                    <Link className="flex justify-center items-center hover:-translate-y-2 hover:mx-2">
                        <Image src={icon8} width={40} />
                    </Link>
                    <Link to='mailto:catiadireccion@iujo.edu.ve' className="flex justify-center items-center hover:-translate-y-2 hover:mx-2">
                        <Image src={icon7} width={40} />
                    </Link>
                    <Link to='https://www.facebook.com/657316811021139?ref=embed_page' className="flex justify-center items-center hover:-translate-y-2 hover:mx-2">
                        <Image src={icon5} width={40} />

                    </Link>
                    <Link to='https://wa.me/584127569790' className="flex justify-center items-center hover:-translate-y-2 hover:mx-2">
                        <Image src={icon6} width={40} />
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Asident;
