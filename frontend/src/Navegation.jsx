import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Participant from './page/Participant/Participant';
import Courses from './page/Courses/courses';

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Participant/>} path='/participant' />
                <Route element={<Courses/>} path='/cursos'  />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
