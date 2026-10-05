/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";

const StepperControler = ({ handleClick, currentStep, steps }) => {
    return (
        <div className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-t border-slate-100 mt-2">
            <Button
                variant="bordered"
                isDisabled={currentStep === 1}
                onPress={() => handleClick()}
                className="font-bold text-xs md:text-sm uppercase tracking-wider text-slate-600 border-slate-300 hover:bg-slate-100"
            >
                ← Anterior
            </Button>

            {currentStep < steps.length && (
                <Button
                    onPress={() => handleClick("next")}
                    className="bg-[#2A398C] border-slate-300 hover:bg-[#1E2B6D] text-white font-bold text-xs md:text-sm uppercase rounded-xl tracking-wider shadow-md"
                >
                    Siguiente →
                </Button>
            )}
        </div>
    );
};

export default StepperControler;

