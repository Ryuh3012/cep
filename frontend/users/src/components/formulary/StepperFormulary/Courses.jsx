import { Select, SelectItem } from "@nextui-org/react";

import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import axios from "axios";

const Courses = () => {

    const { handleBlur, handleSubmit, handleChange, values: { cursos } } = useContext(StepperContext)
    console.log(cursos);
    // const [courses, setCourses] = useState([]);

    // useEffect(() => {

    //     return async () => {
    //         const { data: { messager } } = await axios.get('http://localhost:3000/api/courses/')
    //         setCourses(...courses, messager)
    //     }
    // }, [courses]);

    const courses = ['(CEP-CISCO-01) - Módulo 1: Introduction to Network', '(CEP-CISCO-02) - Módulo 2: Switching, Routing and Wireless Essentials (SRWE)', '(CEP-03) - Curso de Diseño para NO Diseñadores', '(CEP-04) - Mantenimiento y Reparación de PC - Nivel Básico', '(CEP-07) - Super poderes del diseño Web', '(CEP-01) - Curso de Buenas Prácticas en Excel para Administradores y Contadores (Nivel BÁSICO)', '(CEP-05) - Buenas Prácticas en Excel para Administradores y Contadores (NIVEL INTERMEDIO)', '(CEP-14) -Curso de Asistente a la Gerencia de Talento Humano']
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
                            {courses.map((e) => <SelectItem key={e}>{e}</SelectItem>)}

                        </Select>
                    </div>

                </div>
            </div>
        </form>
    );
}

export default Courses;
