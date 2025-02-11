
import { useContext } from "react";
import { StepperContext } from "../../../contexts/StepperContext";
import { Input, Select, SelectItem } from "@nextui-org/react";




const Peoples = () => {

    const { handleBlur, handleSubmit, handleChange, values: { cedula, nombre, apellido, telefono, email, tipoDeParticipante } } = useContext(StepperContext)
    const tipoDeParticipants = ['Estudiante IUJO', 'Participantes Externos', 'Personal IUJO']

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center py-1 gap-y-2 ms:flex-col">
                <div className="flex flex-col w-full">

                    <Input
                        type="number"
                        name="cedula"
                        label="Cedula"
                        value={cedula}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        variant="faded"
                        color="secondary"
                        placeholder="Introduce La Cedula"
                    />
                </div>
                <div className="lg:flex w-full gap-3">
                    <div className='flex flex-col w-full gap-2'>
                        <Input
                            name="nombre"
                            label="Nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Nombre"
                        />

                    </div>
                    <div className='flex flex-col w-full gap-2 sm:py-1'>
                        <Input
                            type="text"
                            label="Apellido"
                            name="apellido"
                            value={apellido}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Apellido"
                        />
                    </div>

                </div>
                <div className="lg:flex  w-full gap-3">
                    <div className='flex flex-col w-full lg:gap-2 '>
                        <Input
                            type="email"
                            name="email"
                            label="Correo"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Nombre"
                        />

                    </div>
                    <div className='flex flex-col w-full gap-2 sm:py-1'>
                        <Input
                            type="text"
                            label="Telefono"
                            name="telefono"
                            value={telefono}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Apellido"
                        />
                    </div>

                </div>
                <div className="lg:flex w-full gap-3">
                    <Select
                        name="tipoDeParticipante"
                        label="Tipo De Participante"
                        value={tipoDeParticipante}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        variant="faded"
                        color="secondary"
                        placeholder="Participante"
                    >
                        {tipoDeParticipants.map((e) => <SelectItem key={e}>{e}</SelectItem>)}

                    </Select>
                </div>

            </div>
        </form>

    );
}

export default Peoples;
