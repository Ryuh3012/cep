import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import { useContext } from "react";
import { StepperContext } from "../../../contexts/StepperContext";

const Pay = () => {

    const { handleBlur, handleSubmit, handleChange, values: { tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante } } = useContext(StepperContext)

    const typePague = ['Transferencia Bancaria', 'Divisas en efectivo ( directamente en caja principal)', 'Bolívares en efectivo ( directamente en caja principal)', 'Débito / Punto de Venta (directamente en caja principal)', 'Financiamiento', 'Cancelar el dia de Inicio del Curso']
    const bancos = [
        "BANCO MERCANTIL",
        "BANESCO",
        "BANCO DE VENEZUELA",
        "BANCO DEL TESORO",
        "BANCO BICENTENARIO",
        "BANCO EXTERIOR",
        "BANCO PROVINCIAL",
        "BANCO DEL CARIBE",
        "BANCO VENEZOLANO DE CREDITO",
        "100%BANCO",
        "ABN AMRO BANK"
        , "BANCAMIGA"
        , "BANCO ACTIVO"
        , "BANCO AGRICOLA"
        , "BANCO CARONI"
        , "BANCO DE DESARROLLO DEL MICROEMPRESARIO"
        , "BANCO DEL PUEBLO SOBERANO",
        "BANCO ESPIRITO SANTO",
        "BANCO INDUSTRIAL DE VENEZUELA",
        "BANCO INTERNACIONAL DE DESARROLLO",
        "BANCO NACIONAL DE CREDITO",
        "BANCO OCCIDENTAL DE DESCUENTO",
        "BANCO PLAZA",
        "BANCRECER",
        "BANFANB",
        "BANGENTE",
        "BANPLUS BANCO COMERCIAL C.A",
        "CITIBANK",
        "CORP BANCA",
        "DELSUR BANCO UNIVERSAL",
        "FONDO COMUN",
        "INSTITUTO MUNICIPAL DE CREDITO POPULAR",
        "MIBANCO BANCO DE DESARROLLO, C.A",
        "SOFITASA",
        "BOLIVAR BANCO,C.A",
        "CENTRAL BANCO",
        "BANFOANDES",
        "BANORTE",
        "BANCO GUAYANA",
        "BANCO CONFEDERADO"
    ]

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-y-2">
                <div className="flex flex-col w-full ">

                    <Select
                        name="tipoDePago"
                        label="Tipo De Pago"
                        value={tipoDePago}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // required={true}
                        variant="faded"
                        color="secondary"
                        placeholder="Participante"

                    >
                        {typePague.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                    </Select>

                </div>

                {tipoDePago == 'Transferencia Bancaria' ? <div className="flex w-full flex-col gap-3">

                    <div className="flex flex-col w-full ">

                        <Select
                            name="banco"
                            label="Bancos"
                            value={banco}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="faded"
                            color="secondary"
                            placeholder="Seleccione El Banco"

                        >
                            {bancos.map(e => <SelectItem key={e}>{e}</SelectItem>)}
                        </Select>
                    </div>

                    <div className="flex w-full gap-3">
                        <div className='flex flex-col w-full gap-2'>
                            <Input
                                name="titularDeLaCedula"
                                label="Cedula Del Titulante De La cuenta"
                                value={titularDeLaCedula}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="faded"
                                color="secondary"
                                placeholder="Ingre La Cedula Del Titulante De La cuenta"
                            />

                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <Input
                                label="Nombre Del Titulante De La cuenta"
                                name="nombreDelTitulante"
                                value={nombreDelTitulante}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="faded"
                                color="secondary"
                                placeholder="Ingrese El Nombre Del Titulante De La cuenta"
                            />
                        </div>
                    </div>

                    <div className="flex w-full gap-3">
                        <div className='flex flex-col w-full gap-2'>
                            <Input
                                type="number"
                                label="Referencia"
                                name="referencia"
                                value={referencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="faded"
                                color="secondary"
                                placeholder="Introduce El Apellido"
                            />

                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <Input
                                type="date"
                                label="Fecha el Que Se Hizo el Pago"
                                name="fechaDelPag"
                                value={fechaDelPag}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="faded"
                                color="secondary"
                                placeholder="Introduce El Apellido"
                            />
                        </div>

                    </div>
                </div> : null}

                <div className="flex w-full gap-3">
                    <div className='flex flex-col w-full gap-2'>
                        <Input
                            type="number"
                            name="montoTotal"
                            label="monto Total"
                            value={montoTotal}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // required={true}
                            variant="faded"
                            color="secondary"
                            placeholder="Introduce El Nombre"
                        />

                    </div>
                </div>


            </div>
            <div className="flex justify-center items-center h-full p-4">
                <Button type="submit" className="bg-[#8C113E] text-slate-400 uppercase w-[25%] p-6 rounded-xl font-semibold cursor-pointer  hover:bg-[#6A2473] hover:text-white transition duration-2oo ease-in-out">
                    Confirmar
                </Button>
            </div>
        </form>
    );
}

export default Pay;
