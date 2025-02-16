import { Select, SelectItem } from "@nextui-org/react";

import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import { SocketContext } from "../../../SocketProvider";

const Courses = () => {

    const { socket } = useContext(SocketContext)

    const { handleBlur, handleSubmit, handleChange, values: { cursos } } = useContext(StepperContext)

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        socket.emit('[bag] courses', () => { }, (listAllcourses) => setCourses(JSON.parse(listAllcourses)))
        return () => {
            socket.off('[bag] courses')
        }
    }, [socket])

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-y-2">
                <div className="flex flex-col w-full">
                    <Select
                        name="cursos"
                        label="cursos"
                        value={cursos}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        variant="faded"
                        color="secondary"
                        placeholder="Curso disponible"
                    >
                        {courses.map(({ idcurso, cursos }) => <SelectItem key={idcurso}>{cursos}</SelectItem>)}

                    </Select>

                </div>
            </div>
        </form>
    );
}

export default Courses;
