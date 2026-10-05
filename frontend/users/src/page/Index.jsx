import { Link } from "react-router-dom";
import { Card, CardBody, Image, Button } from "@nextui-org/react";

import img from "../assets/img3.jpeg";
import icon from "../assets/semana.webp";
import img2 from "../assets/img4.webp";
import LayoutDashboard from "./LayoutDashboard";

const HomePague = () => {
    return (
        <LayoutDashboard>
            <main className="flex flex-col w-full h-full gap-6">
                {/* Hero Banner CEP */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2A398C] via-[#3B4FA8] to-[#8C113E] p-6 md:p-8 text-white shadow-md">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="max-w-xl">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                                Formación Continua & Certificaciones
                            </span>
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                Impulsa tu Crecimiento con la Coordinación de Extensión Profesional
                            </h1>
                            <p className="text-xs md:text-sm text-slate-100 mt-2 leading-relaxed">
                                Cursos especializados en Cisco Networking, Oficios Tecnológicos y Liderazgo Gerencial con respaldo del Instituto Universitario Jesús Obrero.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                            <Button
                                as={Link}
                                to="/Extension-Profesional"
                                className="bg-white text-[#2A398C] font-bold text-sm shadow hover:bg-slate-100"
                            >
                                Explorar Cursos
                            </Button>
                            <Button
                                as={Link}
                                to="/participant"
                                className="bg-[#8C113E] text-white font-bold text-sm shadow hover:bg-[#6A2473] border border-white/20"
                            >
                                Inscribirme Ahora
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tarjetas de Anuncios y Actividades */}
                <div className="flex flex-col gap-6">
                    {/* Tarjeta 1: Preingreso */}
                    <Card className="shadow-sm border border-slate-200/80 bg-white hover:shadow-md transition-shadow">
                        <CardBody className="p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-center">
                            <div className="w-full lg:w-1/2 overflow-hidden rounded-xl bg-slate-100">
                                <Image
                                    src={img}
                                    alt="Preingreso Universitario"
                                    className="w-full h-64 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col gap-3">
                                <span className="text-xs font-bold uppercase text-red-600 tracking-wider">
                                    Proceso Académico
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                                    Preingreso Universitario hasta el 31/01/2025
                                </h2>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                    Inicia tu trayectoria profesional en el IUJO Catia. Consulta los requisitos, fechas de formalización y carreras técnicas universitarias disponibles.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <a
                                        href="https://webiujocatia.wordpress.com/registro-preingreso/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm transition-colors"
                                    >
                                        Detalles del Proceso ¡Presiona AQUÍ! ↗
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Tarjeta 2: 26° Aniversario */}
                    <Card className="shadow-sm border border-slate-200/80 bg-white hover:shadow-md transition-shadow">
                        <CardBody className="p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-center">
                            <div className="w-full lg:w-1/2 overflow-hidden rounded-xl bg-slate-100">
                                <Image
                                    src={icon}
                                    alt="26 Aniversario IUJO"
                                    className="w-full h-64 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col gap-3">
                                <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">
                                    Celebración Institucional
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                                    Celebremos Juntos Nuestro 26° Aniversario
                                </h2>
                                <p className="text-sm font-semibold text-slate-700 italic">
                                    «Con el corazón en Catia»
                                </p>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                    Más de dos décadas formando profesionales éticos, competentes y comprometidos con el desarrollo integral de nuestras comunidades.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <a
                                        href="https://webiujocatia.wordpress.com/2024/10/25/celebremos-juntos-nuestro-26-aniversario-con-el-corazon-en-catia/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A398C] hover:bg-[#1E2B6D] text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm transition-colors"
                                    >
                                        Ver Reseña Conmemorativa ↗
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Tarjeta 3: Período Académico */}
                    <Card className="shadow-sm border border-slate-200/80 bg-white hover:shadow-md transition-shadow">
                        <CardBody className="p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-center">
                            <div className="w-full lg:w-1/2 overflow-hidden rounded-xl bg-slate-100">
                                <Image
                                    src={img2}
                                    alt="Nuevo Período Académico"
                                    className="w-full h-64 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col gap-3">
                                <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                                    Comunidad Universitaria
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                                    Bienvenidos al Período Académico II-2024
                                </h2>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                    Información para estudiantes regulares, horarios de aula presencial y virtual (EVA), cronograma de evaluaciones y lineamientos académicos vigentes.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <a
                                        href="https://webiujocatia.wordpress.com/2024/10/19/bienvenidos-al-nuevo-periodo-ii-2024-octubre-2024-febrero-2025/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm transition-colors"
                                    >
                                        Información del Período ↗
                                    </a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </main>
        </LayoutDashboard>
    );
};

export default HomePague;

