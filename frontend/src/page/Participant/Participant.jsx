import { useState } from "react";

import StepperControler from "../../components/StepperControler";
import Stepper from "../../components/Stepper";

import Peoples from "../../components/formulary/StepperFormulary/Peoples";
import Courses from "../../components/formulary/StepperFormulary/courses";
import Pay from "../../components/formulary/StepperFormulary/Pay";
import Final from "../../components/formulary/StepperFormulary/Final";
import { StepperContext } from "../../contexts/StepperContext";

const Participant = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setuserData] = useState('');
    const [finalData, setFinalData] = useState([]);

    const steps = ['Datos', 'Cursos', 'Forma de pago', 'Complete']

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return < Peoples />;
            case 2:
                return < Courses />;
            case 3:
                return < Pay />;
            case 4:
                return < Final />;

        }

    }
    const handleClick = (direction) => {
        let newStep = currentStep
        direction == "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#2A398C]">
            <section className="shadow-xl w-[60%] rounded-2xl pb-2 bg-white">
                <div className="container horizontal mt-5">
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                    />
                    <div className="my-10 p-10">
                        <StepperContext.Provider value={{
                            userData,
                            setuserData,
                            finalData,
                            setFinalData
                        }}>
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

export default Participant;
