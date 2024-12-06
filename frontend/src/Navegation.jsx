import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import ParticipantPage from './page/Participant/ParticipantPage';
import CoursesPage from './page/Courses/coursesPage';
import Index from './page';
import CajaPage from './page/caja/CajaPage';
import AsistenciaPage from './page/asistencia/AsistenciaPage';
import FacilitadorePage from './page/Facilitadores/FacilitadorePage';
import LoginPage from './auth/Loign/LoginPage';



const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ParticipantPage />} path='/participant' />
                <Route element={<LoginPage />} path='/' />
                <Route element={<Index />} path='/home' />
                <Route element={<CoursesPage />} path='/cursos' />
                <Route element={<AsistenciaPage />} path='/asistencia' />
                <Route element={<FacilitadorePage />} path='/facilitador' />
                <Route element={<CajaPage />} path='/caja' />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
