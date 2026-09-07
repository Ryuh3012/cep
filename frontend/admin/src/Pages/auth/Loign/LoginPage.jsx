import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import CryptoJS from "crypto-js";
import Cookies from 'universal-cookie';

import { loginValidate } from "../../../security/Login/ValidateLogin.mjs";


import img from "../../../assets/img.jpg";
import cepLogo from '../../../assets/icon2.png';
import user from '../../../assets/icons/User.png';
import passwor from '../../../assets/icons/password.png';
import LoginLayout from "../LoginLayout";
import { SocketContext } from "../../../SocketProvider";


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

            socket.on('[bag] correct', async (data) => {


                console.log(data)
                if (data?.length !== 0) {
                    const cookies = new Cookies()
                    const cripto = CryptoJS.AES.encrypt(JSON.stringify(data.token), 'users').toString();

                    cookies.set('user', JSON.stringify(cripto))
                    setMessage('El usuario se ha logueado correctamente')
                    return setTimeout(() => {
                        setMessage()
                        return navegation('/home')
                    }, 3000);

                }
                else {
                    setErrorInternal('Credenciales invalidas')
                    setTimeout(() => {
                        setErrorInternal(null)
                    }, 2000)
                }


            })

        },
        validate: (values) => loginValidate({ values })

    })

    console.log(errors);
    return (
        <LoginLayout>
            <section className="flex justify-center items-center w-full h-full">
                <div className="flex h-3/4 bg-white rounded-3xl shadow-2xl w-full md:w-3/4 relative overflow-hidden">

                    <img
                        src={cepLogo}
                        alt="CEP Logo"
                        className="absolute opacity-10 top-0 left-1/2 transform -translate-x-40   object-cover"
                    />

                    <div className="w-full md:w-1/2 p-8 relative z-10 flex flex-col justify-between">
                        <div>
                            <div className="w-full text-left">
                                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase block">
                                    Coordinación de Extensión Profesional
                                </span>
                                <h1 className="text-xl font-bold text-gray-800">
                                    <span className="text-blue-500">CEP</span> Admin
                                </h1>
                            </div>

                            {errorInternal && (
                                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
                                    <span>⚠️</span> {errorInternal}
                                </div>
                            )}

                            <div className="w-full pt-6">
                                <h2 className="text-3xl font-bold text-blue-500 mb-1">Bienvenido</h2>
                                <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
                                <p className="text-gray-400 text-sm mb-6">Inicia sesión en tu cuenta</p>

                                <form onSubmit={handleSubmit} className="space-y-4">

                                    <div className="w-full space-y-1">
                                        <div className="relative flex items-center">
                                            <div className="absolute left-3.5 flex items-center pointer-events-none">
                                                <img src={user} alt="icono" className="w-5 h-5 object-contain" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Cédula"
                                                name="cedula"
                                                value={cedula}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full rounded-xl border py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:outline-none ${errors?.cedula
                                                    ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500/20'
                                                    : 'border-gray-300 bg-gray-50/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    } pl-10 pr-3.5`}
                                            />
                                        </div>
                                        {/* Mensaje de error justo debajo del input */}
                                        {errors?.cedula && (
                                            <p className="text-red-500 text-xs pl-1 font-medium flex items-center gap-1">
                                                ⚠️ {errors.cedula}
                                            </p>
                                        )}
                                    </div>

                                    <div className="w-full space-y-1">
                                        <div className="relative flex items-center">
                                            <div className="absolute left-3.5 flex items-center pointer-events-none">
                                                <img src={passwor} alt="icono" className="w-5 h-5 object-contain" />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full rounded-xl border py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:outline-none ${errors?.password
                                                    ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500/20'
                                                    : 'border-gray-300 bg-gray-50/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    } pl-10 pr-3.5`}
                                            />
                                        </div>
                                        {errors?.password && (
                                            <p className="text-red-500 text-xs pl-1 font-medium flex items-center gap-1">
                                                ⚠️ {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/20"
                                        >
                                            Iniciar sesión
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="w-full text-center text-xs text-gray-400 pt-6">
                            CEP Admin &copy; {new Date().getFullYear()}
                        </div>
                    </div>

                    <img src={img} className="h-full w-full md:w-1/2 object-cover rounded-r-3xl hidden md:block" />
                </div>
            </section>


        </LoginLayout>
    );
}

export default LoginPage;
