import { Button, Image, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import CryptoJS from "crypto-js";
import axios from "axios";
import Cookies from 'universal-cookie';


import { Link } from "react-router-dom";
import { loginValidate } from "../../../../segurity/Login/ValidateLogin.mjs";

import img from "../../../../assets/img.jpg";
import icon from '../../../../assets/icon2.png';
import LoginLayout from "../LoginLayout";
import { SocketContext } from "../../../../SocketProvider";

const initialValues = { cedula: '', password: '' }

const LoginPage = () => {
    const navegation = useNavigate()
    const { socket } = useContext(SocketContext)


    const [errorInternal, setErrorInternal] = useState(null)
    const [messager, setMessage] = useState(null)

    const { errors, touched, handleBlur, handleSubmit, handleChange, values: { cedula, password } } = useFormik({

        initialValues,
        onSubmit: async (value) => {

            socket.emit('[bag] sesion', value)

            // socket.on('[bag] correct', (data) => {

            //     if (data?.length !== 0) {

            //         // const cookis = new Cookies()
            //         // const cripto = CryptoJS.AES.encrypt(JSON.stringify(data.user), 'users').toString()

            //         // cookis.remove('user')
            //         // cookis.set('user', JSON.stringify(cripto))
            //         setMessage()
            //         setTimeout(() => {
            //             setMessage(null)
            //             return navegation('/home')
            //         }, 3000);
            //     }
            // })

        },
        validate: (values) => loginValidate({ values })

    })

    useEffect(() => {

        socket.on('error', ({ message }) => {
            setErrorInternal(message)
            setTimeout(() => {
                setErrorInternal(null)
            }, 2000)
        })
    }, [errorInternal]);

    return (
        <LoginLayout>
            <section className="flex justify-center items-center w-full h-full">
                <div className="flex h-3/4 bg-white rounded-3xl ">
                    <div className="h-full shadow-2xl w-full md:w-1/2">
                        <div className="flex flex-col justify-center items-center h-full rounded-3xl">
                            <div className="flex flex-col h-full justify-center items-center">
                                <div className="flex flex-col px-5">
                                    <div className="flex justify-center items-center w-full ">
                                        <img src={icon} className="w-[20%]" />
                                    </div>
                                    <div className="divide-y divide-y-reverse divide-blue-500 py-1">
                                        <p className="text-lg font-semibold font-mono ">Bienvenido a la Coordinación de Extensión Profesional</p>
                                        <p className="py-2 opacity-35"> Ingresa las credenciales asignadas</p>
                                    </div>
                                </div>
                                {errors.cedula && touched.cedula || errors.password && touched.password || errorInternal ?
                                    <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-danger-600 bg-danger-50 ">
                                        {(errors.cedula && touched.cedula) && (<p>{errors.cedula}</p>)}
                                        {(errors.password && touched.password) && (<p>{errors.password}</p>)}
                                        {errorInternal && (<p>{errorInternal}</p>)}
                                    </div> : null}

                                {messager ?
                                    <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-success-700 dark:text-success bg-success-50">
                                        (<p>{messager}</p>)
                                    </div>
                                    : null}
                                <div className="w-full p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col gap-2">

                                            <Input
                                                type="text"
                                                variant='faded'
                                                label="Usuario"
                                                name="cedula"
                                                value={cedula}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required={true}
                                                placeholder="Introduzca su usuario"
                                            />
                                            <Input
                                                type="password"
                                                variant='faded'
                                                label="Contraseña"
                                                name="password"
                                                value={password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required={true}
                                                placeholder="Introduzca su contraseña"
                                            />
                                        </div>
                                        <div className="py-5">
                                            <Button type="submit" className="bg-[#8C113E]  uppercase w-full p-6 rounded-xl font-semibold cursor-pointer hover:bg-[#6A2473] text-white transition duration-2oo ease-in-out">
                                                inciar Sesion
                                            </Button>
                                            <p className="mt-5 text-center hover:text-red-700 hover:opacity-100 opacity-45 hover:-translate-y-1 "><Link to={'/recuperar'}>¿Olvidaste tu contraseña?</Link></p>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Image src={img} className="h-full w-full hidden md:block" />
                </div>
            </section>


        </LoginLayout>
    );
}

export default LoginPage;
