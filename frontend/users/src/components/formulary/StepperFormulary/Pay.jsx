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
    const inputStyle =
        "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all";


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full h-full justify-center items-center gap-y-4">
                <h3 className="text-lg font-semibold text-gray-700 self-start">
                    💳 Información de Pago
                </h3>

                <div className="flex flex-col w-full">
                    <select
                        name="tipoDePago"
                        label="Tipo De Pago"
                        value={tipoDePago}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="bordered"
                        color="secondary"
                        placeholder="Seleccione un tipo de pago"
                        className={inputStyle}
                    >
                        {typePague.map(e => <option key={e} value={e} className="sm:w-full">{e}</option>)}
                    </select>
                </div>

                {tipoDePago == 'Transferencia Bancaria' ? <div className="flex w-full flex-col gap-3">

                    <div className="flex flex-col w-full ">
                        <select
                            name="banco"
                            value={banco}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="bordered"
                            color="secondary"
                            placeholder="Seleccione El Banco"
                            className={inputStyle}
                        >
                            {bancos.map(e => <option key={e} value={e} className="sm:w-full">{e}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full gap-2">
                        <div className='flex flex-col w-full'>
                            <input
                                name="titularDeLaCedula"
                                label="Cédula Del Titular De La Cuenta"
                                value={titularDeLaCedula}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputStyle}
                                placeholder="Ej: V-12345678"
                            />

                        </div>
                        <div className='flex flex-col sm:flex-row w-full'>
                            <input
                                name="nombreDelTitulante"
                                value={nombreDelTitulante}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="bordered"
                                color="secondary"
                                className={inputStyle}
                                placeholder="Nombre completo del titular"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full gap-2">
                        <div className='flex flex-col w-full'>
                            <input
                                type="number"
                                label="Referencia"
                                name="referencia"
                                value={referencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Nro. de referencia"
                                className={inputStyle}
                            />

                        </div>
                        <div className='flex flex-col w-full'>
                            <input
                                type="date"
                                name="fechaDelPag"
                                value={fechaDelPag}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Seleccione la fecha"
                                className={inputStyle}
                            />
                        </div>

                    </div>
                </div> : null}

                <div className="flex w-full">
                    <div className='flex flex-col w-full gap-2'>
                        <input
                            type="number"
                            name="montoTotal"
                            label="Monto Total"
                            value={montoTotal}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={inputStyle}
                            placeholder="Monto en Bs o USD"
                        />
                    </div>
                </div>


            </div>
            <div className="flex justify-center items-center h-full p-4">
                <Button type="submit" className="bg-[#8C113E] text-white uppercase w-[25%] p-6 rounded-xl font-semibold cursor-pointer hover:bg-[#6A2473] hover:text-white transition duration-200 ease-in-out">
                    Confirmar
                </Button>
            </div>
        </form>
    );
}

export default Pay;
