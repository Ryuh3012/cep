import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Participant from './page/Participant/Participant';

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Participant/>} path='/participant' />
                <Route />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navegation;
