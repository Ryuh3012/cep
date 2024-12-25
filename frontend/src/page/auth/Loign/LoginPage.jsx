import { Button, Image, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import CryptoJS from "crypto-js";


import axios from "axios";
import Cookies from 'universal-cookie';

import LoginLayout from "../LoginLayout";

import img from "../../../assets/img.jpg";
import iujo from "../../../assets/IUJO.gif";
import { Link } from "react-router-dom";
import { loginValidate } from "../../../segurity/Login/ValidateLogin.mjs";

const initialValues = { cedula: '', password: '' }

const LoginPage = () => {
    const navegation = useNavigate()

    const [errorInternal, setErrorInternal] = useState(null)
    const [messager, setMessage] = useState(null)

    const { errors, touched, handleBlur, handleSubmit, handleChange, values: { cedula, password } } = useFormik({

        initialValues,
        onSubmit: async (value) => {
            try {

                const data = await axios.post('http://localhost:3000/api/auth/singIn', { user: value })
                console.log(data);
                if (data?.length !== 0) {

                    const cookis = new Cookies()
                    const cripto = CryptoJS.AES.encrypt(JSON.stringify(data.user), 'users').toString()

                    cookis.remove('user')
                    cookis.set('user', JSON.stringify(cripto))
                    setMessage(data.messager)
                    setTimeout(() => {
                        setMessage(null)
                        return navegation('/home')
                    }, 3000);
                }
            }
            catch ({ response: { data: { messager } } }) {
                setErrorInternal(messager)
                setTimeout(() => {
                    setErrorInternal(null)
                }, 3000);
            }

        },
        validate: (values) => loginValidate({ values })

    })

    return (
        <LoginLayout>
            <section className="flex justify-center items-center w-full h-full">
                <div className="container flex w-4/5 h-[70%] justify-between bg-white rounded-3xl shadow-2xl">
                    <Image src={img} className="h-full lg:w-full lg:block sm:hidden" />
                    <div className="h-full shadow-2xl ">
                        <div className="flex flex-col h-full rounded-3xl ">
                            <div className="w-full flex justify-end p-5 px-3">
                                <Image src={iujo} className="w-[150px]" />
                            </div>
                            <div className="flex flex-col h-full justify-center items-center">
                                <div className="p-5 text-center">
                                    <p className="text-xl font-semibold font-mono">Bienvenido A La Coordinación de Extensión Profesional</p>

                                </div>
                                {errors.cedula && touched.cedula || errors.password && touched.password || errorInternal ?
                                    <div className="w-full bg-red-600 pl-4 text-white rounded-[3px] py-1">
                                        {(errors.cedula && touched.cedula) && (<p>{errors.cedula}</p>)}
                                        {(errors.password && touched.password) && (<p>{errors.password}</p>)}
                                        {errorInternal && (<p>{errorInternal}</p>)}
                                    </div> : null}

                                {messager ?
                                    (<p className="w-full bg-green-600 pl-4 text-white rounded-[3px] py-1">{messager}</p>)
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
                                                placeholder="Introduzca Su Usuario"
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
                                                placeholder="Introduzca Su contraseña"
                                            />
                                        </div>
                                        <div className="py-5">
                                            <Button type="submit" className="bg-[#8C113E]  uppercase w-full p-6 rounded-xl font-semibold cursor-pointer hover:bg-[#6A2473] text-white transition duration-2oo ease-in-out">
                                                inciar Sesion
                                            </Button>

                                        </div>
                                        <div className="flex justify-between">

                                            <p className="mt-5 text-center  opacity-60 "><Link to={'/recuperar'}>¿Olvidaste tu contraseña?</Link></p>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </LoginLayout>
    );
}

export default LoginPage;
