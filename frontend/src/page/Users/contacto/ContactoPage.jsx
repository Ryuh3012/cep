import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import LayoutDashboard from '../LayoutDashboard';


import maps from '../../../assets/ubicacioniujocatia.jpg'
import correo from '../../../assets/icons8-mail-100.png'
import Telefono from '../../../assets/icons8-telephone-50.png'
import wp from '../../../assets/icons8-whatsapp.svg'

const ContactoPage = () => {
    return (
        <LayoutDashboard>
            <section className='flex  flex-col w-full h-full p-4 overflow-clip'>
                <article className='flex flex-col bg-slate-50 px-5'>
                    <p className='text-3xl font-semibold '>Contacto</p>
                    <article className="flex flex-col p-2 ">
                        <div >
                            <p className="text-2xl font-bold">Ubicacion :</p>
                        </div>
                        <div className="flex flex-col justify-center items-center  ">
                            <Link to='https://www.google.com/maps/place/IUJO+Caracas+-+Instituto+Universitario+%22Jes%C3%BAs+Obrero%22+-+Sede:+Caracas/@10.5105646,-66.9395055,17z/data=!4m6!3m5!1s0x8c2a5ff6246f083f:0x295392bbd82587cd!8m2!3d10.5107281!4d-66.937113!16s%2Fg%2F11spqgq0zr?entry=tts&g_ep=EgoyMDI0MTExOS4yIPu8ASoASAFQAw%3D%3D'>
                                <Image src={maps} width={700} height={500} className='hover:shadow-2xl hover:-translate-y-1 hover:-translate-x-2 hover:transition' />

                            </Link>
                        </div>
                    </article>
                    <article className='flex flex-col p-2 '>
                        <div >
                            <p className="text-2xl font-bold">Direccion :</p>
                        </div>
                        <div className='p-2'>
                            <p className='text-lg'>
                                Calle Real de los Flores de Catia con calle Andrés Bello, Edif. Jesús Obrero, Los Flores de Catia, Parroquia Sucre, Distrito Capital, Caracas 1030.
                            </p>
                        </div>
                    </article>
                    <article className='flex  gap-10'>
                        <div >
                            <div >
                                <p className="text-2xl font-bold"> Correo Electrónico:</p>
                            </div>
                            <div className='flex justify-start items-center p-2 '>
                                <Image src={correo} width={30} />
                                <p className='hover:text-red-500 px-1 hover:-translate-y-1 hover:-translate-x-1 transition'>
                                    <a href="mailto:catiadireccion@iujo.edu.ve ">catiadireccion@iujo.edu.ve </a>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div >
                                <p className="text-2xl font-bold">Teléfono :</p>
                            </div>
                            <div className='flex justify-start items-center p-2 '>
                                <Image src={Telefono} width={30} />
                                <p className='px-1'>
                                    (+58-212) 862.71.72
                                </p>
                            </div>
                        </div>
                        <div>
                            <div >
                                <p className="text-2xl font-bold">WhatsApp :</p>
                            </div>
                            <div className='flex justify-start items-center p-2 '>
                                <Image src={wp} width={30} />
                                <p className='hover:text-red-500 px-1 hover:-translate-y-1 hover:-translate-x-1 transition'>
                                    <a href="https://wa.me/584127569790">(+58-412) 7569790</a>
                                </p>
                            </div>
                        </div>
                    </article>
                </article>

            </section>
        </LayoutDashboard >
    );
}

export default ContactoPage;
