import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";


import icon from "../../assets/home.jpeg";
// import img2 from "../../assets/img2.jpg";
// import icon2 from "../../assets/semana.webp";

import LayoutDashboard from "./LayoutDashboard";




const HomePague = () => {

    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 overflow-clip">
                <article className="flex flex-col gap-y-2">
                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                    <div className="flex flex-col items-center">
                        <Image src={icon} width={700} height={500} />
                        <Link>
                            <p className="text-xl hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                        </Link>
                    </div>
                </article>
                <article className="flex flex-col gap-y-2">
                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                    <div className="flex flex-col items-center">

                        <Image src={icon} width={700} height={500} />
                        <Link>
                            <p className="text-xl  hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                        </Link>
                    </div>
                </article>
                <article className="flex flex-col gap-y-2">
                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                    <div className="flex flex-col items-center">
                        <Image src={icon} width={700} height={500} />
                        <Link>
                            <p className="text-xl  hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                        </Link>
                    </div>
                </article>
                <article className="flex flex-col gap-y-2">
                    <p className="text-2xl font-bold">PREINGRESO UNIVERSITARIO desde el 02/12/2024 al 17/01/2025 (plazo extendido)</p>
                    <div className="flex flex-col items-center">

                        <Image src={icon} width={700} height={500} />
                        <Link>
                            <p className="text-xl  hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                        </Link>
                    </div>
                </article>
            </main>
        </LayoutDashboard >
    );
}

export default HomePague;
