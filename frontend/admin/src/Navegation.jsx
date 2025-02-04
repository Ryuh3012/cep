import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './Pages/auth/Loign/LoginPage';
import Index from './Pages';

import AsistenciaPage from './Pages/asistencia/AsistenciaPage';
import CoursesPage from './Pages/Courses/coursesPage';
import FacilitadorePage from './Pages/Facilitadores/FacilitadorePage';
const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/Home' element={<Index />} />
                <Route path='/cursos' element={< CoursesPage />} />
                <Route path='/inscripcion' element={< AsistenciaPage />} />
                <Route path='/facilitador' element={< FacilitadorePage />} />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
