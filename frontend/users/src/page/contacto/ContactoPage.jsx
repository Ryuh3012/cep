import { Image, Card, CardBody } from '@nextui-org/react';

import LayoutDashboard from '../LayoutDashboard';

import maps from '../../assets/ubicacioniujocatia.jpg'
import correo from '../../assets/icons8-mail-100.png'
import Telefono from '../../assets/icons8-telephone-50.png'
import wp from '../../assets/icons8-whatsapp.svg'

const ContactoPage = () => {
    return (
        <LayoutDashboard>
            <main className="flex flex-col w-full gap-y-6 px-4 py-6 max-w-5xl mx-auto">
                <h1 className='text-3xl font-bold text-center text-gray-800'>
                    Contacto
                </h1>

                {/* Ubicación */}
                <Card className="shadow-md">
                    <CardBody className="p-6">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">📍 Ubicación</h2>
                        <a
                            href='https://www.google.com/maps/place/IUJO+Caracas+-+Instituto+Universitario+%22Jes%C3%BAs+Obrero%22+-+Sede:+Caracas/@10.5105646,-66.9395055,17z/data=!4m6!3m5!1s0x8c2a5ff6246f083f:0x295392bbd82587cd!8m2!3d10.5107281!4d-66.937113!16s%2Fg%2F11spqgq0zr?entry=tts&g_ep=EgoyMDI0MTExOS4yIPu8ASoASAFQAw%3D%3D'
                            target="_blank"
                            rel="noopener noreferrer"
                            className='flex justify-center'
                        >
                            <Image
                                src={maps}
                                width={700}
                                height={500}
                                alt="Ubicación IUJO Catia"
                                className='hover:shadow-2xl hover:-translate-y-1 transition rounded-lg'
                            />
                        </a>
                    </CardBody>
                </Card>

                {/* Dirección */}
                <Card className="shadow-md">
                    <CardBody className="p-6">
                        <h2 className="text-xl font-bold text-gray-700 mb-2">🏛️ Dirección</h2>
                        <p className='text-base text-gray-600 leading-relaxed'>
                            Calle Real de los Flores de Catia con calle Andrés Bello, Edif. Jesús Obrero,
                            Los Flores de Catia, Parroquia Sucre, Distrito Capital, Caracas 1030.
                        </p>
                    </CardBody>
                </Card>

                {/* Datos de contacto */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* Correo */}
                    <Card className="shadow-md">
                        <CardBody className="p-5 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Image src={correo} width={28} alt="Correo" />
                                <h3 className="text-lg font-bold text-gray-700">Correo Electrónico</h3>
                            </div>
                            <a
                                href="mailto:catiadireccion@iujo.edu.ve"
                                className='text-sm md:text-base text-blue-600 hover:text-red-500 transition hover:-translate-y-0.5'
                            >
                                catiadireccion@iujo.edu.ve
                            </a>
                        </CardBody>
                    </Card>

                    {/* Teléfono */}
                    <Card className="shadow-md">
                        <CardBody className="p-5 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Image src={Telefono} width={28} alt="Teléfono" />
                                <h3 className="text-lg font-bold text-gray-700">Teléfono</h3>
                            </div>
                            <p className='text-sm md:text-base text-gray-600'>
                                (+58-212) 862.71.72
                            </p>
                        </CardBody>
                    </Card>

                    {/* WhatsApp */}
                    <Card className="shadow-md">
                        <CardBody className="p-5 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Image src={wp} width={28} alt="WhatsApp" />
                                <h3 className="text-lg font-bold text-gray-700">WhatsApp</h3>
                            </div>
                            <a
                                href="https://wa.me/584127569790"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-sm md:text-base text-green-600 hover:text-green-700 transition hover:-translate-y-0.5'
                            >
                                (+58-412) 7569790
                            </a>
                        </CardBody>
                    </Card>
                </div>
            </main>
        </LayoutDashboard>
    );
}

export default ContactoPage;
