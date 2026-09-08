import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { User, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import CryptoJS from "crypto-js";
import Cookies from 'universal-cookie';
import { loginValidate } from "../../../security/Login/ValidateLogin.mjs";
import { SocketContext } from "../../../SocketProvider";
import LoginLayout from "../LoginLayout";
import img from "../../../assets/img.jpg";
import cepLogo from '../../../assets/icon2.png';

const initialValues = { cedula: '', password: '' };

const LoginPage = () => {
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext) || {};
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef(null);

    // Guardar sesión de forma unificada (sessionStorage + cookie cifrada legacy)
    const persistSession = (userObj) => {
        try {
            sessionStorage.setItem('cep_user', JSON.stringify(userObj));
            const cookies = new Cookies();
            const cripto = CryptoJS.AES.encrypt(JSON.stringify(userObj), 'users').toString();
            cookies.set('user', JSON.stringify(cripto), { path: '/' });
        } catch (e) {
            console.error('Error al persistir sesión:', e);
        }
    };

    // Escuchar respuesta por WebSocket como canal de respaldo
    useEffect(() => {
        if (!socket) return;

        const handleSocketAuth = (data) => {
            const userObj = data?.token || data?.user;
            if (userObj && (userObj.cedula || userObj.idUsuario || userObj.nombre)) {
                setIsLoading(false);
                persistSession(userObj);
                setSuccessMessage('Inicio de sesión exitoso. Redirigiendo...');
                timeoutRef.current = setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (data === null || (Array.isArray(data) && data.length === 0)) {
                setIsLoading(false);
                setErrorMessage('Usuario o contraseña incorrectos.');
                timeoutRef.current = setTimeout(() => setErrorMessage(null), 3500);
            }
        };

        socket.on('[bag] correct', handleSocketAuth);

        return () => {
            socket.off('[bag] correct', handleSocketAuth);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [socket, navigate]);

    // Gestión del formulario: HTTP prioritario con Cookie HttpOnly + Socket fallback
    const { errors, handleBlur, handleSubmit, handleChange, values: { cedula, password } } = useFormik({
        initialValues,
        validate: (values) => loginValidate({ values }),
        onSubmit: async (values) => {
            setErrorMessage(null);
            setSuccessMessage(null);
            setIsLoading(true);

            try {
                // 1. Intentar por endpoint HTTP seguro (fija Cookie HttpOnly)
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok && data?.user) {
                    persistSession(data.user);
                    setSuccessMessage('Inicio de sesión exitoso. Redirigiendo...');
                    timeoutRef.current = setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                    return;
                } else {
                    setErrorMessage(data?.message || 'Usuario o contraseña incorrectos.');
                    timeoutRef.current = setTimeout(() => setErrorMessage(null), 3500);
                }
            } catch (httpError) {
                console.warn('Fallo petición HTTP, intentando por WebSocket:', httpError);
                // 2. Si falla HTTP (ej. CORS o red), usar socket
                if (socket) {
                    socket.emit('[bag] sesion', values);
                    return;
                } else {
                    setErrorMessage('No se pudo conectar con el servidor.');
                    timeoutRef.current = setTimeout(() => setErrorMessage(null), 3500);
                }
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <LoginLayout>
            <section className="flex justify-center items-center w-full h-full p-4 sm:p-8">
                {/* Contenedor Principal amplio con tamaño restaurado (h-3/4 a h-[82vh]) */}
                <div className="flex h-full max-h-[720px] min-h-[560px] bg-white rounded-3xl shadow-2xl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 relative overflow-hidden">

                    {/* Marca de agua decorativa */}
                    <img
                        src={cepLogo}
                        alt="CEP Logo"
                         className="absolute opacity-10 top-0 left-1/2 -translate-x-40  object-cover"
                    />

                    {/* Columna Izquierda: Formulario (Espacioso y con scroll interno si la pantalla es reducida) */}
                    <div className="w-full md:w-1/2 p-8 sm:p-12 relative z-10 flex flex-col justify-between overflow-y-auto">
                        <div>
                            {/* Cabecera institucional */}
                            <div className="text-left">
                                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block">
                                    Coordinación de Extensión Profesional
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-0.5">
                                    <span className="text-blue-600">CEP</span> Admin
                                </h1>
                            </div>

                            {/* Alerta de Éxito */}
                            {successMessage && (
                                <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {/* Alerta de Error */}
                            {errorMessage && (
                                <div className="mt-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                                    <AlertCircle size={18} className="text-red-600 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <div className="pt-6 sm:pt-8">
                                <h2 className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">Bienvenido</h2>
                                <div className="h-1.5 w-12 bg-blue-600 rounded-full mb-3"></div>
                                <p className="text-slate-400 text-sm mb-6">
                                    Inicia sesión en tu cuenta administrativa
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    {/* Campo: Cédula */}
                                    <div className="space-y-1.5">
                                        <div className="relative flex items-center">
                                            <div className="absolute left-4 flex items-center pointer-events-none text-slate-400">
                                                <User size={19} />
                                            </div>
                                            <input
                                                type="text"
                                                name="cedula"
                                                placeholder="Cédula de identidad"
                                                value={cedula}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={isLoading}
                                                autoComplete="username"
                                                className={`w-full rounded-2xl border py-3.5 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none ${errors?.cedula
                                                    ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400/20'
                                                    : 'border-slate-200 bg-slate-50/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    }`}
                                            />
                                        </div>
                                        {errors?.cedula && (
                                            <p className="text-red-500 text-xs pl-2 font-medium flex items-center gap-1">
                                                <AlertCircle size={13} /> {errors.cedula}
                                            </p>
                                        )}
                                    </div>

                                    {/* Campo: Contraseña */}
                                    <div className="space-y-1.5">
                                        <div className="relative flex items-center">
                                            <div className="absolute left-4 flex items-center pointer-events-none text-slate-400">
                                                <Lock size={19} />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={isLoading}
                                                autoComplete="current-password"
                                                className={`w-full rounded-2xl border py-3.5 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none ${errors?.password
                                                    ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400/20'
                                                    : 'border-slate-200 bg-slate-50/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    }`}
                                            />
                                        </div>
                                        {errors?.password && (
                                            <p className="text-red-500 text-xs pl-2 font-medium flex items-center gap-1">
                                                <AlertCircle size={13} /> {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Botón de Iniciar Sesión */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full font-bold px-6 py-3.5 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-md ${isLoading
                                                ? 'bg-blue-300 text-white cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 hover:shadow-lg active:scale-98'
                                                }`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    <span>Validando credenciales...</span>
                                                </>
                                            ) : (
                                                <span>Iniciar sesión</span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Pie de página */}
                        <div className="text-center text-xs text-slate-400 font-medium pt-6 border-t border-slate-100 mt-6">
                            CEP Admin &copy; {new Date().getFullYear()} — Plataforma de Gestión
                        </div>
                    </div>

                    {/* Columna Derecha: Imagen decorativa amplia a pantalla completa */}
                    <div className="hidden md:block md:w-1/2 relative bg-slate-100">
                        <img
                            src={img}
                            alt="Campus CEP"
                            className="h-full w-full object-cover rounded-r-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent rounded-r-3xl flex items-end p-10">
                            <div className="text-white space-y-1">
                                <p className="font-bold text-lg leading-tight">Portal Administrativo</p>
                                <p className="text-xs text-slate-200 opacity-90">
                                    Control académico, inscripciones y gestión de pagos
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </LoginLayout>
    );
};

export default LoginPage;