import { Card, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const CardInfo = ({ img, title }) => {
    return (
        <Card className="p-2" >
            <NavLink to="/participant">
                <section >
                    <Image src={img} alt="cisco1" width={500} />
                    <p className="font-mont font-bold text-gray-950 text-lg m-2">{title}</p>
                </section>
            </NavLink>
        </Card>
    );
}

export default CardInfo;
