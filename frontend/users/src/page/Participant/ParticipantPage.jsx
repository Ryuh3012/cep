import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";

import { validateParticipant } from "../../segurity/Participant/ValidateParticipant.mjs";

import Peoples from "../../components/formulary/StepperFormulary/Peoples";
import Courses from "../../components/formulary/StepperFormulary/Courses";
import Pay from "../../components/formulary/StepperFormulary/Pay";
import { StepperContext } from "../../contexts/StepperContext";
import StepperControler from "../../components/StepperControler";
import Stepper from "../../components/Stepper";
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
    const [successMessage, setSuccessMessage] = useState('');

    const { errors, touched, handleBlur, handleSubmit, handleChange, values } = useFormik({
        initialValues,
        validate: (values) => validateParticipant({ values }),
        onSubmit: async (values) => {
            socket.emit('[bag] addStudent', values)
            setSuccessMessage('¡Bienvenido! Tu registro ha sido exitoso.')
        }
    })

    const steps = ['Datos', 'Cursos', 'Forma de pago']

    // Collect all active validation errors into a single array
    const errorMessages = useMemo(() => {
        const fields = [
            'cedula', 'nombre', 'apellido', 'email',
            'telefono', 'tipoDeParticipante', 'cursos',
            'tipoDePago', 'montoTotal'
        ];
        return fields
            .filter(f => errors[f] && touched[f])
            .map(f => errors[f]);
    }, [errors, touched]);

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Peoples />;
            case 2:
                return <Courses />;
            case 3:
                return <Pay />;
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep
        direction == "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#2A398C] to-[#1a2560] p-4">
            <Card className="w-full  max-w-2xl shadow-2xl">
                <CardBody className="p-0 bg-white rounded-xl">
                    {/* Header */}
                    <div className="bg-[#8C113E] text-white text-center py-4 rounded-t-xl">
                        <h1 className="text-xl font-bold tracking-wide">Formulario de Inscripción</h1>
                        <p className="text-sm text-white/70 mt-1">Coordinación de Extensión Profesional — IUJO</p>
                    </div>

                    <div className="px-6 pt-6 pb-2">
                        <Stepper
                            steps={steps}
                            currentStep={currentStep}
                        />
                    </div>

                    <div className="px-6 py-6 ">
                        {/* Validation errors */}
                        {errorMessages.length > 0 && (
                            <div className="mb-4 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3">
                                <p className="text-sm font-semibold text-danger-700 mb-1">Por favor corrija los siguientes errores:</p>
                                <ul className="list-disc list-inside text-sm text-danger-600 space-y-0.5">
                                    {errorMessages.map((msg, i) => (
                                        <li key={i}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Success message */}
                        {successMessage && (
                            <div className="mb-4 rounded-lg border border-success-200 bg-success-50 px-4 py-3 text-center">
                                <p className="text-success-700 font-semibold">{successMessage}</p>
                                <Button
                                    as={Link}
                                    to="/"
                                    size="sm"
                                    color="success"
                                    variant="flat"
                                    className="mt-2"
                                >
                                    Volver al Inicio
                                </Button>
                            </div>
                        )}

                        <StepperContext.Provider value={{
                            handleBlur,
                            handleSubmit, handleChange,
                            values
                        }}>
                            {displayStep(currentStep)}
                        </StepperContext.Provider>
                    </div>

                    <StepperControler
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                    />
                </CardBody>
            </Card>
        </div>
    );
}

export default ParticipantPage;
