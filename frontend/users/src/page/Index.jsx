import { Link } from "react-router-dom";
import { Card, Image } from "@nextui-org/react";


import img from "../assets/img3.jpeg";
import icon from "../assets/semana.webp";
import img2 from "../assets/img4.webp";

import LayoutDashboard from "./LayoutDashboard";




const HomePague = () => {

    return (
        <LayoutDashboard>
            <main className="flex flex-col h-full w-full gap-y-2 px-2 ">
                <Card className="flex flex-col justify-center items-center gap-y-2 p-2">
                    <p className="text-3xl font-bold">PREINGRESO UNIVERSITARIO hasta el 31/01/2025</p>
                    <p className="text-3xl font-bold hover:text-red-600">
                        <Link to='https://webiujocatia.wordpress.com/registro-preingreso/'>
                            Detalles del Proceso ¡Presiona AQUÍ!
                        </Link>
                    </p>
                    <p className="text-2xl font-bold">CUPOS LIMITADOS</p>
                    <div className="flex flex-col items-center">
                        <Image src={img} width={750} height={550} alt="HeroUI hero Image with delay" />
                        <Link>
                            <p className="text-2xl hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                        </Link>
                    </div>
                </Card>
                <Card className="flex flex-col gap-y-2 p-2 justify-center items-center">
                    <p className="text-2xl font-bold  hover:text-red-600">CELEBREMOS JUNTOS NUESTRO 26°
                        <br />ANIVERSARIO…»con el corazón en Catia»</p>
                    <div className="flex flex-col items-center">
                        <Image src={icon} width={750} height={550} alt="HeroUI hero Image with delay" />
                        <Link to='https://webiujocatia.wordpress.com/2024/10/25/celebremos-juntos-nuestro-26-aniversario-con-el-corazon-en-catia/'>
                            <p className="text-xl hover:text-red-600">Detalles del Proceso ¡Presiona AQUÍ!</p>
                        </Link>
                    </div>
                </Card>
                <Card className="flex flex-col gap-y-2 p-2">
                    <Link to='https://webiujocatia.wordpress.com/2024/10/19/bienvenidos-al-nuevo-periodo-ii-2024-octubre-2024-febrero-2025/'>
                        <p className="text-2xl font-bold">BIENVENIDOS AL PERÍODO II-2024 / OCTUBRE 2024 – FEBRERO 2025</p>
                    </Link>
                    <div className="flex flex-col items-center">
                        <Image src={img2} width={750} height={550} alt="HeroUI hero Image with delay" />

                    </div>
                </Card>

            </main>
        </LayoutDashboard >
    );
}

export default HomePague;
