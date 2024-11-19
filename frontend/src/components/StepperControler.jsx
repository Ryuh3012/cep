/* eslint-disable react/prop-types */

const StepperControler = ({ handleClick, currentStep }) => {
    return (
        <div className="container flex justify-around mb-2">
            <button
                onClick={() => handleClick()}
                className={`bg-white text-slate-400 uppercase w-[25%] py-3 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:border-[#6A2473] hover:bg-[#6A2473] hover:text-white transition duration-2oo ease-in-out ${currentStep == 1 ? 'opacity-50 cursor-not-allowed' : ''}`} >Atras</button>

            <button
                onClick={() => handleClick("next")}
                className="bg-[#8C113E] text-slate-400 uppercase w-[25%] py-3 px-4 rounded-xl font-semibold cursor-pointer  hover:bg-[#6A2473] hover:text-white transition duration-2oo ease-in-out" > Siguiente</button>
        </div>
    );
}

export default StepperControler;
