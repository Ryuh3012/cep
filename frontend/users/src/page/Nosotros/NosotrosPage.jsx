import { Card, CardBody, Image } from '@nextui-org/react';
import LayoutDashboard from '../LayoutDashboard';
import logo from '../../assets/img3.jpg';

const NosotrosPage = () => {
    return (
        <LayoutDashboard>
            <main className="flex flex-col w-full h-full p-4 md:p-6 gap-6">
                <Card className="shadow-sm border border-slate-200/80 bg-white">
                    <CardBody className="p-6 md:p-8 flex flex-col gap-6">
                        <div className="border-b border-slate-200 pb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Quiénes Somos</span>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 uppercase mt-1">
                                Coordinación de Extensión Profesional (CEP)
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">Instituto Universitario Jesús Obrero (IUJO A.C.)</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="w-full lg:w-1/2 overflow-hidden rounded-xl shadow-md">
                                <Image
                                    src={logo}
                                    alt="Sede IUJO Catia"
                                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            <div className="w-full lg:w-1/2 flex flex-col gap-4 text-slate-700">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                                    <h2 className="font-bold text-base text-slate-900 mb-1">Misión y Propósito</h2>
                                    <p className="text-sm md:text-base leading-relaxed text-slate-600">
                                        La Unidad de Extensión Profesional del IUJO A.C., es una instancia de servicios profesionales, técnicos, pedagógicos y de producción, enmarcada en la dimensión de extensión universitaria y orientada al desarrollo de procesos de integración entre la triada universidad, empresas y comunidades.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                                    <h2 className="font-bold text-base text-slate-900 mb-1">Objetivos de Gestión</h2>
                                    <p className="text-sm md:text-base leading-relaxed text-slate-600">
                                        Con autonomía funcional, de gestión autofinanciada y rentable, su objetivo es ofrecer servicios pedagógicos, técnicos y de capacitación competitivos en el mercado que permitan generar recursos y aportar significativamente al desarrollo local y socioproductivo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </main>
        </LayoutDashboard>
    );
};

export default NosotrosPage;

