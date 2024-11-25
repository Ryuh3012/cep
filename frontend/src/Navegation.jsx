import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import ParticipantPage from './page/Participant/ParticipantPage';
import CoursesPage from './page/Courses/coursesPage';
import Login from './auth/Loign/Login';



const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path='/' />
                <Route element={<ParticipantPage/>} path='/participant' />
                <Route element={<CoursesPage/>} path='/cursos'  />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
