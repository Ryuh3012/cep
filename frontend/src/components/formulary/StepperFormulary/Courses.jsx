import { Select, SelectItem } from "@nextui-org/react";

import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import axios from "axios";

const Courses = () => {

    const { handleBlur, handleSubmit, handleChange, values: { cursos } } = useContext(StepperContext)
    console.log(cursos);
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        return async () => {
            const { data: { messager } } = await axios.get('http://localhost:3000/api/courses/')
            setCourses(...courses, messager)
        }
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
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
                            {courses.map(({ idcurso: id, codigodecuso, nombrecurso }) => <SelectItem key={id}>({codigodecuso}) {nombrecurso}</SelectItem>)}

                        </Select>
                    </div>

                </div>
            </div>
        </form>
    );
}

export default Courses;
