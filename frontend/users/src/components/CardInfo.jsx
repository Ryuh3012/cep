import { Card, CardBody, CardHeader, Image, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CardInfo = ({ img, title }) => {


    const [state, setstate] = useState([title]);
    return (
   


        <div>

            {setstate.length ? title : null}
        </div>




    );
}

export default CardInfo;
