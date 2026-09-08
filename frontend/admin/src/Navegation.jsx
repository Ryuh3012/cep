import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Carga bajo demanda (Lazy loading)
const LoginPage = lazy(() => import('./Pages/auth/Loign/LoginPage'));
const Index = lazy(() => import('./Pages'));
const CoursesPage = lazy(() => import('./Pages/Courses/coursesPage'));
const AsistenciaPage = lazy(() => import('./Pages/asistencia/AsistenciaPage'));
const FacilitadorePage = lazy(() => import('./Pages/Facilitadores/FacilitadorePage'));
const CajaPage = lazy(() => import('./Pages/caja/CajaPage'));

// Pantalla / spinner ligero de carga mientras llega el chunk de la página
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-500">Cargando sección...</p>
        </div>
    </div>
);

const Navegation = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Ruta pública */}
                    <Route path='/' element={<LoginPage />} />

                    {/* Rutas protegidas (Requiere sesión activa: Admin = 1 o Cajero/Operador = 2) */}
                    <Route
                        path='/home'
                        element={
                            <ProtectedRoute allowedRoles={[1, 2]}>
                                <Index />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/cursos'
                        element={
                            <ProtectedRoute allowedRoles={[1, 2]}>
                                <CoursesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/inscripcion'
                        element={
                            <ProtectedRoute allowedRoles={[2]}>
                                <AsistenciaPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/facilitador'
                        element={
                            <ProtectedRoute allowedRoles={[1, 2]}>
                                <FacilitadorePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/caja'
                        element={
                            <ProtectedRoute allowedRoles={[2]}>
                                <CajaPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to={'/'} replace={true} />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Navegation;