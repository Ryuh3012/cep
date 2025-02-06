import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const CardInfo = ({ img, title }) => {
    return (
        <Card className="p-2 hover:-translate-y-2" >
            <NavLink to="">
                <Image src={img} alt="cisco1" width={500} />
                <CardBody className="font-mont font-bold text-center text-gray-950 text-lg m-2">
                    <p>{title}</p>
                </CardBody>
            </NavLink>
        </Card >
    );
}

export default CardInfo;
