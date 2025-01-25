import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";


import icon from "../../assets/home.jpeg";
// import img2 from "../../assets/img2.jpg";
// import icon2 from "../../assets/semana.webp";

import LayoutDashboard from "./LayoutDashboard";




const HomePague = () => {

    return (
        <LayoutDashboard>
            <div >
                <div className="flex">
                    <main className="flex h-screen ">
                        <div>
                            <article className="flex flex-col justify-center items-center p-2 ">
                                <div >
                                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                                </div>
                                <div className="flex flex-col justify-center items-center p-2">
                                    <Image src={icon} width={700} height={500} />
                                    <Link>
                                        <p className="text-xl p-2 hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                                    </Link>
                                </div>
                            </article>
                            <article className="flex flex-col justify-center items-center p-2 ">
                                <div >
                                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                                </div>
                                <div className="flex flex-col justify-center items-center p-2">
                                    <Image src={icon} width={700} height={500} />
                                    <Link>
                                        <p className="text-xl p-2 hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                                    </Link>
                                </div>
                            </article>
                            <article className="flex flex-col justify-center items-center p-2 ">
                                <div >
                                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                                </div>
                                <div className="flex flex-col justify-center items-center p-2">
                                    <Image src={icon} width={700} height={500} />
                                    <Link>
                                        <p className="text-xl p-2 hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                                    </Link>
                                </div>
                            </article>
                            <article className="flex flex-col justify-center items-center p-2 ">
                                <div >
                                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                                </div>
                                <div className="flex flex-col justify-center items-center p-2">
                                    <Image src={icon} width={700} height={500} />
                                    <Link>
                                        <p className="text-xl p-2 hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                                    </Link>
                                </div>
                            </article>
                        </div>
                    </main>
                </div>
            </div>

        </LayoutDashboard >
    );
}

export default HomePague;
