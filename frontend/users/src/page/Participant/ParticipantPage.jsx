import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { validateParticipant } from "../../segurity/Participant/ValidateParticipant.mjs";

import Peoples from "../../components/formulary/StepperFormulary/Peoples";
import Courses from "../../components/formulary/StepperFormulary/Courses";
import Pay from "../../components/formulary/StepperFormulary/Pay";
import { StepperContext } from "../../contexts/StepperContext";
import StepperControler from "../../components/StepperControler";
import Stepper from "../../components/Stepper";
import { useContext } from "react";
import { SocketContext } from "../../SocketProvider";





const initialValues = {
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    tipoDeParticipante: '',
    cursos: '',
    tipoDePago: '',
    montoTotal: '',
    referencia: '',
    banco: '',
    fechaDelPag: '',
    titularDeLaCedula: '',
    nombreDelTitulante: ''
}
const ParticipantPage = () => {
    const navegation = useNavigate()
    const { socket } = useContext(SocketContext)


    const [currentStep, setCurrentStep] = useState(1);
    const [message, setMessage] = useState([])
    const { errors, touched, handleBlur, handleSubmit, handleChange, values } = useFormik({

        initialValues,
        validate: (values) => validateParticipant({ values }),
        onSubmit: async (values) => {

            socket.emit('[bag] addStudent', values)
            setMessage('¡Bienvenido! Tu registro ha sido exitoso. ')
            setTimeout(() => {
                setMessage(null)
                return navegation('/')
            }, 3000);

        }


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
            <section className="shadow-xl  rounded-2xl pb-2 bg-white flex flex-col sm:w-[70%] lg:w-1/2">
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
                            {
                                errors.cedula && touched.cedula || errors.nombre && touched.nombre ||
                                    errors.apellido && touched.apellido || errors.email && touched.email ||
                                    errors.telefono && touched.telefono || errors.tipoDeParticipante && touched.tipoDeParticipante ||
                                    errors.cursos && touched.cursos || errors.tipoDePago && touched.tipoDePago ||
                                    errors.montoTotal && touched.montoTotal ?
                                    <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-danger-600 bg-danger-50 ">
                                        {(errors.cedula && touched.cedula) && (<p>{errors.cedula}</p>)}
                                        {(errors.nombre && touched.nombre) && (<p>{errors.nombre}</p>)}
                                        {(errors.apellido && touched.apellido) && (<p>{errors.apellido}</p>)}
                                        {(errors.email && touched.email) && (<p>{errors.email}</p>)}
                                        {(errors.telefono && touched.telefono) && (<p>{errors.telefono}</p>)}
                                        {(errors.tipoDeParticipante && touched.tipoDeParticipante) && (<p>{errors.tipoDeParticipante}</p>)}
                                        {(errors.cursos && touched.cursos) && (<p>{errors.cursos}</p>)}
                                        {(errors.tipoDePago && touched.tipoDePago) && (<p>{errors.tipoDePago}</p>)}
                                        {(errors.montoTotal && touched.montoTotal) && (<p>{errors.montoTotal}</p>)}
                                        {message && (<p>{message}</p>)}
                                    </div> : null}

                            {message.length !== 0 && (
                                <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-success-700 dark:text-success bg-success-50">
                                    <p>{message}</p>
                                </div>
                            )

                            }
                            {displayStep(currentStep)}
                        </StepperContext.Provider>
                    </div>
                </div>

                <StepperControler
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={steps}
                />
            </section>
        </div>
    );
}

export default ParticipantPage;

