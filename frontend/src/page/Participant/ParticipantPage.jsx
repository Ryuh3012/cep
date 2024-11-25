import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

import StepperControler from "../../components/StepperControler";
import Stepper from "../../components/Stepper";
import { StepperContext } from "../../contexts/StepperContext";

import Peoples from "../../components/formulary/StepperFormulary/Peoples";
import Pay from "../../components/formulary/StepperFormulary/Pay";
import Courses from "../../components/formulary/StepperFormulary/Courses";
import { validateParticipant } from "../../segurity/Participant/ValidateParticipant.mjs";


const initialValues = { cedula: '', email: '', nombre: '', apellido: '', telefono: '', tipoDeParticipante: '', cursos: '', prince: '', tipoDePago: '', montoTotal: '', referencia: '', banco: '', fechaDelPago: '', titularDeLaCedula: '', NombreDelTitulante: '', }
const ParticipantPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const { errors, touched, handleBlur, handleSubmit, handleChange, values } = useFormik({

        initialValues,
        onSubmit: async (values) => {

            const { data } = await axios.post('http://localhost:3000/people', { data: values })

            console.log(data);

        },
        validate: (values) => validateParticipant({ values })


    })

    const steps = ['Datos', 'Cursos', 'Forma de pago']

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return < Peoples />;
            case 2:
                return < Courses />;
            case 3:
                return < Pay />;
        }

    }
    const handleClick = (direction) => {
        let newStep = currentStep
        direction == "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }



    return (
        <div className="flex justify-center items-center h-screen bg-[#2A398C]">
            <section className="shadow-xl w-1/2 rounded-2xl pb-2 bg-white">
                <div className="container horizontal mt-5">
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                    />
                    <div className="my-10 p-10">



                        <StepperContext.Provider value={{
                            handleBlur,
                            handleSubmit, handleChange,
                            values
                        }}>
                            {(errors.cedula && touched.cedula) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.cedula}</p>)}
                            {(errors.nombre && touched.nombre) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.nombre}</p>)}
                            {(errors.apellido && touched.apellido) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.apellido}</p>)}
                            {(errors.email && touched.email) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.email}</p>)}
                            {(errors.telefono && touched.telefono) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.telefono}</p>)}
                            {(errors.tipoDeParticipante && touched.tipoDeParticipante) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.tipoDeParticipante}</p>)}
                            {/* {(errors.cursos && touched.cursos) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.cursos}</p>)} */}
                            {(errors.tipoDePago && touched.tipoDePago) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.tipoDePago}</p>)}
                            {(errors.montoTotal && touched.montoTotal) && (<p className="bg-red-600 pl-4 text-white rounded-[3px] py-1">{errors.montoTotal}</p>)}
                            {displayStep(currentStep)}
                        </StepperContext.Provider>
                    </div>
                </div>
                {currentStep !== steps.length &&
                    <StepperControler
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                    />}
            </section>
        </div>
    );
}

export default ParticipantPage;

