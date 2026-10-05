import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';

const HomePague = lazy(() => import('./page/Index'));
const ContenidoPage = lazy(() => import('./page/Cep/ContenidoPage'));
const ContactoPage = lazy(() => import('./page/contacto/ContactoPage'));
const ParticipantPage = lazy(() => import('./page/Participant/ParticipantPage'));
const NosotrosPage = lazy(() => import('./page/Nosotros/NosotrosPage'));

const PageLoader = () => (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 bg-slate-100">
        <Spinner size="lg" color="danger" />
        <p className="text-sm font-semibold text-slate-600 animate-pulse">Cargando...</p>
    </div>
);

const Navegation = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route element={<HomePague />} path='/' />
                    <Route element={<ContenidoPage />} path='/Extension-Profesional' />
                    <Route element={<ParticipantPage />} path='/participant' />
                    <Route element={<ContactoPage />} path='/contacto' />
                    <Route element={<NosotrosPage />} path='/nosotros' />
                    <Route path="*" element={<Navigate to='/' replace={true} />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Navegation;

