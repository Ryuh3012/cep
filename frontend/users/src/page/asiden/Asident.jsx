import logo from "../../assets/icon.png";
import icon3 from "../../assets/sigea.webp";
import icon4 from "../../assets/aula.webp";
import icon5 from "../../assets/icons8-facebook.svg";
import icon6 from "../../assets/icons8-whatsapp.svg";
import icon7 from "../../assets/icons8-mail-100.png";
import icon8 from "../../assets/icons8-x-100.png";

import { Link } from "react-router-dom";
import { Image, Card, CardBody, Button } from "@nextui-org/react";

const Asident = () => {
    return (
        <aside className="hidden md:flex md:flex-col w-72 shrink-0 gap-4">
            {/* Tarjeta CEP */}
            <Card className="shadow-sm border border-slate-200/80 bg-white">
                <CardBody className="p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                            Extensión Profesional
                        </h3>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Image src={logo} alt="Logo CEP" className="w-32 object-contain" />
                        <Link
                            to="/Extension-Profesional"
                            className="w-full text-center text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 px-3 rounded-lg transition-colors"
                        >
                            Ver Cursos Disponibles
                        </Link>
                    </div>
                </CardBody>
            </Card>

            {/* Portales Académicos Rápidos */}
            <Card className="shadow-sm border border-slate-200/80 bg-white">
                <CardBody className="p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                            Portales Universitarios
                        </h3>
                    </div>

                    {/* SIGEA */}
                    <a
                        href="http://caracas.iujo.edu.ve/sigea/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-2 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                    >
                        <Image src={icon3} alt="SIGEA" className="w-10 h-10 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">SIGEA IUJO</span>
                            <span className="text-[11px] text-slate-500">Gestión Académica</span>
                        </div>
                    </a>

                    {/* EVA */}
                    <a
                        href="https://aulaccs.iujoac.org.ve"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-2 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all"
                    >
                        <Image src={icon4} alt="EVA" className="w-10 h-10 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700">Aula Virtual EVA</span>
                            <span className="text-[11px] text-slate-500">Campus Online Caracas</span>
                        </div>
                    </a>
                </CardBody>
            </Card>

            {/* Oferta y Enlaces */}
            <Card className="shadow-sm border border-slate-200/80 bg-white">
                <CardBody className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                            Enlaces de Interés
                        </h3>
                    </div>
                    <ul className="flex flex-col gap-1 text-xs text-slate-600">
                        <li>
                            <a
                                href="https://webiujocatia.wordpress.com/carreras-ofertadas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-1 hover:text-red-600 transition-colors"
                            >
                                ↗ Carreras Ofertadas
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://webiujocatia.wordpress.com/pensa-de-estudio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-1 hover:text-red-600 transition-colors"
                            >
                                ↗ Pensa de Estudio
                            </a>
                        </li>
                        <li>
                            <Link to="/nosotros" className="block py-1 hover:text-red-600 transition-colors">
                                ↗ Historia del IUJO
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://webiujocatia.wordpress.com/wp-content/uploads/2015/01/reglamento-interno-de-evaluacic3b3n-iujo-dic2014.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-1 hover:text-red-600 transition-colors"
                            >
                                ↗ Reglamento de Evaluación
                            </a>
                        </li>
                    </ul>
                </CardBody>
            </Card>

            {/* Redes Sociales y Contacto */}
            <Card className="shadow-sm border border-slate-200/80 bg-white">
                <CardBody className="p-3 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Contacto y Redes
                    </span>
                    <div className="flex items-center justify-center gap-3 py-1">
                        <a
                            href="mailto:catiadireccion@iujo.edu.ve"
                            title="Correo Institucional"
                            className="p-1.5 rounded-full hover:bg-slate-100 transition-all hover:scale-110"
                        >
                            <img src={icon7} alt="Email" className="w-6 h-6 object-contain" />
                        </a>
                        <a
                            href="https://wa.me/584127569790"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp"
                            className="p-1.5 rounded-full hover:bg-slate-100 transition-all hover:scale-110"
                        >
                            <img src={icon6} alt="WhatsApp" className="w-6 h-6 object-contain" />
                        </a>
                        <a
                            href="https://www.facebook.com/657316811021139?ref=embed_page"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                            className="p-1.5 rounded-full hover:bg-slate-100 transition-all hover:scale-110"
                        >
                            <img src={icon5} alt="Facebook" className="w-6 h-6 object-contain" />
                        </a>
                    </div>
                </CardBody>
            </Card>
        </aside>
    );
};

export default Asident;

