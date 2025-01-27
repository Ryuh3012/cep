import { Image } from '@nextui-org/react';

import { LayoutDashboard } from '../../components/Navbar/Navbaar';

import logo from '../../assets/img3.jpg';

const NosotrosPage = () => {
    return (
        <LayoutDashboard>
            <main className=' flex w-full h-full p-4  '>
                <article className='flex bg-slate-50 w-full gap-5 px-5 rounded-lg'>
                    <div>
                        <div className='flex justify-center items-center'>
                            <p className='text-2xl font-bold'>
                                coordinación de extensión profesional
                            </p>
                        </div>
                        <div className='flex flex-col gap-3 p-2 ' >
                            <Image src={logo} width={900} height={500} />
                            <p className='font-medium text-2xl  '>
                                La Unidad de Extensión Profesional del IUJO A.C., es una instancia de servicios profesionales, técnicos, pedagógicos y de producción, enmarcada en la dimensión de extensión universitaria y orientada al desarrollo de procesos de integración entre la triada universidad, empresas y comunidades.
                            </p>
                            <p className='font-medium text-2xl clear-both'>
                                Con autonomía funcional, de gestión autofinanciada y rentable, su objetivo es ofrecer servicios, pedagógicos, técnicos y de producción, competitivos en el mercado que permitan generar recursos y aporta al desarrollo local.
                            </p>
                        </div>
                    </div>
                </article>

            </main>
        </LayoutDashboard >
    );
}

export default NosotrosPage;
