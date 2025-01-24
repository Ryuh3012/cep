import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import Index from './page/Admin';
import ParticipantPage from './page/Admin/Participant/ParticipantPage';
import ClavePage from './page/Admin/auth/recuperaClave.jsx/ClavePage';
import LoginPage from './page/Admin/auth/Loign/LoginPage';
import CoursesPage from './page/Admin/Courses/coursesPage';
import FacilitadorePage from './page/Admin/Facilitadores/FacilitadorePage';
import CajaPage from './page/Admin/caja/CajaPage';
import AsistenciaPage from './page/Admin/asistencia/AsistenciaPage';
import HomePague from './page/Users/Index';




const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ParticipantPage />} path='/participant' />
                <Route element={<ClavePage />} path='/recuperar' />
                <Route element={<LoginPage />} path='/' />
                <Route element={<Index />} path='/home' />
                <Route element={<CoursesPage />} path='/cursos' />
                <Route element={<AsistenciaPage />} path='/asistencia' />
                <Route element={<FacilitadorePage />} path='/facilitador' />
                <Route element={<CajaPage />} path='/caja' />
                <Route element={<HomePague />} path='/homePague' />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
