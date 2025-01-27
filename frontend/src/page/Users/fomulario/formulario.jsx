import Layout from "../../Admin/layout";


const FormularioPage = () => {
    return (
        <Layout>
            <section className="bg-[#d9dbe0]">
                <div className="p-10 flex flex-col gap-6">
                    <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                        <h1 className='text-[30px] font-semibold text-center'>Inscripción</h1>
                        <form action="" method="post">
                            <h2 className="text-center font-mont font-semibold text-lg border-b-2 mt-4 mx-20 mb-6 border-[#2A398C] sm:text-left">Datos del participante</h2>
                            <div className= "justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10">
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Nombres</p>
                                    <input type="text" name="nombres" placeholder="Ingresa tus nombres" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Apellidos</p>
                                    <input type="text" name="Apellidos" placeholder="Ingresa tus apellidos" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>
                                
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Número de cédula</p>
                                    <input type="number" name="cedula" placeholder="Ingresa tu cédula" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>                                           
                            </div>

                            <div className= "justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10">
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Correo</p>
                                    <input type="email" name="correo" placeholder="nombre@gmail.com" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Teléfono de Contacto</p>
                                    <input type="number" name="telefono" placeholder="Ingresa tu teléfono" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Tipo de Participante</p>
                                    <select name="tipo" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md">
                                        <option value="1">Estudiante IUJO</option>
                                        <option value="2">Personal IUJO</option>
                                        <option value="3">Participantes Externos</option>
                                    </select>
                                </section>                       
                            </div>

                            <h2 className="text-center font-mont font-semibold text-lg border-b-2 mt-8 mx-20 mb-6 border-[#2A398C] sm:text-left">Datos del curso</h2>
                            <div className= "justify-items-center grid grid-cols-1 sm:grid-cols-2 mx-40">
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Curso a Inscribir</p>
                                    <select name="tipo" className="mb-4 w-auto h-8 font-mont text-center border-2 border-gray-500 rounded-md">
                                        <option value="1">Módulo 1: Introduction to Network</option>
                                        <option value="2">Módulo 2: Switching, Routing and Wireless Essentials</option>
                                        <option value="3">Diseño para NO Diseñadores</option>
                                    </select>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Monto de Inversión</p>
                                    <input type="number" name="monto" placeholder="Ingresar monto" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>                       
                            </div>

                            <h2 className="text-center font-mont font-semibold text-lg border-b-2 mt-8 mx-20 mb-6 border-[#2A398C] sm:text-left">Detalles de pago</h2>
                            <div className= "justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10">
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Forma de pago</p>
                                    <select name="tipo_pago" className="mb-4 w-auto h-8 font-mont text-center border-2 border-gray-500 rounded-md">
                                        <option value="1">Transferencia Bancaria</option>
                                        <option value="2">Divisas en efectivo</option>
                                        <option value="3">Bolívares en efectivo</option>
                                        <option value="3">Débito / Punto de Venta </option>
                                        <option value="3">Financiamiento</option>
                                        <option value="3">Cancelar el dia de Inicio del Curso</option>
                                    </select>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Monto total de la transferencia</p>
                                    <input type="text" name="montoT" placeholder="Bolívares o dólares" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>
                                
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Número de Transferencia</p>
                                    <input type="number" name="numero" placeholder="Nro de referencia" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>                                           
                            </div>

                            <div className= "justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10">
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Banco emisor del pago</p>
                                    <input type="text" name="banco" placeholder="Banco" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Fecha del pago</p>
                                    <input type="date" name="fecha" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Cédula del titular de la cuenta </p>
                                    <input type="text" name="cedulaT" placeholder="Ingresa la cédula" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>                       
                            </div>

                            <div className= "justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10">
                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Nombre del titular de la cuenta</p>
                                    <input type="text" name="nombreC" placeholder="Igresar nombre" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Observación</p>
                                    <input type="text" name="observacion" placeholder="Detalle que desee aclarar" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>

                                <section>
                                    <p className= "font-mont font-bold text-base p-1">Soporte de Pago </p>
                                    <input type="file" name="pagoT" className="mb-4 w-60 h-8 font-mont text-center border-2 border-gray-500 rounded-md"/>
                                </section>                       
                            </div>

                        </form>

                        
                    </div>
                </div>
            </section>
            
        </Layout>
    );
}

export default FormularioPage;