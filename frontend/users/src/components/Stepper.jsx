/* eslint-disable react/prop-types */

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="w-full max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
            {steps.map((stepTitle, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                    <div
                        key={stepTitle}
                        className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}
                    >
                        {/* Círculo del paso con su etiqueta debajo */}
                        <div className="flex flex-col items-center relative">
                            <div
                                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                                    isCompleted
                                        ? 'bg-emerald-600 text-white shadow-md'
                                        : isActive
                                        ? 'bg-[#2A398C] text-white ring-4 ring-[#2A398C]/20 shadow-md'
                                        : 'bg-slate-100 text-slate-400 border border-slate-300'
                                }`}
                            >
                                {isCompleted ? (
                                    <span className="text-base font-extrabold">✓</span>
                                ) : (
                                    <span>{stepNumber}</span>
                                )}
                            </div>

                            <span
                                className={`absolute -bottom-6 whitespace-nowrap text-[11px] md:text-xs font-semibold uppercase tracking-wider ${
                                    isActive
                                        ? 'text-[#2A398C]'
                                        : isCompleted
                                        ? 'text-emerald-700'
                                        : 'text-slate-400'
                                }`}
                            >
                                {stepTitle}
                            </span>
                        </div>

                        {/* Línea conectora entre pasos */}
                        {index !== steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-2 transition-all duration-300 rounded ${
                                    isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;

