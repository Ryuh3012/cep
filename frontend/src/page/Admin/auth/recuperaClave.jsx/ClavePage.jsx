import { Button, Image, Input } from '@nextui-org/react';
import LoginLayout from '../LoginLayout';
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom'

// import { loginValidate } from "../../segurity/Login/ValidateLogin.mjs";

import img from "../../../../assets/img.jpg";
import icon from "../../../../assets/icon2.png";

import axios from 'axios';
import Cookies from 'universal-cookie';
import CryptoJS from "crypto-js";

import { useState } from 'react';

const initialValues = { email: '' }

const ClavePage = () => {
    const [messager, setMessager] = useState([])
    const [errorInternal, setErrorInternal] = useState([]);
    const navegation = useNavigate()

    const { handleBlur, handleSubmit, handleChange, values: { email } } = useFormik({
        initialValues,
        onSubmit: async ({ email }) => {
            try {
                // INGLES ESPAÑOOL ..................
                const { data } = await axios.post(`http://localhost:3000/renover/${email}`)
                if (data?.length !== 0) {
                    const cokis = new Cookies()

                    if (cokis.set('token')) cokis.remove('token')

                    const cripto = CryptoJS.AES.encrypt(JSON.stringify(data.token), 'hola').toString()

                    cokis.set('token', JSON.stringify(cripto))

                    setMessager(data.msg)
                    setTimeout(() => {
                        setMessager([])
                        return navegation('/login')
                    }, 3000);

                }
            }
            catch ({ response: { data: { msg } } }) {
                console.log(msg);
                setErrorInternal(msg)
                setTimeout(() => {
                    setErrorInternal([])
                    return navegation('/login')
                }, 3000);
            }

        }
    })
    return (
        <LoginLayout>
            <section className="flex justify-center items-center w-full h-full">
                <div className=" flex h-[75%] justify-between bg-white rounded-3xl shadow-2xl">
                    <div className="h-full  shadow-2xl ">
                        <div className="flex flex-col h-full w-full rounded-3xl ">
                            <div className="flex flex-col h-full w-full justify-center ">
                                <div className="flex flex-col px-5 ">
                                    <div className="flex justify-center items-center w-full  ">
                                        <img src={icon} className="w-[20%]" />
                                    </div>
                                    <div className="divide-y divide-y-reverse divide-slate-400">
                                        <p className="text-xl font-semibold "> Recuperar contraseña</p>
                                        <p className="py-2  opacity-35"> Ingresar los datos solicitados para recuperar tu contraseña</p>
                                    </div>
                                </div>
                                {messager.length !== 0 ?

                                    <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-success-700 dark:text-success bg-success-50">

                                        <p> {messager} </p>
                                    </div> : null}
                                {errorInternal.length !== 0 ?
                                    <div className="flex  flex-col w-full justify-center items-center py-1 pl-4 text-danger-600 dark:text-danger-500 bg-danger-50 dark:bg-danger-50/50 ">

                                        <p> {errorInternal} </p>
                                    </div> : null}

                                <div className="w-full p-5">
                                    <form onSubmit={handleSubmit}>


                                        <div className="flex flex-col gap-2">

                                            <Input
                                                type="email"
                                                variant='faded'
                                                label="Correo"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required={true}
                                            />

                                        </div>
                                        <div className="py-5">
                                            <Button type="submit" className="bg-[#8C113E]  uppercase w-full p-6 rounded-xl font-semibold cursor-pointer hover:bg-[#6A2473] text-white transition duration-2oo ease-in-out">
                                                inciar Sesion
                                            </Button>
                                            <p className="mt-5 text-center hover:text-red-700 hover:opacity-100 opacity-45 hover:-translate-y-1 "><Link to={'/'}>Atras</Link></p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Image src={img} className="h-full lg:w-full lg:block hidden" />

                </div>
            </section>
        </LoginLayout >
    );
}

export default ClavePage;
